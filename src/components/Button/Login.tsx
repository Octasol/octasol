"use client";
import { useSession, signIn, signOut } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Login() {
  const { data: session } = useSession();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (session) {
      router.push("/dashboard");
    } else {
      router.push("/");
    }
  }, [session, pathname, router]);

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
