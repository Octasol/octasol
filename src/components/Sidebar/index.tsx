import Image from "next/image";
import React from "react";

type Props = {};

const Sidebar = (props: Props) => {
  return (
    <div className="min-w  pt-24 pb-4 h-screen overflow-auto border-r border-slate-800/50 flex flex-col">
      <Image src="/octasolLandingLogo.png" alt="logo" width={80} height={80} />
      <Image src="/octasolLandingLogo.png" alt="logo" width={80} height={80} />
      <Image src="/octasolLandingLogo.png" alt="logo" width={80} height={80} />
    </div>
  );
};

export default Sidebar;
