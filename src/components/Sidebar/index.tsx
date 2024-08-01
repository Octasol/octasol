import { GitBranchPlusIcon, HomeIcon, UserRound } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

type Props = {};

const Sidebar = (props: Props) => {
  return (
    <div className="min-w pt-24 pb-4 h-screen overflow-auto  flex flex-col items-center gap-8 px-5">
      <Link href="/dashboard">
        <HomeIcon size={32} />
      </Link>
      <Link href="/repoinitialize">
        <GitBranchPlusIcon size={32} />
      </Link>
      <Link href="/profile">
        <UserRound size={32} />
      </Link>
    </div>
  );
};

export default Sidebar;
