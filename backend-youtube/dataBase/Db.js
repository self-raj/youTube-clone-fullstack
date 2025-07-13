import dotenv from "dotenv";
import mongoose from "mongoose";

//  Load .env first
dotenv.config();

//  Now access environment variable
const mongoUrl = process.env.MONGO_URL;


mongoose.connect(mongoUrl)
  .then(() => {
    console.log(" DB connected successfully");
  })
  .catch((err) => {
    console.log(" DB connection failed:", err.message);
  });
