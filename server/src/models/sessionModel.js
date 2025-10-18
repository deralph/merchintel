import { z } from "zod";
import { createSessionToken, minutesFromNow } from "../utils/token.js";

const sessionStatusSchema = z.enum(["issued", "active", "completed", "expired"]);

export const sessionSchema = z.object({
  token: z.string(),
  tagSlug: z.string(),
  tagId: z.string().optional(),
  status: sessionStatusSchema,
  createdAt: z.string(),
  expiresAt: z.string(),
  activatedAt: z.string().optional(),
  completedAt: z.string().optional(),
  updatedAt: z.string().optional(),
});

export const createSessionEntity = (tag, sessionTtlMinutes) => {
  const session = {
    token: createSessionToken(),
    tagSlug: tag.slug,
    tagId: tag.id ?? tag._id,
    status: "issued",
    createdAt: new Date().toISOString(),
    expiresAt: minutesFromNow(sessionTtlMinutes).toISOString(),
  };

  return sessionSchema.parse(session);
};

export const updateSessionEntity = (session, update) => {
  const nextSession = {
    ...session,
    ...update,
    updatedAt: new Date().toISOString(),
  };

  return sessionSchema.parse(nextSession);
};

export const isSessionExpired = (session) => {
  if (!session?.expiresAt) {
    return false;
  }

  return new Date(session.expiresAt).getTime() < Date.now();
};
