import { Router } from "express";
import {
  createTag,
  getTag,
  issueScanLink,
  listTags,
  redirectToScan,
} from "../controllers/tagController.js";
import asyncHandler from "../utils/asyncHandler.js";

const router = Router();

router.get("/", asyncHandler(listTags));
router.post("/", asyncHandler(createTag));
router.get("/:tagSlug/scan-link", asyncHandler(issueScanLink));
router.get("/:tagSlug/scan", asyncHandler(redirectToScan));
router.get("/:tagSlug", asyncHandler(getTag));

export default router;
