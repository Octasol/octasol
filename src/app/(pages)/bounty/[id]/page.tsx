"use client";
import { GET } from "@/config/axios/requests";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";

const page = () => {
  const pathname = usePathname();
  const [id, setId] = useState<number | null>(null);

  useEffect(() => {
    console.log(pathname.split("/bounty/")[1]);
    setId(parseInt(pathname.split("/bounty/")[1]));
  }, [pathname]);

  const getBounty = async (id: number) => {
    const response = await GET(`/unescrowedbounty?id=${id}`);
    console.log(response);
  };
  useEffect(() => {
    if (id) {
      getBounty(id);
    }
  }, [id]);

  return <div>page</div>;
};

export default page;
