"use server";

import { connectToDatabase } from "@/lib/mongoose";
import { redis } from "@/lib/redis";
import BusinessProposal, { IBusinessProposal } from "@/models/BusinessProposal";
import TeamMember, { ITeamMember } from "@/models/TeamMember";

export async function createTeamMember(data: ITeamMember) {
  try {
    await connectToDatabase();
    const { name, email, image, title } = data;
    await TeamMember.create({ name, email, image, title });
    const cachedKeys = await redis.keys("teamMember?*");
    if (cachedKeys.length > 0) {
      await redis.del(cachedKeys);
    }
  } catch (e) {
    throw new Error("Failed to create team member");
  }
}

export async function createBusinessProposal(data: IBusinessProposal) {
  try {
    await connectToDatabase();
    const { name, description, drive, image } = data;
    await BusinessProposal.create({ name, description, drive, image });
    await redis.del("businessProposal");
  } catch (e) {
    throw new Error("Failed to create team member");
  }
}

export async function getTeamMemberById(id: string) {
  try {
    await connectToDatabase();
    const teamMember = await TeamMember.findById(id);
    if (!teamMember) {
      throw new Error("Invalid id");
    }
    return {
      name: teamMember.name,
      email: teamMember.email,
      image: teamMember.image,
      title: teamMember.title,
    };
  } catch (e) {
    console.log(e);
    throw new Error("Failed to get team member by id");
  }
}

export async function deleteTeamMember(id: string) {
  try {
    await connectToDatabase();
    await TeamMember.findByIdAndDelete(id);
    const cachedKeys = await redis.keys("teamMember?*");
    if (cachedKeys.length > 0) {
      await redis.del(cachedKeys);
    }
  } catch (e) {
    throw new Error("Failed to delete team member");
  }
}

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
  data: IBusinessProposal,
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
