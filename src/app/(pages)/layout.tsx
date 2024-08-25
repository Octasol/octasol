"use client";
import Sidebar from "@/components/Sidebar";
import VerifyMail from "@/components/verifyMail";
import { GET } from "@/config/axios/requests";
import React, { ReactNode, useEffect, useState } from "react";
import { useSelector } from "react-redux";

type Props = { children: ReactNode };

const Layout = ({ children }: Props) => {
  const Session = useSelector((state: any) => state.user);
  const [verifiedEmail, setVerifiedEmail] = useState(false);

  const verified = async () => {
    if (Session) {
      try {
        const response = await GET("/user", {
          Authorization: `Bearer ${Session.accessToken as string}`,
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
  }, [Session]);

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
            <VerifyMail verify={verified} session={Session} />
          </div>
        )}
      </div>
    </>
  );
};

export default Layout;
