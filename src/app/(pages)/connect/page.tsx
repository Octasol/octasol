"use client";
import React from "react";
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import Image from "next/image";
import ConnectButton from "@/components/Button/ConnectButton";

export default function Connect() {
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
          <ConnectButton type="superteamearn">
            <span className="text-sm md:text-base">Connect&nbsp;</span>
          </ConnectButton>
        </div>
      </>
    ),
    description: <></>,
    header: (
      <>
        <Image
          src="/superteam.jpeg"
          alt="superteam"
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
          <ConnectButton type="leetcode">
            <span className="text-sm md:text-base">Connect&nbsp;</span>
          </ConnectButton>
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
          <ConnectButton type="superteamearn">
            <span className="text-sm md:text-base">Connect&nbsp;</span>
          </ConnectButton>
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
          <ConnectButton type="superteamearn">
            <span className="text-sm md:text-base">Connect&nbsp;</span>
          </ConnectButton>
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
          <ConnectButton type="superteamearn">
            <span className="text-sm md:text-base">Connect&nbsp;</span>
          </ConnectButton>
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
          <ConnectButton type="superteamearn">
            <span className="text-sm md:text-base">Connect&nbsp;</span>
          </ConnectButton>
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
          <ConnectButton type="superteamearn">
            <span className="text-sm md:text-base">Connect&nbsp;</span>
          </ConnectButton>
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
