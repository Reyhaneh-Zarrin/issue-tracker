import { Status } from "@prisma/client";
import { Badge } from "@radix-ui/themes"; // یا هر جایی که Badge ازش میاد
import React from "react";


const StatusBadge = ({ status }: { status: Status }) => {
  if (status === "OPEN") {
    return <Badge color="orange" variant="outline">OPEN</Badge>;
  } else if (status === "IN_PROGRESS") {
    return <Badge color="violet" variant="outline">IN PROGRESS</Badge>;
  } else if (status === "CLOSED") {
    return <Badge color="green" variant="outline">CLOSED</Badge>;
  } else {
    return null;
  }
};

export default StatusBadge;
