import React from "react";

type Props = {};

const BottomGradient = () => {
  return (
    <>
      <span className="opacity-100 block transition duration-500  absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="opacity-100 blur-sm block transition duration-500  absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </>
  );
};

export default BottomGradient;
