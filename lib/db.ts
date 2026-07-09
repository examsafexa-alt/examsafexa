// Phase 2+ helper — connects to MongoDB via Mongoose.
// Not imported anywhere in the Phase 1 landing page.
// Set MONGODB_URI in .env.local before use.

import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;
const MONGODB_DB = process.env.MONGODB_DB || "examsafexa";

mongoose.set("bufferCommands", false);

let cached = (global as any).mongoose;
if (!cached) {
  cached = (global as any).mongoose = { conn: null, promise: null };
}

export async function connectToDatabase() {
  if (cached.conn) return cached.conn;

  if (!MONGODB_URI) {
    throw new Error(
      "MONGODB_URI is not set. Add it to .env.local before enabling Phase 2 features."
    );
  }

  if (!cached.promise) {
    cached.promise = mongoose
      .connect(MONGODB_URI, {
        dbName: MONGODB_DB,
        maxPoolSize: 10,
        serverSelectionTimeoutMS: 10000,
      })
      .then((m) => m)
      .catch((error) => {
        cached.promise = null;
        throw error;
      });
  }
  cached.conn = await cached.promise;
  return cached.conn;
}
