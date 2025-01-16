import { ProfileDropdown } from "@/components/ProfileDropdown";
import React, { ReactNode } from "react";

type Props = { children: ReactNode };
const Layout = ({ children }: Props) => {
  return (
    <div className="w-full h-full">
      <div className="fixed bottom-10 right-10">
        <ProfileDropdown />
      </div>
      {children}
    </div>
  );
};

export default Layout;
