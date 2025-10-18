import Tag, { createTagEntity } from "../models/tagModel.js";
import ScanSession, { createSessionEntity, normalizeSessionUpdate } from "../models/sessionModel.js";
import ScanEvent, { createScanEventEntity } from "../models/scanEventModel.js";

const toPlainObject = (doc) => {
  if (!doc) {
    return null;
  }

  const source =
    typeof doc.toObject === "function"
      ? doc.toObject({ versionKey: false })
      : { ...doc };

  const plain = JSON.parse(JSON.stringify(source));
  if (plain && typeof plain === "object") {
    delete plain.__v;
  }

  return plain;
};

const createMongoStore = ({ sessionTtlMinutes }) => {
  const ttlMinutes = sessionTtlMinutes ?? 5;

  return {
    createTag: async (payload) => {
      const entity = createTagEntity(payload ?? {});
      const doc = await Tag.create(entity);
      return toPlainObject(doc);
    },

    listTags: async () => {
      const docs = await Tag.find({}).sort({ createdAt: -1 }).lean();
      return docs.map((doc) => toPlainObject(doc));
    },

    getTagBySlug: async (slug) => {
      const doc = await Tag.findOne({ slug }).lean();
      return toPlainObject(doc);
    },

    issueScanSession: async (tag) => {
      const entity = createSessionEntity(tag, ttlMinutes);
      const doc = await ScanSession.create(entity);
      return toPlainObject(doc);
    },

    findSessionByToken: async (token) => {
      const doc = await ScanSession.findOne({ token }).lean();
      return toPlainObject(doc);
    },

    updateSession: async (token, update) => {
      const $set = normalizeSessionUpdate(update);
      const doc = await ScanSession.findOneAndUpdate(
        { token },
        { $set },
        { new: true, lean: true },
      );
      return toPlainObject(doc);
    },

    recordScanEvent: async (event) => {
      const entity = createScanEventEntity(event);
      const doc = await ScanEvent.create(entity);
      return toPlainObject(doc);
    },

    countTags: async () => Tag.countDocuments(),

    countEvents: async () => ScanEvent.countDocuments(),

    getRecentEvents: async (limit = 5) => {
      const docs = await ScanEvent.find({})
        .sort({ createdAt: -1 })
        .limit(limit)
        .lean();
      return docs.map((doc) => toPlainObject(doc));
    },
  };
};

export default createMongoStore;
