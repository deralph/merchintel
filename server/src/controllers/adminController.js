import platformDataStore from "../services/platformDataStore.js";

export const getAdminDashboard = (_req, res) => {
  res.json(platformDataStore.getAdminDashboard());
};

export const listAdminCampaigns = (_req, res) => {
  res.json(platformDataStore.getAdminCampaigns());
};

export const getAdminCampaignDetail = (req, res) => {
  const campaign = platformDataStore.getAdminCampaignDetail(req.params.campaignId);
  if (!campaign) {
    res.status(404).json({ message: "Campaign not found" });
    return;
  }
  res.json(campaign);
};

export const listAdminClients = (_req, res) => {
  res.json(platformDataStore.getAdminClients());
};

export const getAdminClientDetail = (req, res) => {
  const client = platformDataStore.getAdminClientDetail(req.params.clientId);
  if (!client) {
    res.status(404).json({ message: "Client not found" });
    return;
  }
  res.json(client);
};

export const listAdminTags = (_req, res) => {
  res.json(platformDataStore.getAdminTags());
};

export const getAdminRevenue = (_req, res) => {
  res.json(platformDataStore.getAdminRevenue());
};
