"use client";

import LoginButton from "@/components/Button/LoginButton";
import { GET, POST } from "@/config/axios/requests";
import { Bounty } from "@/lib/types";
import { Send, Twitter, User } from "lucide-react";
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
import { toast } from "react-toastify";
import { decrement } from "@/app/Redux/Features/loader/loaderSlice";

const UserSubmisson = () => {
  return (
    <>
      <div className="w-full h-full flex flex-col md:flex-row gap-5  px-5">
        <section className=" rounded-xl w-full md:max-w-[400px] flex flex-col md:flex-row h-full sticky top-0 bg-[#0f0f0f] ">
          <div className="m-4">iuonoinionionon</div>
        </section>
        <div className="w-full h-full flex flex-col gap-5">
          <section className=" rounded-xl w-full  flex flex-col md:flex-row h-full  sticky top-0 bg-[#0f0f0f] ">
            <div className="m-4">iuonoinionionon</div>
          </section>
          <section className=" rounded-xl w-full  flex flex-col md:flex-row h-[1800px]  sticky top-0 bg-[#0f0f0f] ">
            <div className="m-4">iuonoinionionon</div>
          </section>
        </div>
      </div>
    </>
  );
};

export default UserSubmisson;
