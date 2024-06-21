import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const poppins = Poppins({ weight: ["200", "400"], subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Octasol",
  description: "Green Commits",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn("min-h-screen h-full", poppins.className)}>
        {children}
      </body>
    </html>
  );
}
