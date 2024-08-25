import { IconChartHistogram } from "@tabler/icons-react";
import { Blocks, CopyPlus, HomeIcon, User } from "lucide-react";
import Link from "next/link";
import React from "react";
import { useSelector } from "react-redux";

type Props = {};

const Sidebar = (props: Props) => {
  const user = useSelector((state: any) => state.user);

  return (
    <>
      <div className="min-w pt-24 pb-4 min-h-screen z-50 overflow-hidden fixed flex flex-col items-center gap-8 px-5">
        <Link href="/dashboard">
          <HomeIcon size={32} />
        </Link>
        <Link href={`/p/${user?.login}`}>
          <User size={32} />
        </Link>
        <Link href="/repoinitialize">
          <CopyPlus size={32} />
        </Link>
        <Link href="/connect">
          <Blocks size={32} />
        </Link>
        <Link href="/leaderboard">
          <IconChartHistogram size={32} />
        </Link>
      </div>
      <div className="fixed rotate-180 h-screen w-px left-[70px]">
        <div className="w-full h-full bg-gradient-to-b from-transparent via-[#39628b] to-transparent"></div>
      </div>
    </>
  );
};

export default Sidebar;
