"use client";
import NextButton from "@/components/Button/NextButton";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowBigRight } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

export default function ListUnescrowed() {
  const [selectedCard, setSelectedCard] = useState<string>("");

  const handleSelect = (value: string) => {
    setSelectedCard(value);
  };
  return (
    <div className="w-full  flex justify-center items-center">
      <Tabs defaultValue="personal_Details" className="max-w-6xl px-5">
        <TabsList className="grid w-full h-full grid-cols-1 grid-rows-3 md:grid-cols-5 md:grid-rows-1 mb-12">
          <TabsTrigger value="personal_Details">Personal Details</TabsTrigger>
          <TabsTrigger value="password">Password</TabsTrigger>
        </TabsList>
        <TabsContent value="personal_Details">
          <Card className="">
            <CardHeader>
              <CardTitle>Who Are You?</CardTitle>
              <CardDescription>
                Make changes to your account here. Click save when you're done.
              </CardDescription>
            </CardHeader>

            <CardContent className="py-8">
              <div className="w-full grid grid-cols-1 grid-rows-2 md:grid-cols-2 md:grid-rows-1 gap-8 lg:gap-0">
                <Card
                  onClick={() => handleSelect("Individual")}
                  className={`lg:mx-10 p-5 py-8 flex flex-col gap-5 justify-center items-center 
                hover:shadow-lg hover:shadow-[#34597e]
                ${
                  selectedCard != "Organization"
                    ? "shadow-[#34597e] shadow-lg"
                    : "opacity-50 "
                }`}
                >
                  <CardTitle className="flex justify-center items-center text-xl">
                    Individual
                  </CardTitle>
                  <CardDescription>
                    Ideal for freelancers or solo creators looking to complete
                    tasks independently. Select this if you&apos;re working on
                    your own.
                  </CardDescription>
                </Card>
                <Card
                  onClick={() => handleSelect("Organization")}
                  className={`lg:mx-10 p-5 py-8 flex flex-col gap-5 justify-center items-center 
                hover:shadow-lg hover:shadow-[#34597e]
                ${
                  selectedCard != "Individual"
                    ? "shadow-[#34597e] shadow-lg"
                    : "opacity-50 "
                }`}
                >
                  <CardTitle className="flex justify-center items-center text-xl">
                    Organization
                  </CardTitle>
                  <CardDescription>
                    Perfect for businesses or teams managing bounties on behalf
                    of a group. Choose this if you&apos;re posting tasks as a
                    company or community.
                  </CardDescription>
                </Card>
              </div>
            </CardContent>
            <CardFooter className="w-full flex justify-end">
              <NextButton>
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
        </TabsContent>
        <TabsContent value="password">
          <Card>
            <CardHeader>
              <CardTitle>Password</CardTitle>
              <CardDescription>
                Change your password here. After saving, you'll be logged out.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <Label htmlFor="current">Current password</Label>
                <Input id="current" type="password" />
              </div>
              <div className="space-y-1">
                <Label htmlFor="new">New password</Label>
                <Input id="new" type="password" />
              </div>
            </CardContent>
            <CardFooter>
              <Button>Save password</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
