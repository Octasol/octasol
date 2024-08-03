"use client";
import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { GET } from "@/config/axios/requests";
import { cn } from "@/lib/utils";

interface Profile {
  followers: number;
  forkedRepos: number;
  forks: number;
  mergedPullRequests: number;
  originalRepos: number;
  pullRequests: number;
  repositoriesContributedTo: number;
  stars: number;
  totalCommits: number;
  totalIssues: number;
  User: {
    githubUsername: string;
  };
  points: number;
}

const Leaderboard = () => {
  const [profile, setProfile] = useState<Profile[]>();
  const [topProfiles, setTopProfiles] = useState<Profile[]>();

  const response = async () => {
    const res = await GET("/devprofile/github/");
    console.log(res);
    setProfile(res);
    const response = res;
    const element1 = response?.splice(0, 1, response[1]);
    response?.splice(1, 1, element1[0]);
    setTopProfiles(response.slice(0, 3));
  };

  useEffect(() => {
    response();
  }, []);

  useEffect(() => {}, [topProfiles]);

  return (
    <>
      <div className="w-full flex justify-center items-center text-3xl font-bold tracking-widest">
        LEADERBOARD
      </div>
      <div className="w-full h-fit ">
        <div className="w-full flex justify-center items-center py-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-9/12 place-items-center">
            {topProfiles &&
              topProfiles.map((profile: any, index: number) => (
                <div className="w-8/12 block justify-center items-center relative">
                  <span className="absolute inset-0 overflow-hidden ">
                    <span className="absolute inset-0  bg-[image:radial-gradient(75%_100%_at_50%_0%,rgba(56,189,248,0.6)_0%,rgba(56,189,248,0)_75%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100"></span>
                  </span>
                  <div
                    className={cn(
                      "relative flex space-x-2 justify-between items-center z-10  bg-zinc-950 py-1 px-5 ring-1 ring-white/10 "
                    )}
                  >
                    <div
                      key={index}
                      className="px-6 py-8 flex flex-col justify-center items-center w-full"
                    >
                      <div className="text-center font-bold text-xl mb-2">
                        Rank {index === 0 ? 2 : index === 1 ? 1 : 3}
                      </div>
                      <div className="text-center text-lg mb-2">
                        {profile.User.githubUsername}
                      </div>
                    </div>
                    <span className="absolute -bottom-0 left-[1.125rem] h-px w-[calc(100%-2.25rem)] bg-gradient-to-r from-emerald-400/0 via-emerald-400/90 to-emerald-400/0 transition-opacity duration-500 group-hover:opacity-40"></span>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
      <div className="flex justify-center items-center container max-w-5xl">
        <Table>
          {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Rank</TableHead>
              <TableHead>Username</TableHead>
              <TableHead className="text-right">Points</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {profile &&
              profile.map((item: any, index: number) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{index + 1}</TableCell>
                  <TableCell>{item.User.githubUsername}</TableCell>
                  <TableCell className="text-right">
                    {item.followers +
                      item.forkedRepos +
                      item.forks +
                      item.mergedPullRequests +
                      item.originalRepos +
                      item.repositoriesContributedTo +
                      item.pullRequests +
                      item.stars +
                      item.totalCommits +
                      item.totalIssues}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
};

export default Leaderboard;
