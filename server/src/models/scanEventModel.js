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

  return {
    id: `event_${sequence ?? Date.now()}`,
    type: "scan",
    ...data,
    createdAt: new Date().toISOString(),
  };
};
