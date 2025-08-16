import prisma from "@/prisma/client";
import { Table, Card, Box, Button, DropdownMenu } from "@radix-ui/themes";
import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import StatusBadge from "@/app/components/statusBadge";
import DeleteButton from "./deleteButton";
import IssueImage from "./issueImage"; 
import { CldImage } from "next-cloudinary";
import delay from "delay";

interface Props {
  params: { id: string };
}

const IssueDetailPage = async ({ params }: Props) => {
  const { id } = params;
  await delay(2000);
  const selectedIssue = await prisma.issue.findUnique({
    where: { id: parseInt(id) },
  });

  if (!selectedIssue) notFound();

  return (
    <Box>
      <div className="max-w-2xl p-4">
        <h1 className="text-xl font-bold mb-6">Issue Details:</h1>
        <Table.Root variant="ghost" className="w-full">
          <Table.Body>
            <Table.Row>
              <Table.Cell>Title</Table.Cell>
              <Table.Cell>{selectedIssue.title}</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>Status</Table.Cell>
              <Table.Cell>
                <StatusBadge status={selectedIssue.status} />
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>Created At</Table.Cell>
              <Table.Cell>{selectedIssue.createdAt.toDateString()}</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>Updated At</Table.Cell>
              <Table.Cell>{selectedIssue.updatedAt.toDateString()}</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>Description</Table.Cell>
              <Table.Cell>
                <Card className="prose">
                  <ReactMarkdown>{selectedIssue.description}</ReactMarkdown>
                </Card>
              </Table.Cell>
            </Table.Row>

            {selectedIssue.imageUrl && (
              <Table.Row>
                <Table.Cell>Image</Table.Cell>
                <Table.Cell>
                  <CldImage
                    src={selectedIssue.imageUrl}
                    width={400}
                    height={300}
                    alt="Issue Image"
                    className="rounded-lg"
                  />
                </Table.Cell>
              </Table.Row>
            )}
          </Table.Body>
        </Table.Root>

        <div className="mt-6 flex gap-4">
          <Button variant="surface">
            <Link href={`/issues/detail/${selectedIssue.id}/edit`}>
              Edit Issue
            </Link>
          </Button>
          <DeleteButton issueId={selectedIssue.id} />
          
        </div>
      </div>
    </Box>
  );
};

export default IssueDetailPage;
