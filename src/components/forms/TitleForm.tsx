"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import InputField from "../InputField";
import Image from "next/image";
import { createTitle } from "@/services/title";

const schema = z.object({
  title: z
    .string()
    .min(3, { message: "title must be a minimum of 3 characters" })
    .max(20, { message: "title must be a maximum of 20 characters" })
});

type inputs = z.infer<typeof schema>;

const TitleForm = ({
  type,
  data,
}: {
  type: "create" | "update";
  data?: any;
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<inputs>({
    resolver: zodResolver(schema),
  });
  
  const onSubmit = async (formData: any) => {
    const res = await createTitle(formData);
  }

  return (
    <form
      className="flex flex-col gap-8"
      onSubmit={handleSubmit(onSubmit)}
    >
      <h1 className="text-xl fnt-semibold">Create a new teacher</h1>
      <span className="text-sm font-medium text-gray-400">
        Title Form
      </span>
      <div className="flex justify-between flex-wrap gap-4">
        <InputField
          label="title"
          name="title"
          defaultValue={data?.title}
          register={register}
          error={errors.title}
        />
      </div>

      <button className="bg-blue-400 text-white p-2 rounded-md">
        {type === "create" ? "Create" : "Update"}
      </button>
    </form>
  );
};

export default TitleForm;
