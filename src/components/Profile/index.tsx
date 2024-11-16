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
  X,
} from "lucide-react";
import NextButton from "@/components/Button/NextButton";
import { useDispatch, useSelector } from "react-redux";
import {
  setDescription,
  setDiscord,
  setImage,
  setLink,
  setName,
  setSponsorId,
  setTelegram,
  setTwitter,
} from "@/app/Redux/Features/profile/profileSlice";
import { Textarea } from "@/components/ui/textarea";
import { POST } from "@/config/axios/requests";
import { uploadImage } from "@/lib/utils";

type Props = {
  onPrev: () => void;
  onNext: () => void;
};

const Profile = ({ onPrev, onNext }: Props) => {
  const [avatar, setAvatar] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const user = useSelector((state: any) => state.user);
  const dispatch = useDispatch();
  const profile = useSelector((state: any) => state.profile);

  const removeImage = (event: React.MouseEvent) => {
    event.stopPropagation();
    setAvatar("");
    dispatch(setImage(""));
  };

  const handleAvatarChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith("image/")) {
      const image = await uploadImage(file);
      console.log("image", image);
      setAvatar(image);
      dispatch(setImage(image));
    }
  };

  const handleDrop = async (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(false);
    const file = event.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
      const image = await uploadImage(file);
      console.log("image", image);
      setAvatar(image);
      dispatch(setImage(image));
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

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.name);
    switch (event.target.name) {
      case "name":
        dispatch(setName(event.target.value));
        break;
      case "link":
        dispatch(setLink(event.target.value));
        break;
      case "twitter":
        dispatch(setTwitter(event.target.value));
        break;
      case "telegram":
        dispatch(setTelegram(event.target.value));
        break;
      case "discord":
        dispatch(setDiscord(event.target.value));
        break;
    }
  };

  const handleDescriptionChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    dispatch(setDescription(event.target.value));
  };

  const setProfile = async (id: bigint) => {
    const { response, error } = await POST("/unescrowedprofile", {
      userId: id,
      ...profile,
    });
    if (response) {
      console.log(response);
      if (response.status === 200) {
        console.log("Profile submitted successfully");
        dispatch(setSponsorId(response?.data?.response?.id));
        onNext();
      }
    }
    if (error) {
      console.log(error);
    }
  };

  return (
    <Card className="">
      <CardHeader>
        <CardTitle>Profile</CardTitle>
        <CardDescription>
          Make changes to your account here. Click save when you&apos;re done.
        </CardDescription>
      </CardHeader>
      <CardContent className="py-4 px-4 md:px-12">
        <div className="flex flex-col gap-4">
          <div
            className="relative flex gap-6 md:gap-12 w-full border-[1px] border-gray-900 rounded-lg p-4 cursor-pointer"
            onClick={() => document.getElementById("avatar-upload")?.click()}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
          >
            <Avatar>
              <AvatarImage src={profile?.image || ""} alt="User image" />
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
            <div className="w-full flex justify-center items-center mr-0 md:mr-12">
              {isDragging ? (
                <div className="text-blue-500 flex items-center gap-2">
                  <Upload size={20} />
                  <p>You can drop here</p>
                </div>
              ) : (
                <p className="text-xs md:text-sm">
                  Choose or drag and drop media
                </p>
              )}
            </div>
            <X color="white" size={32} onClick={removeImage} />
          </div>
          <div className="w-full grid grid-cols-1  gap-4">
            <div className=" grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-1">
                <Label htmlFor="first-name">Name</Label>
                <Input
                  id="first-name"
                  placeholder="Enter your name"
                  name="name"
                  value={profile.name}
                  onChange={handleChange}
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="first-name">Website link</Label>
                <Input
                  id="first-name"
                  placeholder="Enter your Website link"
                  name="link"
                  value={profile.link}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
          <div className=" grid grid-cols-1 gap-6">
            <div className="space-y-1">
              <Label htmlFor="first-name">Description</Label>
              <Textarea
                id="first-name"
                placeholder="Enter your Project Description"
                name="description"
                value={profile.description}
                onChange={handleDescriptionChange}
              />
            </div>
          </div>{" "}
          <div className=" grid grid-cols-1 md:grid-cols-2 gap-6">
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
          </div>
          <div className=" grid grid-cols-1 md:grid-cols-2 gap-6">
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

          <NextButton
            onClick={() => setProfile(user?.githubId)}
            disabled={!profile.name || !profile.description}
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

export default Profile;
