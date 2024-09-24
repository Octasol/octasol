import * as React from "react";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type Props = {
  name: string;
  data: string;
};

export function Cards(props: Props) {
  return (
    <Card className="h-full bg-black w-[300px]">
      <CardHeader>
        <CardTitle>{props.name}</CardTitle>
      </CardHeader>
      <CardContent></CardContent>
      <CardFooter>{props.data}</CardFooter>
    </Card>
  );
}
