"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import Tab1 from "./component/Tab1";
import Tab2 from "./component/Tab2";

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
        className="w-11/12  md:w-10/12 lg:w-8/12 px-0 md:px-5"
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
          <Tab2
            onPrev={() => handlePrevClick("personal_Details")}
            onNext={() => handleNextClick("password")}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}
