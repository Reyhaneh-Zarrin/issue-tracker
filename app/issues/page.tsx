import React from "react";
import { Button, TextField } from "@radix-ui/themes";
import Link from "next/link";

const issuesPage = () => {
  return (
    <div>
      <Link href='issues/new'><Button>Issues Page</Button></Link>
    </div>
  );
};

export default issuesPage;
