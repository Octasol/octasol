import { Link2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

type Props = {};

const Footer = (props: Props) => {
  return (
    <footer className="w-full flex justify-center items-center">
      <section className="container border-t-2 border-[#97F4E41A]/10 h-full py-24">
        <div className="grid grid-cols-1 grid-rows-3 sm:grid-cols-3 sm:grid-rows-1 gap-8 place-items-start md:place-items-center md:items-start">
          <div className="flex flex-col justify-start items-start gap-5">
            <p className="font-extrabold text-2xl text-[#97F4E4]">About US</p>
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
            <p className="font-extrabold text-2xl text-[#97F4E4]">Contact US</p>
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
              <Link
                href="https://octasol.gitbook.io/octasol.io/"
                target="_blank"
              >
                <div className="flex justify-center items-center gap-2 ">
                  <Link2 className="-rotate-45" />
                  Gitbook
                </div>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </footer>
  );
};

export default Footer;
