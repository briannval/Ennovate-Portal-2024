import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongoose";
import TeamMember from "@/models/TeamMember";

export async function GET(
  _: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectToDatabase();

    const { id } = params;

    const teamMember = await TeamMember.findById(id);

    if (!teamMember) {
      return NextResponse.json(
        { message: "Team Member not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(teamMember);
  } catch (e) {
    return NextResponse.json(
      { message: "Failed to fetch team member" },
      { status: 500 }
    );
  }
}
