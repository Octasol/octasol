import { Profile as NextAuthProfile } from "next-auth";

declare module "next-auth" {
  interface Profile extends NextAuthProfile {
    login?: string;
  }
}
