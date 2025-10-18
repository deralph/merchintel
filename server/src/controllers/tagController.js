import env from "../config/env.js";
import store from "../services/dataStore.js";
import { createTagSchema } from "../schemas/tagSchemas.js";
import { enrichTag, mapTagResponse } from "../services/tagService.js";

export const listTags = async (_req, res) => {
  const tags = await store.listTags();
  res.json({ tags: tags.map((tag) => mapTagResponse(enrichTag(tag))) });
};

export const createTag = async (req, res) => {
  const result = createTagSchema.safeParse(req.body ?? {});

  if (!result.success) {
    res.status(400).json({
      message: "Invalid tag payload",
      errors: result.error.flatten(),
    });
    return;
  }

  const tag = await store.createTag(result.data);
  res.status(201).json({ tag: mapTagResponse(enrichTag(tag)) });
};

export const getTag = async (req, res) => {
  const tag = enrichTag(await store.getTagBySlug(req.params.tagSlug));
  if (!tag) {
    res.status(404).json({ message: "Tag not found" });
    return;
  }
  res.json({ tag: mapTagResponse(tag) });
};

export const issueScanLink = async (req, res) => {
  const tag = enrichTag(await store.getTagBySlug(req.params.tagSlug));
  if (!tag) {
    res.status(404).json({ message: "Tag not found" });
    return;
  }
  const session = await store.issueScanSession(tag);
  const redirectUrl = `${env.clientUrl.replace(/\/$/, "")}/scan?session=${session.token}`;
  res.json({ redirectUrl, token: session.token, expiresAt: session.expiresAt });
};

export const redirectToScan = async (req, res) => {
  const tag = enrichTag(await store.getTagBySlug(req.params.tagSlug));
  if (!tag) {
    res.status(404).json({ message: "Tag not found" });
    return;
  }
  const session = await store.issueScanSession(tag);
  const redirectUrl = `${env.clientUrl.replace(/\/$/, "")}/scan?session=${session.token}`;
  res.redirect(302, redirectUrl);
};
