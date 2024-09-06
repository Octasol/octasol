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
  const userData = async (name: string) => {
    try {
      const { response } = await POST("/user", { username: name });
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

  return (
    <>
      <div className="w-full flex flex-col md:flex-row justify-center items-center px-4">
        <div className="w-full md:w-7/12 "></div>

        <ScrollArea className="w-full md:w-5/12 md:h-[80vh] overflow-scroll px-4 md:px-8">
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
                  Username: {userName.githubUsername}
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
                <AccordionTrigger>LeetCode</AccordionTrigger>
                <AccordionContent>
                  Username: {userName.leetcodeUsername}
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
                  Username: {userName.hackerrankUsername}
                </AccordionContent>
              </AccordionItem>
            )}

            {userName.codechefUsername && (
              <AccordionItem value="codechef">
                <AccordionTrigger>CodeChef</AccordionTrigger>
                <AccordionContent>
                  Username: {userName.codechefUsername}
                </AccordionContent>
              </AccordionItem>
            )}

            {userName.gfgUsername && (
              <AccordionItem value="gfg">
                <AccordionTrigger>GeeksforGeeks</AccordionTrigger>
                <AccordionContent>
                  Username: {userName.gfgUsername}
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
