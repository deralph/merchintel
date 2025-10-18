import { completeScanSession, consumeScanSession, sessionStatus } from "../controllers/sessionController.js";

const registerSessionRoutes = (app) => {
  app.get("/api/scan-sessions/:token", consumeScanSession);
  app.post("/api/scan-sessions/:token/complete", completeScanSession);
  app.get("/api/scan-sessions/:token/status", sessionStatus);
};

export default registerSessionRoutes;
