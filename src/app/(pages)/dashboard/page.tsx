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
        <div className="pb-10 md:pb-4 px-8  w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 justify-evenly w-full gap-5">
            <Cards name="Bounties" data="100" />
            <Cards name="Participations" data="300" />
            <Cards name="Wins" data="10" />
            <Cards name="Earnings" data="5000" />
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
