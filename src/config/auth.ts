// import { getUser, setUser } from "@/utils/dbUtils";
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
        token.profile = profile;
      }
      return token;
    },
    async session({ session, token }: { session: any; token: any }) {
      session.accessToken = token.accessToken;
      session.user = { ...session.user, ...token.profile };
      // const array = session?.user?.image?.split("/");
      // if (array && array.length > 0) {
      //   const id = array[array.length - 1];
      // }
      // console.log("Session: ", session);
      return session;
    },
  },
};
