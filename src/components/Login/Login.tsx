"use client";
import React, { useEffect, useLayoutEffect, useMemo } from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter, usePathname } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import { setUser } from "@/app/Redux/Features/user/userSlice";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import ProfileImage from "../ProfileImage";
import {
  BadgeDollarSign,
  Blocks,
  ChevronDown,
  CopyPlus,
  Home,
  LogOut,
  Menu,
  PictureInPicture,
  SquareUser,
  Trophy,
} from "lucide-react";
// import BottomGradient from "../ui/BottomGradient";
import LoginButton from "../Button/LoginButton";
import { decrement } from "@/app/Redux/Features/loader/loaderSlice";
import { store } from "@/app/Redux/store";
import { Skeleton } from "../ui/skeleton";
import Cookies from "js-cookie";
import { resetProfile } from "@/app/Redux/Features/profile/profileSlice";
import { cn } from "@/lib/utils";

const Login = () => {
  const { data: session, status } = useSession() as any;
  const router = useRouter();
  const pathname = usePathname();
  const dispatch = useDispatch();
  const user = useSelector((state: any) => state.user);
  const sessionToVerifyEmail = useSelector((state: any) => state.user);

  interface SessionUser {
    name?: string | null;
    email?: string | null;
    image?: string | null;
    login?: string | null;
    id?: string | null;
    accessToken?: string | null;
    isVerifiedEmail?: boolean | true;
  }
  const sessionUser = useMemo(
    () => session?.user as SessionUser | null,
    [session]
  );

  const handleSessionFromCookies = () => {
    const cookieSession = Cookies.get("session");

    if (cookieSession) {
      try {
        const parsedSession = JSON.parse(cookieSession);

        dispatch(
          setUser({
            name: parsedSession?.name || "",
            email: parsedSession?.email || "",
            photo: parsedSession?.image || "",
            githubId: parsedSession?.id || "",
            login: parsedSession?.login || "",
            accessToken: parsedSession?.accessToken || "",
            status: "authenticated",
            isVerifiedEmail: parsedSession?.isVerifiedEmail || false,
          })
        );

        if (pathname === "/") {
          router.push("/dashboard");
        } else {
          router.push(pathname);
        }
      } catch (error) {
        console.error("Error parsing cookie session:", error);
        Cookies.remove("session");
        router.push("/");
      }
    } else {
      router.push("/");
    }
  };

  useLayoutEffect(() => {
    if (sessionUser) {
      store.dispatch(decrement());
      const sessionExpiryDate = new Date(session?.expires || "");
      Cookies.set("session", JSON.stringify(sessionUser), {
        expires: sessionExpiryDate,
      });
      dispatch(
        setUser({
          name: sessionUser?.name || "",
          email: sessionUser?.email || "",
          photo: sessionUser?.image || "",
          githubId: sessionUser?.id || "",
          login: sessionUser?.login || "",
          accessToken: session?.accessToken || "",
          status: status,
          isVerifiedEmail: sessionUser?.isVerifiedEmail || false,
        })
      );
      if (pathname === "/") {
        router.push("/dashboard");
      } else {
        router.push(pathname);
      }
    } else {
      handleSessionFromCookies();
    }
  }, [session]);

  useEffect(() => {
    if (status === "unauthenticated") {
      dispatch(
        setUser({
          name: "",
          email: "",
          photo: "",
          githubId: "",
          login: "",
          accessToken: "",
          status: "unauthenticated",
          isVerifiedEmail: true,
        })
      );
      logout();
      router.push("/");
    }
  }, [router, dispatch, status]);

  const logout = async () => {
    await signOut({ redirect: false });
    dispatch(
      setUser({
        name: "",
        email: "",
        photo: "",
        githubId: "",
        login: "",
        accessToken: "",
        status: "unauthenticated",
        isVerifiedEmail: true,
      })
    );
    Cookies.remove("session");
    dispatch(resetProfile());
    localStorage.setItem("activeTab", "subheading");
    router.push("/");
  };

  useEffect(() => {
    if (pathname !== "/" && !Cookies.get("session")) {
      dispatch(resetProfile());
      localStorage.setItem("activeTab", "subheading");
      handleSessionFromCookies();
      logout();
    }
  }, [pathname]);

  const userLogin = () => {
    signIn("github");
  };

  return (
    <>
      {!session ? (
        <LoginButton>
          {status === "loading" && (
            <div className="flex items-center space-x-4 py-3">
              <Skeleton className="h-5 w-5 rounded-full" />
              <div className="space-y-2">
                <Skeleton className="h-2 w-[100px]" />
              </div>
            </div>
          )}
          {status === "unauthenticated" && (
            <button onClick={userLogin} className="py-2">
              <span className="text-sm md:text-base ">
                Sign in with GitHub&nbsp;
              </span>
              <span className="pt-[2px]">&gt;</span>
            </button>
          )}
        </LoginButton>
      ) : (
        <>
          <DropdownMenu>
            <DropdownMenuTrigger className="!outline-none">
              <LoginButton>
                <div className="flex gap-2 md:gap-4 items-center">
                  <ProfileImage />
                  <span className="text-sm md:text-base">
                    {user?.name || ""}
                  </span>
                  <ChevronDown size={20} className="hidden md:flex" />
                  <Menu size={16} className="flex md:hidden" />
                </div>
              </LoginButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-black text-white border-2 border-t-green-500/20 border-b-indigo-500/20 border-r-green-500/40 border-l-indigo-500/40 flex flex-col gap-2">
              {/* Changed DropdownMenuLabel to DropdownMenuItem which is the correct way to create dropdown menu */}
              <DropdownMenuItem
                asChild
                className={cn(
                  "cursor-pointer",
                  sessionToVerifyEmail.isVerifiedEmail
                    ? "flex md:hidden"
                    : "hidden"
                )}
              >
                <Link prefetch href="/dashboard" className="w-full">
                  <div className="flex items-center gap-4 justify-between w-full">
                    <span>Dashboard</span>
                    <Home size={20} />
                  </div>
                </Link>
              </DropdownMenuItem>

              <DropdownMenuItem
                asChild
                className={cn(
                  "cursor-pointer",
                  sessionToVerifyEmail.isVerifiedEmail
                    ? "flex md:hidden"
                    : "hidden"
                )}
              >
                <Link prefetch href="/repoinitialize">
                  <div className="flex items-center gap-4 justify-between w-full">
                    <span>Repo Initialize</span>
                    <CopyPlus size={20} />
                  </div>
                </Link>
              </DropdownMenuItem>

              <DropdownMenuItem
                asChild
                className={cn(
                  "cursor-pointer",
                  sessionToVerifyEmail.isVerifiedEmail
                    ? "flex md:hidden"
                    : "hidden"
                )}
              >
                <Link prefetch href="/connect">
                  <div className="flex items-center gap-4 justify-between w-full">
                    <span>Connect</span>
                    <Blocks size={20} />
                  </div>
                </Link>
              </DropdownMenuItem>

              <DropdownMenuItem
                asChild
                className={cn(
                  "cursor-pointer",
                  sessionToVerifyEmail.isVerifiedEmail
                    ? "flex md:hidden"
                    : "hidden"
                )}
              >
                <Link prefetch href="/leaderboard">
                  <div className="flex items-center gap-4 justify-between w-full">
                    <span>Leaderboard</span>
                    <Trophy size={20} />
                  </div>
                </Link>
              </DropdownMenuItem>

              {/* <DropdownMenuItem
                asChild
                className="cursor-pointer flex md:hidden"
              >
                <Link prefetch href="/listunescrowed">
                  <div className="flex items-center gap-4 justify-between w-full">
                    <span>Unescrowed Bounty</span>
                    <PictureInPicture size={20} />
                  </div>
                </Link>
              </DropdownMenuItem> */}

              <DropdownMenuItem
                asChild
                className="cursor-pointer flex md:hidden"
              >
                <Link prefetch href="/bounty">
                  <div className="flex items-center gap-4 justify-between w-full">
                    <span>Bounty</span>
                    <BadgeDollarSign size={20} />
                  </div>
                </Link>
              </DropdownMenuItem>

              <DropdownMenuItem
                asChild
                className={cn(
                  "cursor-pointer flex-col",
                  sessionToVerifyEmail.isVerifiedEmail ? "flex " : "hidden"
                )}
              >
                <Link prefetch href={`/p/${user?.login}`}>
                  <div className="relative flex md:hidden">
                    {/* <BottomGradient /> */}
                  </div>
                  <div className="flex items-center gap-4 justify-between w-full">
                    <span>Profile</span>
                    <SquareUser size={20} />
                  </div>
                </Link>
              </DropdownMenuItem>

              <DropdownMenuItem asChild className="cursor-pointer flex">
                <button
                  onClick={logout}
                  className="flex items-center gap-4 justify-between w-full"
                >
                  <span>Sign Out</span>
                  <LogOut size={20} />
                </button>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </>
      )}
    </>
  );
};

export default Login;
