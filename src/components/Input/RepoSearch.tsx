"use client";
import * as React from "react";
import { Search } from "lucide-react";
import { Input } from "../ui/input";
import { cn } from "@/lib/utils";
import { setQuery } from "@/app/Redux/Features/git/search";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

export default function RepoSearch() {
  const searchRepo = useSelector((state: any) => state.search.query);
  const dispatch = useDispatch();

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setQuery(e.target.value));
  };

  const Submitform = (e: React.FormEvent) => {
    e.preventDefault();
  };
  return (
    <form onSubmit={Submitform}>
      <LabelInputContainer>
        <div className="relative">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3">
            <Search size={20} />
          </span>
          <Input
            id="search"
            placeholder="Search Repo"
            type="text"
            value={searchRepo}
            onChange={handleSearchChange}
            className=" pl-10 bg-gradient-to-br  from-black dark:from-zinc-900  dark:to-zinc-900 to-neutral-600"
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
