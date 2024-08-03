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

type Props = {};

const Leaderboard = (props: Props) => {
  const [profile, setProfile] = useState<any>(null);
  const [topProfiles, setTopProfiles] = useState<any>(null);

  const response = async () => {
    const res = await GET("/devprofile/github/");
    console.log(res);
    setProfile(res);
    setTopProfiles(res.slice(0, 3));
  };

  useEffect(() => {
    response();
  }, []);

  useEffect(() => {
    const element1 = topProfiles?.splice(0, 1, topProfiles[1]);
    topProfiles?.splice(1, 1, element1[0]);
    setTopProfiles(topProfiles);
  }, [topProfiles]);

  return (
    <>
      <div className="w-full flex justify-center items-center text-3xl font-bold tracking-widest">
        LEADERBOARD
      </div>
      <div className="w-full h-52 bg-[#315478]">
        <div className="w-full flex justify-center items-center py-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {topProfiles &&
              topProfiles.map((profile: any, index: number) => (
                <div
                  key={index}
                  className={`p-6 border rounded-lg shadow-lg ${
                    index === 1
                      ? "bg-yellow-900 border-yellow-5800"
                      : "bg-red-900"
                  }`}
                >
                  <div className="text-center font-bold text-xl mb-2">
                    Rank {index + 1}
                  </div>
                  <div className="text-center text-lg mb-2">
                    {profile.User.githubUsername}
                  </div>
                  <div className="text-center text-lg">
                    Points: {profile.points}
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
