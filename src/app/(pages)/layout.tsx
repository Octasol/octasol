import Sidebar from "@/components/Sidebar";
import React, { ReactNode } from "react";

type Props = { children: ReactNode };

const Layout = ({ children }: Props) => {
  return (
    <>
      <div className="flex w-12/12 h-full">
        <div className="w-fit hidden md:flex">
          <Sidebar />
          <div className="relative rotate-180 h-screen w-px">
            <div className="w-full h-full bg-gradient-to-b from-transparent via-[#39628b] to-transparent"></div>
          </div>
        </div>
        <div className="w-full  pt-24">{children}</div>
      </div>
    </>
  );
};

export default Layout;
