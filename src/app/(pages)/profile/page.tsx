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
import Image from "next/image";

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
    header: (
      <>
        <Image
          src="/github.webp"
          alt="github"
          width={200}
          height={200}
          className="invert"
        />
      </>
    ),
  },
  {
    title: (
      <>
        <div className="flex justify-between items-ceter">
          <span>Superteam Earn</span>
          <ImportButton>
            <span className="text-sm md:text-base">Connect&nbsp;</span>
          </ImportButton>
        </div>
      </>
    ),
    description: <></>,
    header: (
      <>
        <Image
          src="/superteam.jpeg"
          alt="leetcode"
          width={150}
          height={200}
          className="rounded-full"
        />
      </>
    ),
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
    header: (
      <>
        <Image
          src="/leetcode.webp"
          alt="leetcode"
          width={150}
          height={200}
          className="rounded-full"
        />
      </>
    ),
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
    header: (
      <>
        <Image
          src="/codeforces.jpeg"
          alt="leetcode"
          width={150}
          height={200}
          className="rounded-full aspect-square "
        />
      </>
    ),
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
    header: (
      <>
        <Image
          src="/hackerrank.webp"
          alt="leetcode"
          width={150}
          height={200}
          className="rounded-full"
        />
      </>
    ),
  },
  {
    title: (
      <>
        <div className="flex justify-between items-ceter">
          <span>Codechef</span>
          <ImportButton>
            <span className="text-sm md:text-base">Connect&nbsp;</span>
          </ImportButton>
        </div>
      </>
    ),
    description: "",
    header: (
      <>
        <Image
          src="/codechef.png"
          alt="leetcode"
          width={150}
          height={200}
          className="rounded-full aspect-square "
        />
      </>
    ),
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
    header: (
      <>
        <Image
          src="/gfg.png"
          alt="leetcode"
          width={150}
          height={100}
          className="rounded-full"
        />
      </>
    ),
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
    header: (
      <Image
        src="/gitlab.png"
        alt="leetcode"
        width={150}
        height={200}
        className="rounded-full "
      />
    ),
  },
];
