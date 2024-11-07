import React, { useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowBigRight } from "lucide-react";
import NextButton from "@/components/Button/NextButton";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { setSubHeading } from "@/app/Redux/Features/profile/profileSlice";

type Props = {
  onNext: () => void;
};

const SubHeading = ({ onNext }: Props) => {
  const dispatch = useDispatch();
  const profile = useSelector((state: any) => state.profile);

  const handleSelect = (value: string) => {
    dispatch(setSubHeading(value));
  };

  useEffect(() => {
    console.log(profile);
  }, [profile]);

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
          <NextButton onClick={onNext} disabled={!profile?.subHeading}>
            <div className="flex items-center gap-2">
              NEXT
              <ArrowBigRight size={20} />
            </div>
          </NextButton>
        </CardFooter>
      </Card>
      <div className="flex flex-col justify-center items-center py-12  gap-6">
        <p className="text-center text-xl lg:text-2xl font-semibold leading-none tracking-wide">
          or choose exixting profile...
        </p>
        <div className="w-full h-full gap-6 flex justify-center items-center flex-wrap">
          <Image
            src="/gfg.png"
            alt="org"
            width={45}
            height={45}
            className="rounded-lg"
          />
          <Image
            src="/gfg.png"
            alt="org"
            width={45}
            height={45}
            className="rounded-lg"
          />
        </div>
      </div>
    </div>
  );
};

export default SubHeading;
