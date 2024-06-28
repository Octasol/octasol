import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";

export const authOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_LOGIN_CLIENT_ID! as string,
      clientSecret: process.env.GITHUB_LOGIN_CLIENT_SECRET! as string,
    }),
  ],
  callbacks: {
    async jwt({ token, account }: { token: any; account: any }) {
      if (account) {
        token.accessToken = account.access_token;
      }
      if (account?.providerAccountId) {
        token.installationId = account.providerAccountId;
      }
      return token;
    },
    async session({ session, token }: { session: any; token: any }) {
      session.accessToken = token.accessToken;
      session.user.installationId = token.installationId;
      console.log("session access token: ", session.accessToken);
      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export const GET = handler;
export const POST = handler;
