"use client";
import Sidebar from "@/components/Sidebar";
import VerifyMail from "@/components/verifyMail";
import React, { ReactNode, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Image from "next/image";

type Props = { children: ReactNode };
const Layout = ({ children }: Props) => {
  const session = useSelector((state: any) => state.user);
  const counter = useSelector((state: any) => state.counter);
  const [verifiedEmail, setVerifiedEmail] = useState(true);
  const verified = async (): Promise<void> => {
    if (session && session.accessToken) {
      setVerifiedEmail(session.isVerifiedEmail);
    }
  };
  useEffect(() => {
    verified();
  }, [session, verifiedEmail]);

  return (
    <>
      <div className="flex w-full h-full relative">
        <div className="absolute top-0 left-0 w-[80px] hover:w-[200px] min-h-screen z-30 transition-width duration-500 ease-in-out md:flex flex-col items-start gap-8 overflow-hidden bg-black">
          <Sidebar />
        </div>

        <div className="flex-1 w-full ml-[60px]">
          {verifiedEmail ? (
            <div className="w-full max-h-screen pt-24 overflow-scroll">
              {children}
            </div>
          ) : (
            <div className="w-full min-h-screen pt-16 flex flex-col items-center">
              <div className="grid grid-cols-3 place-items-center">
                <Image
                  src={"/verifyEmail.png"}
                  alt="verify"
                  priority={false}
                  loading="lazy"
                  placeholder="blur"
                  blurDataURL="data:image/png;base64,..."
                  width={250}
                  height={250}
                  className="w-9/12 md:w-10/12 lg:w-full"
                />
                <div className="text-sm flex justify-center items-center font-heading">
                  {/* SVG Icon */}
                  <svg
                    version="1.0"
                    xmlns="http://www.w3.org/2000/svg"
                    width="150px"
                    height="150px"
                    viewBox="0 0 300.000000 180.000000"
                    preserveAspectRatio="xMidYMid meet"
                    className="w-9/12 md:w-10/12 lg:w-full"
                  >
                    {/* SVG Paths */}
                  </svg>
                </div>
                <Image
                  src={"/octasolLandingLogo.png"}
                  alt="octologo"
                  priority={false}
                  loading="lazy"
                  placeholder="blur"
                  blurDataURL="data:image/png;base64,..."
                  width={250}
                  height={250}
                />
              </div>
              <div className="w-full justify-center items-center pb-12">
                <p className="text-center text-2xl md:text-4xl font-normal">
                  Verify Your Email
                </p>
                <p className="text-center w-full pt-6 text-sm md:text-base text-gray-400">
                  Enter your email and click on send OTP
                </p>
              </div>
              <VerifyMail verify={verified} session={session} />
            </div>
          )}
        </div>
      </div>
    </>
  );
};
export default Layout;
