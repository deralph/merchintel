import { tagDataset } from "../data/demoData.js";
import { mapTagToResponse } from "../models/tagModel.js";

export const enrichTag = (tag) => {
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

export const mapTagResponse = (tag) => mapTagToResponse(tag);

export const mapSessionTag = (tag) => ({
  uid: tag.slug ?? tag.id ?? tag._id,
  brand: tag.brand ?? tag.experience?.brand ?? tag.label,
  campaign: tag.campaign ?? tag.experience?.campaignName ?? tag.label,
  description: tag.description ?? tag.experience?.description ?? "",
  material: tag.material ?? tag.experience?.material ?? "",
  redirectUrl: tag.redirectUrl ?? tag.experience?.redirectUrl ?? "",
  logo: tag.logo ?? tag.heroImage ?? tag.experience?.logo ?? null,
});
