import mongoose from "mongoose";
import { randomUUID } from "node:crypto";

const sessionStatuses = ["issued", "active", "completed"];

export const createSessionEntity = (tag, ttlMinutes) => {
  const now = new Date();
  const expiresAt = new Date(now.getTime() + ttlMinutes * 60_000);

  return {
    token: randomUUID(),
    tagSlug: tag.slug ?? tag.id ?? tag._id,
    status: "issued",
    issuedAt: now,
    activatedAt: null,
    completedAt: null,
    expiresAt,
    createdAt: now,
    updatedAt: now,
  };
};

export const updateSessionEntity = (session, update) => ({
  ...session,
  ...normalizeSessionUpdate(update),
});

export const normalizeSessionUpdate = (update = {}) => {
  const normalized = {
    updatedAt: new Date(),
  };

  if (update.status && sessionStatuses.includes(update.status)) {
    normalized.status = update.status;
  }

  if (Object.prototype.hasOwnProperty.call(update, "activatedAt")) {
    normalized.activatedAt = update.activatedAt ? new Date(update.activatedAt) : null;
  }

  if (Object.prototype.hasOwnProperty.call(update, "completedAt")) {
    normalized.completedAt = update.completedAt ? new Date(update.completedAt) : null;
  }

  return normalized;
};

export const isSessionExpired = (session) => {
  if (!session?.expiresAt) {
    return true;
  }

  const expiresAt = session.expiresAt instanceof Date ? session.expiresAt : new Date(session.expiresAt);
  return expiresAt.getTime() <= Date.now();
};

const ScanSessionSchema = new mongoose.Schema(
  {
    token: {
      type: String,
      unique: true,
      required: true,
      index: true,
    },
    tagSlug: {
      type: String,
      required: true,
      index: true,
    },
    status: {
      type: String,
      enum: sessionStatuses,
      default: "issued",
    },
    issuedAt: {
      type: Date,
      default: Date.now,
    },
    activatedAt: {
      type: Date,
      default: null,
    },
    completedAt: {
      type: Date,
      default: null,
    },
    expiresAt: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const ScanSession = mongoose.models.ScanSession ?? mongoose.model("ScanSession", ScanSessionSchema);

export default ScanSession;
