import mongoose from "mongoose";
import env from "./env.js";

const connectionState = {
  isConnecting: false,
};

export const connectDatabase = async () => {
  if (env.dataBackend !== "mongo") {
    return null;
  }

  if (!env.mongo.uri) {
    throw new Error("MONGODB_URI must be provided when DATA_BACKEND is 'mongo'");
  }

  if (mongoose.connection.readyState === 1) {
    return mongoose.connection;
  }

  if (connectionState.isConnecting) {
    return new Promise((resolve, reject) => {
      mongoose.connection.once("connected", () => resolve(mongoose.connection));
      mongoose.connection.once("error", reject);
    });
  }

  connectionState.isConnecting = true;

  try {
    mongoose.set("strictQuery", true);
    await mongoose.connect(env.mongo.uri, {
      serverSelectionTimeoutMS: 5000,
    });
    return mongoose.connection;
  } finally {
    connectionState.isConnecting = false;
  }
};

export const disconnectDatabase = async () => {
  if (mongoose.connection.readyState !== 0) {
    await mongoose.disconnect();
  }
};
