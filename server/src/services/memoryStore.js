import { createSessionToken, minutesFromNow } from "../utils/token.js";

const createMemoryStore = (options = {}) => {
  const sessionTtlMinutes = options.sessionTtlMinutes ?? 5;
  const tags = new Map();
  const sessions = new Map();
  const events = [];

  const ensureTag = (tag) => {
    if (!tag?.slug) {
      return;
    }
    const stored = tags.get(tag.slug);
    if (!stored) {
      const now = new Date().toISOString();
      tags.set(tag.slug, {
        id: tag.id ?? `tag_${tags.size + 1}`,
        slug: tag.slug,
        label: tag.label ?? tag.slug,
        brand: tag.brand ?? tag.label ?? tag.slug,
        description: tag.description ?? "",
        redirectUrl: tag.redirectUrl ?? "",
        heroImage: tag.heroImage ?? null,
        accentColor: tag.accentColor ?? "#7c3aed",
        campaign: tag.campaign ?? null,
        material: tag.material ?? null,
        logo: tag.logo ?? tag.heroImage ?? null,
        experience: tag.experience ?? null,
        createdAt: now,
        updatedAt: now,
      });
    }
  };

  const createTag = async (tag) => {
    const now = new Date().toISOString();
    const stored = {
      id: tag.id ?? `tag_${tags.size + 1}`,
      slug: tag.slug,
      label: tag.label ?? tag.slug,
      brand: tag.brand ?? tag.label ?? tag.slug,
      description: tag.description ?? "",
      redirectUrl: tag.redirectUrl ?? "",
      heroImage: tag.heroImage ?? null,
      accentColor: tag.accentColor ?? "#7c3aed",
      campaign: tag.campaign ?? null,
      material: tag.material ?? null,
      logo: tag.logo ?? tag.heroImage ?? null,
      experience: tag.experience ?? null,
      createdAt: now,
      updatedAt: now,
    };
    tags.set(stored.slug, stored);
    return stored;
  };

  const listTags = async () => Array.from(tags.values());

  const getTagBySlug = async (slug) => tags.get(slug) ?? null;

  const issueScanSession = async (tag) => {
    const token = createSessionToken();
    const session = {
      token,
      tagSlug: tag.slug,
      tagId: tag.id,
      status: "issued",
      createdAt: new Date().toISOString(),
      expiresAt: minutesFromNow(sessionTtlMinutes).toISOString(),
    };
    sessions.set(token, session);
    return session;
  };

  const findSessionByToken = async (token) => sessions.get(token) ?? null;

  const updateSession = async (token, update) => {
    const session = sessions.get(token);
    if (!session) {
      return null;
    }
    const next = { ...session, ...update, updatedAt: new Date().toISOString() };
    sessions.set(token, next);
    return next;
  };

  const recordScanEvent = async (event) => {
    const enriched = {
      id: `event_${events.length + 1}`,
      ...event,
      createdAt: new Date().toISOString(),
    };
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
