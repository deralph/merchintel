import env from "../config/env.js";
import { createSessionToken, minutesFromNow } from "../utils/token.js";

const buildHeaders = () => ({
  "Content-Type": "application/json",
  "Access-Control-Request-Headers": "*",
  "api-key": env.mongo.apiKey,
});

const callDataApi = async (action, payload) => {
  if (!env.mongo.apiUrl || !env.mongo.apiKey || !env.mongo.dataSource || !env.mongo.database) {
    throw Object.assign(new Error("MongoDB Atlas Data API credentials are not configured"), {
      status: 500,
    });
  }

  const response = await fetch(`${env.mongo.apiUrl}/action/${action}`, {
    method: "POST",
    headers: buildHeaders(),
    body: JSON.stringify({
      dataSource: env.mongo.dataSource,
      database: env.mongo.database,
      ...payload,
    }),
  });

  if (!response.ok) {
    const message = await response.text();
    throw Object.assign(new Error(`MongoDB Data API error: ${message}`), {
      status: response.status,
    });
  }

  return response.json();
};

const atlasStore = {
  createTag: async (tag) => {
    const result = await callDataApi("insertOne", {
      collection: "tags",
      document: { ...tag, createdAt: new Date(), updatedAt: new Date() },
    });
    return { ...tag, id: result.insertedId };
  },

  listTags: async () => {
    const result = await callDataApi("find", {
      collection: "tags",
      filter: {},
    });
    return result.documents ?? [];
  },

  getTagBySlug: async (slug) => {
    const result = await callDataApi("findOne", {
      collection: "tags",
      filter: { slug },
    });
    return result.document ?? null;
  },

  issueScanSession: async (tag) => {
    const session = {
      token: createSessionToken(),
      tagSlug: tag.slug,
      tagId: tag.id ?? tag._id,
      status: "issued",
      createdAt: new Date(),
      expiresAt: minutesFromNow(env.sessionTtlMinutes),
    };
    await callDataApi("insertOne", {
      collection: "scan_sessions",
      document: session,
    });
    return { ...session, expiresAt: session.expiresAt.toISOString(), createdAt: session.createdAt.toISOString() };
  },

  findSessionByToken: async (token) => {
    const result = await callDataApi("findOne", {
      collection: "scan_sessions",
      filter: { token },
    });
    if (!result.document) {
      return null;
    }
    return {
      ...result.document,
      expiresAt: result.document.expiresAt ? new Date(result.document.expiresAt).toISOString() : null,
      createdAt: result.document.createdAt ? new Date(result.document.createdAt).toISOString() : null,
    };
  },

  updateSession: async (token, update) => {
    await callDataApi("updateOne", {
      collection: "scan_sessions",
      filter: { token },
      update: {
        $set: { ...update, updatedAt: new Date() },
      },
    });
    return atlasStore.findSessionByToken(token);
  },

  recordScanEvent: async (event) => {
    const document = { ...event, createdAt: new Date() };
    await callDataApi("insertOne", {
      collection: "scan_events",
      document,
    });
    return document;
  },

  countTags: async () => {
    const result = await callDataApi("aggregate", {
      collection: "tags",
      pipeline: [{ $count: "total" }],
    });
    return result.documents?.[0]?.total ?? 0;
  },

  countEvents: async () => {
    const result = await callDataApi("aggregate", {
      collection: "scan_events",
      pipeline: [{ $count: "total" }],
    });
    return result.documents?.[0]?.total ?? 0;
  },

  getRecentEvents: async (limit = 5) => {
    const result = await callDataApi("aggregate", {
      collection: "scan_events",
      pipeline: [
        { $sort: { createdAt: -1 } },
        { $limit: limit },
      ],
    });
    return result.documents ?? [];
  },
};

export default atlasStore;
