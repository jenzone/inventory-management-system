import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const DB_URL = process.env.DATABASE_URL;

async function connection() {
  try {
    await mongoose.connect(DB_URL);
  } catch (err) {
    console.error(err);
  }
}

export default connection;
