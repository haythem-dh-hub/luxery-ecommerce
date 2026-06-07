import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI ?? "";

if (!globalThis.mongooseConnection) {
  globalThis.mongooseConnection = { conn: null, promise: null };
}

export async function connectToDatabase() {
  if (!MONGODB_URI) {
    return null;
  }

  if (globalThis.mongooseConnection.conn) {
    return globalThis.mongooseConnection.conn;
  }

  if (!globalThis.mongooseConnection.promise) {
    globalThis.mongooseConnection.promise = mongoose.connect(MONGODB_URI, {
      bufferCommands: false,
      dbName: process.env.MONGODB_DB || undefined,
    });
  }

  globalThis.mongooseConnection.conn = await globalThis.mongooseConnection.promise;
  return globalThis.mongooseConnection.conn;
}
