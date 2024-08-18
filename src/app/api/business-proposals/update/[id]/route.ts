import { connectToDatabase } from "@/lib/mongoose";
import { redis } from "@/lib/redis";
import BusinessProposal from "@/models/BusinessProposal";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    await connectToDatabase();

    const { id } = params;

    const body = await request.json();

    await BusinessProposal.findByIdAndUpdate(id, body);

    await redis.del([`businessProposal:${id}`, "businessProposal"]);

    return NextResponse.json("Success");
  } catch (e) {
    return NextResponse.json(
      { message: "Failed to update team member" },
      { status: 500 },
    );
  }
}
