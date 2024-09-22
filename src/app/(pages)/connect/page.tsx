"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useSelector } from "react-redux";
import { GET, POST } from "@/config/axios/requests";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { items } from "@/components/ui/ConnectCard";
import CopyLinkButton from "@/components/Button/CopyLinkButton";
import { connectProvider } from "@/config/axios/Breakpoints";

export default function Connect() {
  const user = useSelector((state: any) => state.user);

  const [userdata, setUserData] = useState({
    githubId: user?.githubId,
    githubUsername: "",
    superteamUsername: "",
    leetcodeUsername: "",
    codeforcesUsername: "",
    hackerrankUsername: "",
    codechefUsername: "",
    gfgUsername: "",
    gitlabUsername: "",
  });

  const [qrCodeData, setQrCodeData] = useState<string>("");
  const [qrCodeDataUrl, setQrCodeDataUrl] = useState<string>("");
  const [modalOpen, setModalOpen] = useState(false);
  const [activeItemTitle, setActiveItemTitle] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const userId = user?.accessToken;

  const fetchUserData = async () => {
    try {
      const response = await GET(`/user/${user?.githubId}`);
      setUserData(response);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    if (userId) {
      fetchUserData();
    }
  }, [user]);

  const handleConnect = async (type: any) => {
    try {
      const data = type;
      setQrCodeData("");
      setQrCodeDataUrl("");
      setActiveItemTitle(type);
      setErrorMessage(null);
      if (data) {
        const { response, error } = await POST(connectProvider, {
          userId: userId,
          githubId: user?.githubId,
          providerName: data,
        });

        if (error) {
          setErrorMessage(
            "Provider currently not available. Please try again later."
          );
        } else {
          const qr = response?.data?.qr;
          if (qr) {
            setQrCodeData(qr);
            setQrCodeDataUrl(response?.data?.url);
          } else {
            setQrCodeData("");
            setQrCodeDataUrl("");
          }
        }

        setModalOpen(true);
      }
    } catch (error) {
      setErrorMessage("An unexpected error occurred. Please try again.");

      setModalOpen(true);
    }
  };

  const handleModalClose = () => {
    setModalOpen(false);
    fetchUserData();
  };

  return (
    <div className="w-full h-full flex justify-center items-center py-8">
      <div className="grid md:auto-rows-[20rem] grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10 max-w-9xl px-6 py-4 max-w-8xl mx-auto">
        {items.map((item, i) => {
          const username =
            item.title === "Github"
              ? userdata.githubUsername
              : item.title === "SuperteamEarn"
              ? userdata.superteamUsername
              : item.title === "Leetcode"
              ? userdata.leetcodeUsername
              : item.title === "Codeforces"
              ? userdata.codeforcesUsername
              : item.title === "Hackerrank"
              ? userdata.hackerrankUsername
              : item.title === "Codechef"
              ? userdata.codechefUsername
              : item.title === "Geeksforgeeks"
              ? userdata.gfgUsername
              : item.title === "GitLab"
              ? userdata.gitlabUsername
              : null;

          return (
            <div
              className="row-span-1 rounded-xl group/bento hover:shadow-xl transition duration-200 shadow-input dark:shadow-none p-4 dark:bg-black dark:border-white/[0.2] bg-white border border-transparent justify-between flex flex-col space-y-4 w-72"
              key={i}
            >
              <div className="flex w-full justify-center items-center h-full">
                {item.header}
              </div>

              <div className="group-hover/bento:translate-x-2 transition duration-200">
                <div className="w-full h-min flex justify-between items-between">
                  <div className="font-sans font-bold text-neutral-600 dark:text-neutral-200 mb-2 mt-2">
                    {item.title}
                  </div>
                  {!username && (
                    <Dialog open={modalOpen} onOpenChange={handleModalClose}>
                      <DialogTrigger asChild>
                        <div
                          onClick={() => handleConnect(item.title)}
                          className="bg-slate-800 no-underline group cursor-pointer relative shadow-2xl shadow-zinc-900 rounded-full p-px text-xs font-semibold leading-6 text-white inline-block"
                        >
                          <span className="absolute inset-0 overflow-hidden rounded-full">
                            <span className="absolute inset-0 rounded-full bg-[image:radial-gradient(75%_100%_at_50%_0%,rgba(56,189,248,0.6)_0%,rgba(56,189,248,0)_75%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100"></span>
                          </span>
                          <div className="relative flex space-x-2 justify-between items-center z-10 rounded-full bg-zinc-950 py-2 px-5 ring-1 ring-white/10 ">
                            <span className="text-sm md:text-base">
                              Connect&nbsp;
                            </span>
                          </div>
                          <span className="absolute -bottom-0 left-[1.125rem] h-px w-[calc(100%-2.25rem)] bg-gradient-to-r from-emerald-400/0 via-emerald-400/90 to-emerald-400/0 transition-opacity duration-500 group-hover:opacity-40"></span>
                        </div>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[700px]">
                        <DialogHeader>
                          <DialogTitle>
                            Connect to {activeItemTitle}
                          </DialogTitle>
                        </DialogHeader>
                        <div className="w-full h-full flex justify-center items-center">
                          {errorMessage ? (
                            <p className="text-red-500">{errorMessage}</p>
                          ) : qrCodeData ? (
                            <Image
                              src={qrCodeData}
                              alt="QR Code"
                              height={300}
                              width={300}
                            />
                          ) : null}
                        </div>
                        {!errorMessage && qrCodeDataUrl && (
                          <DialogFooter>
                            <div className="w-full flex justify-center items-center">
                              <CopyLinkButton data={qrCodeDataUrl}>
                                <span className="text-sm md:text-base">
                                  Copy&nbsp;url
                                </span>
                              </CopyLinkButton>
                            </div>
                          </DialogFooter>
                        )}
                      </DialogContent>
                      <DialogClose onClick={handleModalClose} />
                    </Dialog>
                  )}
                </div>
                <div className="font-sans font-normal text-neutral-600 text-xs dark:text-neutral-300">
                  {username ? username : "Not connected"}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
