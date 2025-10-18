import mongoose from "mongoose";
import { randomUUID } from "node:crypto";
import { z } from "zod";

const createScanEventSchema = z.object({
  sessionToken: z.string().min(1),
  tagSlug: z.string().min(1),
  email: z.string().email().optional().nullable(),
  locationConsent: z.boolean().optional(),
  emailConsent: z.boolean().optional(),
  metadata: z.record(z.any()).optional(),
});

export const createScanEventEntity = (input, sequence) => {
  const data = createScanEventSchema.parse(input);
  const now = new Date();

  return {
    id: `event_${sequence ?? randomUUID()}`,
    type: "scan",
    sessionToken: data.sessionToken,
    tagSlug: data.tagSlug,
    email: data.email ?? null,
    locationConsent: Boolean(data.locationConsent ?? false),
    emailConsent: Boolean(data.emailConsent ?? false),
    metadata: data.metadata ?? {},
    createdAt: now,
    updatedAt: now,
  };
};

const ScanEventSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      unique: true,
      required: true,
    },
    sessionToken: {
      type: String,
      required: true,
      index: true,
    },
    tagSlug: {
      type: String,
      required: true,
      index: true,
    },
    email: {
      type: String,
      default: null,
    },
    locationConsent: {
      type: Boolean,
      default: false,
    },
    emailConsent: {
      type: Boolean,
      default: false,
    },
    metadata: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },
    type: {
      type: String,
      default: "scan",
    },
  },
  {
    timestamps: true,
  },
);

const ScanEvent = mongoose.models.ScanEvent ?? mongoose.model("ScanEvent", ScanEventSchema);

export default ScanEvent;
