import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { z } from "zod";

const createIssue = z.object({
  title: z.string().min(1).max(255),
  description: z.string().min(1),
  imageUrl: z.string().optional(), // public_id ذخیره میشه
});

export async function POST(request: NextRequest) {
  const body = await request.json();

  const parsed = createIssue.safeParse(body);
  if (!parsed.success)
    return NextResponse.json(parsed.error.errors, { status: 400 });

  const { title, description, imageUrl } = parsed.data;

  const newIssue = await prisma.issue.create({
    data: {
      title,
      description,
      imageUrl, // فقط اگر هست
    },
  });

  return NextResponse.json(newIssue, { status: 201 });
}
