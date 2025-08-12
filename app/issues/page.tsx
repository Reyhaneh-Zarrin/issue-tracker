import React from "react";
import { Button, Table, Badge } from "@radix-ui/themes";
import Link from "../components/link";
import prisma from "@/prisma/client";
import { Status } from "@prisma/client";
import delay from "delay";
import StatusBadge from "../components/statusBadge";

const IssuesPage = async () => {
  //await delay(2000);
  const issues = await prisma.issue.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
// md:w-3/4 p-4
  return (
    <div className="w-full ">
      <div className="block mb-5">
        <Link href="issues/new">
          <Button variant="surface">Add Issue</Button>
        </Link>
      </div>
      <Table.Root className="w-full rounded-lg border border-gray-200 shadow-[0_0_10px_2px_rgba(0,0,0,0.1)]">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>Issue</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="hidden md:table-cell">
              Status
            </Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="hidden md:table-cell">
              Created
            </Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {issues.map((issue) => (
            <Table.Row key={issue.id}>
              <Table.Cell>
                <Link href={`/issues/detail/${issue.id}`}>
                  {issue.title}
                  <div className="block md:hidden">{issue.status}</div>
                </Link>
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                <StatusBadge status={issue.status}/>
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                {issue.createdAt.toDateString()}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </div>
  );
};

export default IssuesPage;
