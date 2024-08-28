import { CACHE_KEY_EXPIRY_TIME } from "@/constants/actions";
import { connectToDatabase } from "@/lib/mongoose";
import { redis } from "@/lib/redis";
import Blog from "@/models/Blog";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";
import { parse } from "node-html-parser";

export async function POST(req: NextRequest) {
  try {
    await connectToDatabase();

    const body = await req.json();
    const cacheKey = body.featured ? "blog?featured" : "blog";

    const cachedValue = await redis.get(cacheKey);
    if (cachedValue) {
      return NextResponse.json(JSON.parse(cachedValue));
    }

    let blogs;
    if (body.featured) {
      blogs = await Blog.find({ featured: true });
    } else {
      blogs = await Blog.find();
    }

    const blogData = await Promise.all(
      blogs.map(async (blog) => {
        const url = blog.mediumUrl;

        const res = await axios.get(url);
        const html = res.data;
        const root = parse(html);

        const coverImage = root
          .querySelector('meta[property="og:image"]')
          ?.getAttribute("content");

        const title = root
          .querySelector('meta[property="og:title"]')
          ?.getAttribute("content");

        const subtitle = root
          .querySelector('meta[property="og:description"]')
          ?.getAttribute("content");

        const readingTime = root
          .querySelector('meta[name="twitter:data1"]')
          ?.getAttribute("content");

        const dateUploaded = new Date(
          root
            .querySelector('meta[property="article:published_time"]')!
            .getAttribute("content")
            ?.split("T")[0]!
        ).toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
          day: "numeric",
        });

        return {
          coverImage,
          title,
          subtitle,
          readingTime,
          dateUploaded,
          mediumUrl: blog.mediumUrl,
          featured: blog.featured,
        };
      })
    );

    await redis
      .pipeline()
      .set(cacheKey, JSON.stringify(blogData))
      .expire(cacheKey, CACHE_KEY_EXPIRY_TIME)
      .exec();

    return NextResponse.json(blogData);
  } catch (e) {
    console.log(e);
    return NextResponse.json(
      { message: "Failed to fetch blog data" },
      { status: 500 }
    );
  }
}
