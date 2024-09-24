import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Session } from "next-auth";
import SessionProviderWrapper from "@/providers/session-provider";
import Header from "@/components/Header";
import { Providers } from "./Redux/provider";
import { ThemeProvider } from "@/providers/theme-provider";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
interface Props {
  session: Session | null;
  children: React.ReactNode;
}

const poppins = Poppins({ weight: ["200", "400"], subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Octasol",
  icons: "/octasolLogo.jpg",
  description: "Green Commits",
};

export default function RootLayout({ children, session }: Props) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body
        className={cn(
          "min-h-screen h-full bg-black text-white",
          poppins.className
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <ToastContainer theme="dark" />
          <Providers>
            <SessionProviderWrapper session={session}>
              <div className="min-h-screen w-full flex flex-col bg-black">
                <Header />
                {children}
              </div>
            </SessionProviderWrapper>
          </Providers>
        </ThemeProvider>
      </body>
    </html>
  );
}
