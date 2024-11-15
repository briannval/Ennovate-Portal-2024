import { connectToDatabase } from "@/lib/mongoose";
import { redis } from "@/lib/redis";
import TeamMember from "@/models/TeamMember";
import { captureMessage } from "@sentry/nextjs";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
  _: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    await connectToDatabase();

    const { id } = params;

    await TeamMember.findByIdAndDelete(id);

    const cachedKeys = await redis.keys("teamMember?*");

    if (cachedKeys.length > 0) {
      await redis.del(cachedKeys);
    }

    captureMessage(`Deleted team member ${id}`, "info");

    return NextResponse.json("Success");
  } catch (e) {
    return NextResponse.json(
      { message: "Failed to delete team member" },
      { status: 500 },
    );
  }
}
