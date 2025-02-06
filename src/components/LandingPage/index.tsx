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
import { Link2 } from "lucide-react";

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
        <section className="min-h-[calc(100vh-80px)] flex flex-col justify-center gap-20 relative">
          <div className="flex flex-col justify-center items-center gap-6 container overflow-hidden">
            <div className="container">
              <Text />
            </div>
            <div className="w-[40rem] h-40 relative">
              <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-green-500 to-transparent h-[2px] w-3/4 blur-sm" />
              <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-px w-3/4" />
              <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-[5px] w-1/4 blur-sm" />
              <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-green-500 to-transparent h-px w-1/4" />

              <SparklesCore
                background="transparent"
                minSize={0.4}
                maxSize={1}
                particleDensity={1200}
                className="absolute inset-0 w-full h-full "
                particleColor="#FFFFFF"
              />

              <div className="absolute inset-0 w-full h-full bg-black [mask-image:radial-gradient(350px_200px_at_top,transparent_20%,white)]"></div>
            </div>
          </div>

          {/* <div className="text-5xl md:text-7xl lg:text-[90px] text-center flex items-center justify-center lg:justify-start container px-8 lg:px-36 relative">
            Connecting Your
            <br />
            Issues with
            <br />
            Solutions
          </div> */}

          {/* <div className="text-base min-w-fit container text-start flex justify-end items-end pe-12">
            Octasol redefines
            <br />
            open-source collaboration by
            <br />
            connecting maintainers with top
            <br />
            contributors worldwide. It
            <br />
            streamlines bounty management
            <br />
            on GitHub.
          </div> */}

          <div className="flex items-end bottom-0 absolute">
            <Image
              src="/assets/octasol-designs/Media/octasol.svg"
              alt="discord"
              className="flex items-start px-8 "
              width={1000}
              height={1000}
            />
          </div>
        </section>

        <section
          className="min-h-[50vh] container h-full grid grid-cols-1 grid-rows-2
         md:grid-cols-2 md:grid-rows-1 place-items-center gap-8"
        >
          <div className="w-full flex flex-col justify-center items-center text-3xl md:text-6xl leading-normal">
            <div>
              Track all your
              <br />
              achievements
              <br />
              in one place
            </div>
            {/* <div className="text-base text-[#4A4646] font-bold border-2 my-8 py-2 px-4 bg-gradient-to-r from-[#97F4E4] to-[#8E54E9]">
              Learn More
            </div> */}
          </div>

          <div className="w-full  h-full relative flex justify-center items-center">
            <div className="w-fit h-fit absolute right-10 top-0 flex flex-col text-end justify-end">
              <p
                className={cn(
                  "text-3xl md:text-6xl font-bold",
                  alexandria.className
                )}
              >
                20+
              </p>
              <p>Platforms and companies</p>
            </div>
            <div className="w-fit h-fit absolute right-[150px] top-1/3 flex flex-col text-end justify-end pt-8">
              <p
                className={cn(
                  "text-3xl md:text-6xl font-bold",
                  alexandria.className
                )}
              >
                30+
              </p>
              <p>Bounties&nbsp;Offered</p>
            </div>
          </div>
        </section>

        <section className="relative flex flex-col justify-center items-center">
          <Image
            src="/octasolLandingLogo.png"
            alt="discord"
            className="absolute -left-[150px] top-0 rotate-[12deg] opacity-10"
            width={400}
            height={400}
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
            <div className="flex flex-col gap-2 justify-start items-start">
              <Image
                src="/assets/octasol-designs/Media/escrowed.svg"
                alt="discord"
                className="flex justify-center items-center w-full"
                width={100}
                height={100}
              />
              <p className="text-[#97F4E4] text-2xl font-bold text-start flex justify-start items-start w-full">
                Escrow-based
                <br />
                Bounty System
              </p>
              <p className="text-start flex justify-start">
                Ensuring funds are securely
                <br />
                locked until deliverables are met.
              </p>
            </div>
            <div className="flex flex-col gap-2 justify-start items-start">
              <Image
                src="/assets/octasol-designs/Media/zkProof.svg"
                alt="discord"
                className="flex justify-center items-center w-full"
                width={100}
                height={100}
              />
              <p className="text-[#97F4E4] text-2xl font-bold text-start flex justify-start items-start w-full">
                Zk Proof
                <br />
                Integration
              </p>
              <p className="text-start flex justify-start">
                For secure, decentralized verification
                <br />
                of developer credentials and activity.
              </p>
            </div>{" "}
            <div className="flex flex-col gap-2 justify-start items-start">
              <Image
                src="/assets/octasol-designs/Media/seamless.svg"
                alt="discord"
                className="flex justify-center items-center w-full"
                width={100}
                height={100}
              />
              <p className="text-[#97F4E4] text-2xl font-bold text-start flex justify-start items-start w-full">
                Seamless GitHub
                <br />
                Integration
              </p>
              <p className="text-start flex justify-start px-0">
                Streamlining the workflow for
                <br />
                maintainers and contributors.
              </p>
            </div>
            <div className="flex flex-col gap-2 justify-start items-start">
              <Image
                src="/assets/octasol-designs/Media/devID.svg"
                alt="discord"
                className="flex justify-center items-center w-full"
                width={100}
                height={100}
              />
              <p className="text-[#97F4E4] text-2xl font-bold text-start flex justify-start items-start w-full">
                Dev ID
                <br />
                Verification
              </p>
              <p className="text-start flex justify-start">
                A unified developer identity
                <br />
                connecting multiple profiles
                <br />
                like Github and Leetcode for trust
                <br />
                and credibility.
              </p>
            </div>
          </div>
        </section>

        <section className="relative flex flex-col justify-center items-center w-full overflow-hidden">
          <Image
            src="/octasolLandingLogo.png"
            alt="discord"
            className="absolute -right-[150px] -top-[80px] -rotate-[12deg] opacity-10 "
            width={400}
            height={400}
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
                By leveraging the Solana blockchain, Octasol ensures funds are
                held in escrow until tasks are successfully completed, fostering
                trust between maintainers and contributors.
              </p>
            </div>
          </div>
        </section>

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

        <section className="min-h-[80vh] md:min-h-screen py-16 flex flex-col gap-12 justify-center items-start relative overflow-hidden">
          <div className="flex flex-col gap-12 justify-center items-start container ">
            <div className="text-4xl md:text-8xl font-extrabold">
              How we Built
              <br />
              Octasol?
            </div>
            <div className="text-[#97F4E4] text-xl md:text-2xl">
              At Octasol, our goal was to create
              <br />
              a secure, efficient, and user-friendly
              <br />
              platform for developers collaboration.
            </div>
          </div>
          <Image
            src="/assets/octasol-designs/Media/cylinder.svg"
            alt="discord"
            className="absolute right-0 top-0  opacity-50 "
            width={500}
            height={500}
          />{" "}
        </section>

        <section className="w-full h-full flex flex-col gap-28 justify-center items-center py-12 relative overflow-hidden">
          <Image
            src="/octasolLandingLogo.png"
            alt="discord"
            className="absolute -right-[150px] -top-[80px] -rotate-[12deg] opacity-10 "
            width={400}
            height={400}
          />
          <div className="text-6xl font-extrabold px-5">Why Join Octasol</div>
          <div className="grid grid-rows-3 grid-cols-1 md:grid-cols-3 md:grid-rows-1 gap-6 container">
            <div className="bg-[#141414] gap-12 md:gap-24 flex flex-col justify-between p-8 rounded-md">
              <p>CONNECT</p>
              <div className="flex flex-col gap-5">
                <p className="text-[#97F4E4] font-bold text-3xl">Bounties</p>
                <p>
                  Grow the economy of your chain by connecting to Cronos Hub
                  services using IBC protocol.
                </p>
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
                <p>
                  Get support to bring users to Cronos by providing services
                  such as exchanges, wallets and more.
                </p>
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
                <p>
                  Join the ranks of trusted decentralized validator operators in
                  the network and help secure the interchain.
                </p>
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

        <section className="w-full flex justify-center items-center min-h-screen relative">
          <Image
            src="/assets/octasol-designs/Media/sphere.svg"
            alt="discord"
            className="absolute -left-0"
            width={500}
            height={500}
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
                      href="https://t.me/theoctasol"
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
                    Have technical questions about Octasol?
                    <br />
                    Ask a developer on the Discord.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <footer className="w-full flex justify-center items-center">
          <section className="container border-t-2 border-[#97F4E41A]/10 h-full py-24">
            <div className="grid grid-cols-1 grid-rows-3 sm:grid-cols-3 sm:grid-rows-1 gap-8 place-items-start md:place-items-center md:items-start">
              <div className="flex flex-col justify-start items-start gap-5">
                <p className="font-extrabold text-2xl text-[#97F4E4]">
                  About US
                </p>
                <Link href="https://t.me/theoctasol" target="_blank">
                  <div className="flex justify-center items-center gap-2 ">
                    <Image
                      src="/assets/octasol-designs/Media/telegram.svg"
                      alt="twitter"
                      className="rotate-90"
                      width={20}
                      height={20}
                    />
                    Telegram
                  </div>
                </Link>
                <Link href="https://discord.gg/zQGv8RD8cx" target="_blank">
                  <div className="flex justify-center items-center gap-2 ">
                    <Image
                      src="/assets/octasol-designs/Media/discord.svg"
                      alt="discord"
                      className="rotate-90"
                      width={20}
                      height={20}
                    />
                    Discord
                  </div>
                </Link>{" "}
                <Link href="https://x.com/theoctasol" target="_blank">
                  <div className="flex justify-center items-center gap-2 ">
                    <Image
                      src="/assets/octasol-designs/Media/twitter.svg"
                      alt="twitter"
                      className="rotate-90"
                      width={20}
                      height={20}
                    />
                    <p>Twitter</p>
                  </div>
                </Link>
              </div>
              <div className="flex flex-col justify-start items-start gap-5">
                <p className="font-extrabold text-2xl text-[#97F4E4]">
                  Contact US
                </p>
                <Link href="https://t.me/AyushAgr91" target="_blank">
                  <div className="flex justify-center items-center gap-2 ">
                    <Image
                      src="/assets/octasol-designs/Media/telegram.svg"
                      alt="twitter"
                      className="rotate-90"
                      width={20}
                      height={20}
                    />
                    Ayush Agrawal
                  </div>
                </Link>
                <Link href="https://t.me/themayankdev" target="_blank">
                  <div className="flex justify-center items-center gap-2 ">
                    <Image
                      src="/assets/octasol-designs/Media/telegram.svg"
                      alt="twitter"
                      className="rotate-90"
                      width={20}
                      height={20}
                    />
                    Mayank Dev
                  </div>
                </Link>
                <Link href="https://t.me/ritikbhatt020" target="_blank">
                  <div className="flex justify-center items-center gap-2 ">
                    <Image
                      src="/assets/octasol-designs/Media/telegram.svg"
                      alt="twitter"
                      className="rotate-90"
                      width={20}
                      height={20}
                    />
                    Ritik Bhatt
                  </div>
                </Link>
              </div>
              <div className="flex flex-col gap-5">
                <p className="font-extrabold text-2xl text-[#97F4E4]">DOCS</p>
                <div className="flex justify-center items-center gap-2">
                  <Link2 className="-rotate-45" />
                  <Link
                    href="https://octasol.gitbook.io/octasol.io/"
                    target="_blank"
                  >
                    <p>Gitbook</p>
                  </Link>
                </div>
              </div>
            </div>
          </section>
        </footer>
      </main>
    </>
  );
}
