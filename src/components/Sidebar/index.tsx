"use client";
import { IconChartHistogram } from "@tabler/icons-react";
import { Blocks, CopyPlus, HomeIcon, User } from "lucide-react";
import Link from "next/link";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { usePathname } from "next/navigation";

type Props = {};

const Sidebar = (props: Props) => {
  const user = useSelector((state: any) => state.user);
  const pathname = usePathname();

  useEffect(() => {
    console.log(pathname);
  }, [pathname]);

  // Helper function to determine if a link is active
  const isActive = (linkPath: string) => pathname.includes(linkPath);

  return (
    <>
      <div className="min-w pt-24 pb-4 min-h-screen z-50 overflow-hidden fixed flex flex-col items-center gap-8 px-5">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <Link href="/dashboard">
                <HomeIcon
                  size={32}
                  color={isActive("/dashboard") ? "cyan" : "currentColor"}
                />
              </Link>
            </TooltipTrigger>
            <TooltipContent className="bg-black">
              <p>Dashboard</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger>
              <Link href={`/p/${user?.login}`}>
                <User
                  size={32}
                  color={isActive("/p/") ? "cyan" : "currentColor"}
                />
              </Link>
            </TooltipTrigger>
            <TooltipContent className="bg-black">
              <p>Profile</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger>
              <Link href="/repoinitialize">
                <CopyPlus
                  size={32}
                  color={isActive("/repoinitialize") ? "cyan" : "currentColor"}
                />
              </Link>
            </TooltipTrigger>
            <TooltipContent className="bg-black">
              <p>Repository</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger>
              <Link href="/connect">
                <Blocks
                  size={32}
                  color={isActive("/connect") ? "cyan" : "currentColor"}
                />
              </Link>
            </TooltipTrigger>
            <TooltipContent className="bg-black">
              <p>Connect</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger>
              <Link href="/leaderboard">
                <IconChartHistogram
                  size={32}
                  color={isActive("/leaderboard") ? "cyan" : "currentColor"}
                />
              </Link>
            </TooltipTrigger>
            <TooltipContent className="bg-black">
              <p>Leaderboard</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      <div className="fixed rotate-180 h-screen w-px left-[70px]">
        <div className="w-full h-full bg-gradient-to-b from-transparent via-[#39628b] to-transparent"></div>
      </div>
    </>
  );
};

export default Sidebar;
