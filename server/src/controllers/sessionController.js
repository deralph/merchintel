import store from "../services/dataStore.js";
import { enrichTag, mapSessionTag } from "../services/tagService.js";
import { isSessionExpired } from "../models/sessionModel.js";

const mapSessionResponse = (session, tag) => ({
  sessionToken: session.token,
  expiresAt: session.expiresAt,
  status: session.status,
  tag: mapSessionTag(tag),
});

export const consumeScanSession = async (req, res) => {
  const { token } = req.params;
  const session = await store.findSessionByToken(token);
  if (!session || session.status !== "issued" || isSessionExpired(session)) {
    res.status(410).json({ message: "Scan session expired. Please rescan the product." });
    return;
  }
  const tag = enrichTag(await store.getTagBySlug(session.tagSlug));
  if (!tag) {
    res.status(404).json({ message: "Tag not found" });
    return;
  }
  const updatedSession = await store.updateSession(token, {
    status: "active",
    activatedAt: new Date().toISOString(),
  });
  res.json(mapSessionResponse(updatedSession, tag));
};

export const completeScanSession = async (req, res) => {
  const { token } = req.params;
  const { email, locationConsent, emailConsent, metadata } = req.body ?? {};

  const session = await store.findSessionByToken(token);
  if (!session || (session.status !== "active" && session.status !== "issued") || isSessionExpired(session)) {
    res.status(410).json({ message: "This scan session is no longer valid. Please scan again." });
    return;
  }

  const tag = enrichTag(await store.getTagBySlug(session.tagSlug));
  if (!tag) {
    res.status(404).json({ message: "Tag not found" });
    return;
  }

  await store.updateSession(token, {
    status: "completed",
    completedAt: new Date().toISOString(),
  });

  await store.recordScanEvent({
    sessionToken: token,
    tagSlug: session.tagSlug,
    email: email ?? null,
    locationConsent: Boolean(locationConsent),
    emailConsent: Boolean(emailConsent),
    metadata: metadata ?? {},
  });

  res.json({
    status: "completed",
    redirectUrl: tag.redirectUrl ?? tag.experience?.redirectUrl ?? "",
  });
};

export const sessionStatus = async (req, res) => {
  const { token } = req.params;
  const session = await store.findSessionByToken(token);
  if (!session) {
    res.status(404).json({ message: "Session not found" });
    return;
  }
  res.json({
    token,
    status: session.status,
    expiresAt: session.expiresAt,
  });
};
