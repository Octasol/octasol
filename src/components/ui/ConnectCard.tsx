import Image from "next/image";

export const items = [
  {
    title: "Github",
    description: "Github",
    header: (
      <>
        <Image
          src="/github.webp"
          alt="github"
          width={200}
          height={200}
          className="invert"
        />
      </>
    ),
  },
  {
    title: "SuperteamEarn",
    description: "Superteam",
    header: (
      <>
        <Image
          src="/superteam.jpeg"
          alt="superteam"
          width={150}
          height={200}
          className="rounded-full"
        />
      </>
    ),
  },

  {
    title: "Leetcode",
    description: "",
    header: (
      <>
        <Image
          src="/leetcode.webp"
          alt="leetcode"
          width={150}
          height={200}
          className="rounded-full"
        />
      </>
    ),
  },
  {
    title: "Geeksforgeeks",
    description: "",
    header: (
      <>
        <Image
          src="/gfg.png"
          alt="leetcode"
          width={150}
          height={100}
          className="rounded-full"
        />
      </>
    ),
  },
  {
    title: "Hackerrank",
    description: "Hackerrank",
    header: (
      <>
        <Image
          src="/hackerrank.webp"
          alt="leetcode"
          width={150}
          height={200}
          className="rounded-full"
        />
      </>
    ),
  },
  {
    title: "Codechef",
    description: "",
    header: (
      <>
        <Image
          src="/codechef.png"
          alt="leetcode"
          width={150}
          height={200}
          className="rounded-full aspect-square "
        />
      </>
    ),
  },
  {
    title: "Codeforces",
    description: "",
    header: (
      <>
        <Image
          src="/codeforces.jpeg"
          alt="leetcode"
          width={150}
          height={200}
          className="rounded-full aspect-square "
        />
      </>
    ),
  },
  {
    title: "Gitlab",
    description: "",
    header: (
      <Image
        src="/gitlab.png"
        alt="leetcode"
        width={150}
        height={200}
        className="rounded-full "
      />
    ),
  },
];
