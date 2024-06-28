"use client";
import React from "react";

import { useState } from "react";
import { signIn, useSession } from "next-auth/react";

interface Installation {
  id: number;
  account: {
    login: string;
  };
}

const Install = () => {
  const { data: session } = useSession();
  const [installations, setInstallations] = useState<Installation[]>([]);
  const [error, setError] = useState<string | null>(null);

  const fetchInstallations = async () => {
    try {
      const response = await fetch("/api/github-installations");
      const data = await response.json();
      setInstallations(data.installations);
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleInstall = () => {
    const clientId = process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID ?? "";
    const redirectUri =
      process.env.NEXT_PUBLIC_GITHUB_APP_INSTALLATION_CALLBACK_URL ?? "";
    const installUrl = `https://github.com/apps/Octasol-DEV-app/installations/new?state=YOUR_UNIQUE_STATE_STRING&client_id=${clientId}&redirect_uri=${encodeURIComponent(
      redirectUri
    )}`;
    window.location.href = installUrl;
  };

  return (
    <div className="flex flex-col gap-4 pt-24 h-full w-full justify-center items-center">
      {!session ? (
        <button onClick={() => signIn("github")}>Sign in with GitHub</button>
      ) : (
        <div>
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
        </div>
      )}
    </div>
  );
};

export default Install;
