import { Cards } from "@/components/Card";
import StatusChart from "@/components/Charts/StatusChart";
import CoverUpPage from "@/components/CoverUpPage/Index";
import Notification from "@/components/Notification";
import React from "react";

const Dashboard = () => {
  return (
    <>
      <div className=" overflow-auto flex flex-col gap-4 h-full w-full items-center relative">
        <CoverUpPage />
        <h1 className="text-xl md:text-3xl px-8">Dashboard</h1>
        <div className="pb-14 md:pb-8 px-8 py-10 w-full">
          <div className="flex flex-wrap justify-evenly w-full gap-2">
            <Cards />
            <Cards />
            <Cards />
            <Cards />
          </div>
        </div>
        <div className="w-full flex flex-col md:flex-row flex-wrap justify-evenly gap-8 -mx-12 px-4">
          <div className="lg:w-7/12 w-full">
            <StatusChart />
          </div>
          <div className="w-full lg:w-4/12">
            <Notification />
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
