import { createTagEntity } from "../models/tagModel.js";
import { createSessionEntity, updateSessionEntity } from "../models/sessionModel.js";
import { createScanEventEntity } from "../models/scanEventModel.js";

const createMemoryStore = (options = {}) => {
  const sessionTtlMinutes = options.sessionTtlMinutes ?? 5;
  const tags = new Map();
  const sessions = new Map();
  const events = [];

  const ensureTag = (tag) => {
    try {
      const entity = createTagEntity(tag);
      if (!tags.has(entity.slug)) {
        tags.set(entity.slug, entity);
      }
    } catch (error) {
      if (process.env.NODE_ENV !== "test") {
        console.warn("[memory-store] failed to seed tag", error);
      }
    }
  };

  const createTag = async (tag) => {
    const entity = createTagEntity(tag);
    tags.set(entity.slug, entity);
    return entity;
  };

  const listTags = async () => Array.from(tags.values());

  const getTagBySlug = async (slug) => tags.get(slug) ?? null;

  const issueScanSession = async (tag) => {
    const session = createSessionEntity(tag, sessionTtlMinutes);
    sessions.set(session.token, session);
    return session;
  };

  const findSessionByToken = async (token) => sessions.get(token) ?? null;

  const updateSession = async (token, update) => {
    const session = sessions.get(token);
    if (!session) {
      return null;
    }
    const next = updateSessionEntity(session, update);
    sessions.set(token, next);
    return next;
  };

  const recordScanEvent = async (event) => {
    const enriched = createScanEventEntity(event, events.length + 1);
    events.push(enriched);
    return enriched;
  };

  const countTags = async () => tags.size;
  const countEvents = async () => events.length;

  const getRecentEvents = async (limit = 5) => events.slice(-limit).reverse();

  return {
    createTag,
    listTags,
    getTagBySlug,
    issueScanSession,
    findSessionByToken,
    updateSession,
    recordScanEvent,
    countTags,
    countEvents,
    getRecentEvents,
    ensureTag,
  };
};

export default createMemoryStore;
