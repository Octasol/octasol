"use client";
import LoginButton from "@/components/Button/LoginButton";
import { GET, POST } from "@/config/axios/requests";
import { Bounty } from "@/lib/types";
import { Copy, Send, Twitter, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useDispatch, useSelector } from "react-redux";
import { cn } from "@/lib/utils";
import { decrement } from "@/app/Redux/Features/loader/loaderSlice";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "react-toastify";
import Login from "@/components/Login/Login";

const bountySubmission = {
  links: [],
  notes: "",
  walletAddress: "",
};

const BountyDetails = () => {
  const pathname = usePathname();
  const dispatch = useDispatch();
  const counter = useSelector((state: any) => state.counter);
  const user = useSelector((state: any) => state.user);
  const [id, setId] = useState<number | null>(null);
  const [bounty, setBounty] = useState<Bounty | null>(null);
  const [submissions, setSubmissions] = useState<any>([]);
  const [submission, setSubmission] = useState(bountySubmission);
  const [submitted, setSubmitted] = useState(false);
  const [telegramLink, setTelegramLink] = useState<String>();
  const [contacttelegramLink, setContactTelegramLink] = useState<String>();
  const [submissionLink, setSubmissionLink] = useState<String>();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (user.status == "unauthenticated") {
      const timer = setTimeout(() => {
        setOpen(true);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [user]);

  useEffect(() => {
    setId(parseInt(pathname.split("/bounty/")[1]));
  }, [pathname]);

  const getBounty = async (id: number) => {
    const { response } = await GET(`/unescrowedbounty?id=${id}`, {
      Authorization: `Bearer ${user.accessToken}`,
    });
    if (!user.githubId) {
      if (response && response.status === 2) {
        setBounty(response);
      }
    } else {
      setBounty(response);
    }
  };

  const getSubmissions = async (id: number) => {
    const { response } = await GET(`/unescrowedsubmission?id=${id}`);
    setSubmissions(response.submissions);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setSubmission((submission) => ({
      ...submission,
      [name]:
        name === "links" ? value.split(",").map((link) => link.trim()) : value,
      bountyId: id,
    }));
  };

  const submit = async () => {
    if (!submission.links.length || !submission.walletAddress) {
      toast.error("Enter All Fields");
      return;
    }
    const { response, error }: any = await POST(
      "/unescrowedsubmission",
      submission,
      {
        Authorization: `Bearer ${user.accessToken}`,
      }
    );
    if (response && response.status === 200) {
      console.log(response);
      setSubmissionLink(
        `https://octasol.io/profile/${user.login}/submission/${response.data.response.id}`
      );

      if (submitted) return toast.success("Application Updated Successfully");
      else {
        setSubmitted(true);
        return toast.success("Application Submitted Successfully");
      }
    }

    if (error && error.status === 401) {
      return toast.error("You are not authorized to submit this bounty");
    }
  };

  useEffect(() => {
    console.log(submissions);

    if (submissions.length > 0) {
      submissions.forEach((item: any) => {
        if (item.githubId == user.githubId) {
          setSubmissionLink(
            `https://octasol.io/profile/${user.login}/submission/${item.id}`
          );
          setSubmitted(true);
          console.log(item);

          setSubmission(item);
        }
      });
    }
  }, [submissions]);

  useEffect(() => {
    if (id) getBounty(id);
  }, [id, user]);

  useEffect(() => {
    if (id !== null) {
      getSubmissions(parseInt(id.toString()));
    }
  }, [id]);

  useEffect(() => {
    if (!bounty) {
      if (counter.value > 0) {
        dispatch(decrement());
      }
    }
    setTelegramLink(
      `https://t.me/${bounty?.sponsor?.telegram?.replace("@", "")}`
    );
    setContactTelegramLink(
      `https://t.me/${bounty?.primaryContact?.replace("@", "")}`
    );
  }, [bounty]);

  const notify = (message: string) => {
    toast.info(message);
  };

  const handleConnect = async (data: any) => {
    navigator.clipboard.writeText(data);
    notify("Link Copied");
  };

  const loginAlert = () => {
    toast.error("Login to continue reading");
  };

  return (
    <>
      {bounty ? (
        <div className="w-full h-full flex">
          <Dialog open={open} onOpenChange={loginAlert}>
            <DialogContent className="[&>button]:hidden bg-black">
              <DialogHeader>
                <DialogTitle>Login</DialogTitle>
                <DialogDescription>
                  Enter your credentials to continue
                </DialogDescription>
              </DialogHeader>
              <div className="w-full flex justify-center items-center">
                <div className="w-fit ">
                  <Login />
                </div>
              </div>
            </DialogContent>
          </Dialog>
          <div className="w-full flex flex-col md:flex-row gap-3 md:gap-0">
            <div className="w-full md:max-w-[400px] flex flex-col h-full md:h-[90vh] relative md:sticky top-0 px-4">
              <div className="w-full h-min flex flex-col items-start py-5 px-4 md:px-8 gap-4 bg-[#0f0f0f] rounded-xl ">
                <p className=" underline underline-offset-4 font-bold">
                  About Sponsor
                </p>
                <div className="w-full flex justify-center items-center">
                  {bounty?.sponsor?.image ? (
                    <Image
                      src={bounty?.sponsor?.image || "/sponsor_image"}
                      alt={bounty?.sponsor?.name ?? ""}
                      width={100}
                      height={100}
                      className="rounded-full aspect-square object-cover"
                    />
                  ) : (
                    <User size={50} />
                  )}
                </div>
                <div className="w-full flex justify-between items-center font-semibold">
                  {bounty?.sponsor && `${bounty?.sponsor.name}`}
                </div>
                <div className="w-full ">
                  {bounty?.sponsor && bounty?.sponsor.description}
                </div>

                <div className="w-full flex flex-col gap-4">
                  <div className="w-full">
                    <Link
                      href={bounty?.sponsor ? bounty?.sponsor.link : "#"}
                      target="_blank"
                      className="text-green-500"
                    >
                      {bounty?.sponsor?.link}
                    </Link>
                  </div>
                </div>

                <div className="w-full flex flex-col gap-4">
                  {(bounty?.sponsor?.telegram ||
                    bounty?.sponsor?.twitter ||
                    bounty?.sponsor?.discord) && (
                    <>
                      <p className=" underline underline-offset-4 ">CONTACT</p>
                      <p className="text-slate-500 italic text-sm">
                        Reach out if you have any questions about this listing
                      </p>
                    </>
                  )}
                  <div className="w-full flex flex-wrap  gap-3 ">
                    {bounty?.sponsor?.twitter && (
                      <Link
                        href={
                          bounty?.sponsor
                            ? `https://x.com/${bounty?.sponsor.twitter}`
                            : "#"
                        }
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <div className="flex items-center gap-2">
                          <Twitter />
                          {bounty?.sponsor?.twitter}
                        </div>
                      </Link>
                    )}

                    {bounty?.sponsor?.telegram && (
                      <Link
                        href={bounty?.sponsor ? `${telegramLink}` : "#"}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <div className="flex items-center gap-2">
                          <Send />
                          {bounty?.sponsor?.telegram}
                        </div>
                      </Link>
                    )}

                    {bounty?.sponsor?.discord && (
                      <Link
                        href={
                          bounty?.sponsor
                            ? `https://discord.com/users/${bounty?.sponsor.discord}`
                            : "#"
                        }
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <div className="flex items-center gap-2">
                          <Send />
                          {bounty?.sponsor?.discord}
                        </div>
                      </Link>
                    )}
                  </div>
                </div>
              </div>

              {submissionLink && (
                <div className="w-full h-min flex flex-col items-start py-5 px-4 md:px-8 gap-4 bg-[#0f0f0f] rounded-xl my-4">
                  <div
                    onClick={() => {
                      handleConnect(submissionLink);
                    }}
                    className="flex justify-center items-center gap-2 cursor-pointer group"
                  >
                    <Copy className="text-white group-hover:text-green-500 transition-colors duration-200" />
                    <span className="text-sm md:text-base text-white group-hover:text-green-500 transition-colors duration-200">
                      Copy Submission Link
                    </span>
                  </div>
                </div>
              )}

              {/* <div className="rotate-0 md:rotate-180 h-[1px] md:h-[85vh] w-full md:w-px block">
                <div className="w-full h-full bg-gradient-to-r md:bg-gradient-to-b from-transparent via-[#46bf96] to-transparent"></div>
              </div> */}
            </div>
            <div className="px-4">
              <div className="w-full flex h-full  bg-[#0f0f0f] rounded-xl ">
                <div className="w-full flex flex-col items-start py-5 px-4 md:px-8 gap-4">
                  <p className=" underline underline-offset-4 font-bold">
                    Details
                  </p>
                  <div className="w-full flex flex-col md:flex-row justify-between items-center gap-5 md:gap-2">
                    <div className="w-full md:w-6/12 ">
                      {bounty && `${bounty?.bountyname}`}
                    </div>
                    <div className="w-full md:w-6/12 flex justify-center md:justify-end items-center">
                      {user?.githubId ? (
                        <Drawer>
                          <DrawerTrigger asChild>
                            <div className="w-fit flex justify-center items-center ">
                              <button
                                // disabled={submitted}
                                onClick={() => {
                                  if (!user.githubId) {
                                    toast.error(
                                      "Please login to submit application"
                                    );
                                  }
                                }}
                                className={cn(
                                  `relative inline-flex items-center justify-center p-0.5  overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 cursor-pointer`
                                )}
                              >
                                <span className="relative px-3 py-2 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md">
                                  {submitted
                                    ? "Edit Application"
                                    : "Submit Application"}
                                </span>
                              </button>
                            </div>
                          </DrawerTrigger>
                          <DrawerContent>
                            <div className="mx-auto w-full max-w-lg">
                              <DrawerHeader>
                                <DrawerTitle className="flex justify-center items-center w-full">
                                  {submitted
                                    ? "Update Your Application"
                                    : "Submit Your Application"}
                                </DrawerTitle>
                                <DrawerDescription>
                                  Don&apos;t start working just yet! Apply
                                  first, and then begin working only once
                                  you&apos;ve been hired for the project by the
                                  sponsor.
                                </DrawerDescription>
                              </DrawerHeader>
                              <div className="container px-2 flex flex-col gap-4 pt-4">
                                <div className="grid w-full max-w-lg items-center gap-1.5">
                                  <Label htmlFor="links">
                                    Links to your previous work
                                  </Label>
                                  <Input
                                    type="text"
                                    id="links"
                                    required
                                    name="links"
                                    value={submission?.links}
                                    onChange={handleChange}
                                    placeholder="Link to your previous work (comma-separated)"
                                  />
                                </div>
                                <div className="grid w-full max-w-lg items-center gap-1.5">
                                  <Label htmlFor="notes">
                                    Something you want to share about yourself
                                  </Label>
                                  <Textarea
                                    name="notes"
                                    id="notes"
                                    value={submission?.notes || ""}
                                    onChange={handleChange}
                                    placeholder="Anything you want to tell us"
                                  />
                                </div>
                                <div className="grid w-full max-w-lg items-center gap-1.5">
                                  <Label htmlFor="wallet">Wallet address</Label>
                                  <Input
                                    type="text"
                                    id="wallet"
                                    name="walletAddress"
                                    required
                                    value={submission?.walletAddress || ""}
                                    onChange={handleChange}
                                    placeholder="Wallet address"
                                  />
                                </div>
                              </div>
                              <DrawerFooter>
                                <DrawerClose asChild>
                                  <div className="w-full flex justify-center items-center py-5">
                                    <button
                                      onClick={submit}
                                      className="bg-emerald-600 text-black px-1 py-3 rounded-lg font-semibold text-start hover:bg-green-600 transition-colors 
                               cursor-pointer"
                                    >
                                      <span className="relative px-5 py-2.5 transition-all ease-in duration-75 rounded-md group-hover:bg-opacity-60">
                                        {submitted
                                          ? "Update Submission"
                                          : "Submit"}
                                      </span>
                                    </button>
                                  </div>
                                </DrawerClose>
                              </DrawerFooter>
                            </div>
                          </DrawerContent>
                        </Drawer>
                      ) : (
                        <div className="w-fit flex justify-center items-center ">
                          <button
                            onClick={() => {
                              if (!user.githubId) {
                                toast.error(
                                  "Please login to submit application"
                                );
                              }
                            }}
                            className="relative inline-flex items-center justify-center p-0.5  overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 cursor-pointer opacity-50"
                          >
                            <span className="relative px-3 py-2 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-60">
                              {"Submit\u00A0Application"}
                            </span>
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="w-full h-[1px] bg-black pb-1 rounded-full"></div>

                  <div className="w-full flex flex-col gap-4">
                    <p className=" underline underline-offset-4 font-semibold">
                      Description
                    </p>
                    <div
                      className="w-full "
                      dangerouslySetInnerHTML={{
                        __html: bounty?.bountyDescription ?? "",
                      }}
                    ></div>
                  </div>

                  <div className="w-full flex flex-col gap-4">
                    <p className=" underline underline-offset-4 ">SKILLS</p>
                    <div className="w-full flex flex-wrap gap-2">
                      {bounty?.skills.map((skill) => (
                        <div key={skill}>
                          <LoginButton>{skill}</LoginButton>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="w-full flex flex-col gap-4 ">
                    <p className=" underline underline-offset-4 ">CONTACT</p>
                    <p className="text-slate-300 italic text-sm">
                      Reach out if you have any questions about this listing
                    </p>
                    <div className="w-full flex flex-wrap  gap-3 ">
                      {bounty?.primaryContact && (
                        <Link
                          href={
                            bounty?.primaryContact
                              ? `${contacttelegramLink}`
                              : "#"
                          }
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <div className="flex items-center gap-2">
                            <Send />
                            {bounty?.primaryContact}
                          </div>
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <>
          <div className="w-full h-full justify-center items-center">
            {/* gif for not found */}
          </div>
        </>
      )}
    </>
  );
};

export default BountyDetails;
