import crypto from "node:crypto";

export const createSessionToken = () => crypto.randomBytes(32).toString("hex");

export const minutesFromNow = (minutes) => new Date(Date.now() + minutes * 60 * 1000);
