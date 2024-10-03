import { connectToDatabase } from "@/lib/mongoose";
import { redis } from "@/lib/redis";
import BusinessWorkshop from "@/models/BusinessWorkshop";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    await connectToDatabase();

    const { name, date, slides, worksheet } = await request.json();

    await BusinessWorkshop.create({ name, date, slides, worksheet });

    await redis.del(["businessWorkshop"]);

    return NextResponse.json("Success");
  } catch (e) {
    return NextResponse.json(
      { message: "Failed to create business proposal" },
      { status: 500 }
    );
  }
}
