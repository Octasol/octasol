import { RepoInitializeForm } from "@/components/RepoInitializeForm";
import React from "react";

const Dashboard = () => {
  return (
    <div className="flex flex-col gap-4 pt-24 h-full w-full justify-center items-center">
      {/* <h1 className="text-xl md:text-3xl px-8 ">Dashboard</h1> */}
      <div className=" overflow-auto  pb-14 md:pb-8 px-8 py-8">
        <RepoInitializeForm />
      </div>
    </div>
  );
};

export default Dashboard;
