import { connectToDatabase } from "@/lib/mongoose";
import { redis } from "@/lib/redis";
import TeamMember from "@/models/TeamMember";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    await connectToDatabase();

    const { name, email, image, title } = await request.json();

    await TeamMember.create({ name, email, image, title });

    const cachedKeys = await redis.keys("teamMember?*");

    if (cachedKeys.length > 0) {
      await redis.del(cachedKeys);
    }

    return NextResponse.json("Success");
  } catch (e) {
    return NextResponse.json(
      { message: "Failed to create team member" },
      { status: 500 }
    );
  }
}
