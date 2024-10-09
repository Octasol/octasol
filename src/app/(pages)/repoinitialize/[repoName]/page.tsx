"use client";

import React, { use, useEffect } from "react";
import { useSelector } from "react-redux";
import { usePathname } from "next/navigation";
import { POST } from "@/config/axios/requests";
import { getRepo } from "@/config/axios/Breakpoints";
import { HoverEffect } from "@/components/ui/card-hover-effect";

const RepoName = () => {
  
  const pathname = usePathname();
  const repoData = useSelector((state: any) => state.repoData);
  const [data, setData] = React.useState<any>([]);
  const installationId = useSelector((state: any) => state.installationId);

  const getData = async () => {
    try {
      const paylaod = {
        repo: pathname.split("/")[2],
        installationId: localStorage.getItem("installationId"),
      };
      const data = await POST(getRepo, paylaod);
      setData(data?.response?.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getData();
  }, [pathname]);

  return (
    <div className="flex flex-col gap-4 pt-24 h-fit w-full justify-center items-center relative z-10">
      <div className=" pb-14 lg:pb-8 px-8 py-8 w-full flex flex-col lg:flex-row">
        <div className="w-full">{!!data && <HoverEffect items={data} />}</div>
      </div>
    </div>
  );
};

export default RepoName;
