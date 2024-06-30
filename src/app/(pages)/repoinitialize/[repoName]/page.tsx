"use client";
import { astronautIcon } from "@/components/Svg/svg";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";

const RepoName = () => {
  const router = useRouter();
  const pathname = usePathname();
  const repoData = useSelector((state: any) => state.repoData);

  useEffect(() => {
    // console.log(repoData);
    console.log(pathname);
  }, [repoData, pathname]);

  return (
    <div className="flex flex-col gap-4 pt-24 min-h-screen w-full justify-center items-center relative z-10">
      <div className=" pb-14 lg:pb-8 px-8 py-8 w-full flex flex-col lg:flex-row">
        {astronautIcon()}
      </div>
    </div>
  );
};

export default RepoName;
