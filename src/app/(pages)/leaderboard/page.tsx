"use client";
import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { GET } from "@/config/axios/requests";
import RankCard from "@/components/RankCard";
import { Profile } from "@/lib/types";
import { githubDevProfile } from "@/config/axios/Breakpoints";

const Leaderboard = () => {
  const [profile, setProfile] = useState<Profile[]>();

  const response = async () => {
    const res = await GET(githubDevProfile);
    setProfile(res);
  };

  useEffect(() => {
    response();
  }, []);

  return (
    <>
      <div className="w-full flex justify-center items-center text-3xl font-bold tracking-widest">
        LEADERBOARD
      </div>
      <div className="w-full h-fit pt-4">
        <div className="w-full flex flex-col justify-center items-center py-2 md:py-10">
          <div className="mb-8 md:mb-0 z-20">
            <RankCard profile={profile && profile[0]} rank={1} />
          </div>
          <div className="flex flex-col md:flex-row justify-evenly items-center gap-4 md:gap-32 container place-items-center">
            <div>
              <RankCard profile={profile && profile[1]} rank={2} />
            </div>
            <div>
              <RankCard profile={profile && profile[2]} rank={3} />
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center items-center container max-w-5xl">
        <Table>
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
