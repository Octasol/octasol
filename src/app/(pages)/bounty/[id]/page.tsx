"use client";
import LoginButton from "@/components/Button/LoginButton";
import { GET } from "@/config/axios/requests";
import { Send, Twitter, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import { EditorContent, EditorProvider, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

interface Sponsor {
  id: number;
  githubId: string;
  name: string;
  description: string;
  type: string;
  image: string;
  link: string;
  discord: string;
  telegram: string;
  twitter: string;
  createdAt: Date | null;
  updatedAt: Date | null;
}

interface Bounty {
  id: number;
  bountyname: string;
  bountyDescription: string;
  price: number;
  primaryContact: string;
  skills: string[];
  sponsor: Sponsor;
  sponsorId: number;
  status: number;
  time: string;
  timeExtendedTo: string | null;
  createdAt: Date | null;
  updatedAt: Date | null;
}

const markdownContent = `<h2>
  Hi there,
</h2>
<p>
  this is a <em>basic</em> example of <strong>Tiptap</strong>. Sure, there are all kind of basic text styles youd probably expect from a text editor. But wait until you see the lists:
</p>
<ul>
  <li>
    Thats a bullet list with one …
  </li>
  <li>
    … or two list items.
  </li>
</ul>
<p>
  Isnt that great? And all of that is editable. But wait, theres more. Lets try a code block:
</p>
<pre><code class="language-css">body {
  display: none;
}</code></pre>
<p>
  I know, I know, this is impressive. Its only the tip of the iceberg though. Give it a try and click a little bit around. Dont forget to check the other examples too.
</p>
<blockquote>
  Wow, thats amazing. Good work, boy! 👏
  <br />
  — Mom
</blockquote>`;

const page = () => {
  const pathname = usePathname();
  const [id, setId] = useState<number | null>(null);
  const [bounty, setBounty] = useState<Bounty | null>(null);

  useEffect(() => {
    console.log(pathname.split("/bounty/")[1]);
    setId(parseInt(pathname.split("/bounty/")[1]));
  }, [pathname]);

  const getBounty = async (id: number) => {
    const { response } = await GET(`/unescrowedbounty?id=${id}`);
    setBounty(response);
  };
  useEffect(() => {
    console.log(bounty?.bountyDescription);
  }, [bounty]);

  useEffect(() => {
    if (id) {
      getBounty(id);
    }
  }, [id]);

  return (
    <>
      <div className="w-full h-full ">
        <div className="w-full flex flex-col md:flex-row ">
          <div className="w-full md:max-w-[400px] flex h-[85vh] overflow-scroll">
            <div className="w-full flex flex-col items-start p-5 gap-4">
              <p className=" underline underline-offset-4 text-gray-400">
                SPONSOR DETAILS
              </p>
              <div className="w-full flex justify-between items-center ">
                <div className="w-8/12">
                  {bounty?.sponsor && `${bounty?.sponsor.name}`}
                </div>
                {bounty?.sponsor?.image ? (
                  <Image
                    src={bounty?.sponsor?.image || "/sponsor_image"}
                    alt={bounty?.sponsor?.name ?? ""}
                    width={100}
                    height={100}
                    className="rounded-md"
                  />
                ) : (
                  <User size={50} />
                )}
              </div>
              <div className="w-full flex flex-col gap-4">
                <p className=" underline underline-offset-4 text-gray-400">
                  DESCRIPTION
                </p>
                <div className="w-full italic text-gray-400">
                  {bounty?.sponsor && bounty?.sponsor.description}
                </div>
              </div>

              <div className="w-full flex flex-col gap-4">
                <p className=" underline underline-offset-4 text-gray-400">
                  LINK
                </p>
                <div className="w-full">
                  <Link
                    href={bounty?.sponsor ? bounty?.sponsor.link : "#"}
                    target="_blank"
                  >
                    {bounty?.sponsor?.link}
                  </Link>
                </div>
              </div>

              <div className="w-full flex flex-col gap-4">
                {(bounty?.sponsor?.telegram ||
                  bounty?.sponsor?.twitter ||
                  bounty?.sponsor?.discord) && (
                  <>
                    <p className=" underline underline-offset-4 text-gray-400">
                      CONTACT
                    </p>
                    <p className="text-slate-500 italic text-sm">
                      Reach out if you have any questions about this listing
                    </p>
                  </>
                )}
                <div className="w-full flex flex-wrap  gap-3 ">
                  {bounty?.sponsor?.twitter && (
                    <Link
                      href={
                        bounty?.sponsor
                          ? `https://x.com/${bounty?.sponsor.twitter}`
                          : "#"
                      }
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <div className="flex items-center gap-2">
                        <Twitter />
                        {bounty?.sponsor?.twitter}
                      </div>
                    </Link>
                  )}

                  {bounty?.sponsor?.telegram && (
                    <Link
                      href={
                        bounty?.sponsor
                          ? `https://t.me/${bounty?.sponsor.telegram}`
                          : "#"
                      }
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <div className="flex items-center gap-2">
                        <Send />
                        {bounty?.sponsor?.telegram}
                      </div>
                    </Link>
                  )}

                  {bounty?.sponsor?.discord && (
                    <Link
                      href={
                        bounty?.sponsor
                          ? `https://discord.com/users/${bounty?.sponsor.discord}`
                          : "#"
                      }
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <div className="flex items-center gap-2">
                        <Send />
                        {bounty?.sponsor?.discord}
                      </div>
                    </Link>
                  )}
                </div>
              </div>
            </div>
            <div className="rotate-180 h-[80vh] w-px hidden md:block">
              <div className="w-full h-full bg-gradient-to-b from-transparent via-[#46bf96] to-transparent"></div>
            </div>
          </div>
          <div className="w-full flex h-[85vh] overflow-scroll">
            <div className="w-full flex flex-col items-start py-5 px-8 gap-4">
              <p className=" underline underline-offset-4 text-gray-400">
                BOUNTY DETAILS
              </p>
              <div className="w-full flex justify-between items-center ">
                <div className="w-8/12">
                  {bounty && `${bounty?.bountyname}`}
                </div>
              </div>
              <div className="w-full flex flex-col gap-4">
                <p className=" underline underline-offset-4 text-gray-400">
                  DESCRIPTION
                </p>
                <div
                  className="w-full italic text-gray-400"
                  dangerouslySetInnerHTML={{
                    __html: bounty?.bountyDescription ?? "",
                  }}
                ></div>
              </div>

              <div className="w-full flex flex-col gap-4">
                <p className=" underline underline-offset-4 text-gray-400">
                  SKILLS
                </p>
                <div className="w-full flex flex-wrap gap-5">
                  {bounty?.skills.map((skill) => (
                    <div key={skill}>
                      <LoginButton>{skill}</LoginButton>
                    </div>
                  ))}
                </div>
              </div>

              <div className="w-full flex flex-col gap-4">
                <p className=" underline underline-offset-4 text-gray-400">
                  CONTACT
                </p>
                <p className="text-slate-500 italic text-sm">
                  Reach out if you have any questions about this listing
                </p>
                <div className="w-full flex flex-wrap  gap-3 ">
                  {bounty?.primaryContact && (
                    <Link
                      href={
                        bounty?.primaryContact
                          ? `https://t.me/${bounty?.primaryContact}`
                          : "#"
                      }
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <div className="flex items-center gap-2">
                        <Send />
                        {bounty?.primaryContact}
                      </div>
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default page;
