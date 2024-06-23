import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Session } from "next-auth";
import SessionProviderWrapper from "@/components/SessionProviderWrapper"; // Adjust the path as necessary
import Header from "@/components/Header";

interface Props {
  session: Session | null;
  children: React.ReactNode;
}

const poppins = Poppins({ weight: ["200", "400"], subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Octasol",
  description: "Green Commits",
};

export default function RootLayout({ children, session }: Props) {
  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen h-full bg-black text-white",
          poppins.className
        )}
      >
        <SessionProviderWrapper session={session}>
          <div className="min-h-screen w-full flex flex-col bg-black">
            <Header />
            {children}
          </div>
        </SessionProviderWrapper>
      </body>
    </html>
  );
}
