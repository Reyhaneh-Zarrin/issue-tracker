"use client";
import React, { useEffect, useState } from "react";
import { Card, Progress, Text, Flex, Heading } from "@radix-ui/themes";
import "@radix-ui/themes/styles.css";

interface Summary {
  openCount: number;
  closedCount: number;
  inProgressCount: number;
  todayCount: number;
}

export default function DashboardPage() {
  const [data, setData] = useState<Summary | null>(null);

  useEffect(() => {
    fetch("/api/summary")
      .then((res) => res.json())
      .then((data) => setData(data));
  }, []);

  if (!data) return <Text>Loading...</Text>;

  const total = data.openCount + data.closedCount + data.inProgressCount;
  const progressValue = total > 0 ? (data.closedCount / total) * 100 : 0;

  return (
    <div style={{ display: "grid", gap: "1rem", maxWidth: "500px" }}>
      <Card size="3">
        <Flex direction="column" gap="3">
          <Heading size="4">📊 Issues Overview</Heading>
          <Flex justify="between">
            <Text>
              Open: <strong>{data.openCount}</strong>
            </Text>
            <Text>
              Closed: <strong>{data.closedCount}</strong>
            </Text>
            <Text>
              In Progress: <strong>{data.closedCount}</strong>
            </Text>
          </Flex>
          <Progress value={progressValue} size="3" />

          <Text weight="bold" color="blue">
            Today’s activity: {data.todayCount} issues
          </Text>
        </Flex>
      </Card>
    </div>
  );
}
