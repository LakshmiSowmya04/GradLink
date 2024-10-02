import mongoose from "mongoose";
import { MONGODBURI } from "./index.js";

export const dbConnection = async () => {
  try {
    const connection = await mongoose.connect(`${MONGODBURI}`);
    console.log("Connected successfully to database");
  } catch (error) {
    throw error;
  }
};
