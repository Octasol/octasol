import Sidebar from "@/components/Sidebar";
import React, { ReactNode } from "react";

type Props = { children: ReactNode };

const Layout = ({ children }: Props) => {
  return (
    <>
      <div className="flex w-12/12 h-full">
        <div className="w-fit hidden md:flex">
          <Sidebar />
        </div>
        <div className="w-full min-h-screen pt-24 md:ms-20">{children}</div>
      </div>
    </>
  );
};

export default Layout;
