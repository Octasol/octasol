import { githubAvatar } from "@/config/axios/Breakpoints";
import { Profile } from "@/lib/types";
import { cn } from "@/lib/utils";
import Image from "next/image";
import React from "react";

type Props = {
  profile: Profile | undefined;
  rank?: number;
};

const RankCard = (props: Props) => {
  return (
    <>
      {props.profile && (
        <div className="w-64 block justify-center items-center relative">
          <span className="absolute inset-0 overflow-hidden ">
            <span className="absolute inset-0  bg-[image:radial-gradient(75%_100%_at_50%_0%,rgba(56,189,248,0.6)_0%,rgba(56,189,248,0)_75%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100"></span>
          </span>
          <div
            className={cn(
              "relative flex space-x-2 justify-between items-center z-10  bg-zinc-950 py-1 px-5 ring-1 ring-white/10 ",
              props?.rank === 1 ? "scale-110" : "scale-90"
            )}
          >
            <div className="px-4 py-3 flex flex-col justify-center items-center w-full">
              <div className="w-20 h-20 bg-gray-600 rounded-full">
                <Image
                  src={githubAvatar + props?.profile?.githubUsername}
                  alt="profile"
                  width={100}
                  height={100}
                  className="rounded-full"
                />
              </div>
              <div className="text-center text-lg mt-2 flex flex-col">
                {props?.profile?.githubUsername}
                <span>#{props?.rank}</span>
              </div>
            </div>
            <span className="absolute -bottom-0 left-[1.125rem] h-px w-[calc(100%-2.25rem)] bg-gradient-to-r from-emerald-400/0 via-emerald-400/90 to-emerald-400/0 transition-opacity duration-500 group-hover:opacity-40"></span>
          </div>
        </div>
      )}
    </>
  );
};

export default RankCard;
