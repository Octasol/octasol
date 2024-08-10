import Image from "next/image";

export const items = [
  {
    title: "Github",
    description: "",
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
    title: (
      <>
        <div className="flex justify-between items-ceter">
          <span>SuperteamEarn</span>
        </div>
      </>
    ),
    description: "",
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
    title: (
      <>
        <div className="flex justify-between items-ceter">
          <span>Leetcode</span>
        </div>
      </>
    ),
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
    title: (
      <>
        <div className="flex justify-between items-ceter">
          <span>Codeforces</span>
        </div>
      </>
    ),
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
    title: (
      <>
        <div className="flex justify-between items-ceter">
          <span>Hackerrank</span>
        </div>
      </>
    ),
    description: "",
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
    title: (
      <>
        <div className="flex justify-between items-ceter">
          <span>Codechef</span>
        </div>
      </>
    ),
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
    title: (
      <>
        <div className="flex justify-between items-ceter">
          <span>Geeksforgeeks</span>
        </div>
      </>
    ),
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
    title: (
      <>
        <div className="flex justify-between items-ceter">
          <span>Gitlab</span>
        </div>
      </>
    ),
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
