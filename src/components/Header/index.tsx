import Image from "next/image";
import Link from "next/link";
import React from "react";

type Props = {};

const Header = (props: Props) => {
  return (
    <nav className="text-white fixed top-0 right-0 left-0 w-full h-20 flex justify-between items-center md:px-32 px-8 py-4 ">
      {/* <div className="text-xl md:text-2xl font-bold"></div> */}
      <Image src="/octasolLandingLogo.png" alt="logo" width={80} height={80} ></Image>
      <Link
        href="/dashboard"
        className="bg-slate-800 no-underline group cursor-pointer relative shadow-2xl shadow-zinc-900 rounded-full p-px text-xs font-semibold leading-6  text-white inline-block"
      >
        <span className="absolute inset-0 overflow-hidden rounded-full">
          <span className="absolute inset-0 rounded-full bg-[image:radial-gradient(75%_100%_at_50%_0%,rgba(56,189,248,0.6)_0%,rgba(56,189,248,0)_75%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100"></span>
        </span>
        <div className="relative flex space-x-2 justify-between items-center z-10 rounded-full bg-zinc-950 py-2 px-4 ring-1 ring-white/10 ">
          <span className="text-sm md:text-base">Connect with us</span>
          <span className="pt-[2px]">&gt;</span>
        </div>
        <span className="absolute -bottom-0 left-[1.125rem] h-px w-[calc(100%-2.25rem)] bg-gradient-to-r from-emerald-400/0 via-emerald-400/90 to-emerald-400/0 transition-opacity duration-500 group-hover:opacity-40"></span>
      </Link>
    </nav>
  );
};

export default Header;
