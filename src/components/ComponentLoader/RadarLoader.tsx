import React from "react";

type Props = {};

const RadarLoader = (props: Props) => {
  return (
    <div className="flex flex-col space-y-3 w-full justify-center items-center min-h-[250px]">
      <div className="flex space-x-2 justify-center items-center h-fit dark:invert opacity-70">
        <div className="h-5 w-5 bg-black rounded-full animate-bounce [animation-delay:-0.3s]"></div>
        <div className="h-5 w-5 bg-black rounded-full animate-bounce [animation-delay:-0.15s]"></div>
        <div className="h-5 w-5 bg-black rounded-full animate-bounce"></div>
      </div>
    </div>
  );
};

export default RadarLoader;
