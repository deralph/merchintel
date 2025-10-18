import env from "../config/env.js";
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

const mapTagResponse = (tag) => ({
  id: tag.id ?? tag._id ?? tag.slug,
  slug: tag.slug,
  label: tag.label,
  brand: tag.brand ?? tag.label,
  description: tag.description ?? "",
  redirectUrl: tag.redirectUrl,
  heroImage: tag.heroImage ?? null,
  accentColor: tag.accentColor ?? "#7c3aed",
  campaign: tag.campaign ?? tag.experience?.campaignName ?? tag.label,
  material: tag.material ?? tag.experience?.material ?? "",
  logo: tag.logo ?? tag.heroImage ?? tag.experience?.logo ?? null,
});

export const listTags = async (_req, res) => {
  const tags = await store.listTags();
  res.json({ tags: tags.map((tag) => mapTagResponse(enrichTag(tag))) });
};

export const createTag = async (req, res, next) => {
  try {
    const { slug, label, brand, description, redirectUrl, heroImage, accentColor } = req.body ?? {};
    if (!slug || !redirectUrl) {
      res.status(400).json({ message: "slug and redirectUrl are required" });
      return;
    }
    const tag = await store.createTag({
      slug,
      label: label ?? slug,
      brand: brand ?? label ?? slug,
      description: description ?? "",
      redirectUrl,
      heroImage: heroImage ?? null,
      accentColor: accentColor ?? "#7c3aed",
    });
    res.status(201).json({ tag: mapTagResponse(tag) });
  } catch (error) {
    next(error);
  }
};

export const getTag = async (req, res) => {
  const tag = enrichTag(await store.getTagBySlug(req.params.tagSlug));
  if (!tag) {
    res.status(404).json({ message: "Tag not found" });
    return;
  }
  res.json({ tag: mapTagResponse(tag) });
};

export const issueScanLink = async (req, res, next) => {
  try {
    const tag = enrichTag(await store.getTagBySlug(req.params.tagSlug));
    if (!tag) {
      res.status(404).json({ message: "Tag not found" });
      return;
    }
    const session = await store.issueScanSession(tag);
    const redirectUrl = `${env.clientUrl.replace(/\/$/, "")}/scan?session=${session.token}`;
    res.json({ redirectUrl, token: session.token, expiresAt: session.expiresAt });
  } catch (error) {
    next(error);
  }
};

export const redirectToScan = async (req, res, next) => {
  try {
    const tag = enrichTag(await store.getTagBySlug(req.params.tagSlug));
    if (!tag) {
      res.status(404).json({ message: "Tag not found" });
      return;
    }
    const session = await store.issueScanSession(tag);
    const redirectUrl = `${env.clientUrl.replace(/\/$/, "")}/scan?session=${session.token}`;
    res.statusCode = 302;
    res.setHeader("Location", redirectUrl);
    res.end();
  } catch (error) {
    next(error);
  }
};
