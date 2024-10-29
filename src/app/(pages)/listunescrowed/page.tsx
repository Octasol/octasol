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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import Tab1 from "./component/Tab1";
import TabNavigation from "./component/TabNavigation";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

export default function ListUnescrowed() {
  const [activeTab, setActiveTab] = useState<string>("personal_Details");

  const handleNextClick = (value: string) => {
    setActiveTab(value);
  };

  const handlePrevClick = (value: string) => {
    setActiveTab(value);
  };

  return (
    <div className="w-full flex justify-center items-center">
      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="container px-5"
      >
        <TabsList className="grid w-full h-full grid-cols-1 grid-rows-3 md:grid-cols-5 md:grid-rows-1 mb-12">
          <TabsTrigger value="personal_Details" className="pointer-events-none">
            Personal Details
          </TabsTrigger>
          <TabsTrigger value="password" className="pointer-events-none">
            Password
          </TabsTrigger>
        </TabsList>
        <TabsContent value="personal_Details">
          <Tab1 onNext={() => handleNextClick("password")} />
        </TabsContent>
        <TabsContent value="password">
          <Card className="">
            <CardHeader>
              <CardTitle>Profile</CardTitle>
              <CardDescription>
                Make changes to your account here. Click save when you're done.
              </CardDescription>
            </CardHeader>
            <CardContent className="py-8">
              <div className="flex gap-12 items-center">
                <Avatar>
                  <AvatarImage
                    src="https://github.com/shadcn.png"
                    alt="@shadcn"
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <div className="w-full grid grid-cols-1 grid-rows-2 md:grid-cols-2 md:grid-rows-1 gap-4 md:gap-12">
                  <div className="space-y-1">
                    <Label htmlFor="current">Current password</Label>
                    <Input id="current" type="password" />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="new">New password</Label>
                    <Input id="new" type="password" />
                  </div>
                </div>
              </div>
            </CardContent>

            <CardFooter>
              <TabNavigation
                onPrev={() => handlePrevClick("personal_Details")}
                onNext={() => handleNextClick("")}
              />
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
