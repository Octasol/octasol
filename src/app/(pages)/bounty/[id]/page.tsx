"use client";
import { GET } from "@/config/axios/requests";
import { Send, Twitter } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";

interface Sponsor {
  id: number;
  githubId: string;
  name: string;
  description: string;
  type: string;
  image: string;
  link: string;
  discord: string;
  telegram: string;
  twitter: string;
  createdAt: Date | null;
  updatedAt: Date | null;
}

interface Bounty {
  id: number;
  bountyName: string;
  bountyDescription: string;
  price: number;
  primaryContact: string;
  skills: string[];
  sponsor: Sponsor;
  sponsorId: number;
  status: number;
  time: string;
  timeExtendedTo: string | null;
  createdAt: Date | null;
  updatedAt: Date | null;
}

const page = () => {
  const pathname = usePathname();
  const [id, setId] = useState<number | null>(null);
  const [bounty, setBounty] = useState<Bounty | null>(null);
  const [sponsor, setSponsor] = useState<Sponsor | null>(null);

  useEffect(() => {
    console.log(pathname.split("/bounty/")[1]);
    setId(parseInt(pathname.split("/bounty/")[1]));
  }, [pathname]);

  const getBounty = async (id: number) => {
    const { response } = await GET(`/unescrowedbounty?id=${id}`);
    console.log(response);
    setSponsor(response.sponsor);
  };
  useEffect(() => {
    console.log(sponsor);
  }, [sponsor]);

  useEffect(() => {
    if (id) {
      getBounty(id);
    }
  }, [id]);

  return (
    <>
      <div className="w-full h-full py-5">
        <div className="w-full flex flex-col md:flex-row  items-center">
          <div className="w-full md:w-5/12 lg:min-w-3/12 flex">
            <div className="w-full flex flex-col items-start p-5 gap-2">
              <div className="w-full flex justify-between items-center ">
                <div className="w-8/12">{sponsor && `${sponsor.name}`}</div>
                <Image
                  src={sponsor?.image || "/default-image.png"}
                  alt={sponsor?.name ?? "default alt text"}
                  width={50}
                  height={50}
                  className="rounded-full "
                />
              </div>
              <div className="w-full italic text-gray-400 py-3">
                {sponsor && sponsor.description}
              </div>

              <div className="w-full">
                <Link href={sponsor ? sponsor.link : "#"} target="_blank">
                  {sponsor?.link}
                </Link>
              </div>

              <div className="w-full">
                <p className="py-4 w-full flex justify-center items-center">
                  SOCIAL MEDIA OF THE SPONSOR
                </p>
                <div className="w-full grid grid-rows-3 grid-cols-2 gap-3 ">
                  {sponsor?.twitter && (
                    <Link
                      href={sponsor ? `https://x.com/${sponsor.twitter}` : "#"}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <div className="flex items-center gap-2">
                        <Twitter />
                        {sponsor?.twitter}
                      </div>
                    </Link>
                  )}

                  {sponsor?.telegram && (
                    <Link
                      href={sponsor ? `https://t.me/${sponsor.telegram}` : "#"}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <div className="flex items-center gap-2">
                        <Send />
                        {sponsor?.telegram}
                      </div>
                    </Link>
                  )}

                  {sponsor?.discord && (
                    <Link
                      href={
                        sponsor
                          ? `https://discord.com/users/${sponsor.discord}`
                          : "#"
                      }
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <div className="flex items-center gap-2">
                        <Send />
                        {sponsor?.discord}
                      </div>
                    </Link>
                  )}
                </div>
              </div>
            </div>
            <div className="rotate-180 h-[80vh] w-px hidden md:block">
              <div className="w-full h-full bg-gradient-to-b from-transparent via-[#46bf96] to-transparent"></div>
            </div>
          </div>
          <div className="w-full md:w-7/12 lg:w-9/12">
            <div className="w-full"></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default page;
