"use client";
import LoginButton from "@/components/Button/LoginButton";
import { GET } from "@/config/axios/requests";
import { User } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

interface Bounty {
  sponsor: {
    name: string;
    image: string;
    description: string;
  };
  submissions: [];
  price: number;
  bountyname: string;
  skills: string[];
  id: number;
  createdAt: string;
}

const Bounty = () => {
  const router = useRouter();
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

  const bountyDetails = (id: number) => {
    router.push(`/bounty/${id}`);
  };

  useEffect(() => {
    console.log(bounties);
  }, [bounties]);

  useEffect(() => {
    getBounties();
  }, []);

  return (
    <>
      <div className="w-full flex justify-center items-center px-5 lg:px-8 py-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6 w-full">
          {bounties.map((bounty, index) => (
            <div
              key={index}
              className="relative inline-flex h-full overflow-hidden rounded-lg shadow-md shadow-[#34597f]"
            >
              <div className="w-full p-5 flex flex-col justify-between gap-3">
                <div className=" rounded-lg  w-full gap-4 flex flex-col ">
                  <h3 className="text-sm font-semibold text-gray-400 ">
                    {bounty?.sponsor?.name}
                  </h3>
                  <div className="flex justify-between items-center">
                    <h1 className="text-lg font-bold ">{bounty?.bountyname}</h1>
                    <p className="font-bold">$&nbsp;{bounty.price}</p>
                  </div>
                  <p className="text-sm text-slate-500 italic truncate">
                    {bounty?.sponsor?.description}
                  </p>
                  <div className="flex flex-col justify-between gap-4">
                    <p className="font-bold">Skills Required</p>
                    <div className="flex flex-wrap gap-2 ">
                      {bounty.skills.map((skill) => (
                        <div key={index}>
                          <button className="px-4 py-2 text-sm font-semibold border border-gray-800 rounded-lg hover:bg-gray-900 cursor-default">
                            {skill}
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex flex-col">
                  <div className="flex justify-between items-center">
                    <p className="font-bold">Hunters Applied</p>
                    <p className="font-bold">{bounty.submissions.length}</p>
                  </div>
                  <div className="flex items-center justify-between mt-4 ">
                    <p className="text-xs text-gray-400 ">
                      {new Date(bounty?.createdAt).toLocaleDateString("en-US", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </p>
                    <button
                      className="px-4 py-2 text-sm font-semibold border border-gray-800 rounded-lg hover:bg-gray-900"
                      onClick={() => bountyDetails(bounty.id)}
                    >
                      Details
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Bounty;
