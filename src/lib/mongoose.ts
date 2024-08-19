import mongoose from "mongoose";

export const connectToDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI as string);
    console.log("success");
  } catch (err) {
    console.log(err);
    throw err;
  }
};
