"use client";
import React, { useEffect } from "react";
import { store } from "@/app/Redux/store";
import { decrement } from "@/app/Redux/Features/loader/loaderSlice";
import { useSelector } from "react-redux";
import Image from "next/image";
import Link from "next/link";
import { Alexandria } from "next/font/google";
import { cn } from "@/lib/utils";
import Text from "./Text";
import dynamic from "next/dynamic";
import Footer from "../Footer";

const alexandria = Alexandria({
  weight: ["200", "400"],
  subsets: ["latin"],
  preload: true,
});

export default function LandingPage() {
  const session = useSelector((state: any) => state.user);
  const SparklesCore = dynamic(
    () => import("../ui/sparkles").then((mod) => mod.SparklesCore),
    {
      ssr: false,
      loading: () => (
        <div className="absolute inset-0 w-full h-full bg-transparent"></div>
      ),
    }
  );

  useEffect(() => {
    store.dispatch(decrement());
  }, [session]);
  return (
    <>
      <main className="w-full flex flex-col gap-12 md:gap-24 pt-[80px]">
        {/* Link */}
        <div className="fixed z-20 w-fit h-fit right-[-140px] top-1/2 -rotate-90 flex justify-center items-center gap-6">
          <Link
            href="https://discord.gg/zQGv8RD8cx"
            target="_blank"
            className="flex justify-center items-center gap-2"
          >
            <p>Discord</p>
            <Image
              src="/assets/octasol-designs/Media/discord.svg"
              alt="discord"
              className="rotate-90"
              width={20}
              height={20}
            />
          </Link>
          <Link
            href="https://t.me/theoctasol"
            target="_blank"
            className="flex justify-center items-center gap-2"
          >
            <p>Telegram</p>
            <Image
              src="/assets/octasol-designs/Media/telegram.svg"
              alt="telegram"
              className="rotate-90"
              width={20}
              height={20}
            />
          </Link>
          <Link
            href="https://x.com/theoctasol"
            target="_blank"
            className="flex justify-center items-center gap-2"
          >
            <p>Twitter</p>
            <Image
              src="/assets/octasol-designs/Media/twitter.svg"
              alt="twitter"
              className="rotate-90"
              width={20}
              height={20}
            />
          </Link>
        </div>

        {/* Hero */}
        <section className="min-h-[calc(100vh-80px)] flex flex-col justify-center gap-20 relative overflow-hidden">
          <div className="flex flex-col justify-center items-center gap-8 container overflow-hidden">
            <div className="container">
              <Text />
            </div>
            <div className="max-w-3xl h-40 text-xs sm:text-base text-center word-wrap relative">
              Octasol redefines open-source collaboration by connecting
              maintainers with top contributors worldwide. It keeps developers
              proof of work verifiable and real.
            </div>
          </div>

          <div className="flex items-end bottom-0 absolute">
            <Image
              src="/assets/octasol-designs/Media/_octasol.svg"
              alt="discord"
              className="flex items-start px-8 "
              width={1000}
              height={1000}
            />
          </div>
        </section>

        {/* Track all achievements */}
        <section className="w-full h-full relative">
          <div
            className="min-h-[60vh] container  grid grid-cols-1 grid-rows-2
         md:grid-cols-2 md:grid-rows-1 place-items-center gap-8 "
          >
            <div className="absolute -right-[100px] -top-[90px]">
              <Image
                src="/assets/octasol-designs/Media/Thorus.png"
                alt="twitter"
                className=""
                width={600}
                height={600}
              />
            </div>
            <div className="w-full flex flex-col justify-center items-center text-3xl md:text-5xl lg:text-6xl">
              <div className="leading-relaxed px-5">
                Track all your
                <br />
                proof of work
                <br />
                in one place
              </div>
            </div>

            <div className="w-full  h-full relative flex justify-center items-center">
              <div className="w-fit h-fit absolute right-10 top-0 md:top-20 flex flex-col text-end justify-end items-start gap-2">
                <p
                  className={cn(
                    "text-5xl sm:text-3xl md:text-6xl font-bold",
                    alexandria.className
                  )}
                >
                  $100+
                </p>
                <p className="text-lg">Bounties&nbsp;placed</p>
              </div>
              <div className="w-fit h-fit absolute right-[150px] top-[120px] md:top-[250px]  flex flex-col text-end justify-end items-start pt-2 gap-2">
                <p
                  className={cn(
                    "text-5xl sm:text-3xl md:text-6xl font-bold",
                    alexandria.className
                  )}
                >
                  400+
                </p>
                <p className="text-lg">Developers</p>
              </div>
            </div>
          </div>
        </section>

        {/* Bounty platform*/}
        <section className="relative flex flex-col justify-center items-center py-8">
          <Image
            src="/octasolLandingLogo.png"
            alt="discord"
            className="absolute -left-[190px] top-0 rotate-[12deg] opacity-20"
            width={500}
            height={500}
          />
          <div className="flex w-fit h-fit flex-col gap-12">
            <div
              className={cn(
                "text-3xl md:text-6xl font-bold text-center",
                alexandria.className
              )}
            >
              Your go to open
              <br />
              source bounty
              <br />
              platform
            </div>
            <div className="text-base md:text-lg text-center px-5">
              Octasol is built to address the unique
              <br />
              challenges of decentralized collaboration
              <br />
              and bounty management
            </div>
          </div>
          <div className="grid grid-cols-1 grid-rows-4 md:grid-cols-2 md:grid-rows-2 py-12 gap-8 container place-items-center">
            <div className="flex flex-col gap-2 justify-center items-center text-start">
              <Image
                src="/assets/octasol-designs/Media/escrowed.svg"
                alt="discord"
                className="flex justify-center items-center !w-[200px] !h-[250px] md:!w-[300px] md:!h-[350px] object-cover"
                width={100}
                height={100}
              />
              <div className="w-full flex flex-col gap-5 ">
                <p className="text-[#97F4E4] text-2xl font-bold text-start flex justify-start items-start w-full">
                  Escrow-based
                  <br />
                  Bounty System
                </p>
                <div className="text-start flex justify-start w-[250px] md:w-[300px]">
                  Ensuring funds are securely locked until deliverables are met.
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-2 justify-center items-center text-start">
              <Image
                src="/assets/octasol-designs/Media/zkProof.svg"
                alt="discord"
                className="flex justify-center items-center !w-[200px] !h-[250px] md:!w-[300px] md:!h-[350px] object-cover"
                width={100}
                height={100}
              />
              <div className="w-full flex flex-col gap-5 ">
                <p className="text-[#97F4E4] text-2xl font-bold text-start flex justify-start items-start w-full">
                  Zk Proof
                  <br />
                  Integration
                </p>
                <div className="text-start flex justify-start w-[250px] md:w-[300px]">
                  For secure, decentralized verification of developer
                  credentials and activity.
                </div>
              </div>
            </div>{" "}
            <div className="flex flex-col gap-2 justify-center items-center text-start">
              <Image
                src="/assets/octasol-designs/Media/seamless.svg"
                alt="discord"
                className="flex justify-center items-center !w-[200px] !h-[250px] md:!w-[300px] md:!h-[350px] object-cover"
                width={100}
                height={100}
              />
              <div className="w-full flex flex-col gap-5 justify-start items-start px-2 text-start">
                <p className="text-[#97F4E4] text-2xl font-bold text-start flex justify-start items-start w-full">
                  Seamless GitHub
                  <br />
                  Integration
                </p>
                <div className="text-start flex justify-start w-[250px] md:w-[300px]">
                  Streamlining the workflow for maintainers and contributors.
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-2 justify-start items-start pt-6">
              <Image
                src="/assets/octasol-designs/Media/devID.svg"
                alt="discord"
                className="flex justify-center items-center !w-[200px] !h-[250px] md:!w-[300px] md:!h-[350px] object-cover"
                width={100}
                height={100}
              />
              <div className="w-full flex flex-col gap-5 ">
                <p className="text-[#97F4E4] text-2xl font-bold text-start flex justify-start items-start w-full">
                  Dev ID
                  <br />
                  Verification
                </p>
                <div className="text-start flex justify-start w-[250px] md:w-[300px]">
                  A unified developer identity connecting multiple profiles like
                  Github and Leetcode for trust and credibility.
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Trust and security */}
        <section className="relative flex flex-col justify-center items-center w-full overflow-hidden">
          <Image
            src="/octasolLandingLogo.png"
            alt="discord"
            className="absolute -right-[190px] -top-[80px] -rotate-[12deg] opacity-10 "
            width={500}
            height={500}
          />
          <div className="grid grid-rows-2 md:grid-rows-1 grid-cols-1 md:grid-cols-2 place-items-center container justify-between items-center md:p-16">
            <Image
              src="/assets/octasol-designs/Media/zkProof.svg"
              alt="discord"
              className="z-20"
              width={350}
              height={350}
            />
            <div className="flex flex-col gap-8 ">
              <p
                className={cn(
                  "text-[#97F4E4] text-2xl md:text-6xl font-bold",
                  alexandria.className
                )}
              >
                Trust and Security
              </p>
              <p className="text-base md:text-xl ">
                By leveraging blockchain technology, Octasol ensures funds are
                held in escrow until tasks are successfully completed, fostering
                trust between maintainers and contributors.
              </p>
            </div>
          </div>
        </section>

        {/* zK proof */}
        <section className="relative flex flex-col ">
          <Image
            src="/octasolLandingLogo.png"
            alt="discord"
            className="absolute -left-[150px] top-0 rotate-[12deg] opacity-10"
            width={400}
            height={400}
          />

          <div className="flex container h-fit flex-col gap-12">
            <div
              className={cn(
                "text-2xl md:text-5xl font-bold text-start leading-loose",
                alexandria.className
              )}
            >
              How zkProof Enhances
              <br />
              DevID
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 py-5 md:py-12 gap-5 md:gap-12 container place-items-center z-10">
            <div className="bg-[#141414] p-8 w-full flex flex-col justify-center gap-8 h-full">
              <div className="font-semibold">
                Privacy-Preserving Verification
              </div>
              <Image
                src="/assets/octasol-designs/Media/locker.svg"
                alt="discord"
                className="flex items-start w-7/12"
                width={1000}
                height={1000}
              />
              <div className="text-3xl font-extrabold">
                Prove account
                <br />
                ownership without
                <br />
                sharing
                <br />
                passwords or private
                <br />
                information.
              </div>
            </div>
            <div className="w-full h-full grid grid-rows-2 gap-8">
              <div className="flex flex-col gap-8 bg-[#141414] p-8">
                <div className="font-semibold">Immutable Trust</div>
                <div className="text-4xl font-extrabold">
                  Trustless system
                  <br />
                  for
                  <br />
                  contributors
                  <br />
                  and maintainers.
                </div>
              </div>
              <div className="w-full h-full grid grid-cols-1 md:grid-cols-2 gap-8 ">
                <div className="bg-[#141414] p-5 flex flex-col justify-start gap-8">
                  <div className="font-semibold">
                    Streamlined Authentication
                  </div>
                  <div className="font-extrabold text-2xl">
                    Simplifies
                    <br />
                    account <br />
                    verification
                  </div>
                </div>
                <div className=" bg-[#141414] p-5 text-2xl font-extrabold flex justify-center items-center">
                  Multi- Platform Integration
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Build */}
        <section className="min-h-[80vh]  flex flex-col gap-12 justify-center items-start relative overflow-hidden">
          <div className="flex flex-col gap-12 justify-center items-start container ">
            <div className="text-4xl md:text-8xl font-extrabold">
              How we Built
              <br />
              Octasol?
            </div>
            <div className="max-w-lg text-start">
              <div className="text-[#97F4E4] text-xl md:text-2xl">
                At Octasol, our goal was to create a secure, efficient, and
                user-friendly platform for developers collaboration.
              </div>
            </div>
          </div>
          <Image
            src="/assets/octasol-designs/Media/cylinder.png"
            alt="discord"
            className="absolute -right-[180px] top-[50px] filter brightness-150"
            width={700}
            height={700}
          />{" "}
        </section>

        {/* Why join */}
        <section className="w-full h-full flex flex-col gap-28 justify-center items-center py-12 relative overflow-hidden">
          <Image
            src="/octasolLandingLogo.png"
            alt="discord"
            className="absolute -right-[190px] -top-[80px] -rotate-[12deg] opacity-10 "
            width={500}
            height={500}
          />
          <div className="text-6xl font-extrabold px-5">Why Join Octasol</div>
          <div className="grid grid-rows-3 grid-cols-1 md:grid-cols-3 md:grid-rows-1 gap-6 container">
            <div className="bg-[#141414] gap-12 md:gap-24 flex flex-col justify-between p-8 rounded-md">
              <p>CONNECT</p>
              <div className="flex flex-col gap-5">
                <p className="text-[#97F4E4] font-bold text-3xl">Bounties</p>
                {/* <p>
                  Grow the economy of your chain by connecting to Cronos Hub
                  services using IBC protocol.
                </p> */}
              </div>
              <Image
                src="/assets/octasol-designs/Media/format-square.svg"
                alt="discord"
                className=""
                width={20}
                height={20}
              />
            </div>
            <div className="bg-[#141414] gap-12 md:gap-24 flex flex-col justify-between p-8 rounded-md">
              <p>INTEGRATE</p>
              <div className="flex flex-col gap-5">
                <p className="text-[#97F4E4] font-bold text-3xl">
                  Escrow-based
                </p>
                {/* <p>
                  Get support to bring users to Cronos by providing services
                  such as exchanges, wallets and more.
                </p> */}
              </div>
              <Image
                src="/assets/octasol-designs/Media/copy-success.svg"
                alt="discord"
                className=""
                width={20}
                height={20}
              />
            </div>
            <div className="bg-[#141414] gap-12 md:gap-24 flex flex-col justify-between p-8 rounded-md">
              <p>VALIDATE</p>
              <div className="flex flex-col gap-5">
                <p className="text-[#97F4E4] font-bold text-3xl">
                  Dev ID Verification
                </p>
                {/* <p>
                  Join the ranks of trusted decentralized validator operators in
                  the network and help secure the interchain.
                </p> */}
              </div>
              <Image
                src="/assets/octasol-designs/Media/people.svg"
                alt="discord"
                className=""
                width={20}
                height={20}
              />
            </div>
          </div>
        </section>

        {/* Community */}
        <section className="w-screen flex justify-center items-center min-h-screen relative overflow-hidden">
          <Image
            src="/assets/octasol-designs/Media/sphere.png"
            alt="discord"
            className="absolute -left-[250px]"
            width={800}
            height={800}
          />

          <div className="container flex flex-col md:flex-row justify-center items-center gap-8 z-20 py-12">
            <div className="w-full md:w-1/2 flex flex-col gap-10 h-full">
              <p className="text-5xl lg:text-7xl font-extrabold ">
                Meet Our
                <br />
                community.
              </p>
              <p className="text-base md:text-lg lg:text-xl">
                Join a fast-growing community of
                <br />
                developers and innovators connected
                <br />
                all over the world, building the new
                <br />
                era of the internet.
              </p>
            </div>
            <div className="w-full md:w-1/2 h-full ">
              <div className="grid grid-rows-3 gap-12 md:gap-32 place-items-end">
                <div className="flex flex-col gap-5 relative md:right-[16px]">
                  <div className="flex gap-5 items-center font-extrabold text-3xl text-[#97F4E4] ">
                    <Link
                      href="https://discord.gg/zQGv8RD8cx"
                      target="_blank"
                      className="flex justify-center items-center gap-5 group "
                    >
                      <p>Community Chat</p>
                      <Image
                        src="/assets/octasol-designs/Media/Line.svg"
                        alt="discord"
                        className="transition-transform duration-300 group-hover:rotate-45"
                        width={15}
                        height={15}
                      />
                    </Link>
                  </div>
                  <p>
                    Ask general questions and chat with the
                    <br />
                    worldwide community on Telegram.
                  </p>
                </div>{" "}
                <div className="flex flex-col gap-5">
                  <div className="flex gap-5 items-center font-extrabold text-3xl text-[#97F4E4]">
                    <Link
                      href="https://x.com/theoctasol"
                      target="_blank"
                      className="flex justify-center items-center gap-5 group"
                    >
                      <p>Twitter</p>
                      <Image
                        src="/assets/octasol-designs/Media/Line.svg"
                        alt="discord"
                        className="transition-transform duration-300 group-hover:rotate-45"
                        width={15}
                        height={15}
                      />
                    </Link>
                  </div>

                  <p>
                    Follow @theoctasol to get the latest news
                    <br />
                    and updates from across the ecosystem.
                  </p>
                </div>
                <div className="flex flex-col gap-5">
                  <div className="flex gap-5 items-center font-extrabold text-3xl text-[#97F4E4]">
                    <Link
                      href="https://t.me/octasol"
                      target="_blank"
                      className="flex justify-center items-center gap-5 group"
                    >
                      <p>Telegram Chat</p>
                      <Image
                        src="/assets/octasol-designs/Media/Line.svg"
                        alt="discord"
                        className="transition-transform duration-300 group-hover:rotate-45"
                        width={15}
                        height={15}
                      />
                    </Link>
                  </div>
                  <p>
                    Be part of the conversation! Join our chat
                    <br />
                    on Telegram!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
}
