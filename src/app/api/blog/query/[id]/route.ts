import { connectToDatabase } from "@/lib/mongoose";
import Blog from "@/models/Blog";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  _: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectToDatabase();

    const { id } = params;

    const blog = await Blog.findById(id);

    if (!blog) {
      return NextResponse.json({ message: "Blog not found" }, { status: 404 });
    }

    return NextResponse.json(blog);
  } catch (e) {
    console.log(e);
    return NextResponse.json(
      { message: "Failed to fetch blog" },
      { status: 500 }
    );
  }
}
