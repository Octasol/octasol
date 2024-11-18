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
import { POST } from "@/config/axios/requests";
import RankCard from "@/components/RankCard";
import { Profile } from "@/lib/types";
import { leaderboard } from "@/config/axios/Breakpoints";
import { useRouter } from "next/navigation";
import { ChevronLeft, ChevronRight, Search, SearchIcon, X } from "lucide-react";
import { useSelector } from "react-redux";
import LoginButton from "@/components/Button/LoginButton";
import { Input } from "@/components/ui/input";

const Leaderboard = () => {
  const router = useRouter();
  const [profile, setProfile] = useState<Profile[]>([]);
  const user = useSelector((state: any) => state.user);
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 15;
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [filteredProfiles, setFilteredProfiles] = useState<Profile[]>([]);

  useEffect(() => {
    const fetchProfiles = async () => {
      const { response } = await POST(leaderboard, {});
      setProfile(response?.data);
      setFilteredProfiles(response?.data);
    };
    fetchProfiles();
  }, []);

  useEffect(() => {
    if (search) {
      const rankedProfiles = profile.map((p, index) => ({
        ...p,
        rank: index + 1,
      }));
      setFilteredProfiles(
        rankedProfiles.filter((p) =>
          p.githubUsername.toLowerCase().includes(search.toLowerCase())
        )
      );
    } else {
      setFilteredProfiles([]);
    }
  }, [search, profile]);

  const toggleSearch = () => {
    setIsOpen(!isOpen);
  };

  const response = async () => {
    const { response } = await POST(leaderboard, {});
    setProfile(response?.data);
  };

  useEffect(() => {
    response();
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
      <div className="w-full hidden md:flex justify-center items-center text-3xl font-bold tracking-widest">
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

      <div className="absolute bottom-[82vh]  md:bottom-10 right-[10px] z-30 max-w-[500px]">
        <div>
          <button
            onClick={toggleSearch}
            className="px-4 py-3 border-[1px] rounded-full border-slate-800 bg-black flex justify-center items-center gap-4"
          >
            <SearchIcon size={20} />
            <p className="hidden md:flex">Search</p>
          </button>
        </div>

        <div
          className={`fixed w-full md:w-1/2 lg:w-1/3 h-4/6  bottom-0 right-0 z-30 border-[1px] bg-black border-slate-800 transition-transform duration-500 ease-in-out rounded-lg ${
            isOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="p-4 flex flex-col gap-4">
            <div className="flex justify-between px-4 items-center">
              <h2 className="text-xl font-bold">Search Panel</h2>
              <X size={20} onClick={toggleSearch} className="cursor-pointer" />
            </div>
            <hr />
            <div>
              <Input
                id="first-name"
                placeholder="Enter name"
                name="name"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <div className="mt-4 max-h-[430px] overflow-y-auto">
              {search && filteredProfiles.length > 0 ? (
                <ul>
                  {filteredProfiles.map((item) => (
                    <li
                      key={item.githubUsername}
                      className="p-2 border-b cursor-pointer hover:bg-gray-700"
                      onClick={() => userProfile(item.githubUsername)}
                    >
                      <div className="flex justify-between">
                        <p className="w-[60px]">{item.rank}</p>
                        <p className="w-[210px] flex justify-start">
                          {item.githubUsername}
                        </p>
                        <p className="w-[80px] flex justify-end">
                          {item.totalPoints}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : search ? (
                <p className="text-center text-gray-400">No user found</p>
              ) : null}
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col justify-center items-center px-4 md:container md:max-w-5xl">
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
        <div className="flex justify-between items-center pt-6 pb-6 md:pb-16 w-full">
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
    </>
  );
};

export default Leaderboard;
