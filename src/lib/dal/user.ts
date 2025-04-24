import "server-only";
import { getServerSession } from "next-auth";
import authOptions from "../auth";
import prisma from "@/lib/prisma/client";
import { Prisma } from "@prisma/client";

export type UserType = Prisma.UserGetPayload<{
  select: {
    id: true,
    email: true,
    role: true,
  }
}>;

export const currentUser = async (): Promise<UserType | null> => {
  const session = await getServerSession(authOptions);
  const user = await prisma.user.findUnique({
    where: {
      email: session?.user?.email ?? "",
    },
    select: {
      id: true,
      email: true,
      role: true,
    },
  });

  return user;
};
