"use client";

import LoginButton from "@/components/Button/LoginButton";
import { GET, POST } from "@/config/axios/requests";
import { Send, Twitter, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useSelector } from "react-redux";
import { cn } from "@/lib/utils";
import { toast } from "react-toastify";
import { adminGithub } from "@/lib/constants";

interface submission {
  bountyId: string;
  links: string;
  notes: string;
  walletAddress: string;
  id: string;
}

const UserSubmisson = () => {
  const user = useSelector((state: any) => state.user);
  const pathname = usePathname();
  const router = useRouter();
  const [submissionDetails, setSubmissionDetails] = useState<any>([]);
  const [submission, setSubmission] = useState<submission>({
    bountyId: "",
    links: "",
    notes: "",
    walletAddress: "",
    id: "",
  });

  const submit = async () => {
    if (
      !submission.links.length ||
      !submission.notes ||
      !submission.walletAddress
    ) {
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
      return toast.success("Application Updated Successfully");
    }

    if (error && error.status === 401) {
      return toast.error("You are not authorized to submit this bounty");
    }
  };

  const getUserSubmissions = async () => {
    try {
      const id = pathname.split("/submission/").pop();

      const response = await GET("/usersubmissions", {
        Authorization: `Bearer ${user.accessToken}`,
      });

      // console.log(response);

      const filteredSubmissions = response.filter((item: any) => item.id == id);

      setSubmissionDetails(filteredSubmissions);
    } catch (error) {
      console.error("Error fetching user submissions:", error);
    }
  };

  useEffect(() => {
    if (user.accessToken) {
      getUserSubmissions();
    }
  }, [user, pathname]);

  useEffect(() => {
    console.log(submissionDetails);
    setSubmission({
      bountyId: submissionDetails[0]?.bountyId,
      links: submissionDetails[0]?.links,
      notes: submissionDetails[0]?.notes,
      walletAddress: submissionDetails[0]?.walletAddress,
      id: submissionDetails[0]?.id,
    });
  }, [submissionDetails]);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setSubmission({ ...submission, [name]: value });
  };

  useEffect(() => {
    const test = pathname.split("/profile/").pop()?.split("/")[0];
    console.log(test);

    if (user.login && test) {
      console.log(user);
      console.log(adminGithub.includes((test as string).toLowerCase()));
      if (
        pathname.split("/profile/").pop()?.split("/")[0] !== user.login &&
        !adminGithub.includes((test as string).toLowerCase())
      ) {
        toast.error("You are not authorized to view this page");
        window.location.href = `/profile/${user.login}`;
      }
    }
  }, [pathname, user]);

  return (
    <>
      {submissionDetails.length > 0 ? (
        <>
          {submissionDetails.map((item: any, index: number) => (
            <div className="w-full h-full flex flex-col md:flex-row gap-5 px-5 pb-2">
              <section
                key={index}
                className="rounded-xl shadow-sm shadow-[#375e86] w-full md:w-1/2 flex flex-col md:flex-row h-full sticky top-0 bg-[#0f0f0f]"
              >
                <div className="m-4 w-full ">
                  <div className="w-full px-2 flex flex-col gap-6 py-4">
                    <p className="w-full text-center font-bold text-lg">
                      YOUR APPLICATION
                    </p>
                    <div className="grid w-full  items-center gap-1.5">
                      <Label className="text-base" htmlFor="links">
                        Links to your previous work
                      </Label>
                      <Input
                        type="text"
                        id="links"
                        required
                        name="links"
                        value={submission?.links}
                        onChange={handleChange}
                        placeholder={
                          submission?.links ||
                          "Link to your previous work (comma-separated)"
                        }
                      />
                    </div>
                    <div className="grid w-full  items-center gap-1.5">
                      <Label className="text-base" htmlFor="notes">
                        Something you want to share about yourself
                      </Label>
                      <Textarea
                        name="notes"
                        id="notes"
                        required
                        value={submission?.notes || ""}
                        onChange={handleChange}
                        placeholder={submission?.notes || "notes"}
                      />
                    </div>
                    <div className="grid w-full  items-center gap-1.5">
                      <Label className="text-base" htmlFor="wallet">
                        Wallet address
                      </Label>
                      <Input
                        type="text"
                        id="wallet"
                        name="walletAddress"
                        required
                        value={submission?.walletAddress || ""}
                        onChange={handleChange}
                        placeholder={
                          submission?.walletAddress || "Wallet address"
                        }
                      />
                    </div>
                  </div>
                  <div className="w-full flex justify-center items-center mt-5">
                    <button
                      onClick={submit}
                      className={cn(
                        `bg-[#30ad47] text-slate-900 px-6 py-3 rounded-lg font-semibold hover:bg-green-600 transition-colors 
                               cursor-pointer`
                      )}
                    >
                      <span className="relative px-3 py-2 transition-all ease-in duration-75 rounded-md group-hover:bg-opacity-60">
                        {"Edit\u00A0Application"}
                      </span>
                    </button>
                  </div>
                </div>
              </section>
              <div className="w-full md:w-1/2 h-full flex flex-col gap-5">
                <section className="w-full h-min sticky top-0 z-20 flex flex-col items-start py-5 px-4 md:px-8 gap-4 bg-[#0f0f0f] rounded-xl shadow-sm shadow-[#375e86]">
                  <div className="w-full flex flex-col md:flex-row justify-start items-start gap-8">
                    <div className="w-full md:w-fit flex justify-start items-start">
                      {item.bounty?.sponsor?.image ? (
                        <Image
                          src={item.bounty?.sponsor?.image || "/sponsor_image"}
                          alt={item.bounty?.sponsor?.name ?? ""}
                          width={100}
                          height={100}
                          className="rounded-full aspect-square object-cover"
                        />
                      ) : (
                        <User size={50} />
                      )}
                    </div>
                    <div className="flex flex-col gap-2">
                      <div className="w-full flex justify-between items-center font-bold">
                        {item.bounty?.sponsor && `${item.bounty?.sponsor.name}`}
                      </div>
                      <div className="w-full italic text-base">
                        {item.bounty?.sponsor &&
                          item.bounty?.sponsor.description}
                      </div>

                      <div className="w-full flex flex-col gap-4 mt-4">
                        <div className="w-full">
                          <Link
                            href={
                              item.bounty?.sponsor
                                ? item.bounty?.sponsor.link
                                : "#"
                            }
                            target="_blank"
                            className="text-green-500"
                          >
                            {item.bounty?.sponsor?.link}
                          </Link>
                        </div>
                      </div>

                      <div className="w-full flex flex-col gap-4">
                        {(item.bounty?.sponsor?.telegram ||
                          item.bounty?.sponsor?.twitter ||
                          item.bounty?.sponsor?.discord) && (
                          <>
                            <p className=" underline underline-offset-4 ">
                              CONTACT
                            </p>
                            <p className="text-slate-500 italic text-sm">
                              Reach out if you have any questions about this
                              listing
                            </p>
                          </>
                        )}
                        <div className="w-full flex flex-wrap  gap-3 ">
                          {item.bounty?.sponsor?.twitter && (
                            <Link
                              href={
                                item.bounty?.sponsor
                                  ? `https://x.com/${item.bounty?.sponsor.twitter}`
                                  : "#"
                              }
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <div className="flex items-center gap-2">
                                <Twitter />
                                {item.bounty?.sponsor?.twitter}
                              </div>
                            </Link>
                          )}

                          {item.bounty?.sponsor?.telegram && (
                            <Link
                              href={
                                item.bounty?.sponsor
                                  ? `https://t.me/${item.bounty?.sponsor.telegram}`
                                  : "#"
                              }
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <div className="flex items-center gap-2">
                                <Send />
                                {item.bounty?.sponsor?.telegram}
                              </div>
                            </Link>
                          )}

                          {item.bounty?.sponsor?.discord && (
                            <Link
                              href={
                                item.bounty?.sponsor
                                  ? `https://discord.com/users/${item.bounty?.sponsor.discord}`
                                  : "#"
                              }
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <div className="flex items-center gap-2">
                                <Send />
                                {item.bounty?.sponsor?.discord}
                              </div>
                            </Link>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </section>

                <section className="w-full flex h-full bg-[#0f0f0f] rounded-xl shadow-sm shadow-[#375e86]">
                  <div className="w-full flex flex-col items-start py-5 px-4 md:px-8 gap-4">
                    <div className="w-full flex justify-between items-center gap-2">
                      <div className="w-full font-bold">
                        {item?.bounty && `${item?.bounty?.bountyname}`}
                      </div>
                    </div>
                    <div className="w-full flex flex-col gap-4">
                      <div
                        className="w-full italic "
                        dangerouslySetInnerHTML={{
                          __html: item?.bounty?.bountyDescription ?? "",
                        }}
                      ></div>
                    </div>

                    <div className="w-full flex flex-col gap-4">
                      <p className=" underline underline-offset-4 ">SKILLS</p>
                      <div className="w-full flex flex-wrap gap-5">
                        {item?.bounty?.skills.map((skill: string) => (
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
                        {item?.bounty?.primaryContact && (
                          <Link
                            href={
                              item?.bounty?.primaryContact
                                ? `https://t.me/${item?.bounty?.primaryContact}`
                                : "#"
                            }
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <div className="flex items-center gap-2">
                              <Send />
                              {item?.bounty?.primaryContact}
                            </div>
                          </Link>
                        )}
                      </div>
                    </div>
                  </div>
                </section>
              </div>
            </div>
          ))}
        </>
      ) : (
        <div className="w-full h-full flex justify-center items-center">
          <p>No submissions found.</p>
        </div>
      )}
    </>
  );
};

export default UserSubmisson;
