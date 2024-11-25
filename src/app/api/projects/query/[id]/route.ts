import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongoose";
import { redis } from "@/lib/redis";
import { CACHE_KEY_EXPIRY_TIME } from "@/constants/actions";
import { captureException } from "@sentry/nextjs";
import Project from "@/models/Project";

export async function GET(_: NextRequest,
  { params }: { params: { id: string } }
    ) {
  try {
    await connectToDatabase();

    const { id } = params;

    const project = await Project.findById(id).populate("businessProposal").populate("blog");

    return NextResponse.json(project);
  } catch (e) {
    captureException(e);
    return NextResponse.json(
      { message: "Failed to fetch projects" },
      { status: 500 }
    );
  }
}