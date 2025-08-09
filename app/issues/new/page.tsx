"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { Button, TextField, TextArea, Callout } from "@radix-ui/themes";
import { useRouter } from "next/navigation";

interface IssueForm {
  title: string;
  description: string;
}

const NewIssuePage = () => {
  const [errorMessege, setErrorMessege] = useState<string | null>(null);
  const router = useRouter();
  const { register, handleSubmit } = useForm<IssueForm>();

  return (
    <form
      className="max-w-xl space-y-3"
      onSubmit={handleSubmit(async (data) => {
        try {
          setErrorMessege(null);
          await axios.post("/api/issues", data);
          router.push("/issues");
        } catch (error) {
          setErrorMessege("Fill the title and description properly");
        }
      })}
    >
      <TextField.Root placeholder="Title" {...register("title")} />

      <TextArea placeholder="Description" {...register("description")} />

      <Button>Submit New Issue</Button>
      {errorMessege && (
        <Callout.Root color="red" role="alert">
          <Callout.Text>{errorMessege}</Callout.Text>
        </Callout.Root>
      )}
    </form>
  );
};

export default NewIssuePage;
