"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import React, { useEffect, useState } from "react";
import { ArrowBigLeft, ArrowBigRight } from "lucide-react";
import NextButton from "@/components/Button/NextButton";
import { useDispatch, useSelector } from "react-redux";

import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";
import {
  setBountyDescription,
  setBountyName,
  setPrice,
} from "@/app/Redux/Features/profile/profileSlice";

type Props = {
  onPrev: () => void;
  onNext: () => void;
};

const Bounty = ({ onPrev, onNext }: Props) => {
  const dispatch = useDispatch();
  const profile = useSelector((state: any) => state.profile);

  useEffect(() => {
    console.log(profile);
  }, [profile]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.name);
    switch (event.target.name) {
      case "bountyname": {
        dispatch(setBountyName(event.target.value));
        break;
      }
      case "price": {
        const numericValue = event.target.value.replace(/\D/g, "");
        if (/^\d*$/.test(numericValue)) {
          dispatch(setPrice(numericValue ? parseInt(numericValue, 10) : 0));
        }
      }
      default: {
        break;
      }
    }
  };

  const handleDescriptionChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    dispatch(setBountyDescription(event.target.value));
  };

  return (
    <Card className="">
      <CardHeader>
        <CardTitle>Profile</CardTitle>
        <CardDescription>
          Make changes to your account here. Click save when you&apos;re done.
        </CardDescription>
      </CardHeader>
      <CardContent className="py-4 px-12">
        <div className="flex flex-col gap-4">
          <div className=" flex gap-12 w-full border-[1px] border-gray-900 rounded-lg p-4 ">
            <Image
              src={profile.image}
              alt="user image"
              className="aspect-square rounded-md"
              width={100}
              height={100}
            />

            <div className="w-full flex flex-col justify-center items-center mr-12 gap-2">
              <p className="underline underline-offset-4">{profile.name}</p>
              <p className="text-gray-500">{profile.description}</p>
            </div>
          </div>
          <div className="w-full grid grid-cols-1  gap-4">
            <div className=" grid grid-cols-2 gap-6">
              <div className="space-y-1">
                <Label htmlFor="first-name">Bounty Name</Label>
                <Input
                  id="first-name"
                  placeholder="Enter your name"
                  name="bountyname"
                  value={profile.bountyname}
                  onChange={handleChange}
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="first-name">Bounty Price</Label>
                <Input
                  id="first-name"
                  placeholder="Enter Bounty Price"
                  name="price"
                  value={`$${profile.price || ""}`}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
          <div className=" grid grid-cols-1 gap-6">
            <div className="space-y-1">
              <Label htmlFor="first-name">Bounty Description</Label>
              <Textarea
                id="first-name"
                placeholder="Enter your Project Description"
                name="bountyDescription"
                value={profile.bountyDescription}
                onChange={handleDescriptionChange}
              />
            </div>
          </div>{" "}
          {/* <div className=" grid grid-cols-2 gap-6">
            <div className="space-y-1">
              <Label htmlFor="first-name">Github</Label>
              <Input
                id="first-name"
                placeholder="https://github.com/...."
                value={user?.login}
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="first-name">Twitter</Label>
              <Input
                id="first-name"
                placeholder="@your_twitter_handle"
                name="twitter"
                value={profile.twitter}
                onChange={handleChange}
              />
            </div>
          </div> */}
          {/* <div className=" grid grid-cols-2 gap-6">
            <div className="space-y-1">
              <Label htmlFor="first-name">Telegram</Label>
              <Input
                id="first-name"
                placeholder="@your_telegram_handle"
                name="telegram"
                value={profile.telegram}
                onChange={handleChange}
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="first-name">Discord</Label>
              <Input
                id="first-name"
                placeholder="your_discord_handle"
                name="discord"
                value={profile.discord}
                onChange={handleChange}
              />
            </div>
          </div> */}
        </div>
      </CardContent>

      <CardFooter>
        <div className="w-full flex justify-between items-center">
          <NextButton onClick={onPrev}>
            <div className="flex gap-2 items-center">
              <ArrowBigLeft size={20} />
              PREV
            </div>
          </NextButton>

          <NextButton
            onClick={onNext}
            disabled={!profile.name || !profile.image}
          >
            <div className="flex gap-2 items-center">
              NEXT
              <ArrowBigRight size={20} />
            </div>
          </NextButton>
        </div>
      </CardFooter>
    </Card>
  );
};

export default Bounty;
