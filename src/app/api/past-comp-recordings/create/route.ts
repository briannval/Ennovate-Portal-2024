import { connectToDatabase } from "@/lib/mongoose";
import PastCompRecording from "@/models/PastCompRecording";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        await connectToDatabase();

        const { title, month, videoUrl } = await request.json();

        await PastCompRecording.create({ title, month, videoUrl });

        return NextResponse.json("Success");
    } catch (e) {
        return NextResponse.json(
        { message: "Failed to create past comp recording" },
        { status: 500 }
        );
    }
}