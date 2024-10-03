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

    await Promise.all([
      BusinessProposal.findByIdAndUpdate(id, body),
      redis.del([`businessProposal:${id}`, "businessProposal"]),
    ]);

    return NextResponse.json("Success");
  } catch (e) {
    return NextResponse.json(
      { message: "Failed to update business proposal" },
      { status: 500 },
    );
  }
}
