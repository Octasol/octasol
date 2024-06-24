"use client";
import Image from "next/image";
import React from "react";
import { useSelector } from "react-redux";

type Props = {};

const ProfileImage = (props: Props) => {
  const user = useSelector((state: any) => state.user);

  return (
    <>
      {user?.photo ? (
        <Image
          src={user?.photo || ""}
          alt="user profile image"
          width={40}
          height={40}
          className="rounded-full"
        ></Image>
      ) : (
        <> </>
      )}
    </>
  );
};

export default ProfileImage;
