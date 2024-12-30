import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ArrowBigRight } from "lucide-react";
import NextButton from "@/components/Button/NextButton";
import { useDispatch, useSelector } from "react-redux";
import {
  setDescription,
  setDiscord,
  setImage,
  setLink,
  setName,
  setPredefined,
  setSubHeading,
  setTelegram,
  setTwitter,
} from "@/app/Redux/Features/profile/profileSlice";
import { GET } from "@/config/axios/requests";

type Props = {
  onNext: (value: any) => void;
};

const SubHeading = ({ onNext }: Props) => {
  const dispatch = useDispatch();
  const profile = useSelector((state: any) => state.profile);
  const user = useSelector((state: any) => state.user);
  const [sponsorProfiles, setSponsorProfiles] = useState<any>([]);

  const handleSelect = (value: string) => {
    dispatch(setSubHeading(value));
  };

  const getProfile = async (id: bigint) => {
    if (id) {
      const response = await GET(`/unescrowedprofile?userId=${id.toString()}`);
      console.log(response);
      setSponsorProfiles(response.sponsor);
    }
  };

  useEffect(() => {
    if (user?.githubId) getProfile(user?.githubId as bigint);
  }, [user]);

  const setProfile = (profile: any) => {
    console.log(profile);
    dispatch(setSubHeading(profile?.type));
    dispatch(setName(profile?.name));
    dispatch(setLink(profile?.link));
    dispatch(setDescription(profile?.description));
    dispatch(setImage(profile?.image));
    dispatch(setTelegram(profile?.telegram));
    dispatch(setDiscord(profile?.discord));
    dispatch(setTwitter(profile?.twitter));
    dispatch(setPredefined(true));
    onNext("bounty");
    localStorage.setItem("activeTab", "bounty");
  };

  return (
    <div className="flex flex-col ">
      <Card className="">
        <CardHeader>
          <CardTitle>Who Are You?</CardTitle>
          <CardDescription>
            Make changes to your account here. Click save when you&apos;re done.
          </CardDescription>
        </CardHeader>
        <CardContent className="py-8">
          <div className="w-full grid grid-cols-1 grid-rows-2 md:grid-cols-2 md:grid-rows-1 gap-8 lg:gap-0">
            <Card
              onClick={() => handleSelect("Individual")}
              className={`lg:mx-10 p-5 py-8 flex flex-col gap-5 justify-center items-center 
                hover:shadow-lg hover:shadow-[#34597e]
                ${
                  profile?.subHeading != "Organization"
                    ? "shadow-[#34597e] shadow-lg"
                    : "opacity-50 "
                }`}
            >
              <CardTitle className="flex justify-center items-center text-xl">
                Individual
              </CardTitle>
              <CardDescription>
                Ideal for freelancers or solo creators looking to complete tasks
                independently. Select this if you&apos;re working on your own.
              </CardDescription>
            </Card>
            <Card
              onClick={() => handleSelect("Organization")}
              className={`lg:mx-10 p-5 py-8 flex flex-col gap-5 justify-center items-center 
                hover:shadow-lg hover:shadow-[#34597e]
                ${
                  profile?.subHeading !== "Individual"
                    ? "shadow-[#34597e] shadow-lg"
                    : "opacity-50 "
                }`}
            >
              <CardTitle className="flex justify-center items-center text-xl">
                Organization
              </CardTitle>
              <CardDescription>
                Perfect for businesses or teams managing bounties on behalf of a
                group. Choose this if you&apos;re posting tasks as a company or
                community.
              </CardDescription>
            </Card>
          </div>
        </CardContent>
        <CardFooter className="w-full flex justify-end">
          <NextButton
            onClick={() => onNext("profile")}
            disabled={!profile?.subHeading}
          >
            <div className="flex items-center gap-2">
              NEXT
              <ArrowBigRight size={20} />
            </div>
          </NextButton>
        </CardFooter>
      </Card>
      <div className="flex flex-col justify-center items-center py-12  gap-6">
        <p className="text-center text-xl lg:text-2xl font-semibold leading-none tracking-wide">
          or choose existing profile...
        </p>
        <div className="w-full h-full gap-6 flex justify-center items-center flex-wrap">
          {sponsorProfiles.map((profile: any, index: number) => (
            <div
              key={index}
              className="flex flex-col gap-2 justify-center items-center cursor-pointer"
              onClick={() => setProfile(profile)}
            >
              <Avatar>
                <AvatarImage src={profile?.image} alt="sponsor" />
                <AvatarFallback>{`${(profile?.name).slice(
                  0,
                  2
                )}...`}</AvatarFallback>
              </Avatar>

              <p className="text-xs lg:text-sm font-semibold">
                {profile?.name}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SubHeading;
