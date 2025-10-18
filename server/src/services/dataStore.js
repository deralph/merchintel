import env from "../config/env.js";
import createMemoryStore from "./memoryStore.js";
import createMongoStore from "./mongoStore.js";

const store = env.dataBackend === "mongo"
  ? createMongoStore({ sessionTtlMinutes: env.sessionTtlMinutes })
  : createMemoryStore({ sessionTtlMinutes: env.sessionTtlMinutes });

export default store;
