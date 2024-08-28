"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import PageCenteringWrapper from "@/wrappers/pageCenteringWrapper";
import Loading from "./loading";

interface BlogSectionType {
  coverImage: string;
  title: string;
  subtitle: string;
  readingTime: string;
  dateUploaded: string;
  featured: boolean;
}

export default function BlogSection({ featured }: { featured: boolean }) {
  const [blogs, setBlogs] = useState<BlogSectionType[] | null>(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await axios.post("/api/blog/query", {
          featured: featured,
        });
        setBlogs(res.data as BlogSectionType[]);
      } catch (e) {
        console.error("Error fetching blogs:", e);
      }
    };

    fetchBlogs();
  }, [featured]);

  if (!blogs) {
    return (
      <PageCenteringWrapper>
        <Loading />
      </PageCenteringWrapper>
    );
  }

  return (
    <section className="py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex justify-center gap-y-8 lg:gap-y-0 flex-wrap md:flex-wrap lg:flex-nowrap lg:flex-row lg:justify-between lg:gap-x-8">
          {blogs.map((blog, index) => (
            <div
              key={index}
              className="group w-full max-lg:max-w-xl lg:w-1/3 border border-gray-300 rounded-2xl"
            >
              <div className="flex items-center">
                <img
                  src={blog.coverImage}
                  alt={blog.title}
                  className="rounded-t-2xl w-full"
                />
              </div>
              <div className="p-4 lg:p-6 transition-all duration-300 rounded-b-2xl group-hover:bg-gray-50">
                <span className="text-ennovate-main font-medium mb-3 block">
                  {blog.dateUploaded}
                </span>
                <h4 className="text-xl text-gray-900 font-medium leading-8 mb-2">
                  {blog.title}
                </h4>
                <p className="text-gray-500 leading-6 mb-4">{blog.subtitle}</p>
                <p className="text-lg text-ennovate-main font-semibold">
                  Read more..
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
