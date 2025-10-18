import { randomUUID } from "node:crypto";
import { createTagSchema } from "../schemas/tagSchemas.js";

export const createTagEntity = (input) => {
  const data = createTagSchema.parse(input);
  const now = new Date().toISOString();

  return {
    id: input.id ?? `tag_${randomUUID()}`,
    slug: data.slug,
    label: data.label ?? data.slug,
    brand: data.brand ?? data.label ?? data.slug,
    description: data.description ?? "",
    redirectUrl: data.redirectUrl,
    heroImage: data.heroImage ?? null,
    accentColor: data.accentColor ?? "#7c3aed",
    campaign: data.campaign ?? null,
    material: data.material ?? null,
    logo: data.logo ?? data.heroImage ?? null,
    experience: data.experience ?? null,
    createdAt: input.createdAt ?? now,
    updatedAt: input.updatedAt ?? now,
  };
};

export const mapTagToResponse = (tag) => ({
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
