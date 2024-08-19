import { connectToDatabase } from "@/lib/mongoose";
import { redis } from "@/lib/redis";
import BusinessProposal from "@/models/BusinessProposal";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
  _: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectToDatabase();

    const { id } = params;

    await Promise.all([
      BusinessProposal.findByIdAndDelete(id),
      redis.del([`businessProposal:${id}`, "businessProposal"]),
    ]);

    return NextResponse.json("Success");
  } catch (e) {
    return NextResponse.json(
      { message: "Failed to delete business proposal" },
      { status: 500 }
    );
  }
}
