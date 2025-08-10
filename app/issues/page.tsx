import React from "react";
import { Button, TextField, Table, Badge } from "@radix-ui/themes";
import Link from "next/link";
import prisma from "@/prisma/client";
import { Status } from "@prisma/client";
import delay from "delay";

const IssuesPage = async () => {
  //await delay(2000);
  const issues = await prisma.issue.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
  const StatusBadge = (status: Status) => {
    if (status === "OPEN") {
      return <Badge color="red">OPEN</Badge>;
    } else if (status === "IN_PROGRESS") {
      return <Badge color="violet">IN PROGRESS</Badge>;
    } else if (status === "CLOSED") {
      return <Badge color="green">CLOSED</Badge>;
    }
  };
  return (
    <div>
      <Link href="issues/new" className="block mb-5">
        <Button>Add Issue</Button>
      </Link>
      <Table.Root variant="surface">
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
                {StatusBadge(issue.status)}
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
