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
      <div className="flex w-full h-full">
        <div className="w-fit hidden md:flex">
          <Sidebar />
        </div>
        {verifiedEmail ? (
          <div className="w-full min-h-screen pt-24 md:ms-[72px]">
            {children}
          </div>
        ) : (
          <div className="w-full min-h-screen pt-16 md:ms-20 flex flex-col items-center">
            <div className="grid grid-cols-3 place-items-center">
              <Image
                src={"/verifyEmail.png"}
                alt="verify "
                priority={false}
                loading="lazy"
                placeholder="blur"
                blurDataURL="data:image/png;base64,..."
                width={250}
                height={250}
                className="w-9/12 md:w-10/12 lg:w-full"
              />
              <div className="text-sm flex justify-center items-center font-heading">
                <svg
                  version="1.0"
                  xmlns="http://www.w3.org/2000/svg"
                  width="150px"
                  height="150px"
                  viewBox="0 0 300.000000 180.000000"
                  preserveAspectRatio="xMidYMid meet"
                  className="w-9/12 md:w-10/12 lg:w-full"
                >
                  <g
                    transform="translate(0.000000,180.000000) scale(0.100000,-0.100000)"
                    fill="#ffffff"
                    stroke="none"
                  >
                    <path
                      d="M2239 1592 c-82 -53 -673 -617 -685 -654 -3 -11 5 -38 22 -66 20 -35
22 -43 8 -30 -31 27 -69 32 -100 12 -39 -26 -394 -405 -394 -421 0 -7 -4 -13
-10 -13 -5 0 -10 -6 -10 -12 0 -7 101 88 224 211 l224 224 25 -20 c14 -10 49
-41 78 -68 51 -46 57 -49 110 -49 l56 -1 -104 109 -104 109 218 210 c459 444
525 512 442 459z"
                    />
                    <path
                      d="M1971 1261 c-171 -181 -311 -332 -311 -334 0 -2 61 -66 136 -141 74
-76 134 -139 132 -140 -2 -1 -62 0 -135 2 l-132 4 -67 76 c-37 42 -70 78 -73
79 -3 1 -103 -92 -221 -207 -118 -115 -212 -209 -208 -210 9 0 140 105 194
156 116 110 218 199 226 199 6 0 41 -31 79 -70 l68 -70 127 0 c120 0 127 1
145 24 10 13 19 30 19 38 0 8 -52 68 -115 132 -63 65 -115 121 -115 126 0 8
39 53 134 155 338 363 440 480 419 480 -4 0 -1 4 7 10 8 5 12 12 8 15 -3 3
-146 -142 -317 -324z"
                    />
                    <path
                      d="M1739 1336 c-46 -41 -118 -108 -159 -150 -41 -42 -81 -76 -90 -76 -8
1 -33 23 -55 51 -65 81 -84 89 -216 89 -88 0 -120 -4 -137 -16 -44 -30 -30
-57 95 -185 64 -65 114 -121 112 -123 -2 -3 -105 -110 -229 -238 -288 -297
-330 -343 -330 -356 0 -6 -5 -12 -11 -14 -7 -2 -10 -9 -8 -16 2 -7 148 132
324 308 l320 320 -140 140 -140 140 134 -2 134 -3 73 -82 73 -81 153 161 c166
176 194 207 186 207 -3 0 -43 -33 -89 -74z"
                    />
                    <path
                      d="M1713 1253 c-70 -76 -150 -161 -178 -190 l-50 -53 -77 70 c-76 70
-76 70 -134 70 l-59 0 109 -109 108 -109 -43 -38 c-118 -106 -533 -488 -599
-552 -67 -65 -71 -70 -35 -51 51 27 114 80 416 353 135 121 256 236 269 254
24 35 23 46 -16 100 l-17 23 37 -22 c30 -18 42 -20 61 -11 39 18 365 402 342
402 -3 0 -63 -62 -134 -137z"
                    />
                  </g>
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
    </>
  );
};
export default Layout;
