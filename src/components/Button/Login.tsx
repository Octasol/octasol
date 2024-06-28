"use client";
import { useSession, signIn, signOut } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import { useLayoutEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
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
import ImportButton from "./ImportButton";

export default function Login() {
  const { data: session } = useSession();
  const router = useRouter();
  const pathname = usePathname();
  const dispatch = useDispatch();

  useLayoutEffect(() => {
    console.log(session);
    console.log(pathname);

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
        router.push("/dashboard");
      } else {
        router.push(pathname);
      }
    } else {
      router.push("/");
    }
  }, [session]);

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

  return (
    <>
      {session ? (
        <>
          <DropdownMenu>
            <DropdownMenuTrigger className="!outline-none">
              <ImportButton>
                <div className="flex gap-4 items-center">
                  <ProfileImage />
                  <span className="text-sm md:text-base">
                    {session.user?.name || ""}
                  </span>
                  <ChevronDown size={20} />
                </div>
              </ImportButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-black text-white border-2  border-t-green-500/20 border-b-indigo-500/20 border-r-green-500/40 border-l-indigo-500/40 ">
              <DropdownMenuLabel onClick={logout}>
                <div className="flex items-center gap-4">
                  <span>Sign Out</span>
                  <LogOut size={20} />
                </div>
              </DropdownMenuLabel>
            </DropdownMenuContent>
          </DropdownMenu>
        </>
      ) : (
        <ImportButton>
          <button onClick={() => signIn("github")}>
            <span className="text-sm md:text-base">Connect with us&nbsp;</span>
            <span className="pt-[2px]">&gt;</span>
          </button>
        </ImportButton>
      )}
    </>
  );
}
