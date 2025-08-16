import { NextResponse } from "next/server";
import prisma from "@/prisma/client";

export async function GET() {
  const openCount = await prisma.issue.count({ where: { status: "OPEN" } });
  const closedCount = await prisma.issue.count({ where: { status: "CLOSED" } });
  const inProgressCount = await prisma.issue.count({ where: { status: "IN_PROGRESS" } });

  const todayStart = new Date();
  todayStart.setHours(0, 0, 0, 0);

  const todayCount = await prisma.issue.count({
    where: {
      OR: [
        { createdAt: { gte: todayStart } },
        { updatedAt: { gte: todayStart } },
      ],
    },
  });

  return NextResponse.json({
    openCount,
    closedCount,
    inProgressCount,
    todayCount,
  });
}
