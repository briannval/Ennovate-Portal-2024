import { connectToDatabase } from "@/lib/mongoose";
import { redis } from "@/lib/redis";
import Blog from "@/models/Blog";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    await connectToDatabase();

    const { mediumUrl, featured } = await request.json();

    await Blog.create({ mediumUrl, featured });

    await redis.del(["blog", "blog?featured"]);

    return NextResponse.json("Success");
  } catch (e) {
    return NextResponse.json(
      { message: "Failed to create business proposal" },
      { status: 500 }
    );
  }
}
