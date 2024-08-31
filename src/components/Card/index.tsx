import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function Cards() {
  return (
    <Card className="h-full bg-black w-[300px]">
      <CardHeader>
        <CardTitle>Create project</CardTitle>
      </CardHeader>
      <CardContent></CardContent>
      <CardFooter>$5000</CardFooter>
    </Card>
  );
}
