"use client";
import LoginButton from "@/components/Button/LoginButton";
import { GET, POST } from "@/config/axios/requests";
import { Bounty } from "@/lib/types";
import { Send, Twitter, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
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
import { toast } from "react-toastify";
import { decrement, increment } from "@/app/Redux/Features/loader/loaderSlice";

const bountySubmission = {
  link: [],
  note: "",
  wallet: "",
};

const BountyDetails = () => {
  const pathname = usePathname();
  const router = useRouter();
  const counter = useSelector((state: any) => state.counter);
  const dispatch = useDispatch();
  const [id, setId] = useState<number | null>(null);
  const [bounty, setBounty] = useState<Bounty | null>(null);
  const [submission, setSubmission] = useState(bountySubmission);
  const user = useSelector((state: any) => state.user);
  const [submissions, setSubmissions] = useState<any>([]);
  const [submitted, setSubmitted] = useState(false);

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

  useEffect(() => {
    if (id) getBounty(id);
  }, [id, user]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setSubmission((prevState) => ({
      ...prevState,
      [name]:
        name === "link" ? value.split(",").map((link) => link.trim()) : value,
      bountyId: id,
    }));
  };

  const submit = async () => {
    if (!submission.link.length || !submission.note || !submission.wallet) {
      toast.info("Enter All Fields");
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
      return toast.success("Application Submitted Successfully");
    }

    if (error && error.status === 401) {
      return toast.error("You are not authorized to submit this bounty");
    }
  };

  useEffect(() => {
    if (submissions.length > 0) {
      submissions.forEach((item: any) => {
        if (item.githubId == user.githubId) {
          setSubmitted(true);
        }
      });
    }
  }, [submissions]);

  const getSubmissions = async (id: number) => {
    const { response } = await GET(`/unescrowedsubmission?id=${id}`);

    setSubmissions(response.submissions);
  };

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
  }, [bounty]);

  return (
    <>
      {bounty ? (
        <div className="w-full h-full ">
          <div className="w-full flex flex-col md:flex-row ">
            <div className="w-full md:max-w-[400px] flex flex-col md:flex-row h-full md:h-[90vh] overflow-hidden md:overflow-scroll">
              <div className="w-full flex flex-col items-start py-5 px-4 md:px-8 gap-4">
                <p className=" underline underline-offset-4 text-gray-400">
                  SPONSOR DETAILS
                </p>
                <div className="w-full flex justify-between items-center ">
                  <div className="w-8/12">
                    {bounty?.sponsor && `${bounty?.sponsor.name}`}
                  </div>
                  {bounty?.sponsor?.image ? (
                    <Image
                      src={bounty?.sponsor?.image || "/sponsor_image"}
                      alt={bounty?.sponsor?.name ?? ""}
                      width={80}
                      height={80}
                      className="rounded-md aspect-square object-cover"
                    />
                  ) : (
                    <User size={50} />
                  )}
                </div>
                <div className="w-full flex flex-col gap-4">
                  <p className=" underline underline-offset-4 text-gray-400">
                    DESCRIPTION
                  </p>
                  <div className="w-full italic text-gray-400">
                    {bounty?.sponsor && bounty?.sponsor.description}
                  </div>
                </div>

                <div className="w-full flex flex-col gap-4">
                  <p className=" underline underline-offset-4 text-gray-400">
                    LINK
                  </p>
                  <div className="w-full">
                    <Link
                      href={bounty?.sponsor ? bounty?.sponsor.link : "#"}
                      target="_blank"
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
                      <p className=" underline underline-offset-4 text-gray-400">
                        CONTACT
                      </p>
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
                        href={
                          bounty?.sponsor
                            ? `https://t.me/${bounty?.sponsor.telegram}`
                            : "#"
                        }
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
              <div className="rotate-0 md:rotate-180 h-[1px] md:h-[85vh] w-full md:w-px block">
                <div className="w-full h-full bg-gradient-to-r md:bg-gradient-to-b from-transparent via-[#46bf96] to-transparent"></div>
              </div>
            </div>
            <div className="w-full flex md:h-[90vh] overflow-hidden md:overflow-scroll ">
              <div className="w-full flex flex-col items-start py-5 px-4 md:px-8 gap-4">
                <p className=" underline underline-offset-4 text-gray-400">
                  BOUNTY DETAILS
                </p>
                <div className="w-full flex justify-between items-center gap-2">
                  <div className="w-6/12">
                    {bounty && `${bounty?.bountyname}`}
                  </div>
                  <div className="w-6/12 flex justify-end items-center">
                    {user?.githubId ? (
                      <Drawer>
                        <DrawerTrigger asChild>
                          <div className="w-fit flex justify-center items-center ">
                            <button
                              disabled={submitted}
                              onClick={() => {
                                if (!user.githubId) {
                                  toast.error(
                                    "Please login to submit application"
                                  );
                                }
                              }}
                              className={cn(
                                `relative inline-flex items-center justify-center p-0.5  overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 `,
                                submitted
                                  ? "cursor-not-allowed opacity-50"
                                  : "cursor-pointer"
                              )}
                            >
                              <span className="relative px-3 py-2 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-60">
                                {submitted
                                  ? "Submitted"
                                  : "Submit\u00A0Application"}
                              </span>
                            </button>
                          </div>
                        </DrawerTrigger>
                        <DrawerContent>
                          <div className="mx-auto w-full max-w-lg">
                            <DrawerHeader>
                              <DrawerTitle className="flex justify-center items-center w-full">
                                Submit Your Application
                              </DrawerTitle>
                              <DrawerDescription>
                                Don&apos;t start working just yet! Apply first,
                                and then begin working only once you&apos;ve
                                been hired for the project by the sponsor.
                              </DrawerDescription>
                            </DrawerHeader>
                            <div className="conatiner px-2 flex flex-col gap-4 pt-4">
                              <div className="grid w-full max-w-lg items-center gap-1.5">
                                <Label htmlFor="text">
                                  Links to your previous work
                                </Label>
                                <Input
                                  type="text"
                                  id="link"
                                  required
                                  name="link"
                                  onChange={handleChange}
                                  placeholder="Link to your previous work"
                                />
                              </div>
                              <div className="grid w-full max-w-lg items-center gap-1.5">
                                <Label htmlFor="text">
                                  Something you want to know about you
                                </Label>
                                <Textarea
                                  name="note"
                                  id="note"
                                  required
                                  onChange={handleChange}
                                  placeholder="Note"
                                />
                              </div>
                              <div className="grid w-full max-w-lg items-center gap-1.5">
                                <Label htmlFor="text">Wallet address</Label>
                                <Input
                                  type="text"
                                  id="wallet"
                                  name="wallet"
                                  required
                                  onChange={handleChange}
                                  placeholder="wallet address"
                                />
                              </div>
                            </div>
                            <DrawerFooter>
                              <DrawerClose asChild onClick={submit}>
                                <div className="w-full flex justify-center items-center py-5">
                                  <button className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800">
                                    <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-60">
                                      Submit
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
                              toast.error("Please login to submit application");
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
                <div className="w-full flex flex-col gap-4">
                  <p className=" underline underline-offset-4 text-gray-400">
                    DESCRIPTION
                  </p>
                  <div
                    className="w-full italic text-gray-400"
                    dangerouslySetInnerHTML={{
                      __html: bounty?.bountyDescription ?? "",
                    }}
                  ></div>
                </div>

                <div className="w-full flex flex-col gap-4">
                  <p className=" underline underline-offset-4 text-gray-400">
                    SKILLS
                  </p>
                  <div className="w-full flex flex-wrap gap-5">
                    {bounty?.skills.map((skill) => (
                      <div key={skill}>
                        <LoginButton>{skill}</LoginButton>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="w-full flex flex-col gap-4 pb-8">
                  <p className=" underline underline-offset-4 text-gray-400">
                    CONTACT
                  </p>
                  <p className="text-slate-500 italic text-sm">
                    Reach out if you have any questions about this listing
                  </p>
                  <div className="w-full flex flex-wrap  gap-3 ">
                    {bounty?.primaryContact && (
                      <Link
                        href={
                          bounty?.primaryContact
                            ? `https://t.me/${bounty?.primaryContact}`
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
