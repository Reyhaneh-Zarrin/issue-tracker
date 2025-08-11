import prisma from "@/prisma/client";
import { Table, Card, Box, Grid, Button } from "@radix-ui/themes";
import delay from "delay";
import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";

interface Props {
  params: Promise<{ id: string }>;
}

const IssueDetailPage = async ({ params }: Props) => {
  //await delay(2000);
  const { id } = await params;

  const selectedIssue = await prisma.issue.findUnique({
    where: { id: parseInt(id) },
  });

  if (!selectedIssue) {
    notFound();
  }

  return (
    <Box>
      <div className="max-w-2xl mx-auto mt-10 p-4">
        <h1 className="text-2xl font-bold mb-6">Issue Details</h1>
        {/* <Grid columns={{ initial: "1", md: "2" }} gap="4"> */}
        <Table.Root variant="surface" className="w-full">
          <thead>
            <tr>
              <th className="text-left font-semibold px-4 py-2 bg-gray-100">
                Field
              </th>
              <th className="text-left font-semibold px-4 py-2 bg-gray-100">
                Value
              </th>
            </tr>
          </thead>
          <Table.Body>
            <Table.Row>
              <Table.Cell>Title</Table.Cell>
              <Table.Cell>{selectedIssue.title}</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>Status</Table.Cell>
              <Table.Cell>{selectedIssue.status}</Table.Cell>
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
          </Table.Body>
        </Table.Root>
        <div className="mt-6">
          <Button>
            <Link href={`/issues/detail/${selectedIssue.id}/edit`}>Edit Issue</Link>
          </Button>
        </div>
        {/* </Grid> */}
      </div>
    </Box>
  );
};
export default IssueDetailPage;
