"use client";
import React, { useEffect, useState } from "react";
import { CreditCard, ShieldCheck, Zap } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { usePathname } from "next/navigation";
import dynamic from "next/dynamic";
import axios from "axios";
import { DataObject, userNames } from "@/lib/types";
import Image from "next/image";
import { StatDetails } from "@/components/Charts/StatDetails";
import RadarLoader from "@/components/ComponentLoader/RadarLoader";
import { ProfileLoader } from "@/components/ComponentLoader/ProfileLoader";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";

const ScrollArea = dynamic(
  () => import("@/components/ui/scroll-area").then((mod) => mod.ScrollArea),
  {
    loading: () => <ProfileLoader />,
  }
);

const RadialChart = dynamic(
  () =>
    import("@/components/Charts/RadialChart").then((mod) => mod.RadialChart),
  {
    loading: () => <RadarLoader />,
  }
);

interface RadarObject {
  githubUsername?: string;
  githubPoints?: number;
  hackerrankPoints?: number;
  gfgPoints?: number;
  codechefPoints?: number;
  leetcodePoints?: number;
  superteamEarnPoints?: number;
}

export default function BentoGridDemo() {
  const pathname = usePathname();
  const [userName, setUserName] = useState<userNames>({
    githubUsername: "",
    superteamUsername: "",
    leetcodeUsername: "",
    codeforcesUsername: "",
    hackerrankUsername: "",
    codechefUsername: "",
    gfgUsername: "",
    gitlabUsername: "",
  });
  const [githubData, setGithubData] = useState<DataObject>({});
  const [hackerrankData, setHackerrankData] = useState<DataObject>({});
  const [codechefData, setCodechefData] = useState<DataObject>({});
  const [gfgData, setGfgData] = useState<DataObject>({});
  const [leetcodeData, setLeetcodeData] = useState<DataObject>({});
  const [superteamData, setSuperteamData] = useState<DataObject>({});
  const [radarData, setRadarData] = useState<RadarObject | null>(null);
  const [isRadarLoading, setIsRadarLoading] = useState<boolean>(true);
  const [isUserLoading, setIsUserLoading] = useState<boolean>(true);

  const userData = async (name: string) => {
    setIsUserLoading(true);
    try {
      const response = await axios.post("/api/user", { username: name });

      setGithubData(response?.data?.github);
      setHackerrankData(response?.data?.hackerrank);
      setCodechefData(response?.data?.codechef);
      setGfgData(response?.data?.gfg);
      setLeetcodeData(response?.data?.leetcodeProfile);
      setSuperteamData(response?.data?.superteamEarnProfile);

      setUserName((prev) => ({
        ...prev,
        githubUsername: response?.data.user?.githubUsername || "",
        superteamUsername: response?.data.user?.superteamUsername || "",
        leetcodeUsername: response?.data.user?.leetcodeUsername || "",
        codeforcesUsername: response?.data.user?.codeforcesUsername || "",
        hackerrankUsername: response?.data.user?.hackerrankUsername || "",
        codechefUsername: response?.data.user?.codechefUsername || "",
        gfgUsername: response?.data.user?.gfgUsername || "",
        gitlabUsername: response?.data.user?.gitlabUsername || "",
      }));
    } catch (error) {
      console.error("Error fetching user data:", error);
    } finally {
      setIsUserLoading(false);
    }

    try {
      const radarResponse = (await axios.get(`/api/radar?username=${name}`))
        .data;
      setRadarData(radarResponse);

      // Save radar data in localStorage
      localStorage.setItem(`radarData_${name}`, JSON.stringify(radarResponse));
    } catch (error) {
      console.error("Error fetching radar chart data:", error);
    } finally {
      setIsRadarLoading(false);
    }
  };

  useEffect(() => {
    const name = pathname.split("/profile/").pop();

    if (name) {
      // Step 1: Check for saved radar data in localStorage
      const savedRadarData = localStorage.getItem(`radarData_${name}`);
      if (savedRadarData) {
        // Step 2: Set saved radar data to the state and show it
        setRadarData(JSON.parse(savedRadarData));
        setIsRadarLoading(false);
      } else {
        // No saved data, indicate loading
        setIsRadarLoading(true);
      }

      // Step 3: Fetch new radar data
      userData(name);
    }
  }, [pathname]);

  const features = [
    {
      title: "Lightning Fast",
      description:
        "Experience blazing fast performance with our optimized solution.",
      icon: Zap,
      color: "bg-blue-500",
    },
    {
      title: "Secure",
      description:
        "Bank-grade security ensuring your data is always protected.",
      icon: ShieldCheck,
      color: "bg-green-500",
    },
    {
      title: "Easy Payments",
      description: "Seamless payment processing with multiple options.",
      icon: CreditCard,
      color: "bg-purple-500",
    },
  ];

  return (
    <>
      <div className="w-full flex flex-col justify-center items-center px-4 pb-12">
        <div className="w-full md:w-6/12">
          {isRadarLoading ? (
            <RadarLoader />
          ) : (
            radarData && <RadialChart stats={radarData} />
          )}
        </div>
        <ScrollArea className="w-full max-w-5xl ">
          {isUserLoading ? (
            <ProfileLoader />
          ) : (
            <Accordion type="single" collapsible>
              {userName.githubUsername && (
                <AccordionItem value="github">
                  <AccordionTrigger>
                    <div className="w-full flex justify-start items-center gap-6">
                      <Image
                        src="/assets/profile/github.webp"
                        alt="github"
                        className="invert"
                        width={40}
                        height={40}
                        priority={false}
                        loading="lazy"
                        placeholder="blur"
                        blurDataURL="data:image/png;base64,..."
                      />
                      <span className="text-base font-semibold ">
                        {userName.githubUsername}
                      </span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <StatDetails stats={githubData} />
                  </AccordionContent>
                </AccordionItem>
              )}

              {userName.superteamUsername && (
                <AccordionItem value="superteam">
                  <AccordionTrigger>
                    <div className="w-full flex justify-start items-center gap-6">
                      <Image
                        src="/assets/profile/superteam.jpeg"
                        alt="superteam"
                        className="rounded-full"
                        width={40}
                        height={40}
                        priority={false}
                        loading="lazy"
                        placeholder="blur"
                        blurDataURL="data:image/png;base64,..."
                      />
                      <span className="text-base font-semibold ">
                        {userName.superteamUsername}
                      </span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <StatDetails stats={superteamData} />
                  </AccordionContent>
                </AccordionItem>
              )}

              {userName.leetcodeUsername && (
                <AccordionItem value="leetcode">
                  <AccordionTrigger>
                    <div className="w-full flex justify-start items-center gap-6">
                      <Image
                        src="/assets/profile/leetcode.webp"
                        alt="leetcode"
                        className="rounded-full"
                        width={40}
                        height={40}
                        priority={false}
                        loading="lazy"
                        placeholder="blur"
                        blurDataURL="data:image/png;base64,..."
                      />
                      <span className="text-base font-semibold ">
                        {userName.leetcodeUsername}
                      </span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <StatDetails stats={leetcodeData} />
                  </AccordionContent>
                </AccordionItem>
              )}

              {userName.codeforcesUsername && (
                <AccordionItem value="codeforces">
                  <AccordionTrigger>Codeforces</AccordionTrigger>
                  <AccordionContent>
                    Username: {userName.codeforcesUsername}
                  </AccordionContent>
                </AccordionItem>
              )}

              {userName.hackerrankUsername && (
                <AccordionItem value="hackerrank">
                  <AccordionTrigger>
                    <div className="w-full flex justify-start items-center gap-6">
                      <Image
                        src="/assets/profile/hackerrank.webp"
                        alt="hackerrank"
                        className="rounded-full"
                        width={40}
                        height={40}
                        priority={false}
                        loading="lazy"
                        placeholder="blur"
                        blurDataURL="data:image/png;base64,..."
                      />
                      <span className="text-base font-semibold ">
                        {userName.hackerrankUsername}
                      </span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <StatDetails stats={hackerrankData} />
                  </AccordionContent>
                </AccordionItem>
              )}

              {userName.codechefUsername && (
                <AccordionItem value="codechef">
                  <AccordionTrigger>
                    <div className="w-full flex justify-start items-center gap-6">
                      <Image
                        src="/assets/profile/codechef.png"
                        alt="codechef"
                        className="rounded-full aspect-square"
                        width={40}
                        height={40}
                        priority={false}
                        loading="lazy"
                        placeholder="blur"
                        blurDataURL="data:image/png;base64,..."
                      />
                      <span className="text-base font-semibold ">
                        {userName.codechefUsername}
                      </span>
                    </div>
                  </AccordionTrigger>

                  <AccordionContent>
                    <StatDetails stats={codechefData} />
                  </AccordionContent>
                </AccordionItem>
              )}

              {userName.gfgUsername && (
                <AccordionItem value="gfg">
                  <AccordionTrigger>
                    <div className="w-full flex justify-start items-center gap-6">
                      <Image
                        src="/assets/profile/gfg.png"
                        alt="gfg"
                        className="rounded-full aspect-square"
                        width={40}
                        height={40}
                        priority={false}
                        loading="lazy"
                        placeholder="blur"
                        blurDataURL="data:image/png;base64,..."
                      />
                      <span className="text-base font-semibold ">
                        {userName.gfgUsername}
                      </span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <StatDetails stats={gfgData} />
                  </AccordionContent>
                </AccordionItem>
              )}

              {userName.gitlabUsername && (
                <AccordionItem value="gitlab">
                  <AccordionTrigger>GitLab</AccordionTrigger>
                  <AccordionContent>
                    Username: {userName.gitlabUsername}
                  </AccordionContent>
                </AccordionItem>
              )}
            </Accordion>
          )}
        </ScrollArea>
      </div>

      <div className="pt-5">
        <div className="h-full px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <div className="text-center pb-12">
              <h2 className="font-bold text-white text-2xl">
                Your Submissions
              </h2>
            </div>

            <div className="grid grid-cols-1 gap-12">
              {features.map((feature, index) => (
                <Card
                  key={index}
                  className="relative group  rounded-2xl shadow-sm p-8 transition-all duration-500 ease-in-out transform hover:-translate-y-1  cursor-pointer bg-black shadow-[#43aa8a]"
                >
                  <div
                    className={`absolute -top-4 left-6 ${feature.color} rounded-xl p-3 shadow-lg group-hover:scale-110 transition-transform duration-300`}
                  >
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>

                  <div className="mt-4">
                    <h3 className="text-xl font-semibold text-white mt-2">
                      {feature.title}
                    </h3>
                    <p className="mt-4 text-white leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
