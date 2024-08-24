import Sidebar from "@/components/Sidebar";
import React, { ReactNode } from "react";

type Props = { children: ReactNode };

const Layout = ({ children }: Props) => {
  return (
    <>
      <div className="flex w-full h-full">
        <div className="w-fit hidden md:flex">
          <Sidebar />
        </div>
        {true ? (
          <div className="w-full min-h-screen pt-24 md:ms-20">{children}</div>
        ) : (
          <div className="w-full min-h-screen pt-24 md:ms-20 flex justify-center items-center">
            maadarchod 100 kaam h mere pr
          </div>
        )}
      </div>
    </>
  );
};

export default Layout;
