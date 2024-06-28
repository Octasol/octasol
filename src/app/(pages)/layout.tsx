import Sidebar from "@/components/Sidebar";
import React, { ReactNode } from "react";

type Props = { children: ReactNode };

const Layout = ({ children }: Props) => {
  return (
    <>
      <div className="flex w-12/12 h-full">
        <div className="w-fit">
          <Sidebar />
        </div>
        <div className="w-full ">{children}</div>
      </div>
    </>
  );
};

export default Layout;