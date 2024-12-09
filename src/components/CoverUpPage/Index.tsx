import Link from "next/link";
import React from "react";
import "./cover.css";

type Props = {};

const CoverUpPage = (props: Props) => {
  return (
    <>
      <div className="w-full h-full bg-transparent blur z-30 fixed top-0 right-0 text-white">
        <div className="flex flex-col justify-center items-center h-screen w-full  overflow-hidden">
          <p className="text-4xl md:text-5xl lg:text-7xl">Coming Soon</p>
          <p className="mt-8 text-center text-lg tracking-wide leading-8">
            The page will be available soon with more features. Stay tuned!
            <br />
            Visit&nbsp;
            <Link
              href={"/leaderboard"}
              className="text-blue-500 hover:text-blue-400"
            >
              Leaderboard
            </Link>
            &nbsp;or&nbsp;
            <Link
              href={"/connect"}
              className="text-blue-500 hover:text-blue-400"
            >
              Connect&nbsp;Profiles
            </Link>
            .
          </p>
        </div>
      </div>
    </>
  );
};

export default CoverUpPage;
