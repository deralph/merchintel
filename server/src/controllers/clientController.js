import platformDataStore from "../services/platformDataStore.js";

const resolveClientId = (req) => req.query.clientId ?? platformDataStore.defaultClientId;

export const getClientDashboard = (req, res) => {
  const clientId = resolveClientId(req);
  const dashboard = platformDataStore.getClientDashboard(clientId);
  res.json(dashboard);
};

export const listClientCampaigns = (req, res) => {
  const clientId = resolveClientId(req);
  const response = platformDataStore.getClientCampaigns(clientId);
  res.json(response);
};

export const getClientCampaignDetail = (req, res) => {
  const clientId = resolveClientId(req);
  const campaign = platformDataStore.getClientCampaignDetail(clientId, req.params.campaignId);
  if (!campaign) {
    res.status(404).json({ message: "Campaign not found" });
    return;
  }
  res.json(campaign);
};

export const createClientCampaign = (req, res) => {
  const clientId = resolveClientId(req);
  const payload = req.body ?? {};
  const campaign = platformDataStore.createClientCampaign(clientId, payload);
  res.status(201).json(campaign);
};

export const listClientUsers = (req, res) => {
  const clientId = resolveClientId(req);
  const users = platformDataStore.getClientUsers(clientId);
  res.json(users);
};
