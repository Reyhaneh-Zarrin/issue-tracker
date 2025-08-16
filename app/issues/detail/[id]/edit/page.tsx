"use client";
import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";
import "easymde/dist/easymde.min.css";
import StatusButton from "./statusButton";
import {
  Button,
  TextField,
  Callout,
  Spinner,
  Flex,
} from "@radix-ui/themes";
import dynamic from "next/dynamic";

const SimpleMDE = dynamic(() => import("react-simplemde-editor"), {
  ssr: false,
});
interface IssueForm {
  title: string;
  description: string;
}

const EditIssue = ({ params }: { params: Promise<{ id: string }> }) => {
  const actualParams = React.use(params);
  const id = actualParams.id;
  const [showTitleField, setShowTitleField] = useState(false);
  const [errorMessege, setErrorMessege] = useState<string | null>(null);
  const [isSubmitting, setSubmitting] = useState<boolean>(false);

  const { register, handleSubmit, control, reset } = useForm<IssueForm>({
    defaultValues: { title: "", description: "" },
  });
  const router = useRouter();

  useEffect(() => {
    axios
      .get(`/api/issues/${id}`)
      .then((res) => {
        reset({
          title: res.data.title,
          description: res.data.description,
        });
        setShowTitleField(true);
      })

      .catch(() => {
        setErrorMessege("Failed to load issue data");
      });
  }, [id, reset]);

  const submit = handleSubmit(async (data) => {
    try {
      setSubmitting(true);
      setErrorMessege(null);
      await axios.patch("/api/issues/" + id, data);
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

      {showTitleField && (
        <TextField.Root placeholder="Title" {...register("title")} />
      )}
      <Controller
        name="description"
        control={control}
        render={({ field }) => (
          <SimpleMDE placeholder="Description" {...field} />
        )}
      />
      <Flex gap="3">
        <StatusButton issueId={parseInt(id)} />
        <Button disabled={isSubmitting}>
          Update Issue{isSubmitting && <Spinner />}
        </Button>
      </Flex>
    </form>
  );
};

export default EditIssue;
