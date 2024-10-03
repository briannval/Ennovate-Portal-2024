"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const businessWorkshopSchema = z.object({
  name: z.string().min(1, "Name is required"),
  date: z.string().min(1, "Date is required"),
  slides: z.string().url("Invalid Google Drive link for slides"),
  worksheet: z.string().url("Invalid Google Drive link for worksheet"),
});

type BusinessWorkshopFormData = z.infer<typeof businessWorkshopSchema>;

export default function AdminBusinessWorkshop() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const searchParams = useSearchParams();
  const updateId: string = searchParams.get("update") || "";

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<BusinessWorkshopFormData>({
    resolver: zodResolver(businessWorkshopSchema),
  });

  useEffect(() => {
    const setUpdateDefault = async () => {
      if (updateId) {
        const res = await axios.get(
          `/api/business-workshops/query/${updateId}`
        );
        const businessWorkshop = res.data;

        reset({
          name: businessWorkshop.name,
          date: businessWorkshop.date,
          slides: businessWorkshop.slides,
          worksheet: businessWorkshop.worksheet,
        });
      }
    };

    setUpdateDefault();
  }, [updateId, reset]);

  const onSubmit = async (data: BusinessWorkshopFormData) => {
    try {
      setIsSubmitting(true);
      const { name, date, slides, worksheet } = data;

      const body = {
        name,
        date,
        slides,
        worksheet,
      };

      if (updateId) {
        await axios.put(`/api/business-workshops/update/${updateId}`, body);
      } else {
        await axios.post("/api/business-workshops/create", body);
      }

      setIsSubmitting(false);
      reset();

      if (updateId) {
        window.location.href = "/resources/business-workshops";
      }
    } catch (e) {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="h-full flex items-center justify-center bg-white m-8">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-xl w-full bg-white p-8 border-2 border-ennovate-gray shadow-xl rounded-lg"
      >
        <p className="mt-2 text-4xl text-center font-extrabold tracking-tight text-ennovate-dark-blue sm:text-5xl mb-6">
          {updateId ? "Update Business Workshop" : "Register Business Workshop"}
        </p>
        <div className="mb-5">
          <label
            htmlFor="name"
            className="block mb-2 text-lg font-bold text-ennovate-dark-blue"
          >
            Name
          </label>
          <input
            id="name"
            {...register("name")}
            className={`bg-white border ${
              errors.name ? "border-red-500" : "border-ennovate-gray"
            } text-ennovate-main text-sm rounded-md focus:ring-blue-500 focus:border-ennovate-main block w-full p-2.5`}
            placeholder="Ennovate UBC Workshop"
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="date"
            className="block mb-2 text-lg font-bold text-ennovate-dark-blue"
          >
            Date
          </label>
          <input
            type="date"
            id="date"
            {...register("date")}
            className={`bg-white border ${
              errors.date ? "border-red-500" : "border-ennovate-gray"
            } text-ennovate-main text-sm rounded-md focus:ring-blue-500 focus:border-ennovate-main block w-full p-2.5`}
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="slides"
            className="block mb-2 text-lg font-bold text-ennovate-dark-blue"
          >
            Slides Link
          </label>
          <input
            type="url"
            id="slides"
            {...register("slides")}
            className={`bg-white border ${
              errors.slides ? "border-red-500" : "border-ennovate-gray"
            } text-ennovate-main text-sm rounded-md focus:ring-blue-500 focus:border-ennovate-main block w-full p-2.5`}
            placeholder="https://docs.google.com/presentation/d/FILE_ID/view?usp=sharing"
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="worksheet"
            className="block mb-2 text-lg font-bold text-ennovate-dark-blue"
          >
            Worksheet Link
          </label>
          <input
            type="url"
            id="worksheet"
            {...register("worksheet")}
            className={`bg-white border ${
              errors.worksheet ? "border-red-500" : "border-ennovate-gray"
            } text-ennovate-main text-sm rounded-md focus:ring-blue-500 focus:border-ennovate-main block w-full p-2.5`}
            placeholder="https://docs.google.com/document/d/FILE_ID/view?usp=sharing"
          />
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
