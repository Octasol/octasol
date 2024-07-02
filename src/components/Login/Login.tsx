"use client";
import React, { useEffect } from "react";
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
import { ChevronDown, GitBranchPlus, Home, LogOut } from "lucide-react";
import BottomGradient from "../ui/BottomGradient";
import { setInstallations } from "@/app/Redux/Features/git/githubInstallation";
import { clearError, setError } from "@/app/Redux/Features/error/error";
import LoginButton from "../Button/LoginButton";

const Login = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const pathname = usePathname();
  const dispatch = useDispatch();
  const user = useSelector((state: any) => state.user);
  const installations = useSelector((state: any) => state.git);
  const error = useSelector((state: any) => state.error);

  useEffect(() => {
    if (session) {
      const array = session?.user?.image?.split("/");
      if (array && array.length > 0) {
        const id = array[array.length - 1];
        dispatch(
          setUser({
            name: session.user?.name || "",
            email: session.user?.email || "",
            photo: session.user?.image || "",
            githubId: id || "",
          })
        );
      }
      if (pathname === "/") {
        router.push("/repoinitialize");
      } else {
        router.push(pathname);
      }
    } else {
      router.push("/");
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
      })
    );
    router.push("/");
  };

  // const fetchInstallations = async () => {
  //   try {
  //     dispatch(clearError());
  //     const response = await fetch("/api/github-installations");
  //     if (!response.ok) {
  //       throw new Error(`HTTP error! status: ${response.status}`);
  //     }
  //     const data = await response.json();
  //     dispatch(setInstallations(data.installations));
  //   } catch (err: any) {
  //     dispatch(setError(err.message));
  //   }
  // };

  // useEffect(() => {
  //   fetchInstallations();
  // }, []);

  useEffect(() => {
    console.log("error", error);
  }, [error]);

  // const handleInstall = () => {
  //   const clientId = process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID ?? "";
  //   const redirectUri =
  //     process.env.NEXT_PUBLIC_GITHUB_APP_INSTALLATION_CALLBACK_URL ?? "";
  //   const state = uuidv4();
  //   cookie.set("oauth_state", state, {
  //     secure: process.env.NODE_ENV === "production",
  //     sameSite: "strict",
  //   });
  //   const installUrl = `https://github.com/apps/Octasol-DEV-app/installations/new?state=${state}&client_id=${clientId}&redirect_uri=${encodeURIComponent(
  //     redirectUri
  //   )}`;
  //   window.location.href = installUrl;
  // };

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
                  <GitBranchPlus size={20} />
                </div>
              </DropdownMenuLabel>

              {/* <DropdownMenuLabel
                onClick={handleInstall}
                className="cursor-pointer  flex  flex-col"
              >
                <div className="flex items-center gap-4 justify-between w-full ">
                  <span>Install GitHub App</span>
                  <GitCommitVertical size={20} />
                </div>
              </DropdownMenuLabel> */}
              {/* <DropdownMenuLabel
                onClick={fetchInstallations}
                className="cursor-pointer  flex  flex-col"
              >
                <div className="flex items-center gap-4 justify-between w-full ">
                  <span>Fetch Installations</span>
                  <GitMerge size={20} />
                </div>
              </DropdownMenuLabel> */}
              {/* <DropdownMenuLabel>
                <ul>
                  {installations.map((installation: any) => (
                    <li key={installation.id}>
                      ID: {installation.id}, Account:{" "}
                      {installation.account.login}
                    </li>
                  ))}
                </ul>
              </DropdownMenuLabel> */}
              <DropdownMenuLabel
                onClick={logout}
                className="cursor-pointer  flex  flex-col"
              >
                <div className="relative flex md:hidden">
                  <BottomGradient />
                </div>
                <div className="flex items-center gap-4 justify-between w-full pt-3 md:pt-0 ">
                  <span>Sign Out</span>
                  <LogOut size={20} />
                </div>
              </DropdownMenuLabel>
            </DropdownMenuContent>
          </DropdownMenu>
          {/* <div>
            <button onClick={handleInstall}>Install GitHub App</button>
            <button onClick={fetchInstallations}>Fetch Installations</button>
            {error && <p>Error: {error}</p>}
            <ul>
              {installations.map((installation) => (
                <li key={installation.id}>
                  ID: {installation.id}, Account: {installation.account.login}
                </li>
              ))}
            </ul>
          </div> */}
        </>
      )}
    </>
  );
};

export default Login;
