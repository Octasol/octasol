import Image from "next/image";
import React from "react";
import Login from "../Button/Login";

type Props = {};

const Header = (props: Props) => {
  return (
    <>
      <nav className="text-white fixed top-0 right-0 left-0 w-full h-20 flex justify-between items-center md:px-20 px-8 py-6 bg-black z-50 ">
        <Image
          src="/octasolLandingLogo.png"
          alt="logo"
          width={80}
          height={80}
        />
        <div className="flex items-center gap-6">
          <Login />
        </div>
      </nav>
    </>
  );
};

export default Header;
