"use server";

import { connectToDatabase } from "@/lib/mongoose";
import { redis } from "@/lib/redis";
import TeamMember, { ITeamMember } from "@/models/TeamMember";
import { FilterQuery } from "mongoose";

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

const TEAM_MEMBERS_PER_PAGE = 12;

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
  const total = await TeamMember.countDocuments(queryObject);
  const teamMembers = await TeamMember.find(queryObject)
    .skip(skip)
    .limit(limit)
    .exec();
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
    .expire(cacheKey, 300)
    .exec();

  return res;
}
