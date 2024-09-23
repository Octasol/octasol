import { initializeUser } from "@/utils/dbUtils";
import axios from "axios";
import { NextAuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";

export const authOptions: NextAuthOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID! as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET! as string,
    }),
  ],
  callbacks: {
    async jwt({
      token,
      account,
      profile,
    }: {
      token: any;
      account: any;
      profile?: any;
    }) {
      if (account) {
        token.accessToken = account.access_token;
      }
      if (profile) {
        if (!profile.email) {
          profile.email = await getEmail(token.accessToken);
        }
        token.profile = profile;
      }
      return token;
    },
    async session({ session, token }: { session: any; token: any }) {
      session.accessToken = token.accessToken;
      session.user = { ...session.user, ...token.profile };
      await initializeUser(session.user.id, session.user.email);
      return session;
    },
  },
};

async function getEmail(authToken: string) {
  const emailsData = await axios.get(
    "https://api.github.com/user/public_emails",
    {
      headers: {
        Authorization: `token ${authToken}`,
      },
    }
  );

  for (const email of emailsData.data) {
    if (email.email.endsWith("@users.noreply.github.com")) {
      continue;
    }
    if (email.primary) {
      return email.email;
    }
  }
}
