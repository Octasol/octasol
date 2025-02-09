import LandingPage from "@/components/LandingPage";
import Image from "next/image";

export default function Home() {
  return (
    <main className="min-h-screen w-full flex flex-col bg-trasnparent relative overflow-hidden">
      <div className=" relative w-full flex justify-between">
        <div className="absolute -left-[400px] -top-[100px] opacity-50 md:opacity-100 ">
          <Image
            src="/assets/octasol-designs/Media/green-grad.svg"
            alt="twitter"
            className=""
            width={900}
            height={900}
          />
          <Image
            src="/assets/octasol-designs/Media/Ellipse_65.svg"
            alt="twitter"
            className="absolute left-[150px] top-[100px] opacity-50"
            width={500}
            height={500}
          />
        </div>
        <div className="absolute -right-[400px] -top-[100px] opacity-50 md:opacity-100 ">
          <Image
            src="/assets/octasol-designs/Media/green-grad.svg"
            alt="twitter"
            className=""
            width={900}
            height={900}
          />
          <Image
            src="/assets/octasol-designs/Media/Ellipse_65.svg"
            alt="twitter"
            className="absolute right-[150px] top-[100px] opacity-50"
            width={500}
            height={500}
          />
        </div>
        <div className="absolute right-[600px] -top-[800px]  opacity-50 md:opacity-100 ">
          <Image
            src="/assets/octasol-designs/Media/green-grad.svg"
            alt="twitter"
            className="rotate-90"
            width={900}
            height={900}
          />
          <Image
            src="/assets/octasol-designs/Media/Ellipse_65.svg"
            alt="twitter"
            className="absolute right-[250px] top-[500px] opacity-50 rotate-90"
            width={500}
            height={500}
          />
        </div>
        <div className="absolute -right-[400px] top-[2000px] opacity-50 md:opacity-100 ">
          <Image
            src="/assets/octasol-designs/Media/Ellipse_65.svg"
            alt="twitter"
            className="opacity-40"
            width={900}
            height={900}
          />
        </div>
        <div className="absolute -left-[400px] top-[2500px] opacity-50 md:opacity-100 ">
          <Image
            src="/assets/octasol-designs/Media/green-grad.svg"
            alt="twitter"
            className=""
            width={900}
            height={900}
          />
        </div>
        <div className="absolute -left-[400px] top-[5000px] opacity-50 md:opacity-100 ">
          <Image
            src="/assets/octasol-designs/Media/green-grad.svg"
            alt="twitter"
            className=""
            width={900}
            height={900}
          />
        </div>
        <div className="absolute -right-[400px] top-[6500px] opacity-50 md:opacity-100 ">
          <Image
            src="/assets/octasol-designs/Media/green-grad.svg"
            alt="twitter"
            className=""
            width={900}
            height={900}
          />
        </div>
      </div>
      <LandingPage />
    </main>
  );
}
