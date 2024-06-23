"use client";

import { useSession, signIn, signOut } from "next-auth/react";

export default function Login() {
  const { data: session } = useSession();

  if (session) {
    return (
      <>
        <button onClick={() => signOut()}>
          <span className="text-sm md:text-base">Sign out&nbsp;</span>
          <span className="pt-[2px]">&gt;</span>
        </button>
      </>
    );
  }

  return (
    <>
      <button onClick={() => signIn("github")}>
        <span className="text-sm md:text-base">Connect with us&nbsp;</span>
        <span className="pt-[2px]">&gt;</span>
      </button>
    </>
  );
}
