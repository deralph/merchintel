import app from "./src/app.js";
import env from "./src/config/env.js";
import { connectDatabase } from "./src/config/database.js";
import store from "./src/services/dataStore.js";
import seedMemory from "./src/data/seedMemory.js";

const start = async () => {
  if (env.dataBackend === "mongo") {
    await connectDatabase();
  } else {
    await seedMemory(store);
  }

  app.listen(env.port, () => {
    console.log(`Server listening on port ${env.port}`);
  });
};

start().catch((error) => {
  console.error("Failed to start server", error);
  process.exit(1);
});
