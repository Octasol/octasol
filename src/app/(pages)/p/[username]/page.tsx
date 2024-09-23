"use client";
import React, { use, useEffect, useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ScrollArea } from "@/components/ui/scroll-area";
import { usePathname } from "next/navigation";
import { POST } from "@/config/axios/requests";
import { userNames } from "@/lib/types";
import Image from "next/image";
import { RadialChart } from "@/components/Charts/RadialChart";
import { StatDetails } from "@/components/Charts/StatDetails";

interface DataObject {
  githubId?: string;
  stars?: number;
  forks?: number;
  forkedRepos?: number;
  originalRepos?: number;
  followers?: number;
  totalCommits?: number;
  repositoriesContributedTo?: number;
  pullRequests?: number;
  mergedPullRequests?: number;
  totalIssues?: number;
  currentPoints?: number;
  currentRating?: number;
  problemsSolved?: number;
  score?: number;
  easyQues?: number;
  mediumQues?: number;
  hardQues?: number;
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

  const userData = async (name: string) => {
    try {
      const { response } = await POST("/user", { username: name });
      console.log(response?.data);

      setGithubData(response?.data?.github);
      setHackerrankData(response?.data?.hackerrank);
      setCodechefData(response?.data?.codechef);
      setGfgData(response?.data?.gfg);
      setLeetcodeData(response?.data?.leetcodeProfile);

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
          <RadialChart />
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
                  <StatDetails stats={githubData} />
                </AccordionContent>
              </AccordionItem>
            )}

            {userName.superteamUsername && (
              <AccordionItem value="superteam">
                <AccordionTrigger>Superteam</AccordionTrigger>
                <AccordionContent>
                  Username: {userName.superteamUsername}
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
                  <StatDetails stats={leetcodeData} />
                </AccordionContent>
              </AccordionItem>
            )}

            {userName.codeforcesUsername && (
              <AccordionItem value="codeforces">
                <AccordionTrigger>Codeforces</AccordionTrigger>
                <AccordionContent>
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
                  <StatDetails stats={gfgData} />
                </AccordionContent>
              </AccordionItem>
            )}

            {userName.gitlabUsername && (
              <AccordionItem value="gitlab">
                <AccordionTrigger>GitLab</AccordionTrigger>
                <AccordionContent>
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
