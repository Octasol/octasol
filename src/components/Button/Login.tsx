"use client";
import { useSession, signIn, signOut } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "@/app/Redux/Features/user/userSlice";

export default function Login() {
  const { data: session } = useSession();
  const router = useRouter();
  const pathname = usePathname();
  const dispatch = useDispatch();

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
      router.push("/dashboard");
    } else {
      router.push("/");
    }
  }, [session, pathname, router, dispatch]);

  return (
    <>
      {session ? (
        <button onClick={() => signOut()}>
          <span className="text-sm md:text-base">Sign out&nbsp;</span>
          <span className="pt-[2px]">&gt;</span>
        </button>
      ) : (
        <button onClick={() => signIn("github")}>
          <span className="text-sm md:text-base">Connect with us&nbsp;</span>
          <span className="pt-[2px]">&gt;</span>
        </button>
      )}
    </>
  );
}
