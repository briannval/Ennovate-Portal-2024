"use client";

import { createTeamMember } from "@/actions/db";
import { storage } from "@/lib/firebase";
import { getImageExtensionFromBase64, urlizeString } from "@/utils/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { useForm } from "react-hook-form";
import { z } from "zod";

const teamMemberSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  title: z.string().min(1, "Title is required"),
  image: z.string().min(1, "Image is required"),
});

type TeamMemberFormData = z.infer<typeof teamMemberSchema>;

export default function Comp() {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<TeamMemberFormData>({
    resolver: zodResolver(teamMemberSchema),
  });

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const reader = new FileReader();
      reader.onload = () => {
        const base64 = reader.result as string;
        setValue("image", base64, { shouldValidate: true });
        setImagePreview(base64);
      };
      reader.readAsDataURL(acceptedFiles[acceptedFiles.length - 1]);
    },
    [setValue]
  );

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  const onSubmit = async (data: TeamMemberFormData) => {
    try {
      setIsSubmitting(true);
      const { name, email, title, image } = data;
      const urlizedName = urlizeString(name);
      const fileExtension = getImageExtensionFromBase64(image);
      const imagePath = `team-members/${urlizedName}.${fileExtension}`;
      const storageRef = ref(storage, imagePath);
      await uploadString(storageRef, image, "data_url");
      const imageUrl = await getDownloadURL(storageRef);
      await createTeamMember({
        name: name,
        email: email,
        title: title,
        image: imageUrl,
      });
      setIsSubmitting(false);
    } catch (e) {
      console.log(e);
      setIsSubmitting(false);
    }
  };

  const CameraIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="30"
      height="30"
      fill="gray"
      className="bi bi-camera-fill"
      viewBox="0 0 16 16"
    >
      <path d="M10.5 8.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0" />
      <path d="M2 4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-1.172a2 2 0 0 1-1.414-.586l-.828-.828A2 2 0 0 0 9.172 2H6.828a2 2 0 0 0-1.414.586l-.828.828A2 2 0 0 1 3.172 4zm.5 2a.5.5 0 1 1 0-1 .5.5 0 0 1 0 1m9 2.5a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0" />
    </svg>
  );

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-xl mx-auto p-8">
      <div className="mb-5">
        <label
          htmlFor="name"
          className="block mb-2 text-lg font-bold text-ennovate-dark-blue dark:text-white"
        >
          Member Name
        </label>
        <input
          id="name"
          {...register("name")}
          className={`bg-white border ${
            errors.name ? "border-red-500" : "border-ennovate-gray"
          } text-ennovate-main text-sm rounded-md focus:ring-blue-500 focus:border-ennovate-main block w-full p-2.5`}
          placeholder="Ennovate Member"
        />
      </div>
      <div className="mb-5">
        <label
          htmlFor="email"
          className="block mb-2 text-lg font-bold text-ennovate-dark-blue dark:text-white"
        >
          Member Email
        </label>
        <input
          type="email"
          id="email"
          {...register("email")}
          className={`bg-white border ${
            errors.email ? "border-red-500" : "border-ennovate-gray"
          } text-ennovate-main text-sm rounded-md focus:ring-blue-500 focus:border-ennovate-main block w-full p-2.5`}
          placeholder="ennovateteam@gmail.com"
        />
      </div>
      <div className="mb-5">
        <label
          htmlFor="title"
          className="block mb-2 text-lg font-bold text-ennovate-dark-blue dark:text-white"
        >
          Member Title
        </label>
        <input
          id="title"
          {...register("title")}
          className={`bg-white border ${
            errors.title ? "border-red-500" : "border-ennovate-gray"
          } text-ennovate-main text-sm rounded-md focus:ring-blue-500 focus:border-ennovate-main block w-full p-2.5`}
          placeholder="Project Director"
        />
      </div>
      <div className="mb-5">
        <label
          htmlFor="image"
          className="block mb-2 text-lg font-bold text-ennovate-dark-blue dark:text-white"
        >
          Member Image
        </label>
        <div
          {...getRootProps()}
          className={`bg-white border ${
            errors.image ? "border-red-500" : "border-ennovate-gray"
          } text-ennovate-main text-sm rounded-md focus:ring-blue-500 focus:border-ennovate-main block w-full h-64 flex items-center justify-center cursor-pointer`}
        >
          <input {...getInputProps()} />
          {imagePreview ? (
            <img
              src={imagePreview}
              alt="Preview"
              className="h-full w-full object-contain rounded-md"
            />
          ) : (
            <CameraIcon />
          )}
        </div>
      </div>
      <button
        type="submit"
        className="text-white text-lg font-bold bg-ennovate-main rounded-lg w-full px-5 py-2.5 text-center"
        style={{ opacity: isSubmitting ? 0.7 : 1 }}
        disabled={isSubmitting}
      >
        {isSubmitting ? "Submitting..." : "Submit"}
      </button>
    </form>
  );
}
