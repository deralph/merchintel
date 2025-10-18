import env from "../config/env.js";
import { createTagEntity } from "../models/tagModel.js";
import { createSessionEntity, updateSessionEntity } from "../models/sessionModel.js";
import { createScanEventEntity } from "../models/scanEventModel.js";

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

const listTags = async () => {
  const result = await callDataApi("find", {
    collection: "tags",
    filter: {},
  });
  return result.documents ?? [];
};

const getTagBySlug = async (slug) => {
  const result = await callDataApi("findOne", {
    collection: "tags",
    filter: { slug },
  });
  return result.document ?? null;
};

const findSessionByToken = async (token) => {
  const result = await callDataApi("findOne", {
    collection: "scan_sessions",
    filter: { token },
  });
  return result.document ?? null;
};

const atlasStore = {
  createTag: async (tag) => {
    const entity = createTagEntity(tag);
    await callDataApi("insertOne", {
      collection: "tags",
      document: entity,
    });
    return entity;
  },

  listTags,

  getTagBySlug,

  issueScanSession: async (tag) => {
    const session = createSessionEntity(tag, env.sessionTtlMinutes);
    await callDataApi("insertOne", {
      collection: "scan_sessions",
      document: session,
    });
    return session;
  },

  findSessionByToken,

  updateSession: async (token, update) => {
    const existing = await findSessionByToken(token);
    if (!existing) {
      return null;
    }
    const next = updateSessionEntity(existing, update);
    await callDataApi("updateOne", {
      collection: "scan_sessions",
      filter: { token },
      update: {
        $set: {
          status: next.status,
          activatedAt: next.activatedAt ?? null,
          completedAt: next.completedAt ?? null,
          updatedAt: next.updatedAt,
        },
      },
    });
    return next;
  },

  recordScanEvent: async (event) => {
    const document = createScanEventEntity(event);
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
