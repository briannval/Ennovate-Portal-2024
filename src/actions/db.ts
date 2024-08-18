"use server";

import { connectToDatabase } from "@/lib/mongoose";
import { redis } from "@/lib/redis";
import BusinessProposal, { IBusinessProposal } from "@/models/BusinessProposal";
import TeamMember, { ITeamMember } from "@/models/TeamMember";

export async function updateTeamMember(id: string, data: ITeamMember) {
  try {
    await connectToDatabase();
    const { name, email, image, title } = data;
    await TeamMember.findByIdAndUpdate(id, {
      name,
      email,
      image,
      title,
    });
    await redis.del("businessProposal");
  } catch (e) {
    throw new Error("Failed to delete team member");
  }
}

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
