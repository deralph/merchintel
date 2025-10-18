import mongoose from "mongoose";
import { randomUUID } from "node:crypto";
import { createTagSchema } from "../schemas/tagSchemas.js";

export const createTagEntity = (input) => {
  const data = createTagSchema.parse(input);
  const now = new Date();

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
    createdAt: input.createdAt ? new Date(input.createdAt) : now,
    updatedAt: input.updatedAt ? new Date(input.updatedAt) : now,
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

const TagSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      default: () => `tag_${randomUUID()}`,
      unique: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    label: {
      type: String,
      required: true,
      trim: true,
      default: function defaultLabel() {
        return this.slug;
      },
    },
    brand: {
      type: String,
      trim: true,
      default: function defaultBrand() {
        return this.label;
      },
    },
    description: {
      type: String,
      default: "",
    },
    redirectUrl: {
      type: String,
      required: true,
    },
    heroImage: {
      type: String,
      default: null,
    },
    accentColor: {
      type: String,
      default: "#7c3aed",
    },
    campaign: {
      type: String,
      default: null,
    },
    material: {
      type: String,
      default: null,
    },
    logo: {
      type: String,
      default: null,
    },
    experience: {
      type: mongoose.Schema.Types.Mixed,
      default: null,
    },
  },
  {
    timestamps: true,
  },
);

const Tag = mongoose.models.Tag ?? mongoose.model("Tag", TagSchema);

export default Tag;
