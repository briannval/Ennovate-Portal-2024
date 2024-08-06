import mongoose from "mongoose";

export const connectToDatabase = async () => {
  try {
    await mongoose.connect(process.env.NEXT_MONGO_URI as string);
  } catch (err) {
    throw err;
  }
};
