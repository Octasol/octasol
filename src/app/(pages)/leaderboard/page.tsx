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
import { leaderboard } from "@/config/axios/Breakpoints";
import { useRouter } from "next/navigation";

const Leaderboard = () => {
  const router = useRouter();
  const [profile, setProfile] = useState<Profile[]>();

  const response = async () => {
    const res = await GET(leaderboard);
    setProfile(res);
  };

  useEffect(() => {
    response();
  }, []);

  const userProfile = (username: string) => {
    router.push(`/p/${username}`);
  };

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
          <div className="flex flex-col md:flex-row justify-evenly items-center gap-4 md:gap-32 container place-items-center mt-5">
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
                <TableRow
                  key={index}
                  onClick={() => userProfile(item.githubUsername)}
                  className="cursor-pointer "
                >
                  <TableCell className="font-medium">{index + 1}</TableCell>
                  <TableCell>{item.githubUsername}</TableCell>
                  <TableCell className="text-right">
                    {item.totalPoints}
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
