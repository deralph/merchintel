import { Router } from "express";
import {
  getAdminCampaignDetail,
  getAdminClientDetail,
  getAdminDashboard,
  getAdminRevenue,
  listAdminCampaigns,
  listAdminClients,
  listAdminTags,
} from "../controllers/adminController.js";
import asyncHandler from "../utils/asyncHandler.js";

const router = Router();

router.get("/dashboard", asyncHandler(getAdminDashboard));
router.get("/campaigns", asyncHandler(listAdminCampaigns));
router.get("/campaigns/:campaignId", asyncHandler(getAdminCampaignDetail));
router.get("/clients", asyncHandler(listAdminClients));
router.get("/clients/:clientId", asyncHandler(getAdminClientDetail));
router.get("/tags", asyncHandler(listAdminTags));
router.get("/revenue", asyncHandler(getAdminRevenue));

export default router;
