"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import PageCenteringWrapper from "@/wrappers/pageCenteringWrapper";
import Loading from "./loading";
import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";

interface BlogSectionType {
  coverImage: string;
  title: string;
  subtitle: string;
  readingTime: string;
  dateUploaded: string;
  mediumUrl: string;
  featured: boolean;
  id: string;
}

export default function BlogSection({ featured }: { featured: boolean }) {
  const [blogs, setBlogs] = useState<BlogSectionType[] | null>(null);
  const { isAuthenticated } = useAuth();

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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((blog, index) => (
            <div
              key={index}
              className={`group border border-gray-300 h-[${
                isAuthenticated ? "475px" : "425px"
              }] rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300`}
            >
              <Link href={blog.mediumUrl} target="_blank">
                <img
                  src={blog.coverImage}
                  alt={blog.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4 lg:p-6 bg-white">
                  <span className="text-ennovate-main text-lg font-medium mb-3 block">
                    {blog.dateUploaded}
                  </span>
                  <h4 className="text-xl text-gray-900 font-medium leading-8 mb-2">
                    {blog.title}
                  </h4>
                  <p className="text-gray-500 leading-6 mb-4">
                    {blog.subtitle}
                  </p>
                  <p className="text-lg text-ennovate-main font-semibold">
                    {blog.readingTime}
                  </p>
                </div>
              </Link>
              {isAuthenticated && (
                <div className="px-4 lg:px-6 bg-white">
                  <Link
                    href={`/admin/blog?update=${blog.id}`}
                    className="inline-flex items-center px-3 py-2 text-md font-medium text-center text-white bg-ennovate-main rounded-lg hover:bg-ennovate-dark-blue"
                  >
                    Update
                  </Link>
                  <Link
                    href={"#"}
                    className="inline-flex items-center px-3 py-2 text-md font-medium text-center text-white bg-ennovate-main rounded-lg hover:bg-ennovate-dark-blue ml-2"
                  >
                    Delete
                  </Link>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
