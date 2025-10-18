import {
  getClientDashboard,
  listClientCampaigns,
  getClientCampaignDetail,
  createClientCampaign,
  listClientUsers,
} from "../controllers/clientController.js";

const registerClientRoutes = (app) => {
  app.get("/api/client/dashboard", getClientDashboard);
  app.get("/api/client/campaigns", listClientCampaigns);
  app.get("/api/client/campaigns/:campaignId", getClientCampaignDetail);
  app.post("/api/client/campaigns", createClientCampaign);
  app.get("/api/client/users", listClientUsers);
};

export default registerClientRoutes;
