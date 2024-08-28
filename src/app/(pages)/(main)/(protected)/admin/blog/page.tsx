"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const blogSchema = z.object({
  mediumUrl: z.string().url("Invalid Medium URL"),
});

type BlogFormData = z.infer<typeof blogSchema>;

export default function AdminBlog() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const searchParams = useSearchParams();
  const updateId: string = searchParams.get("update") || "";

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<BlogFormData>({
    resolver: zodResolver(blogSchema),
  });

  useEffect(() => {
    const setUpdateDefault = async () => {
      if (updateId) {
        const res = await axios.get(`/api/blogs/query/${updateId}`);
        const blog = res.data;

        reset({
          mediumUrl: blog.mediumUrl,
        });
      }
    };

    setUpdateDefault();
  }, [updateId, reset]);

  const onSubmit = async (data: BlogFormData) => {
    // Submission logic will go here
  };

  return (
    <div className="h-full flex items-center justify-center bg-white m-8">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-xl w-full bg-white p-8 border-2 border-ennovate-gray shadow-xl rounded-lg"
      >
        <p className="mt-2 text-4xl text-center font-extrabold tracking-tight text-ennovate-dark-blue sm:text-5xl mb-6">
          {updateId ? "Update Blog" : "Register Blog"}
        </p>
        <div className="mb-5">
          <label
            htmlFor="mediumUrl"
            className="block mb-2 text-lg font-bold text-ennovate-dark-blue"
          >
            Medium URL
          </label>
          <input
            type="url"
            id="mediumUrl"
            {...register("mediumUrl")}
            className={`bg-white border ${
              errors.mediumUrl ? "border-red-500" : "border-ennovate-gray"
            } text-ennovate-main text-sm rounded-md focus:ring-blue-500 focus:border-ennovate-main block w-full p-2.5`}
            placeholder="https://medium.com/@username/article"
          />
          {errors.mediumUrl && (
            <p className="text-red-500 text-sm mt-2">
              {errors.mediumUrl.message}
            </p>
          )}
        </div>
        <button
          type="submit"
          className="text-white text-lg font-bold bg-ennovate-main rounded-lg w-full px-5 py-2.5 text-center"
          style={{ opacity: isSubmitting ? 0.7 : 1 }}
          disabled={isSubmitting}
        >
          {isSubmitting
            ? updateId
              ? "Updating..."
              : "Submitting..."
            : updateId
              ? "Update"
              : "Submit"}
        </button>
      </form>
    </div>
  );
}
