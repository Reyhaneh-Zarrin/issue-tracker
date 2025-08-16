"use client";
import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import { Button, TextField, Callout, Spinner, TextArea } from "@radix-ui/themes";
import { useRouter } from "next/navigation";
 import "easymde/dist/easymde.min.css";
import ImageUpload from "./uploadImage";
const SimpleMDE = dynamic(() => import("react-simplemde-editor"), {
  ssr: false,
});

import dynamic from "next/dynamic";
interface IssueForm {
  title: string;
  description: string;
  imageUrl?: string;
}

const NewIssuePage = () => {
  const [errorMessege, setErrorMessege] = useState<string | null>(null);
  const [isSubmitting, setSubmitting] = useState<boolean>(false);

  const router = useRouter();
  const { register, handleSubmit, control, setValue } = useForm<IssueForm>();

  const submit = handleSubmit(async (data) => {
    if (!data.title?.trim() || !data.description?.trim()) {
      setErrorMessege("Please fill in both title and description");
      return;
    }

    try {
      setSubmitting(true);
      setErrorMessege(null);
      await axios.post("/api/issues", data);
      router.push("/issues");
    } catch (error) {
      setSubmitting(false);
      setErrorMessege("Something went wrong while creating the issue");
    }
  });

  return (
    <form className="max-w-xl space-y-3" onSubmit={submit}>
      {errorMessege && (
        <Callout.Root color="red" role="alert" className="mb-4">
          <Callout.Text>{errorMessege}</Callout.Text>
        </Callout.Root>
      )}

      <TextField.Root placeholder="Title" {...register("title")} />

      <Controller
        name="description"
        control={control}
        render={({ field }) => (
          <SimpleMDE
            value={field.value}
            onChange={field.onChange}
            placeholder="Description"
          />
        )}

      />
      {/* <TextArea placeholder="Description" {...register("description")} /> */}

      <ImageUpload
        onUploadComplete={(url) =>
          setValue("imageUrl", url, { shouldValidate: true, shouldDirty: true })
        }
      />

      <Button variant="surface" disabled={isSubmitting}>
        Submit New Issue {isSubmitting && <Spinner />}
      </Button>
    </form>
  );
};

export default NewIssuePage;
