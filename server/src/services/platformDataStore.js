import env from "../config/env.js";
import {
  getClientDashboard,
  getClientCampaignsResponse,
  getClientCampaignDetail,
  createClientCampaign,
  getClientUsers,
  getAdminDashboard,
  getAdminCampaigns,
  getAdminCampaignDetail,
  getAdminClients,
  getAdminClientDetail,
  getAdminTags,
  getAdminRevenue,
  defaultClientId as seededDefaultClientId,
} from "../data/demoData.js";

const fallbackClientId = env.defaultClientId || seededDefaultClientId;

const platformDataStore = {
  defaultClientId: fallbackClientId,
  getClientDashboard: (clientId = fallbackClientId) => getClientDashboard(clientId),
  getClientCampaigns: (clientId = fallbackClientId) => getClientCampaignsResponse(clientId),
  getClientCampaignDetail: (clientId = fallbackClientId, campaignId) =>
    getClientCampaignDetail(clientId, campaignId),
  createClientCampaign: (clientId = fallbackClientId, payload) => createClientCampaign(clientId, payload),
  getClientUsers: (clientId = fallbackClientId) => getClientUsers(clientId),
  getAdminDashboard: () => getAdminDashboard(),
  getAdminCampaigns: () => getAdminCampaigns(),
  getAdminCampaignDetail: (campaignId) => getAdminCampaignDetail(campaignId),
  getAdminClients: () => getAdminClients(),
  getAdminClientDetail: (clientId) => getAdminClientDetail(clientId),
  getAdminTags: () => getAdminTags(),
  getAdminRevenue: () => getAdminRevenue(),
};

export default platformDataStore;
