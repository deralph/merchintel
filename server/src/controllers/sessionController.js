import store from "../services/dataStore.js";
import { tagDataset } from "../data/demoData.js";

const enrichTag = (tag) => {
  if (!tag) {
    return tag;
  }

  const candidate = tagDataset.find(
    (seeded) => seeded.uid === tag.slug || seeded.uid === tag.id || seeded.uid === tag.uid,
  );

  if (!candidate) {
    return tag;
  }

  return {
    ...tag,
    brand: tag.brand ?? candidate.experience?.brand ?? tag.label ?? candidate.description ?? "",
    description:
      tag.description ?? candidate.experience?.description ?? candidate.description ?? tag.description ?? "",
    redirectUrl: tag.redirectUrl ?? candidate.experience?.redirectUrl ?? "",
    campaign: tag.campaign ?? candidate.experience?.campaignName ?? candidate.description ?? tag.label ?? "",
    material: tag.material ?? candidate.material ?? null,
    logo: tag.logo ?? candidate.experience?.logo ?? null,
    experience: tag.experience ?? candidate.experience ?? null,
  };
};

const mapSessionResponse = (session, tag) => ({
  sessionToken: session.token,
  expiresAt: session.expiresAt,
  status: session.status,
  tag: {
    uid: tag.slug ?? tag.id ?? tag._id,
    brand: tag.brand ?? tag.experience?.brand ?? tag.label,
    campaign: tag.campaign ?? tag.experience?.campaignName ?? tag.label,
    description: tag.description ?? tag.experience?.description ?? "",
    material: tag.material ?? tag.experience?.material ?? "",
    redirectUrl: tag.redirectUrl ?? tag.experience?.redirectUrl ?? "",
    logo: tag.logo ?? tag.heroImage ?? tag.experience?.logo ?? null,
  },
});

const isExpired = (session) => {
  if (!session?.expiresAt) return false;
  return new Date(session.expiresAt).getTime() < Date.now();
};

export const consumeScanSession = async (req, res) => {
  const { token } = req.params;
  const session = await store.findSessionByToken(token);
  if (!session || session.status !== "issued" || isExpired(session)) {
    res.status(410).json({ message: "Scan session expired. Please rescan the product." });
    return;
  }
  const tag = enrichTag(await store.getTagBySlug(session.tagSlug));
  if (!tag) {
    res.status(404).json({ message: "Tag not found" });
    return;
  }
  await store.updateSession(token, {
    status: "active",
    activatedAt: new Date().toISOString(),
  });
  res.json(mapSessionResponse({ ...session, status: "active" }, tag));
};

export const completeScanSession = async (req, res) => {
  const { token } = req.params;
  const { email, locationConsent, emailConsent, metadata } = req.body ?? {};

  const session = await store.findSessionByToken(token);
  if (!session || (session.status !== "active" && session.status !== "issued") || isExpired(session)) {
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
