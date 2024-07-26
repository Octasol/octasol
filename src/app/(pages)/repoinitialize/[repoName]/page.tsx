"use client";
import { astronautIcon } from "@/components/Svg/svg";
import React, { use, useEffect } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { POST } from "@/config/axios/requests";
import { getRepo } from "@/config/axios/Breakpoints";
import { HoverEffect } from "@/components/ui/card-hover-effect";

const RepoName = () => {
  // const router = useRouter();
  const pathname = usePathname();
  const repoData = useSelector((state: any) => state.repoData);
  const [data, setData] = React.useState<any>([]);
  const installationId = useSelector((state: any) => state.installationId);

  const getData = async () => {
    try {
      const paylaod = {
        repo: pathname.split("/")[2],
        installationId: installationId,
      };
      const data = await POST(getRepo, paylaod);
      console.log(data?.response?.data);
      setData(data?.response?.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, [pathname]);

  return (
    <div className="flex flex-col gap-4 pt-24 min-h-screen w-full justify-center items-center relative z-10">
      <div className=" pb-14 lg:pb-8 px-8 py-8 w-full flex flex-col lg:flex-row">
        {/* {astronautIcon()} */}
        <div className="w-full">
          <HoverEffect items={data} />
        </div>
      </div>
    </div>
  );
};

export default RepoName;

export const projects = [
  {
    title: "profile",
    description: "profile description ",
  },
  {
    title: "wallet",
    description: "view tokens and transactions description by wallet address",
  },
  {
    title: "transactions",
    description: "view your tokens and transactions description",
  },
];
