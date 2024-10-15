"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import Login from "../Login/Login";

type Props = {};

const Header = (props: Props) => {
  return (
    <>
      <nav className="text-white fixed top-0 right-0 left-0 w-full h-20 flex justify-between items-center md:px-20 px-2 py-6 bg-black z-50 ">
        <div className="flex justify-center items-center">
          <Link href="/" passHref>
            <Image
              src="/octasolLandingLogo.png"
              alt="logo"
              width={80}
              height={80}
              placeholder="blur"
              blurDataURL="data:image/png;base64,..."
              priority={false}
              loading="lazy"
            />
          </Link>
          <span className="text-sm font-bold tracking-widest">Beta</span>
        </div>
        <div className="flex items-center gap-6">
          <Login />
        </div>
      </nav>
    </>
  );
};

export default Header;
