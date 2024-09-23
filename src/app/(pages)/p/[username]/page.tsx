"use client";
import React, { useEffect, useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ScrollArea } from "@/components/ui/scroll-area";
import { usePathname } from "next/navigation";
import { GET, POST } from "@/config/axios/requests";
import { DataObject, userNames } from "@/lib/types";
import Image from "next/image";
import { RadialChart } from "@/components/Charts/RadialChart";
import { StatDetails } from "@/components/Charts/StatDetails";

interface radarObject {
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
  const [radarData, setRadarData] = useState<radarObject>({});

  const userData = async (name: string) => {
    try {
      const { response } = await POST("/user", { username: name });
      console.log(response?.data);

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
    }

    try {
      const radarResponse = await GET(`/radar?username=${name}`);
      setRadarData(radarResponse);
    } catch (error) {
      console.error("Error fetching radar chart data:", error);
    }
  };

  useEffect(() => {
    const name = pathname.split("/p/").pop();
    if (name) userData(name);
  }, [pathname]);

  useEffect(() => {
    console.log(leetcodeData);
  }, [leetcodeData]);

  return (
    <>
      <div className="w-full flex flex-col md:flex-row justify-center items-center px-4">
        <div className="w-full md:w-6/12 ">
          <RadialChart stats={radarData} />
        </div>

        <ScrollArea className="w-full md:w-6/12 md:h-[80vh] overflow-scroll px-4 ">
          <Accordion type="single" collapsible>
            {userName.githubUsername && (
              <AccordionItem value="github">
                <AccordionTrigger>
                  <div className="w-full flex justify-start items-center gap-6">
                    <Image
                      src="/github.webp"
                      alt="github"
                      className="invert"
                      width={40}
                      height={40}
                    />
                    <span className="text-base font-semibold ">
                      {userName.githubUsername}
                    </span>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="flex justify-end px-4">
                    <button className="bg-[#1e604b] text-white px-5 py-2 rounded-md hover:bg-[#267b60]">
                      Refresh
                    </button>
                  </div>
                  <StatDetails stats={githubData} />
                </AccordionContent>
              </AccordionItem>
            )}

            {userName.superteamUsername && (
              <AccordionItem value="superteam">
                <AccordionTrigger>
                  <div className="w-full flex justify-start items-center gap-6">
                    <Image
                      src="/superteam.jpeg"
                      alt="superteam"
                      className="rounded-full"
                      width={40}
                      height={40}
                    />
                    <span className="text-base font-semibold ">
                      {userName.superteamUsername}
                    </span>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="flex justify-end px-4">
                    <button className="bg-[#1e604b] text-white px-5 py-2 rounded-md hover:bg-[#267b60]">
                      Refresh
                    </button>
                  </div>

                  <StatDetails stats={superteamData} />
                </AccordionContent>
              </AccordionItem>
            )}

            {userName.leetcodeUsername && (
              <AccordionItem value="leetcode">
                <AccordionTrigger>
                  {" "}
                  <div className="w-full flex justify-start items-center gap-6">
                    <Image
                      src="/leetcode.webp"
                      alt="leetcode"
                      className="rounded-full"
                      width={40}
                      height={40}
                    />
                    <span className="text-base font-semibold ">
                      {userName.leetcodeUsername}
                    </span>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="flex justify-end px-4">
                    <button className="bg-[#1e604b] text-white px-5 py-2 rounded-md hover:bg-[#267b60]">
                      Refresh
                    </button>
                  </div>
                  <StatDetails stats={leetcodeData} />
                </AccordionContent>
              </AccordionItem>
            )}

            {userName.codeforcesUsername && (
              <AccordionItem value="codeforces">
                <AccordionTrigger>Codeforces</AccordionTrigger>
                <AccordionContent>
                  <div className="flex justify-end px-4">
                    <button className="bg-[#1e604b] text-white px-5 py-2 rounded-md hover:bg-[#267b60]">
                      Refresh
                    </button>
                  </div>
                  Username: {userName.codeforcesUsername}
                </AccordionContent>
              </AccordionItem>
            )}

            {userName.hackerrankUsername && (
              <AccordionItem value="hackerrank">
                <AccordionTrigger>
                  {" "}
                  <div className="w-full flex justify-start items-center gap-6">
                    <Image
                      src="/hackerrank.webp"
                      alt="hackerrank"
                      className="rounded-full"
                      width={40}
                      height={40}
                    />
                    <span className="text-base font-semibold ">
                      {userName.hackerrankUsername}
                    </span>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="flex justify-end px-4">
                    <button className="bg-[#1e604b] text-white px-5 py-2 rounded-md hover:bg-[#267b60]">
                      Refresh
                    </button>
                  </div>
                  <StatDetails stats={hackerrankData} />
                </AccordionContent>
              </AccordionItem>
            )}

            {userName.codechefUsername && (
              <AccordionItem value="codechef">
                <AccordionTrigger>
                  <div className="w-full flex justify-start items-center gap-6">
                    <Image
                      src="/codechef.png"
                      alt="codechef"
                      className="rounded-full aspect-square"
                      width={40}
                      height={40}
                    />
                    <span className="text-base font-semibold ">
                      {userName.codechefUsername}
                    </span>
                  </div>
                </AccordionTrigger>

                <AccordionContent>
                  <div className="flex justify-end px-4">
                    <button className="bg-[#1e604b] text-white px-5 py-2 rounded-md hover:bg-[#267b60]">
                      Refresh
                    </button>
                  </div>
                  <StatDetails stats={codechefData} />
                </AccordionContent>
              </AccordionItem>
            )}

            {userName.gfgUsername && (
              <AccordionItem value="gfg">
                <AccordionTrigger>
                  <div className="w-full flex justify-start items-center gap-6">
                    <Image
                      src="/gfg.png"
                      alt="gfg"
                      className="rounded-full aspect-square"
                      width={40}
                      height={40}
                    />
                    <span className="text-base font-semibold ">
                      {userName.gfgUsername}
                    </span>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="flex justify-end px-4">
                    <button className="bg-[#1e604b] text-white px-5 py-2 rounded-md hover:bg-[#267b60]">
                      Refresh
                    </button>
                  </div>
                  <StatDetails stats={gfgData} />
                </AccordionContent>
              </AccordionItem>
            )}

            {userName.gitlabUsername && (
              <AccordionItem value="gitlab">
                <AccordionTrigger>GitLab</AccordionTrigger>
                <AccordionContent>
                  <div className="flex justify-end px-4">
                    <button className="bg-[#1e604b] text-white px-5 py-2 rounded-md hover:bg-[#267b60]">
                      Refresh
                    </button>
                  </div>
                  Username: {userName.gitlabUsername}
                </AccordionContent>
              </AccordionItem>
            )}
          </Accordion>
        </ScrollArea>
      </div>
    </>
  );
}
