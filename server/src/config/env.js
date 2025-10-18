import "dotenv/config";

const required = (key) => {
  const value = process.env[key];
  if (!value) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
  return value;
};

const inferBackend = () => {
  if (process.env.DATA_BACKEND) {
    return process.env.DATA_BACKEND;
  }

  return process.env.MONGODB_URI ? "mongo" : "memory";
};

const env = {
  nodeEnv: process.env.NODE_ENV ?? "development",
  port: Number(process.env.PORT ?? 4000),
  clientUrl: process.env.CLIENT_URL ?? "http://localhost:5173",
  dataBackend: inferBackend(),
  sessionTtlMinutes: Number(process.env.SESSION_TTL_MINUTES ?? 5),
  defaultClientId: process.env.DEFAULT_CLIENT_ID ?? "client-1",
  jwtSecret: process.env.JWT_SECRET ?? "development-secret",
  mongo: {
    uri: process.env.MONGODB_URI ?? "",
  },
};

export default env;
