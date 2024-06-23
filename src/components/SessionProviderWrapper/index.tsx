"use client";

import { SessionProvider } from "next-auth/react";
import { Session } from "next-auth";
import React from "react";

interface Props {
  session: Session | null;
  children: React.ReactNode;
}

const SessionProviderWrapper: React.FC<Props> = ({ session, children }) => {
  return <SessionProvider session={session}>{children}</SessionProvider>;
};

export default SessionProviderWrapper;
