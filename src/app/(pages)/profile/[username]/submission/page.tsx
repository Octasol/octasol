"use client";
import React, { useEffect, useState } from "react";
import { Calendar, DollarSign, Home, ShieldCheck } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { GET } from "@/config/axios/requests";
import { useSelector } from "react-redux";
import Image from "next/image";
import { Card } from "@/components/ui/card";

type Props = {};

const Submission = (props: Props) => {
  const pathname = usePathname();
  const router = useRouter();
  const user = useSelector((state: any) => state.user);

  const [userSubmissions, setUserSubmissions] = useState<any[]>([]);

  const getUserSubmissions = async () => {
    const name = pathname.split("/profile/").pop()?.split("/").shift();

    try {
      const response = await GET("/usersubmissions", {
        Authorization: `Bearer ${user.accessToken}`,
      });

      console.log(response);

      if (response[0]?.user?.githubUsername === name)
        setUserSubmissions(response);
    } catch (error) {
      console.error("Error fetching user submissions:", error);
    }
  };

  useEffect(() => {
    if (user.accessToken) getUserSubmissions();
  }, [user]);

  useEffect(() => {
    console.log(userSubmissions);
  }, [userSubmissions]);

  return (
    <>
      {userSubmissions.length > 0 ? (
        <div className="py-5">
          <div className="h-full px-4 sm:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto">
              <div className="text-center pb-12">
                <h2 className="font-bold text-white text-2xl">
                  Your Submissions
                </h2>
              </div>

              <div className="grid grid-cols-1 gap-12">
                {userSubmissions.map((submission, index) => (
                  <Card
                    key={index}
                    className="relative group  rounded-2xl shadow-sm p-5  md:p-8 transition-all duration-500 ease-in-out transform hover:-translate-y-1  cursor-pointer bg-black shadow-[#43aa8a]"
                    onClick={() => {
                      router.push(
                        `/profile/${user.login}/submission/${submission.id}`
                      );
                    }}
                  >
                    <div className=" w-full flex flex-col md:flex-row justify-between items-center gap-5">
                      <div className=" flex flex-col gap-2 w-full md:w-9/12">
                        <div className="flex items-center justify-between w-full gap-2">
                          {submission?.bounty?.sponsor?.image && (
                            <div
                              className={`rounded-xl p-3 shadow-lg group-hover:scale-110 transition-transform duration-300`}
                            >
                              <Image
                                src={submission.bounty.sponsor.image}
                                alt=""
                                width={100}
                                height={100}
                              ></Image>
                            </div>
                          )}
                          <h2 className="text-base md:text-xl font-bold w-full">
                            {submission.bounty.bountyname}
                          </h2>
                          <div></div>
                        </div>
                      </div>
                      <div className="flex flex-row md:flex-col justify-between w-full items-center md:items-end gap-2 px-4">
                        <div className="flex items-center ">
                          <DollarSign className="h-4 w-4 text-green-500" />
                          <span className="font-bold">
                            {submission.bounty.price}
                          </span>
                        </div>

                        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                          <Calendar className="h-4 w-4" />
                          <span>
                            {new Date(submission?.createdAt).toLocaleDateString(
                              "en-US",
                              {
                                day: "numeric",
                                month: "short",
                                year: "numeric",
                              }
                            )}
                          </span>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="w-full mt-32 flex flex-col gap-3 justify-center items-center">
          <Image
            src="/octasol-sad.png"
            alt="Empty"
            width={200}
            height={200}
            className=""
          />
          <p className="text-2xl">No Submissions yet</p>
        </div>
      )}
    </>
  );
};

export default Submission;
