"use client";
import { useSession, signIn, signOut } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import { useLayoutEffect } from "react";
import { useDispatch } from "react-redux";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import ProfileImage from "../ProfileImage";
import { ChevronDown, LogOut } from "lucide-react";
import { setUser } from "@/app/Redux/user/userSlice";

export default function Login() {
  const { data: session } = useSession();
  const router = useRouter();
  const pathname = usePathname();
  const dispatch = useDispatch();

  useLayoutEffect(() => {
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
      // router.push("/dashboard");
    } else {
      // router.push("/");
    }
  }, [session, pathname, router, dispatch]);

  return (
    <>
      {session ? (
        <>
          <DropdownMenu>
            <DropdownMenuTrigger className="!outline-none">
              <div className="bg-slate-800 no-underline group cursor-pointer relative shadow-2xl shadow-zinc-900 rounded-full p-px text-xs font-semibold leading-6 text-white inline-block">
                <span className="absolute inset-0 overflow-hidden rounded-full">
                  <span className="absolute inset-0 rounded-full bg-[image:radial-gradient(75%_100%_at_50%_0%,rgba(56,189,248,0.6)_0%,rgba(56,189,248,0)_75%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100"></span>
                </span>
                <div className="relative flex space-x-2 justify-between items-center z-10 rounded-full bg-zinc-950 py-2 px-4 ring-1 ring-white/10 ">
                  <div className="flex gap-4 items-center">
                    <ProfileImage />
                    <span className="text-sm md:text-base">
                      {session.user?.name || ""}
                    </span>
                    <ChevronDown size={20} />
                  </div>
                </div>
                <span className="absolute -bottom-0 left-[1.125rem] h-px w-[calc(100%-2.25rem)] bg-gradient-to-r from-emerald-400/0 via-emerald-400/90 to-emerald-400/0 transition-opacity duration-500 group-hover:opacity-40"></span>
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-black text-white border-2  border-t-green-500/20 border-b-indigo-500/20 border-r-green-500/40 border-l-indigo-500/40 ">
              <DropdownMenuLabel onClick={() => signOut()}>
                <div className="flex items-center gap-4">
                  <span>Sign Out</span>
                  <LogOut size={20} />
                </div>
              </DropdownMenuLabel>
            </DropdownMenuContent>
          </DropdownMenu>
        </>
      ) : (
        <div className="bg-slate-800 no-underline group cursor-pointer relative shadow-2xl shadow-zinc-900 rounded-full p-px text-xs font-semibold leading-6 text-white inline-block">
          <span className="absolute inset-0 overflow-hidden rounded-full">
            <span className="absolute inset-0 rounded-full bg-[image:radial-gradient(75%_100%_at_50%_0%,rgba(56,189,248,0.6)_0%,rgba(56,189,248,0)_75%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100"></span>
          </span>
          <div className="relative flex space-x-2 justify-between items-center z-10 rounded-full bg-zinc-950 py-2 px-4 ring-1 ring-white/10 ">
            <button onClick={() => signIn("github")}>
              <span className="text-sm md:text-base">
                Connect with us&nbsp;
              </span>
              <span className="pt-[2px]">&gt;</span>
            </button>
          </div>
          <span className="absolute -bottom-0 left-[1.125rem] h-px w-[calc(100%-2.25rem)] bg-gradient-to-r from-emerald-400/0 via-emerald-400/90 to-emerald-400/0 transition-opacity duration-500 group-hover:opacity-40"></span>
        </div>
      )}
    </>
  );
}
