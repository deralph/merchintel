import { Router } from "express";
import { getLandingContent } from "../controllers/contentController.js";
import asyncHandler from "../utils/asyncHandler.js";

const router = Router();

router.get("/landing", asyncHandler(getLandingContent));

export default router;
