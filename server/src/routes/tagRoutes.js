import { createTag, getTag, issueScanLink, listTags, redirectToScan } from "../controllers/tagController.js";

const registerTagRoutes = (app) => {
  app.get("/api/tags", listTags);
  app.post("/api/tags", createTag);
  app.get("/api/tags/:tagSlug/scan-link", issueScanLink);
  app.get("/api/tags/:tagSlug/scan", redirectToScan);
  app.get("/api/tags/:tagSlug", getTag);
};

export default registerTagRoutes;
