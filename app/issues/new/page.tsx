"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { Button, TextField, TextArea, Callout, Spinner  } from "@radix-ui/themes";
import { useRouter } from "next/navigation";

interface IssueForm {
  title: string;
  description: string;
}

const NewIssuePage = () => {
  const [errorMessege, setErrorMessege] = useState<string | null>(null);
  const [isSubmitting, setSubmitting] = useState<boolean>(false);
  const router = useRouter();
  const { register, handleSubmit } = useForm<IssueForm>();

  const submit = handleSubmit(async (data) => {
    try {
      setSubmitting(true);
      setErrorMessege(null);
      await axios.post("/api/issues", data);
      router.push("/issues");
    } catch (error) {
      setSubmitting(false);
      setErrorMessege("Fill the title and description properly");
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
      <TextArea placeholder="Description" {...register("description")} />

      <Button disabled={isSubmitting}>Submit New Issue {isSubmitting &&<Spinner />}</Button>
    </form>
  );
};

export default NewIssuePage;
