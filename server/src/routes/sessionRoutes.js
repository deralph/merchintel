import { Router } from "express";
import {
  completeScanSession,
  consumeScanSession,
  sessionStatus,
} from "../controllers/sessionController.js";
import asyncHandler from "../utils/asyncHandler.js";

const router = Router();

router.get("/:token", asyncHandler(consumeScanSession));
router.post("/:token/complete", asyncHandler(completeScanSession));
router.get("/:token/status", asyncHandler(sessionStatus));

export default router;
