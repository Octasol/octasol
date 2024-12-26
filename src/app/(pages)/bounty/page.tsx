"use client";
import { decrement } from "@/app/Redux/Features/loader/loaderSlice";
import { GET } from "@/config/axios/requests";
import { User } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

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
  const counter = useSelector((state: any) => state.counter);
  const dispatch = useDispatch();
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

  useEffect(() => {
    // console.log("counter/b", counter.value);
    if (bounties && counter.value > 0) {
      dispatch(decrement());
    }
  }, [bounties, counter]);

  return (
    <>
      <div className="w-full flex justify-center items-center px-5 lg:px-8 py-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6 w-full">
          {bounties.map((bounty, index) => (
            <div
              key={index}
              className="relative inline-flex h-full overflow-hidden rounded-lg shadow-md shadow-[#34597f] cursor-pointer"
              onClick={() => bountyDetails(bounty.id)}
            >
              <div className="w-full p-5 flex flex-col justify-between gap-3">
                <div className=" rounded-lg  w-full gap-4 flex flex-col ">
                  <div className="flex justify-between items-center">
                    {/* <h3 className="text-sm font-semibold text-gray-300 underline underline-offset-4">
                      Sponsor
                    </h3> */}
                    {bounty?.sponsor?.image ? (
                      <Image
                        src={bounty?.sponsor?.image}
                        alt={bounty?.sponsor?.name}
                        width={100}
                        height={100}
                      />
                    ) : (
                      <User size={50} />
                    )}
                    <h3 className="text-sm font-bold text-gray-300">
                      {bounty?.sponsor?.name}
                    </h3>
                  </div>
                  <div className="flex justify-between items-center">
                    <h1 className="text-lg font-bold ">{bounty?.bountyname}</h1>
                    <p className="font-bold">$&nbsp;{bounty.price}</p>
                  </div>
                  {/* <p className="text-sm text-slate-400 italic truncate">
                    {bounty?.sponsor?.description}
                  </p> */}
                  <div className="flex flex-col justify-between gap-4">
                    {/* <p className="font-bold text-gray-300 underline underline-offset-4">
                      Skills Required
                    </p> */}
                    <div className="flex flex-wrap gap-2 ">
                      {bounty.skills.map((skill) => (
                        <div key={index}>
                          <button className="px-4 py-2 text-sm font-semibold border border-gray-800 rounded-lg ">
                            {skill}
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex flex-col">
                  {/* <div className="flex justify-between items-center">
                    <p className="font-bold text-gray-300 underline underline-offset-4">
                      Hunters Applied
                    </p>
                    <p className="font-bold">{bounty.submissions.length}</p>
                  </div> */}
                  <div className="flex items-center justify-between mt-4 ">
                    <p className="text-xs text-gray-300 ">
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
                      Apply
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
