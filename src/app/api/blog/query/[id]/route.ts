import axios from "axios";
import { NextRequest, NextResponse } from "next/server";
import { parse } from "node-html-parser";

export async function GET(
  _: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    const url =
      "https://medium.com/@ennovateubc/alumni-spotlight-tidal-rings-ff66d0ea2b51";

    const res = await axios.get(url);

    const html = res.data;

    const root = parse(html);

    const coverImage = root
      .querySelector('meta[property="og:image"]')!
      .getAttribute("content");

    const title = root
      .querySelector('meta[property="og:title"]')!
      .getAttribute("content");

    const subtitle = root
      .querySelector('meta[property="og:description"]')!
      .getAttribute("content");

    const readingTime = root
      .querySelector('meta[name="twitter:data1"]')!
      .getAttribute("content");

    let dateUploaded = new Date(
      root
        .querySelector('meta[property="article:published_time"]')!
        .getAttribute("content")
        ?.split("T")[0]!
    ).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

    return NextResponse.json({
      coverImage,
      title,
      subtitle,
      readingTime,
      dateUploaded,
    });
  } catch (e) {
    console.log(e);
    return NextResponse.json(
      { message: "Failed to fetch business proposal" },
      { status: 500 }
    );
  }
}
