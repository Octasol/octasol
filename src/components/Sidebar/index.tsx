import { GitBranchPlusIcon, HomeIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

type Props = {};

const Sidebar = (props: Props) => {
  return (
    <div className="min-w  pt-24 pb-4 h-screen overflow-auto border-r border-slate-800/50 flex flex-col items-center gap-8">
      <Link href="/dashboard">
        <HomeIcon size={32} />
      </Link>
      <Link href="/repoinitialize">
        <GitBranchPlusIcon size={32} />
      </Link>
      <Image src="/octasolLandingLogo.png" alt="logo" width={80} height={80} />
    </div>
  );
};

export default Sidebar;
