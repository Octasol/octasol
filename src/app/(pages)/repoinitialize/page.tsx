import React from "react";
import { RepoInitializeForm } from "@/components/RepoInitializeForm";
import { Meteors } from "@/components/ui/metors";
import { astronautIcon } from "@/components/Svg/svg";

const Repoinitialize = () => {
  return (
    <div className="flex flex-col gap-4 pt-24 min-h-screen w-full justify-center items-center relative z-10">
      <div className=" pb-14 lg:pb-8 px-8 py-8 w-full flex flex-col lg:flex-row">
        <Meteors number={50} className="z-0" />
        <div className="w-full lg:w-1/2 justify-center items-center z-20">
          <RepoInitializeForm />
        </div>
        <div className="w-full lg:w-1/2 hidden lg:flex">{astronautIcon()}</div>
      </div>
    </div>
  );
};

export default Repoinitialize;
