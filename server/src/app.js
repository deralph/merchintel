import express, { json } from "../mini-express.js";
import env from "./config/env.js";
import registerTagRoutes from "./routes/tagRoutes.js";
import registerSessionRoutes from "./routes/sessionRoutes.js";
import registerContentRoutes from "./routes/contentRoutes.js";
import registerClientRoutes from "./routes/clientRoutes.js";
import registerAdminRoutes from "./routes/adminRoutes.js";

const app = express();

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", env.clientUrl);
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type,Authorization");
  if (req.method === "OPTIONS") {
    res.statusCode = 204;
    res.end();
    return;
  }
  next();
});

app.use(json());

app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

registerTagRoutes(app);
registerSessionRoutes(app);
registerContentRoutes(app);
registerClientRoutes(app);
registerAdminRoutes(app);

export default app;
