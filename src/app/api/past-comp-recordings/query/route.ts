import { connectToDatabase } from "@/lib/mongoose";
import PastCompRecording from "@/models/PastCompRecording";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        await connectToDatabase();

        const pastCompRecordings = await PastCompRecording.find({});

        return NextResponse.json(pastCompRecordings);
    } catch (e) {
        console.log(e);
        return NextResponse.json(
        { message: "Failed to fetch past comp recordings" },
        { status: 500 }
        );
    }
}