import { Table, Skeleton, Box, Card, Button, Grid } from "@radix-ui/themes";
import React from "react";
import ReactMarkdown from "react-markdown";

const loadingDetailPage = () => {
  return (
    
     <Box>
      <div className="max-w-2xl p-4">
        <h1 className="text-xl font-bold mb-6">Issue Details:</h1>
        <Table.Root variant="ghost" className="w-full">
          <Table.Body>
            <Table.Row>
              <Table.Cell>Title</Table.Cell>
              <Table.Cell><Skeleton /></Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>Status</Table.Cell>
              <Table.Cell>
                <Skeleton />
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>Created At</Table.Cell>
              <Table.Cell><Skeleton /></Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>Updated At</Table.Cell>
              <Table.Cell><Skeleton /></Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>Description</Table.Cell>
              <Table.Cell>
                <Card className="prose">
                  <Skeleton />
                </Card>
              </Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table.Root>

        <div className="mt-6 flex gap-4">
          <Button variant="surface">
              Edit Issue
          </Button>
           <Button color="red" variant="surface" >
            Delete Issue
          </Button>
        </div>
      </div>
    </Box>
  );
};

export default loadingDetailPage;
