"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useEffect, useState } from "react";
import Profile from "../../../components/Profile";
import Bounty from "../../../components/Bounty";
import SubHeading from "../../../components/SubHeading";
import { useSelector } from "react-redux";

export default function ListUnescrowed() {
  const user = useSelector((state: any) => state.user);
  useEffect(() => {
    console.log(user);
  }, [user]);
  const [activeTab, setActiveTab] = useState<string>(
    localStorage.getItem("activeTab") || "subheading"
  );

  const handleNextClick = (value: string) => {
    localStorage.setItem("activeTab", value);
    setActiveTab(value);
  };

  const handlePrevClick = (value: string) => {
    localStorage.setItem("activeTab", value);
    setActiveTab(value);
  };

  return (
    <div className="w-full flex justify-center items-center">
      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="w-11/12  md:w-10/12 lg:w-8/12 px-0 md:px-5"
      >
        <TabsList className="grid w-full h-full grid-cols-1 grid-rows-3 md:grid-cols-3 md:grid-rows-1 mb-12">
          <TabsTrigger value="subheading" className="pointer-events-none">
            Who Are You?
          </TabsTrigger>
          <TabsTrigger value="profile" className="pointer-events-none">
            Profile
          </TabsTrigger>
          <TabsTrigger value="bounty" className="pointer-events-none">
            Bounty
          </TabsTrigger>
        </TabsList>
        <TabsContent value="subheading">
          <SubHeading onNext={() => handleNextClick("profile")} />
        </TabsContent>
        <TabsContent value="profile">
          <Profile
            onPrev={() => handlePrevClick("subheading")}
            onNext={() => handleNextClick("bounty")}
          />
        </TabsContent>
        <TabsContent value="bounty">
          <Bounty
            onPrev={() => handlePrevClick("profile")}
            setActiveTab={() => setActiveTab("subheading")}
            // onNext={() => handleNextClick("bunty")}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}
