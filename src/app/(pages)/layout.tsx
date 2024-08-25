"use client";
import Sidebar from "@/components/Sidebar";
import VerifyMail from "@/components/verifyMail";
import { GET } from "@/config/axios/requests";
import React, { ReactNode, useEffect, useState } from "react";
import { useSelector } from "react-redux";

type Props = { children: ReactNode };

const Layout = ({ children }: Props) => {
  const session = useSelector((state: any) => state.user);
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
      setVerifiedEmail(false);
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
            <VerifyMail verify={verified} session={session} />
          </div>
        )}
      </div>
    </>
  );
};

export default Layout;
