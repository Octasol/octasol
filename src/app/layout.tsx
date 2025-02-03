import type { Metadata } from "next";
import { Montserrat, Poppins } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Session } from "next-auth";
import SessionProviderWrapper from "@/providers/session-provider";
import Header from "@/components/Header";
import { Providers } from "./Redux/provider";
import { ThemeProvider } from "@/providers/theme-provider";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "@/components/Loader";
import { websiteMetadata } from "@/utils/data";
import { TooltipProvider } from "@/components/ui/tooltip";
interface Props {
  session: Session | null;
  children: React.ReactNode;
}

const montserrat = Montserrat({
  weight: ["200", "400"],
  subsets: ["latin"],
  preload: true,
});

export const metadata: Metadata = {
  title: websiteMetadata.title,
  icons: websiteMetadata.icons,
  description: websiteMetadata.description,
  openGraph: {
    type: "website",
    url: websiteMetadata.url,
    title: websiteMetadata.title,
    description: websiteMetadata.description,
    images: [
      {
        url: websiteMetadata.ogImage,
        width: 1200,
        height: 630,
        alt: websiteMetadata.title,
      },
    ],
  },
  twitter: {
    creator: "@theoctasol",
    site: "@theoctasol",
    card: "summary_large_image",
    title: websiteMetadata.title,
    description: websiteMetadata.description,
    images: [{ url: websiteMetadata.ogImage, alt: websiteMetadata.title }],
  },
  metadataBase: new URL(websiteMetadata.url),
};

export default function RootLayout({ children, session }: Props) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body
        className={cn(
          "min-h-screen h-full bg-black text-white",
          montserrat.className
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
              <Loader />
              <TooltipProvider>
                <div className="min-h-screen w-full flex flex-col bg-black">
                  <Header />
                  {children}
                </div>
              </TooltipProvider>
            </SessionProviderWrapper>
          </Providers>
        </ThemeProvider>
      </body>
    </html>
  );
}
