"use client";
import React, { useEffect, useState } from "react";
import { Calendar, DollarSign, ShieldCheck } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { usePathname, useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import axios from "axios";
import { DataObject, userNames } from "@/lib/types";
import Image from "next/image";
import { StatDetails } from "@/components/Charts/StatDetails";
import RadarLoader from "@/components/ComponentLoader/RadarLoader";
import { ProfileLoader } from "@/components/ComponentLoader/ProfileLoader";
import { Card } from "@/components/ui/card";
import { GET } from "@/config/axios/requests";
import { useSelector } from "react-redux";

const ScrollArea = dynamic(
  () => import("@/components/ui/scroll-area").then((mod) => mod.ScrollArea),
  {
    loading: () => <ProfileLoader />,
  }
);

const RadialChart = dynamic(
  () =>
    import("@/components/Charts/RadialChart").then((mod) => mod.RadialChart),
  {
    loading: () => <RadarLoader />,
  }
);

interface RadarObject {
  githubUsername?: string;
  githubPoints?: number;
  hackerrankPoints?: number;
  gfgPoints?: number;
  codechefPoints?: number;
  leetcodePoints?: number;
  superteamEarnPoints?: number;
}

export default function BentoGridDemo() {
  const pathname = usePathname();
  const router = useRouter();
  const [userName, setUserName] = useState<userNames>({
    githubUsername: "",
    superteamUsername: "",
    leetcodeUsername: "",
    codeforcesUsername: "",
    hackerrankUsername: "",
    codechefUsername: "",
    gfgUsername: "",
    gitlabUsername: "",
  });
  const [githubData, setGithubData] = useState<DataObject>({});
  const [hackerrankData, setHackerrankData] = useState<DataObject>({});
  const [codechefData, setCodechefData] = useState<DataObject>({});
  const [gfgData, setGfgData] = useState<DataObject>({});
  const [leetcodeData, setLeetcodeData] = useState<DataObject>({});
  const [superteamData, setSuperteamData] = useState<DataObject>({});
  const [radarData, setRadarData] = useState<RadarObject | null>(null);
  const [isRadarLoading, setIsRadarLoading] = useState<boolean>(true);
  const [isUserLoading, setIsUserLoading] = useState<boolean>(true);
  const user = useSelector((state: any) => state.user);
  const [userSubmissions, setUserSubmissions] = useState<any[]>([]);

  const userData = async (name: string) => {
    setIsUserLoading(true);
    try {
      const response = await axios.post("/api/user", { username: name });

      setGithubData(response?.data?.github);
      setHackerrankData(response?.data?.hackerrank);
      setCodechefData(response?.data?.codechef);
      setGfgData(response?.data?.gfg);
      setLeetcodeData(response?.data?.leetcodeProfile);
      setSuperteamData(response?.data?.superteamEarnProfile);

      setUserName((prev) => ({
        ...prev,
        githubUsername: response?.data.user?.githubUsername || "",
        superteamUsername: response?.data.user?.superteamUsername || "",
        leetcodeUsername: response?.data.user?.leetcodeUsername || "",
        codeforcesUsername: response?.data.user?.codeforcesUsername || "",
        hackerrankUsername: response?.data.user?.hackerrankUsername || "",
        codechefUsername: response?.data.user?.codechefUsername || "",
        gfgUsername: response?.data.user?.gfgUsername || "",
        gitlabUsername: response?.data.user?.gitlabUsername || "",
      }));
    } catch (error) {
      console.error("Error fetching user data:", error);
    } finally {
      setIsUserLoading(false);
    }

    try {
      const radarResponse = (await axios.get(`/api/radar?username=${name}`))
        .data;
      setRadarData(radarResponse);

      // Save radar data in localStorage
      localStorage.setItem(`radarData_${name}`, JSON.stringify(radarResponse));
    } catch (error) {
      console.error("Error fetching radar chart data:", error);
    } finally {
      setIsRadarLoading(false);
    }
  };

  useEffect(() => {
    const name = pathname.split("/profile/").pop();

    if (name) {
      const savedRadarData = localStorage.getItem(`radarData_${name}`);
      if (savedRadarData) {
        setRadarData(JSON.parse(savedRadarData));
        setIsRadarLoading(false);
      } else {
        setIsRadarLoading(true);
      }

      userData(name);
    }
  }, [pathname]);

  const getUserSubmissions = async () => {
    const name = pathname.split("/profile/").pop();
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

  return (
    <>
      <div className="w-full flex flex-col justify-center items-center px-4 pb-12">
        <div className="w-full md:w-6/12">
          {isRadarLoading ? (
            <RadarLoader />
          ) : (
            radarData && <RadialChart stats={radarData} />
          )}
        </div>
        <ScrollArea className="w-full max-w-5xl ">
          {isUserLoading ? (
            <ProfileLoader />
          ) : (
            <Accordion type="single" collapsible>
              {userName.githubUsername && (
                <AccordionItem value="github">
                  <AccordionTrigger className="hover:no-underline">
                    <div className="w-full flex justify-start items-center">
                      <a target="_blank" href={`https://github.com/${userName.githubUsername}`} className="flex items-center gap-6 hover:underline hover:opacity-80">
                        <Image
                          src="/assets/profile/github.webp"
                          alt="github"
                          className="invert"
                          width={40}
                          height={40}
                          priority={false}
                          loading="lazy"
                          placeholder="blur"
                          blurDataURL="data:image/png;base64,..."
                        />
                        <span className="text-base font-semibold ">
                          {userName.githubUsername}
                        </span>
                      </a>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <StatDetails stats={githubData} />
                  </AccordionContent>
                </AccordionItem>
              )}

              {userName.superteamUsername && (
                <AccordionItem value="superteam">
                  <AccordionTrigger className="hover:no-underline">
                    <div className="w-full flex justify-start items-center">
                      <a target="_blank" href={`https://earn.superteam.fun/t/${userName.superteamUsername}`} className="flex items-center gap-6 hover:underline hover:opacity-80">
                        <Image
                          src="/assets/profile/superteam.jpeg"
                          alt="superteam"
                          className="rounded-full"
                          width={40}
                          height={40}
                          priority={false}
                          loading="lazy"
                          placeholder="blur"
                          blurDataURL="data:image/png;base64,..."
                        />
                        <span className="text-base font-semibold ">
                          {userName.superteamUsername}
                        </span>
                      </a>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <StatDetails stats={superteamData} />
                  </AccordionContent>
                </AccordionItem>
              )}

              {userName.leetcodeUsername && (
                <AccordionItem value="leetcode">
                  <AccordionTrigger className="hover:no-underline">
                    <div className="w-full flex justify-start items-center">
                      <a target="_blank" href={`https://leetcode.com/${userName.leetcodeUsername}`} className="flex items-center gap-6 hover:underline hover:opacity-80">
                        <Image
                          src="/assets/profile/leetcode.webp"
                          alt="leetcode"
                          className="rounded-full"
                          width={40}
                          height={40}
                          priority={false}
                          loading="lazy"
                          placeholder="blur"
                          blurDataURL="data:image/png;base64,..."
                        />
                        <span className="text-base font-semibold ">
                          {userName.leetcodeUsername}
                        </span>
                      </a>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <StatDetails stats={leetcodeData} />
                  </AccordionContent>
                </AccordionItem>
              )}

              {userName.codeforcesUsername && (
                <AccordionItem value="codeforces">
                  <AccordionTrigger>Codeforces</AccordionTrigger>
                  <AccordionContent>
                    <span>Username:</span>
                    <a href={`https://codeforces.com/profile/${userName.codeforcesUsername}`} target="_blank" className="underline">
                      {userName.codeforcesUsername}
                    </a>
                  </AccordionContent>
                </AccordionItem>
              )}

              {userName.hackerrankUsername && (
                <AccordionItem value="hackerrank">
                  <AccordionTrigger className="hover:no-underline">
                    <div className="w-full flex justify-start items-center">
                      <a target="_blank" href={`https://www.hackerrank.com/profile/${userName.hackerrankUsername}`} className="flex items-center gap-6 hover:underline hover:opacity-80">
                        <Image
                          src="/assets/profile/hackerrank.webp"
                          alt="hackerrank"
                          className="rounded-full"
                          width={40}
                          height={40}
                          priority={false}
                          loading="lazy"
                          placeholder="blur"
                          blurDataURL="data:image/png;base64,..."
                        />
                        <span className="text-base font-semibold ">
                          {userName.hackerrankUsername}
                        </span>
                      </a>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <StatDetails stats={hackerrankData} />
                  </AccordionContent>
                </AccordionItem>
              )}

              {userName.codechefUsername && (
                <AccordionItem value="codechef">
                  <AccordionTrigger className="hover:no-underline">
                    <div className="w-full flex justify-start items-center">
                      <a target="_blank" href={`https://www.codechef.com/users/${userName.codechefUsername}`} className="flex items-center gap-6 hover:underline hover:opacity-80">
                        <Image
                          src="/assets/profile/codechef.png"
                          alt="codechef"
                          className="rounded-full aspect-square"
                          width={40}
                          height={40}
                          priority={false}
                          loading="lazy"
                          placeholder="blur"
                          blurDataURL="data:image/png;base64,..."
                        />
                        <span className="text-base font-semibold ">
                          {userName.codechefUsername}
                        </span>
                      </a>
                    </div>
                  </AccordionTrigger>

                  <AccordionContent>
                    <StatDetails stats={codechefData} />
                  </AccordionContent>
                </AccordionItem>
              )}

              {userName.gfgUsername && (
                <AccordionItem value="gfg">
                  <AccordionTrigger className="hover:no-underline">
                    <div className="w-full flex justify-start items-center">
                      <a target="_blank" href={`https://www.geeksforgeeks.org/user/${userName.gfgUsername}`} className="flex items-center gap-6 hover:underline hover:opacity-80">
                        <Image
                          src="/assets/profile/gfg.png"
                          alt="gfg"
                          className="rounded-full aspect-square"
                          width={40}
                          height={40}
                          priority={false}
                          loading="lazy"
                          placeholder="blur"
                          blurDataURL="data:image/png;base64,..."
                        />
                        <span className="text-base font-semibold ">
                          {userName.gfgUsername}
                        </span>
                      </a>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <StatDetails stats={gfgData} />
                  </AccordionContent>
                </AccordionItem>
              )}

              {userName.gitlabUsername && (
                <AccordionItem value="gitlab">
                  <AccordionTrigger>GitLab</AccordionTrigger>
                  <AccordionContent>
                    <span>Username:</span> 
                    <a href={`https://gitlab.com/${userName.gitlabUsername}`} target="_blank" className="underline">
                      {userName.gitlabUsername}
                    </a>
                  </AccordionContent>
                </AccordionItem>
              )}
            </Accordion>
          )}
        </ScrollArea>
      </div>

      {userSubmissions.length > 0 && (
        <div className="py-5">
          <div className="h-full px-4 sm:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto">
              <div className="text-center pb-12">
                <h2 className="font-bold text-white text-2xl">Submissions</h2>
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
                    

                    <div className="mt-4 w-full flex flex-col md:flex-row justify-between items-center gap-5">
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
                        <div>
                      </div>
                        </div>
                         
                      </div>
                      <div className="flex flex-row md:flex-col justify-between w-full items-center md:items-end gap-2 px-4">
                        <div className="flex items-center ">
                          <DollarSign className="h-4 w-4 text-green-500" />
                          <span className="font-bold">
                            {submission.bounty.price}
                          </span>
                        </div>
                        {/* <div className="flex items-center gap-2"> */}
                          {/* <ShieldCheck className="h-4 w-4 text-green-500" /> */}
                          {/* <span className="font-bold">
                            {submission.status === 0
                              ? "In Review"
                              : submission.status === 1
                              ? "Approved"
                              : "Rejected"}
                          </span> */}
                        {/* </div> */}
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
      )}
    </>
  );
}
