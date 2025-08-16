import prisma from "@/prisma/client";
import delay from "delay";
import { NextRequest, NextResponse } from "next/server";
import React from "react";
import { z } from "zod";

const schema = z.object({
  title: z.string().min(1).max(255),
  description: z.string().min(1),
});

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(params.id) },
  });
  //fetch data from a data base
  if (!issue)
    return NextResponse.json({ error: "issue not found" }, { status: 404 });

  return NextResponse.json(issue);
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  //validate request body
  const body = await request.json();

  const validation = schema.safeParse(body);
  if (!validation.success)
    return NextResponse.json(validation.error, { status: 400 });
  // if valid fetch the user with the given id
  const issues = await prisma.issue.findUnique({
    where: {
      id: parseInt(params.id),
    },
  });

  if (!issues)
    return NextResponse.json({ error: "User not found" }, { status: 404 });

  const updatedIssue = await prisma.issue.update({
    where: { id: issues.id },
    data: { title: body.title, description: body.description},
    
  });
  return NextResponse.json(updatedIssue);
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const issue = await prisma.issue.findUnique({
    where: {
      id: parseInt(params.id),
    },
  });
  if (!issue)
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  await prisma.issue.delete({
    where: { id: issue.id },
  });
  return NextResponse.json({});
}
