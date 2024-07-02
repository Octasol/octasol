import { setUser } from "@/utils/dbUtils";
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
    async jwt({ token, account }: { token: any; account: any }) {
      if (account) {
        token.accessToken = account.access_token;
      }
      return token;
    },
    async session({ session, token }: { session: any; token: any }) {
      session.accessToken = token.accessToken;
      console.log("Session: ", session);
      const array = session?.user?.image?.split("/");
      if (array && array.length > 0) {
        const id = array[array.length - 1];
        if (await setUser(parseInt(id), 0)) {
          console.log("User set");
        } else console.log("User not set");
      }
      return session;
    },
  },
};
