import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from '@prisma/extension-accelerate'

declare global {
  var prisma: PrismaClient | undefined;
}

export const db = new PrismaClient().$extends(withAccelerate())