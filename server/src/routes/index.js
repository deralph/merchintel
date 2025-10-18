import { Router } from "express";
import tagRoutes from "./tagRoutes.js";
import sessionRoutes from "./sessionRoutes.js";
import contentRoutes from "./contentRoutes.js";
import clientRoutes from "./clientRoutes.js";
import adminRoutes from "./adminRoutes.js";

const router = Router();

router.use("/tags", tagRoutes);
router.use("/scan-sessions", sessionRoutes);
router.use("/content", contentRoutes);
router.use("/client", clientRoutes);
router.use("/admin", adminRoutes);

export default router;
