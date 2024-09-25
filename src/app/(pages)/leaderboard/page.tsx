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
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useSelector } from "react-redux";

const Leaderboard = () => {
  const router = useRouter();
  const [profile, setProfile] = useState<Profile[]>([]);
  const user = useSelector((state: any) => state.user);
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 15;

  const response = async () => {
    const res = await GET(leaderboard);
    setProfile(res);
  };

  useEffect(() => {
    response();
    console.log(user?.login);
  }, []);

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const totalPages = Math.ceil(profile.length / recordsPerPage);

  const paginatedProfiles = profile.slice(
    (currentPage - 1) * recordsPerPage,
    currentPage * recordsPerPage
  );

  const userProfile = (username: string) => {
    router.push(`/p/${username}`);
  };

  const currentUserProfile = profile.find(
    (item: Profile) => item.githubUsername === user?.login
  );
  const currentUserRank = profile.findIndex(
    (item: Profile) => item.githubUsername === user?.login
  );

  return (
    <>
      <div className="w-full flex justify-center items-center text-3xl font-bold tracking-widest">
        LEADERBOARD
      </div>
      <div className="w-full h-fit pt-4">
        <div className="w-full flex flex-col justify-center items-center py-2 md:py-10">
          <div className="mb-8 md:mb-0 z-20">
            <RankCard profile={profile[0]} rank={1} />
          </div>
          <div className="flex flex-col md:flex-row justify-evenly items-center gap-4 md:gap-32 container place-items-center mt-5">
            <div>
              <RankCard profile={profile[1]} rank={2} />
            </div>
            <div>
              <RankCard profile={profile[2]} rank={3} />
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col justify-center items-center container max-w-5xl">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Rank</TableHead>
              <TableHead>Username</TableHead>
              <TableHead className="text-right">Points</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedProfiles.map((item: Profile, index: number) => (
              <TableRow
                key={index}
                onClick={() => userProfile(item.githubUsername)}
                className="cursor-pointer"
              >
                <TableCell className="font-medium">
                  {(currentPage - 1) * recordsPerPage + index + 1}
                </TableCell>
                <TableCell>{item.githubUsername}</TableCell>
                <TableCell className="text-right">{item.totalPoints}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {currentUserProfile && (
          <div className="w-full mt-8 border-2 border-[#1d5a48] rounded-md">
            <Table>
              <TableBody>
                <TableRow
                  onClick={() => userProfile(currentUserProfile.githubUsername)}
                  className="cursor-pointer "
                >
                  <TableCell className="font-medium w-[100px]">
                    {currentUserRank + 1}
                  </TableCell>
                  <TableCell>{currentUserProfile.githubUsername}</TableCell>
                  <TableCell className="text-right">
                    {currentUserProfile.totalPoints}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        )}
        <div className="flex justify-between items-center py-6 w-full">
          <button
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
            className={`px-4 py-2 rounded ${
              currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            <ChevronLeft color="white" size={40} />
          </button>

          <span className="text-white">
            Page {currentPage} of {totalPages}
          </span>

          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className={`px-4 py-2 rounded ${
              currentPage === totalPages ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            <ChevronRight color="white" size={40} />
          </button>
        </div>
      </div>

      {/* Pagination controls */}
    </>
  );
};

export default Leaderboard;
