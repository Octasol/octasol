import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import React from "react";
import { ArrowBigLeft, ArrowBigRight } from "lucide-react";
import NextButton from "@/components/Button/NextButton";
import { useDispatch, useSelector } from "react-redux";
import MDEditor from "@uiw/react-md-editor";
import {
  resetProfile,
  setBountyDescription,
  setBountyName,
  setContact,
  setPrice,
  setSkills,
  setTime,
} from "@/app/Redux/Features/profile/profileSlice";
import { MultiSelect } from "@/components/ui/multi-select";
import { Cat, Dog, Fish, Rabbit, Turtle } from "lucide-react";
import { POST } from "@/config/axios/requests";
import { S3Client } from "@aws-sdk/client-s3";
import { createPresignedPost } from "@aws-sdk/s3-presigned-post";
import { nanoid } from "@reduxjs/toolkit";
import axios from "axios";

const frameworksList = [
  { value: "react", label: "React", icon: Turtle },
  { value: "angular", label: "Angular", icon: Cat },
  { value: "vue", label: "Vue", icon: Dog },
  { value: "svelte", label: "Svelte", icon: Rabbit },
  { value: "ember", label: "Ember", icon: Fish },
];

type Props = {
  onPrev: () => void;
  setActiveTab: () => void;
};

const Bounty = ({ onPrev, setActiveTab }: Props) => {
  const dispatch = useDispatch();
  const profile = useSelector((state: any) => state.profile);
  const user = useSelector((state: any) => state.user);

  const setSelectedFrameworks = (skill: string[]) => {
    dispatch(setSkills(skill));
  };

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
        break;
      }
      case "contact": {
        dispatch(setContact(event.target.value));
        break;
      }
      default: {
        break;
      }
    }
  };

  const setExpiryTime = (date: Date | undefined) => {
    const isoDate = date ? date.toISOString() : undefined;
    dispatch(setTime(isoDate));
  };

  const handleDescriptionChange = (value: string | undefined) => {
    dispatch(setBountyDescription(value || ""));
  };

  const submitProfile = async (id: bigint) => {
    console.log("submitting profile");
    const { response, error } = await POST("/unescrowedprofile", {
      userId: id,
      ...profile,
    });
    if (response) {
      console.log(response);
      if (response.status === 200) {
        console.log("Profile submitted successfully");
        dispatch(resetProfile());
        setActiveTab();
      }
    }
    if (error) {
      console.log(error);
    }
  };

  const uploadImage = async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append("file", file);

    // Send the file to the backend to handle S3 upload
    const { response, error } = await POST("/uploadImage", formData, {
      "Content-Type": "multipart/form-data",
    });

    if (error || !response?.data?.url) {
      throw new Error("Failed to upload image");
    }

    return response.data.url;
  };

  const handleDrop = async (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];

    if (file && file.type.startsWith("image/")) {
      const imageUrl = await uploadImage(file);
      const markdownImageSyntax = `![Image Description](${imageUrl})\n`;
      handleDescriptionChange(profile.bountyDescription + markdownImageSyntax);
    }
  };

  return (
    <Card className="">
      <CardHeader>
        <CardTitle>Bounty</CardTitle>
        <CardDescription>
          Make changes to your account here. Click save when you&apos;re done.
        </CardDescription>
      </CardHeader>
      <CardContent className="py-4 px-12">
        <div className="flex flex-col gap-4">
          {/* <div className=" flex gap-12 w-full border-[1px] border-gray-900 rounded-lg p-4 ">
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
          </div> */}
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
                  value={profile.price && `$${profile.price}`}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-6">
            <div className="space-y-1">
              <Label htmlFor="bounty-description">Bounty Description</Label>
              <div onDrop={handleDrop} onDragOver={(e) => e.preventDefault()}>
                <MDEditor
                  value={profile.bountyDescription}
                  onChange={handleDescriptionChange}
                  preview="edit"
                  height={200}
                  textareaProps={{
                    placeholder: "Enter your Project Description in Markdown",
                  }}
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6">
            <div className="space-y-1">
              <Label htmlFor="bounty-description">Skills</Label>

              <MultiSelect
                options={frameworksList}
                onValueChange={setSelectedFrameworks}
                defaultValue={profile.skills}
                placeholder="Select Skills"
                variant="inverted"
                maxCount={5}
              />
            </div>
          </div>

          <div className=" grid grid-cols-2 gap-6">
            <div className="space-y-1">
              <Label htmlFor="first-name">Expiry Time</Label>
              <div className="mt-2">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        `flex text-left justify-start gap-8 h-10 w-full border-none bg-gray-50 dark:bg-zinc-800 text-black dark:text-white shadow-input rounded-md px-3 py-2 text-sm  file:border-0 file:bg-transparent 
          file:text-sm file:font-medium placeholder:text-neutral-400 dark:placeholder-text-neutral-600 
          focus-visible:outline-none focus-visible:ring-[2px]  focus-visible:ring-neutral-400 dark:focus-visible:ring-neutral-600
           disabled:cursor-not-allowed disabled:opacity-50
           dark:shadow-[0px_0px_1px_1px_var(--neutral-700)]
           group-hover/input:shadow-none transition duration-400 mt-2`,
                        !profile.time && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon />
                      {profile.time ? (
                        format(profile.time, "PPP")
                      ) : (
                        <span>Pick a profile.time</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-full" align="start">
                    <Calendar
                      mode="single"
                      selected={profile.time}
                      onSelect={setExpiryTime}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
            <div className="space-y-1 ">
              <Label htmlFor="first-name">Contact</Label>
              <Input
                id="first-name"
                placeholder="@your_contact_handle"
                name="contact"
                value={profile.contact}
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
            onClick={() => submitProfile(user?.githubId)}
            disabled={
              !profile.bountyname ||
              !profile.bountyDescription ||
              !profile.price ||
              !profile.skills.length ||
              !profile.time ||
              !profile.contact
            }
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
