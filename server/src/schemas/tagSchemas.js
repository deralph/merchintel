import { z } from "zod";

const hexColor = z
  .string()
  .regex(/^#(?:[0-9a-fA-F]{3}){1,2}$/)
  .optional();

export const createTagSchema = z.object({
  slug: z.string().min(1, "Slug is required"),
  label: z.string().min(1, "Label must not be empty").optional(),
  brand: z.string().min(1, "Brand must not be empty").optional(),
  description: z.string().optional(),
  redirectUrl: z.string().url("redirectUrl must be a valid URL"),
  heroImage: z.string().url().nullable().optional(),
  accentColor: hexColor,
  campaign: z.string().nullable().optional(),
  material: z.string().nullable().optional(),
  logo: z.string().nullable().optional(),
  experience: z.record(z.any()).nullable().optional(),
});
