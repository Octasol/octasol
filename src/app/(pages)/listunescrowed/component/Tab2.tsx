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
import React, { useState } from "react";
import {
  ArrowBigLeft,
  ArrowBigRight,
  Camera,
  Upload,
  User2Icon,
} from "lucide-react";
import NextButton from "@/components/Button/NextButton";

type Props = {
  onPrev: () => void;
  onNext: () => void;
};

const Tab2 = ({ onPrev, onNext }: Props) => {
  const [avatar, setAvatar] = useState<string | null>("");
  const [isDragging, setIsDragging] = useState(false);

  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatar(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(false);
    const file = event.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatar(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    if (!isDragging) {
      setIsDragging(true);
    }
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };
  return (
    <Card className="">
      <CardHeader>
        <CardTitle>Profile</CardTitle>
        <CardDescription>
          Make changes to your account here. Click save when you're done.
        </CardDescription>
      </CardHeader>
      <CardContent className="py-4 px-12">
        <div className="flex flex-col gap-4">
          <div
            className="relative flex gap-12 w-full border-[1px] border-gray-900 rounded-lg p-4 cursor-pointer"
            onClick={() => document.getElementById("avatar-upload")?.click()}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
          >
            <Avatar>
              <AvatarImage src={avatar || ""} alt="User avatar" />
              <AvatarFallback>
                <User2Icon size={40} />
              </AvatarFallback>
              <label
                htmlFor="avatar-upload"
                className="absolute bottom-0 right-0 bg-white p-1 rounded-full shadow-md cursor-pointer"
              >
                <Camera size={16} className="text-gray-500" />
              </label>
            </Avatar>
            <input
              id="avatar-upload"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleAvatarChange}
            />
            <div className="w-full flex justify-center items-center mr-12">
              {isDragging ? (
                <div className="text-blue-500 flex items-center gap-2">
                  <Upload size={20} />
                  <p>You can drop here</p>
                </div>
              ) : (
                <p>Choose or drag and drop media</p>
              )}
            </div>
          </div>
          <div className="w-full grid grid-cols-1  gap-4">
            <div className=" grid grid-cols-2 gap-6">
              <div className="space-y-1">
                <Label htmlFor="first-name">Name</Label>
                <Input id="first-name" placeholder="Enter your name" />
              </div>
              <div className="space-y-1">
                <Label htmlFor="first-name">Website link</Label>
                <Input id="first-name" placeholder="Enter your Website link" />
              </div>
            </div>
          </div>
          <div className=" grid grid-cols-1 gap-6">
            <div className="space-y-1">
              <Label htmlFor="first-name">Description</Label>
              <Input
                id="first-name"
                placeholder="Enter your Project Description"
              />
            </div>
          </div>{" "}
          <div className=" grid grid-cols-2 gap-6">
            <div className="space-y-1">
              <Label htmlFor="first-name">Github</Label>
              <Input id="first-name" placeholder="https://github.com/...." />
            </div>
            <div className="space-y-1">
              <Label htmlFor="first-name">Twitter</Label>
              <Input id="first-name" placeholder="@your_twitter_handle" />
            </div>
          </div>
          <div className=" grid grid-cols-2 gap-6">
            <div className="space-y-1">
              <Label htmlFor="first-name">Telegram</Label>
              <Input id="first-name" placeholder="@your_telegram_handle" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="first-name">Discord</Label>
              <Input id="first-name" placeholder="your_discord_handle" />
            </div>
          </div>
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

          <NextButton onClick={onNext}>
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

export default Tab2;
