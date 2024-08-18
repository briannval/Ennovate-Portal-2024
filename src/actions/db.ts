"use server";

import {
  CACHE_KEY_EXPIRY_TIME,
  TEAM_MEMBERS_PER_PAGE,
} from "@/constants/actions";
import { connectToDatabase } from "@/lib/mongoose";
import { redis } from "@/lib/redis";
import BusinessProposal, { IBusinessProposal } from "@/models/BusinessProposal";
import TeamMember, { ITeamMember } from "@/models/TeamMember";
import { FilterQuery } from "mongoose";

async function resetTeamMemberCache() {
  const cachedKeys = await redis.keys("teamMember?*");
  if (cachedKeys.length > 0) {
    await redis.del(cachedKeys);
  }
}

export async function fetchTeamMembers(
  query: string = "",
  currentPage: number = 1
) {
  await connectToDatabase();
  let queryObject: FilterQuery<ITeamMember> = {};

  const cacheKey = `teamMember?currentPage=${currentPage}&query=${query}`;

  const cachedValue = await redis.get(cacheKey);

  if (cachedValue) {
    return JSON.parse(cachedValue);
  }

  if (query) {
    queryObject.$text = { $search: query };
  }

  const skip = (currentPage - 1) * TEAM_MEMBERS_PER_PAGE;
  const limit = TEAM_MEMBERS_PER_PAGE;
  const [total, teamMembers] = await Promise.all([
    await TeamMember.countDocuments(queryObject),
    await TeamMember.find(queryObject).skip(skip).limit(limit).exec(),
  ]); // independent operations

  const res = {
    teamMembers: teamMembers.map((member) => ({
      id: member._id.toString(),
      name: member.name,
      email: member.email,
      title: member.title,
      image: member.image,
    })),
    totalPages: Math.ceil(total / TEAM_MEMBERS_PER_PAGE),
  };

  await redis
    .pipeline()
    .set(cacheKey, JSON.stringify(res))
    .expire(cacheKey, CACHE_KEY_EXPIRY_TIME)
    .exec();

  return res;
}

export async function createTeamMember(data: ITeamMember) {
  try {
    await connectToDatabase();
    const { name, email, image, title } = data;
    await TeamMember.create({ name, email, image, title });
    await resetTeamMemberCache(); // sequential
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

export async function getTeamMemberId(data: ITeamMember) {
  try {
    await connectToDatabase();
    const { name, email, image, title } = data;
    const teamMember = await TeamMember.findOne({ name, email, image, title });
    if (!teamMember) {
      throw new Error("No such team member");
    }
    return teamMember._id.toString();
  } catch (e) {
    throw new Error("An unexpected error occured");
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

export async function getBusinessProposalById(id: string) {
  try {
    await connectToDatabase();
    const businessProposal = await BusinessProposal.findById(id);
    if (!businessProposal) {
      throw new Error("Invalid id");
    }
    return {
      name: businessProposal.name,
      drive: businessProposal.drive,
      description: businessProposal.description,
      image: businessProposal.image,
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
    await resetTeamMemberCache(); // sequential
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
