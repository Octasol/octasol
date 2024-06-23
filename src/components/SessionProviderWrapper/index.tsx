"use client";

import { SessionProvider } from "next-auth/react";
import { Session } from "next-auth";
import React from "react";

interface Props {
  session: Session | null;
  children: React.ReactNode;
}

export default function SessionProviderWrapper({ session, children }: Props) {
  return <SessionProvider session={session}>{children}</SessionProvider>;
}
