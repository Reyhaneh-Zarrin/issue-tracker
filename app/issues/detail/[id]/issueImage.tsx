// IssueImage.tsx
"use client";
import { CldImage } from "next-cloudinary";

interface Props {
  publicId: string;
}

export default function IssueImage(
     { publicId }: Props
) {
  return (
    <CldImage
      src={publicId}
      width={400}
      height={300}
      alt="Issue Image"
      className="rounded-lg"
    />
  );
}
