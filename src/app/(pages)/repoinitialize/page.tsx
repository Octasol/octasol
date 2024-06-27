import { RepoInitializeForm } from "@/components/RepoInitializeForm";
import React from "react";

const Repoinitialize = () => {
  return (
    <div className="flex flex-col gap-4 pt-24 h-full w-full justify-center items-center">
      <div className=" overflow-auto  pb-14 md:pb-8 px-8 py-8 w-full flex flex-col md:flex-row">
        {/* <div className="w-full md:w-1/2"> */}
        <RepoInitializeForm />
        {/* </div> */}
        {/* <div className="w-full md:w-1/2 flex"></div> */}
      </div>
    </div>
  );
};

export default Repoinitialize;
