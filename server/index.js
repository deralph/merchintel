import express from "./mini-express.js";
import cors from "./utils/cors.js";
import store from "./data/store.js";

const PORT = Number(process.env.PORT || 4000);
const DEFAULT_CLIENT_ID = process.env.DEFAULT_CLIENT_ID || "client-1";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

app.get("/api/client/dashboard", (req, res) => {
  const dashboard = store.getClientDashboard(DEFAULT_CLIENT_ID);
  res.json(dashboard);
});

app.get("/api/client/campaigns", (req, res) => {
  const campaigns = store.getClientCampaigns(DEFAULT_CLIENT_ID);
  res.json({ campaigns });
});

app.get("/api/client/campaigns/:campaignId", (req, res) => {
  const campaign = store.getClientCampaignDetail(DEFAULT_CLIENT_ID, req.params.campaignId);
  if (!campaign) {
    res.status(404).json({ message: "Campaign not found" });
    return;
  }
  res.json(campaign);
});

app.post("/api/client/campaigns", (req, res) => {
  const requiredFields = ["name", "description", "destinationUrl", "tagQuantity", "startDate", "endDate"];
  const missing = requiredFields.filter((field) => !req.body[field]);
  if (missing.length > 0) {
    res.status(400).json({ message: "Missing required fields", missing });
    return;
  }

  const campaign = store.createClientCampaign(DEFAULT_CLIENT_ID, req.body);
  res.status(201).json(campaign);
});

app.get("/api/client/users", (req, res) => {
  const users = store.getClientUsers(DEFAULT_CLIENT_ID);
  res.json({ users });
});

app.get("/api/admin/dashboard", (req, res) => {
  res.json(store.getAdminDashboard());
});

app.get("/api/admin/campaigns", (req, res) => {
  res.json({ campaigns: store.getAdminCampaigns() });
});

app.get("/api/admin/campaigns/:campaignId", (req, res) => {
  const detail = store.getAdminCampaignDetail(req.params.campaignId);
  if (!detail) {
    res.status(404).json({ message: "Campaign not found" });
    return;
  }
  res.json(detail);
});

app.get("/api/admin/clients", (req, res) => {
  res.json({ clients: store.getAdminClients() });
});

app.get("/api/admin/clients/:clientId", (req, res) => {
  const detail = store.getAdminClientDetail(req.params.clientId);
  if (!detail) {
    res.status(404).json({ message: "Client not found" });
    return;
  }
  res.json(detail);
});

app.get("/api/admin/tags", (req, res) => {
  res.json({ tags: store.getAdminTags() });
});

app.get("/api/admin/revenue", (req, res) => {
  res.json(store.getAdminRevenue());
});

app.get("/api/tags/:tagUid", (req, res) => {
  const tag = store.getTagExperience(req.query.clientSlug, req.params.tagUid);
  if (!tag) {
    res.status(404).json({ message: "Tag not found" });
    return;
  }
  res.json(tag);
});

app.post("/api/sessions", (req, res) => {
  const { sessionId, tagUid, clientSlug } = req.body;
  if (!sessionId || !tagUid) {
    res.status(400).json({ message: "sessionId and tagUid are required" });
    return;
  }
  store.startSession({ sessionId, tagUid, clientSlug });
  res.status(201).json({ status: "started" });
});

app.post("/api/sessions/:sessionId/heartbeat", (req, res) => {
  store.recordHeartbeat(req.params.sessionId);
  res.json({ status: "ok" });
});

app.post("/api/events/scan", (req, res) => {
  const { tag_uid } = req.body;
  if (!tag_uid) {
    res.status(400).json({ message: "tag_uid is required" });
    return;
  }

  store.recordScanEvent(req.body);
  res.status(201).json({ status: "recorded" });
});

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`API server listening on port ${PORT}`);
});
