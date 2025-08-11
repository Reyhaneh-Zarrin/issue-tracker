import { Table, Skeleton, Box, Card, Button, Grid } from "@radix-ui/themes";
import React from "react";
import ReactMarkdown from "react-markdown";

const loadingDetailPage = () => {
  return (
    <Box >
      <div className="max-w-2xl mx-auto mt-10 p-4">
        <h1 className="text-2xl font-bold mb-6">Issue Details</h1>
         {/* <Grid columns={{ initial: "1", md: "2" }} gap="4" >  */}
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
              <Table.Cell align="left">
                <Skeleton />
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>Status</Table.Cell>
              <Table.Cell >
                <Skeleton />
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>Created At</Table.Cell>
              <Table.Cell>
                <Skeleton />
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>Updated At</Table.Cell>
              <Table.Cell>
                <Skeleton />
              </Table.Cell>
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
        <div className="mt-6">
          <Button>Edit Issue</Button>
        </div>
        {/* </Grid>  */}
      </div>
    </Box>
  );
};

export default loadingDetailPage;
