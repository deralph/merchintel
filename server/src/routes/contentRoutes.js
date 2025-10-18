import { getLandingContent } from "../controllers/contentController.js";

const registerContentRoutes = (app) => {
  app.get("/api/content/landing", getLandingContent);
};

export default registerContentRoutes;
