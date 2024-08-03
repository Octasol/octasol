"use client";
import { POST } from "@/config/axios/requests";
import React from "react";
import { useSelector } from "react-redux";

const Dashboard = () => {
  const user = useSelector((state: any) => state.user);
  // const response = async () => {
  //   const res = await POST(
  //     "/devprofile/github/",
  //     {},
  //     {
  //       Authorization: `Bearer ${user.accessToken}`,
  //     }
  //   );
  //   console.log(res);
  // };

  return (
    <div className="flex flex-col gap-4 h-full w-full justify-center items-center">
      <h1 className="text-xl md:text-3xl px-8 ">Dashboard</h1>
      <div className=" overflow-auto h-[80vh]  pb-14 md:pb-8 px-8 py-8">
        {/* <button
          onClick={() => {
            console.log("clicked");
            response();
          }}
        >
          Click Me
        </button> */}
      </div>
    </div>
  );
};

export default Dashboard;
