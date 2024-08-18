import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongoose";
import BusinessProposal from "@/models/BusinessProposal";
import { redis } from "@/lib/redis";

export async function GET() {
  try {
    await connectToDatabase();

    const cacheKey = "businessProposal";
    const cachedValue = await redis.get(cacheKey);

    if (cachedValue) {
      return NextResponse.json(JSON.parse(cachedValue));
    }

    const businessProposals = await BusinessProposal.find({});

    return NextResponse.json(businessProposals);
  } catch (e) {
    return NextResponse.json(
      { message: "Failed to fetch business proposals" },
      { status: 500 }
    );
  }
}
