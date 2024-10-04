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
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import ProfileImage from "../ProfileImage";
import {
  Blocks,
  ChevronDown,
  CopyPlus,
  Home,
  LogOut,
  Menu,
  SquareUser,
} from "lucide-react";
import BottomGradient from "../ui/BottomGradient";
import LoginButton from "../Button/LoginButton";
import { IconChartHistogram } from "@tabler/icons-react";
import { decrement, increment } from "@/app/Redux/Features/loader/loaderSlice";
import { store } from "@/app/Redux/store";
import { Skeleton } from "../ui/skeleton";
import Cookies from "js-cookie";

const Login = () => {
  const { data: session, status } = useSession() as any;
  const router = useRouter();
  const pathname = usePathname();
  const dispatch = useDispatch();
  const user = useSelector((state: any) => state.user);

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
      Cookies.set("session", JSON.stringify(sessionUser), { expires: 1 });
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
      console.log("sessionUser:", sessionUser);
      if (pathname === "/") {
        router.push("/dashboard");
      } else {
        router.push(pathname);
      }
    } else {
      handleSessionFromCookies();
    }
  }, [sessionUser, pathname, router, dispatch]);

  useEffect(() => {
    if (status === "unauthenticated") {
      Cookies.remove("session");
      router.push("/");
    }
  }, [status, router]);

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
    router.push("/");
  };

  const userLogin = () => {
    signIn("github");
  };

  // useEffect(() => {
  //   if (status === "unauthenticated") {
  //     logout();
  //   }
  // }, [status]);

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
              <DropdownMenuLabel className="cursor-pointer flex md:hidden">
                <Link prefetch href="/dashboard">
                  <div className="flex items-center gap-4 justify-between w-full">
                    <span>Dashboard</span>
                    <Home size={20} />
                  </div>
                </Link>
              </DropdownMenuLabel>

              <DropdownMenuLabel className="cursor-pointer flex md:hidden">
                <Link prefetch href="/repoinitialize">
                  <div className="flex items-center gap-4 justify-between w-full">
                    <span>Repo Initialize</span>
                    <CopyPlus size={20} />
                  </div>
                </Link>
              </DropdownMenuLabel>

              <DropdownMenuLabel className="cursor-pointer flex md:hidden">
                <Link prefetch href="/connect">
                  <div className="flex items-center gap-4 justify-between w-full">
                    <span>Connect</span>
                    <Blocks size={20} />
                  </div>
                </Link>
              </DropdownMenuLabel>

              <DropdownMenuLabel className="cursor-pointer flex md:hidden">
                <Link prefetch href="/leaderboard">
                  <div className="flex items-center gap-4 justify-between w-full">
                    <span>Leaderboard</span>
                    <IconChartHistogram size={20} />
                  </div>
                </Link>
              </DropdownMenuLabel>

              <DropdownMenuLabel className="cursor-pointer flex flex-col">
                <Link prefetch href={`/p/${user?.login}`}>
                  <div className="relative flex md:hidden">
                    <BottomGradient />
                  </div>
                  <div className="flex items-center gap-4 justify-between w-full pt-3 md:pt-0">
                    <span>Profile</span>
                    <SquareUser size={20} />
                  </div>
                </Link>
              </DropdownMenuLabel>

              <DropdownMenuLabel className="cursor-pointer flex flex-col">
                <button
                  onClick={logout}
                  className="flex items-center gap-4 justify-between w-full"
                >
                  <span>Sign Out</span>
                  <LogOut size={20} />
                </button>
              </DropdownMenuLabel>
            </DropdownMenuContent>
          </DropdownMenu>
        </>
      )}
    </>
  );
};

export default Login;
