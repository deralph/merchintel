import { Router } from "express";
import {
  createClientCampaign,
  getClientCampaignDetail,
  getClientDashboard,
  listClientCampaigns,
  listClientUsers,
} from "../controllers/clientController.js";
import asyncHandler from "../utils/asyncHandler.js";

const router = Router();

router.get("/dashboard", asyncHandler(getClientDashboard));
router.get("/campaigns", asyncHandler(listClientCampaigns));
router.get("/campaigns/:campaignId", asyncHandler(getClientCampaignDetail));
router.post("/campaigns", asyncHandler(createClientCampaign));
router.get("/users", asyncHandler(listClientUsers));

export default router;
