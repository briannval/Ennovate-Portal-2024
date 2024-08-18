import { connectToDatabase } from "@/lib/mongoose";
import { redis } from "@/lib/redis";
import BusinessProposal from "@/models/BusinessProposal";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    await connectToDatabase();

    const { name, description, drive, image } = await request.json();

    await BusinessProposal.create({ name, description, drive, image });

    await redis.del("businessProposal");

    return NextResponse.json("Success");
  } catch (e) {
    return NextResponse.json(
      { message: "Failed to create business proposal" },
      { status: 500 },
    );
  }
}
