"use server";

import { connectToDatabase } from "@/lib/mongoose";
import TeamMember, { ITeamMember, TeamMemberType } from "@/models/TeamMember";
import { FilterQuery } from "mongoose";

export async function createTeamMember(data: TeamMemberType) {
  try {
    await connectToDatabase();
    const { name, email, image, title } = data;
    await TeamMember.create({ name, email, image, title });
  } catch (e) {
    throw new Error("Failed to create team member");
  }
}

const TEAM_MEMBERS_PER_PAGE = 12;

export async function fetchTeamMembers(
  query: string = "",
  currentPage: number = 1
) {
  let queryObject: FilterQuery<ITeamMember> = {};

  if (query) {
    queryObject = {
      $or: [{ name: { $search: query } }, { title: { $search: query } }],
    };
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
      image: member.image, // Assuming `image` is a URL or base64 string
    })),
    totalPages: Math.ceil(total / TEAM_MEMBERS_PER_PAGE),
  };

  return res;
}
