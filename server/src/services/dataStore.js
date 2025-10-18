import env from "../config/env.js";
import createMemoryStore from "./memoryStore.js";
import atlasStore from "./atlasStore.js";

const store = env.dataBackend === "atlas"
  ? atlasStore
  : createMemoryStore({ sessionTtlMinutes: env.sessionTtlMinutes });

export default store;
