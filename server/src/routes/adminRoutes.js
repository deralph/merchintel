import {
  getAdminDashboard,
  listAdminCampaigns,
  getAdminCampaignDetail,
  listAdminClients,
  getAdminClientDetail,
  listAdminTags,
  getAdminRevenue,
} from "../controllers/adminController.js";

const registerAdminRoutes = (app) => {
  app.get("/api/admin/dashboard", getAdminDashboard);
  app.get("/api/admin/campaigns", listAdminCampaigns);
  app.get("/api/admin/campaigns/:campaignId", getAdminCampaignDetail);
  app.get("/api/admin/clients", listAdminClients);
  app.get("/api/admin/clients/:clientId", getAdminClientDetail);
  app.get("/api/admin/tags", listAdminTags);
  app.get("/api/admin/revenue", getAdminRevenue);
};

export default registerAdminRoutes;
