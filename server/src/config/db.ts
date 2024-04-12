import mongoose from "mongoose";
import { MONGODB_URI } from "./env";

export const connectDB = async () => {
  try {
    return await mongoose.connect(MONGODB_URI as string, {});
  } catch (error) {
    console.log(`error connecting to DB ${error}`);
  }
};
