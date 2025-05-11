
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

let isConnected = false;

const connectToDatabase = async (): Promise<void> => {
  if (isConnected) return;

  const uri = process.env.MONGO_URI;
  if (!uri) {
    throw new Error("Missing MONGO_URI environment variable");
  }

  try {
    // no options needed in mongoose v7+
    const db = await mongoose.connect(uri);
    isConnected = db.connections[0].readyState === 1;
    console.log("✅ Connected to MongoDB.");
  } catch (error: unknown) {
    console.error("❌ MongoDB connection error:", error);
    throw error;
  }
};

export default connectToDatabase;
