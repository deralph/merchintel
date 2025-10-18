import "dotenv/config";

const required = (key) => {
  const value = process.env[key];
  if (!value) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
  return value;
};

const env = {
  nodeEnv: process.env.NODE_ENV ?? "development",
  port: Number(process.env.PORT ?? 4000),
  clientUrl: process.env.CLIENT_URL ?? "http://localhost:5173",
  dataBackend: process.env.DATA_BACKEND ?? "memory",
  sessionTtlMinutes: Number(process.env.SESSION_TTL_MINUTES ?? 5),
  defaultClientId: process.env.DEFAULT_CLIENT_ID ?? "client-1",
  jwtSecret: process.env.JWT_SECRET ?? "development-secret",
  mongo: {
    apiUrl: process.env.MONGODB_DATA_API_URL ?? "",
    apiKey: process.env.MONGODB_DATA_API_KEY ?? "",
    dataSource: process.env.MONGODB_DATA_SOURCE ?? "",
    database: process.env.MONGODB_DATABASE ?? "",
  },
};

export default env;
