import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongoose";
import TeamMember from "@/models/TeamMember";
import { redis } from "@/lib/redis";
import { FilterQuery } from "mongoose";
import {
  CACHE_KEY_EXPIRY_TIME,
  TEAM_MEMBERS_PER_PAGE,
} from "@/constants/actions";

export async function POST(request: NextRequest) {
  try {
    const { query = "", currentPage = 1 } = await request.json();

    await connectToDatabase();

    let queryObject: FilterQuery<typeof TeamMember> = {};
    const cacheKey = `teamMember?currentPage=${currentPage}&query=${query}`;

    const cachedValue = await redis.get(cacheKey);

    if (cachedValue) {
      return NextResponse.json(JSON.parse(cachedValue));
    }

    if (query) {
      queryObject.$text = { $search: query };
    }

    const skip = (currentPage - 1) * TEAM_MEMBERS_PER_PAGE;
    const limit = TEAM_MEMBERS_PER_PAGE;

    const [total, teamMembers] = await Promise.all([
      TeamMember.countDocuments(queryObject),
      TeamMember.find(queryObject).skip(skip).limit(limit).exec(),
    ]);

    const res = {
      teamMembers: teamMembers,
      totalPages: Math.ceil(total / TEAM_MEMBERS_PER_PAGE),
    };
    console.log(res);

    await redis
      .pipeline()
      .set(cacheKey, JSON.stringify(res))
      .expire(cacheKey, CACHE_KEY_EXPIRY_TIME)
      .exec();

    return NextResponse.json(res);
  } catch (e) {
    return NextResponse.json(
      { message: "Failed to fetch team members" },
      { status: 500 },
    );
  }
}
