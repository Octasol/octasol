"use client";
import * as React from "react";
import { Search } from "lucide-react";
import { Input } from "../ui/input";
import { cn } from "@/lib/utils";

export default function RepoSearch() {
  const [searchRepo, setSearchRepo] = React.useState<string>("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
    setSearchRepo(e.target.value);
  };

  const Submitform = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(searchRepo);
  };
  return (
    <form onSubmit={Submitform}>
      <LabelInputContainer>
        <div className="relative">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3">
            <Search size={14} />
          </span>
          <Input
            id="search"
            placeholder="Search Repo"
            type="text"
            value={searchRepo}
            onChange={handleInputChange}
            className=" pl-8 bg-gradient-to-br  from-black dark:from-zinc-900  dark:to-zinc-900 to-neutral-600"
          />
        </div>
      </LabelInputContainer>
    </form>
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
