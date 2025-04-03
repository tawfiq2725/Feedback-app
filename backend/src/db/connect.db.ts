import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
export const dbConnection = async () => {
  try {
    const dbUrl = process.env.MONGO_URL;
    if (!dbUrl) {
      throw new Error("Database URL is not defined in .env file");
    }
    await mongoose.connect(dbUrl);
    console.log("DB connected Successfully.....");
  } catch (error: any) {
    console.error("Error connecting to the database", error.message);
    throw new Error(error.message);
  }
};
