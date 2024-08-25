"use client";
import React, { useEffect, useState } from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
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
  SquareUser,
} from "lucide-react";
import BottomGradient from "../ui/BottomGradient";
import LoginButton from "../Button/LoginButton";
import { POST } from "@/config/axios/requests";
import { IconChartHistogram } from "@tabler/icons-react";
import { githubDevProfile } from "@/config/axios/Breakpoints";

const Login = () => {
  const { data: session } = useSession() as any;
  const router = useRouter();
  const pathname = usePathname();
  const dispatch = useDispatch();
  const user = useSelector((state: any) => state.user);
  const error = useSelector((state: any) => state.error);
  const [hasPosted, setHasPosted] = useState(false);

  interface SessionUser {
    name?: string | null;
    email?: string | null;
    image?: string | null;
    login?: string | null;
    id?: string | null;
    node_id?: string | null;
    avatar_url?: string | null;
    gravatar_id?: string | null;
    url?: string | null;
    html_url?: string | null;
    followers_url?: string | null;
    following_url?: string | null;
    gists_url?: string | null;
    starred_url?: string | null;
    subscriptions_url?: string | null;
    organizations_url?: string | null;
    repos_url?: string | null;
    events_url?: string | null;
    received_events_url?: string | null;
    type?: string | null;
    site_admin?: boolean | null;
    company?: string | null;
    blog?: string | null;
    location?: string | null;
    hireable?: boolean | null;
    bio?: string | null;
    twitter_username?: string | null;
    public_repos?: number | null;
    public_gists?: number | null;
    followers?: number | null;
    following?: number | null;
    created_at?: string | null;
    updated_at?: string | null;
  }
  useEffect(() => {
    if (session && !hasPosted) {
      const runPostRequest = async () => {
        try {
          await POST(
            githubDevProfile,
            {},
            {
              Authorization: `Bearer ${session.accessToken as string}`,
            }
          );
          setHasPosted(true);
        } catch (err) {
          console.error("Failed to run POST request:", err);
        }
      };

      runPostRequest();
    }
  }, [session, hasPosted]);

  useEffect(() => {
    if (session !== undefined) {
      if (session) {
        const user = session.user as SessionUser;
        dispatch(
          setUser({
            name: user?.name || "",
            email: user?.email || "",
            photo: user?.image || "",
            githubId: user?.id || "",
            image: user?.image || "",
            login: user?.login || "",
            node_id: user?.node_id || "",
            avatar_url: user?.avatar_url || "",
            gravatar_id: user?.gravatar_id || "",
            url: user?.url || "",
            html_url: user?.html_url || "",
            followers_url: user?.followers_url || "",
            following_url: user?.following_url || "",
            gists_url: user?.gists_url || "",
            starred_url: user?.starred_url || "",
            subscriptions_url: user?.subscriptions_url || "",
            organizations_url: user?.organizations_url || "",
            repos_url: user?.repos_url || "",
            events_url: user?.events_url || "",
            received_events_url: user?.received_events_url || "",
            type: user?.type || "",
            site_admin: user?.site_admin || false,
            company: user?.company || "",
            blog: user?.blog || "",
            location: user?.location || "",
            hireable: user?.hireable || false,
            bio: user?.bio || "",
            twitter_username: user?.twitter_username || "",
            public_repos: user?.public_repos || 0,
            public_gists: user?.public_gists || 0,
            followers: user?.followers || 0,
            following: user?.following || 0,
            created_at: user?.created_at || "",
            updated_at: user?.updated_at || "",
            accessToken: session.accessToken as string,
            expires: session.expires as string,
          })
        );

        if (pathname === "/") {
          router.push("/dashboard");
        } else {
          router.push(pathname);
        }
      } else {
        router.push("/");
      }
    }
  }, [session, user, pathname]);

  const logout = () => {
    signOut();
    dispatch(
      setUser({
        name: "",
        email: "",
        photo: "",
        githubId: "",
        image: "",
        login: "",
        node_id: "",
        avatar_url: "",
        gravatar_id: "",
        url: "",
        html_url: "",
        followers_url: "",
        following_url: "",
        gists_url: "",
        starred_url: "",
        subscriptions_url: "",
        organizations_url: "",
        repos_url: "",
        events_url: "",
        received_events_url: "",
        type: "",
        site_admin: false,
        company: "",
        blog: "",
        location: "",
        hireable: false,
        bio: "",
        twitter_username: "",
        public_repos: 0,
        public_gists: 0,
        followers: 0,
        following: 0,
        created_at: "",
        updated_at: "",
        accessToken: "",
        expires: "",
      })
    );
    router.push("/");
  };

  useEffect(() => {
  }, [error]);

  const handleProfile = (user: string) => {
    router.replace(`/p/${user}`);
  };

  return (
    <>
      {!session ? (
        <LoginButton>
          <button onClick={() => signIn("github")} className="py-2">
            <span className="text-sm md:text-base ">
              Sign in with GitHub&nbsp;
            </span>
            <span className="pt-[2px]">&gt;</span>
          </button>
        </LoginButton>
      ) : (
        <>
          <DropdownMenu>
            <DropdownMenuTrigger className="!outline-none">
              <LoginButton>
                <div className="flex gap-4 items-center">
                  <ProfileImage />
                  <span className="text-sm md:text-base">
                    {user?.name || ""}
                  </span>
                  <ChevronDown size={20} />
                </div>
              </LoginButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-black text-white border-2  border-t-green-500/20 border-b-indigo-500/20 border-r-green-500/40 border-l-indigo-500/40 flex flex-col gap-2">
              <DropdownMenuLabel
                className="cursor-pointer  flex md:hidden"
                onClick={() => router.push("/dashboard")}
              >
                <div className="flex items-center gap-4 justify-between w-full">
                  <span>Dashboard</span>
                  <Home size={20} />
                </div>
              </DropdownMenuLabel>
              <DropdownMenuLabel
                className="cursor-pointer  flex md:hidden"
                onClick={() => router.push("/repoinitialize")}
              >
                <div className="flex items-center gap-4 justify-between w-full">
                  <span>Repo Initialize</span>
                  <CopyPlus size={20} />
                </div>
              </DropdownMenuLabel>
              <DropdownMenuLabel
                className="cursor-pointer  flex md:hidden"
                onClick={() => router.push("/connect")}
              >
                <div className="flex items-center gap-4 justify-between w-full">
                  <span>Connect</span>
                  <Blocks size={20} />
                </div>
              </DropdownMenuLabel>
              <DropdownMenuLabel
                className="cursor-pointer  flex md:hidden"
                onClick={() => router.push("/leaderboard")}
              >
                <div className="flex items-center gap-4 justify-between w-full">
                  <span>Leaderboard</span>
                  <IconChartHistogram size={20} />
                </div>
              </DropdownMenuLabel>

              <DropdownMenuLabel
                onClick={() => handleProfile(user?.login)}
                className="cursor-pointer  flex  flex-col"
              >
                <div className="relative flex md:hidden">
                  <BottomGradient />
                </div>
                <div className="flex items-center gap-4 justify-between w-full pt-3 md:pt-0 ">
                  <span>Profile</span>
                  <SquareUser size={20} />
                </div>
              </DropdownMenuLabel>
              <DropdownMenuLabel
                onClick={logout}
                className="cursor-pointer  flex  flex-col"
              >
                <div className="flex items-center gap-4 justify-between w-full  ">
                  <span>Sign Out</span>
                  <LogOut size={20} />
                </div>
              </DropdownMenuLabel>
            </DropdownMenuContent>
          </DropdownMenu>
        </>
      )}
    </>
  );
};

export default Login;
