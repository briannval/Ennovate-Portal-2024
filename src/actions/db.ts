"use server";

import { connectToDatabase } from "@/lib/mongoose";
import { redis } from "@/lib/redis";
import BusinessProposal, { IBusinessProposal } from "@/models/BusinessProposal";

export async function updateBusinessProposal(
  id: string,
  data: IBusinessProposal
) {
  try {
    await connectToDatabase();
    const { name, drive, description, image } = data;
    await BusinessProposal.findByIdAndUpdate(id, {
      name,
      drive,
      description,
      image,
    });
    await redis.del("businessProposal");
  } catch (e) {
    throw new Error("Failed to delete team member");
  }
}
