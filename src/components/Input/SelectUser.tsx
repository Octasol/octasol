import * as React from "react";
import { Input } from "../ui/input";
import { cn } from "@/lib/utils";

type Props = {
  data: string | null | undefined;
};

export default function SelectUser({ data }: Props) {
  return (
    <LabelInputContainer>
      <Input
        id="search"
        placeholder={`${data}`}
        type="text"
        value={data?.toString() || ""}
        className=" pl-8 bg-gradient-to-br  from-black dark:from-zinc-900  dark:to-zinc-900 to-neutral-600"
      />
    </LabelInputContainer>
  );
}

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex flex-col space-y-2 w-full", className)}>
      {children}
    </div>
  );
};
