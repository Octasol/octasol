"use client";
import React, { useEffect } from "react";
import { store } from "@/app/Redux/store";
import { decrement } from "@/app/Redux/Features/loader/loaderSlice";
import { useSelector } from "react-redux";
import Image from "next/image";
import Link from "next/link";
import { Alexandria } from "next/font/google";
import { cn } from "@/lib/utils";

const alexandria = Alexandria({
  weight: ["200", "400"],
  subsets: ["latin"],
  preload: true,
});

export default function LandingPage() {
  const session = useSelector((state: any) => state.user);

  useEffect(() => {
    store.dispatch(decrement());
  }, [session]);
  return (
    <>
      <main className="w-full flex flex-col gap-24 pt-32 md:pt-64">
        <section className=" flex flex-col items-center justify-center gap-8">
          <div className="text-5xl md:text-8xl lg:text-[100px] text-center flex items-center justify-center lg:justify-start container px-0 lg:px-36 relative">
            Connecting Your
            <br />
            Issues with
            <br />
            Solutions
          </div>

          <div className="text-base min-w-fit container text-start flex justify-end items-end pe-12">
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
          </div>

          {/* link */}
          <div className="fixed w-fit h-fit right-[-140px] top-1/2 -rotate-90 flex justify-center items-center gap-6">
            <Link href="/" className="flex justify-center items-center gap-2">
              <p>Discord</p>
              <Image
                src="/assets/octasol-designs/Media/discord.svg"
                alt="discord"
                className="rotate-90"
                width={20}
                height={20}
              />
            </Link>
            <Link href="/" className="flex justify-center items-center gap-2">
              <p>Telegram</p>
              <Image
                src="/assets/octasol-designs/Media/telegram.svg"
                alt="discord"
                className="rotate-90"
                width={20}
                height={20}
              />
            </Link>
            <Link href="/" className="flex justify-center items-center gap-2">
              <p>Twitter</p>
              <Image
                src="/assets/octasol-designs/Media/twitter.svg"
                alt="discord"
                className="rotate-90"
                width={20}
                height={20}
              />
            </Link>
          </div>
        </section>

        <Image
          src="/assets/octasol-designs/Media/octasol.svg"
          alt="discord"
          className="flex items-start px-8"
          width={1000}
          height={1000}
        />

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
            <div className="text-base text-[#4A4646] font-bold border-2 my-8 py-2 px-4 bg-gradient-to-r from-[#97F4E4] to-[#8E54E9]">
              Learn More
            </div>
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
                "text-2xl md:text-5xl font-bold text-center",
                alexandria.className
              )}
            >
              Your go to open
              <br />
              source bounty s<br />
              platform
            </div>
            <div className="text-base text-center">
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
              <p className="text-[#97F4E4] text-2xl text-start flex justify-start items-start w-full">
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
              <p className="text-[#97F4E4] text-2xl text-start flex justify-start items-start w-full">
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
              <p className="text-[#97F4E4] text-2xl text-start flex justify-start items-start w-full">
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
              <p className="text-[#97F4E4] text-2xl text-start flex justify-start items-start w-full">
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
                  "text-[#97F4E4] text-lg md:text-6xl font-bold",
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
      </main>
    </>
  );
}
