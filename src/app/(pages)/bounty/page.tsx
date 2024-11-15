"use client";
import LoginButton from "@/components/Button/LoginButton";
import { GET } from "@/config/axios/requests";
import { User } from "lucide-react";
import React, { useEffect, useState } from "react";

interface Bounty {
  sponsor: {
    name: string;
  };
  price: number;
  bountyname: string;
  skills: string[];
}

const Bounty = () => {
  const [bounties, setbounties] = useState<Bounty[]>([]);
  const getBounties = async () => {
    try {
      const response = await GET("/unescrowedbounty");
      if (response.status === 200) {
        setbounties(response.bounties);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getBounties();
  }, []);

  return (
    <>
      <div className="w-full flex justify-center items-center px-5 lg:px-8 ">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6 w-full">
          {bounties.map((bounty) => (
            <div className="relative inline-flex h-full overflow-hidden rounded-2xl p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
              <span className="absolute inset-[-1000%] animate-[spin_4s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#355b81_0%,#000000_50%,#355b81_100%)]" />
              <span className="inline-flex h-full w-full items-center justify-center rounded-2xl bg-black px-3 py-1 text-sm font-medium text-white backdrop-blur-3xl">
                {/*  */}
                <div className="w-full h-full  p-3 flex flex-col">
                  <div className="relative inline-flex h-full overflow-hidden rounded-2xl p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
                    <span className="absolute inset-[-1000%] animate-[spin_8s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#42a387_0%,#000000_50%,#42a387_100%)] " />
                    <span className="inline-flex h-full w-full  items-center justify-center rounded-2xl bg-black px-3 py-1 text-sm font-medium text-white backdrop-blur-3xl ">
                      <div className="h-full w-full p-5 flex flex-col gap-4 ">
                        <div className="flex justify-between items-center">
                          <div className="flex gap-4">
                            <div className="w-fit px-3 h-10 bg-gray-200 text-black rounded-full flex justify-center items-center">
                              In Progress
                            </div>
                          </div>
                          <div className=" w-fit h-min p-2 flex justify-center items-center border-[1px] rounded-md cursor-pointer">
                            {/* <Bookmark size={20} /> */}
                            <User size={40} />
                          </div>
                        </div>
                        <div>{bounty?.sponsor?.name}</div>
                        <div className=" flex justify-between items-center">
                          <p className="text-lg w-full">{bounty.bountyname}</p>
                          {/* <div className="w-2/12">
                </div> */}
                        </div>
                        <div className="flex flex-wrap gap-4">
                          {bounty.skills.map((skill) => (
                            <LoginButton>{skill}</LoginButton>
                          ))}
                        </div>
                      </div>
                    </span>
                  </div>
                  <div className="w-full h-24 p-5">
                    <div className="flex justify-between items-center">
                      <div className="">
                        <p className="font-bold">$&nbsp;{bounty.price}</p>
                        <p className="text-sm text-gray-500">California</p>
                      </div>

                      <div className="">
                        <LoginButton>Details</LoginButton>
                      </div>
                    </div>
                  </div>
                </div>
              </span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Bounty;
