"use client";

import { useState, useEffect, useReducer } from "react";
import axios from "axios";
import PageCenteringWrapper from "@/wrappers/pageCenteringWrapper";
import Loading from "../loading/loading";
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

interface BlogSectionState {
  toDelete: boolean;
  isDeleting: boolean;
  blogToDelete: string | null;
}

type BlogSectionAction =
  | { type: "OPEN_DELETE_MODAL"; payload: string }
  | { type: "CLOSE_DELETE_MODAL" }
  | { type: "DELETING_BLOG" }
  | { type: "DELETED_BLOG" };

const initialState: BlogSectionState = {
  toDelete: false,
  isDeleting: false,
  blogToDelete: null,
};

const blogSectionReducer = (
  state: BlogSectionState,
  action: BlogSectionAction
): BlogSectionState => {
  switch (action.type) {
    case "OPEN_DELETE_MODAL":
      return { ...state, toDelete: true, blogToDelete: action.payload };
    case "CLOSE_DELETE_MODAL":
      return { ...state, toDelete: false, blogToDelete: null };
    case "DELETING_BLOG":
      return { ...state, isDeleting: true };
    case "DELETED_BLOG":
      return {
        ...state,
        isDeleting: false,
        toDelete: false,
        blogToDelete: null,
      };
    default:
      return state;
  }
};

export default function BlogSection({ featured }: { featured: boolean }) {
  const [blogs, setBlogs] = useState<BlogSectionType[] | null>(null);
  const { isAuthenticated } = useAuth();
  const [state, dispatch] = useReducer(blogSectionReducer, initialState);
  const { toDelete, isDeleting, blogToDelete } = state;

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

  const handleDelete = async () => {
    if (!blogToDelete) return;

    try {
      dispatch({ type: "DELETING_BLOG" });
      await axios.delete(`/api/blog/delete/${blogToDelete}`);
      dispatch({ type: "DELETED_BLOG" });
      setBlogs(blogs?.filter((blog) => blog.id !== blogToDelete) || null);
    } catch (e) {
      console.error("Error deleting blog:", e);
      dispatch({ type: "DELETED_BLOG" });
    }
  };

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
              className={`group border border-gray-300 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300`}
            >
              <Link href={blog.mediumUrl} target="_blank">
                <img
                  src={blog.coverImage}
                  alt={blog.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4 lg:p-6 bg-white">
                  <span className="text-ennovate-main text-lg font-semibold mb-3 block">
                    {blog.dateUploaded}
                  </span>
                  <h4 className="text-xl text-gray-900 font-semibold leading-8 mb-2">
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
              {!featured && isAuthenticated && (
                <div className="px-4 lg:px-6 bg-white mb-4">
                  <Link
                    href={`/admin/blog?update=${blog.id}`}
                    className="inline-flex items-center px-3 py-2 text-md font-medium text-center text-white bg-ennovate-main rounded-lg hover:bg-ennovate-dark-blue"
                  >
                    Update
                  </Link>
                  <button
                    onClick={() =>
                      dispatch({ type: "OPEN_DELETE_MODAL", payload: blog.id })
                    }
                    className="inline-flex items-center px-3 py-2 text-md font-medium text-center text-white bg-ennovate-main rounded-lg hover:bg-ennovate-dark-blue ml-2"
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Confirm delete modal */}
      {toDelete && (
        <div className="fixed inset-0 flex justify-center items-center w-full h-full z-50 bg-black bg-opacity-50">
          <div className="relative bg-white rounded-xl shadow p-8">
            <button
              type="button"
              className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center"
              onClick={() => dispatch({ type: "CLOSE_DELETE_MODAL" })}
            >
              <svg
                className="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
            </button>
            <div className="p-4 md:p-5 text-center">
              <svg
                className="mx-auto mb-4 text-ennovate-dark-blue w-12 h-12"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
              <h3 className="mb-5 text-xl font-bold text-ennovate-dark-blue">
                Remove this blog?
              </h3>
              <button
                type="button"
                className="text-white bg-ennovate-main hover:bg-ennovate-dark-blue font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center"
                onClick={handleDelete}
                disabled={isDeleting}
                style={{ opacity: isDeleting ? 0.7 : 1 }}
              >
                {isDeleting ? "Deleting..." : "Yes, I'm sure"}
              </button>
              <button
                type="button"
                className="py-2.5 px-5 ml-3 text-sm font-semibold text-ennovate-dark-blue bg-white rounded-lg border border-gray-200 hover:bg-gray-100"
                onClick={() => dispatch({ type: "CLOSE_DELETE_MODAL" })}
                disabled={isDeleting}
                style={{ opacity: isDeleting ? 0.7 : 1 }}
              >
                No, cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
