import { connectToDatabase } from "@/lib/mongoose";
import { redis } from "@/lib/redis";
import TeamMember from "@/models/TeamMember";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    await connectToDatabase();

    const { id } = params;

    const body = await request.json();

    await TeamMember.findByIdAndUpdate(id, body);

    const cachedKeys = await redis.keys("teamMember?*");

    if (cachedKeys.length > 0) {
      await redis.del(cachedKeys);
    }

    return NextResponse.json("Success");
  } catch (e) {
    return NextResponse.json(
      { message: "Failed to update team member" },
      { status: 500 },
    );
  }
}
