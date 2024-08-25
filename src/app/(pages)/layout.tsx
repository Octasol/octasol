"use client";
import Sidebar from "@/components/Sidebar";
import VerifyMail from "@/components/verifyMail";
import { GET } from "@/config/axios/requests";
import { useSession } from "next-auth/react";
import React, { ReactNode, useEffect, useState } from "react";

type Props = { children: ReactNode };

const Layout = ({ children }: Props) => {
  const { data: session } = useSession() as any;
  const [verifiedEmail, setVerifiedEmail] = useState(false);

  const verified = async () => {
    if (session) {
      try {
        const response = await GET("/user", {
          Authorization: `Bearer ${session.accessToken as string}`,
        });
        setVerifiedEmail(response?.verifiedEmail);
      } catch (err) {
        console.error("Failed to run POST request:", err);
      }
    } else {
      console.log("No session found");
    }
  };

  useEffect(() => {
    verified();
  }, [session]);

  return (
    <>
      <div className="flex w-full h-full">
        <div className="w-fit hidden md:flex">
          <Sidebar />
        </div>
        {verifiedEmail ? (
          <div className="w-full min-h-screen pt-24 md:ms-20">{children}</div>
        ) : (
          <div className="w-full min-h-screen pt-24 md:ms-20 flex justify-center items-center">
            <VerifyMail verify={verified} />
          </div>
        )}
      </div>
    </>
  );
};

export default Layout;
