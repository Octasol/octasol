"use client";
import { cn } from "@/lib/utils";
import React from "react";
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import {
  IconBrandGithub,
  IconBrandGitlab,
  IconBrandLeetcode,
  IconCurrencySolana,
} from "@tabler/icons-react";
import { Code, Code2, CodeSquare, CodeSquareIcon } from "lucide-react";
import ImportButton from "@/components/Button/ImportButton";
import { useSelector } from "react-redux";

export default function BentoGridDemo() {
  const user = useSelector((state: any) => state.user);

  return (
    <div className="w-full h-full flex justify-center items-center">
      <BentoGrid className="max-w-8xl mx-auto">
        {items.map((item, i) => (
          <BentoGridItem
            key={i}
            title={item.title}
            description={item.description}
            header={item.header}
            icon={""}
          />
        ))}
      </BentoGrid>
    </div>
  );
}
const Skeleton = () => (
  <div className="flex flex-1 w-full h-[12rem] rounded-xl "></div>
);

const items = [
  {
    title: "Github",
    description: "",
    header: <IconBrandGithub size={200} className=" text-neutral-300" />,
    // icon: <IconBrandGithub className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: (
      <>
        <div className="flex justify-between items-ceter">
          <span>Superteam earn</span>
          <ImportButton>
            <span className="text-sm md:text-base">Connect&nbsp;</span>
          </ImportButton>
        </div>
      </>
    ),
    description: <></>,
    header: <IconCurrencySolana size={200} className=" text-neutral-300" />,
    // icon: <IconCurrencySolana className="h-4 w-4 text-neutral-500" />,
  },

  {
    title: (
      <>
        <div className="flex justify-between items-ceter">
          <span>Leetcode</span>
          <ImportButton>
            <span className="text-sm md:text-base">Connect&nbsp;</span>
          </ImportButton>
        </div>
      </>
    ),
    description: "",
    header: <IconBrandLeetcode size={200} className=" text-neutral-300" />,
    // icon: <IconBrandLeetcode className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: (
      <>
        <div className="flex justify-between items-ceter">
          <span>Codeforces</span>
          <ImportButton>
            <span className="text-sm md:text-base">Connect&nbsp;</span>
          </ImportButton>
        </div>
      </>
    ),
    description: "",
    header: <Code size={200} className=" text-neutral-300" />,
    // icon: <Code className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: (
      <>
        <div className="flex justify-between items-ceter">
          <span>Hackerrank</span>
          <ImportButton>
            <span className="text-sm md:text-base">Connect&nbsp;</span>
          </ImportButton>
        </div>
      </>
    ),
    description: "",
    header: <CodeSquare size={200} className=" text-neutral-300" />,

    // icon: <CodeSquare className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: (
      <>
        <div className="flex justify-between items-ceter">
          <span>codechef</span>
          <ImportButton>
            <span className="text-sm md:text-base">Connect&nbsp;</span>
          </ImportButton>
        </div>
      </>
    ),
    description: "",
    header: <Code2 size={200} className=" text-neutral-300" />,

    // icon: <Code2 className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: (
      <>
        <div className="flex justify-between items-ceter">
          <span>Geeksforgeeks</span>
          <ImportButton>
            <span className="text-sm md:text-base">Connect&nbsp;</span>
          </ImportButton>
        </div>
      </>
    ),
    description: "",
    header: <CodeSquareIcon size={200} className=" text-neutral-300" />,

    // icon: <CodeSquareIcon className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: (
      <>
        <div className="flex justify-between items-ceter">
          <span>Gitlab</span>
          <ImportButton>
            <span className="text-sm md:text-base">Connect&nbsp;</span>
          </ImportButton>
        </div>
      </>
    ),
    description: "",
    header: <IconBrandGitlab size={200} className=" text-neutral-300" />,
    // icon: <IconBrandGitlab className="h-4 w-4 text-neutral-500" />,
  },
];
