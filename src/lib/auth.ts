import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "@/lib/prisma/client";
import { PrismaClient } from "@prisma/client/extension";
import { compare } from "bcrypt";

const authOptions = {
  providers: [
    CredentialsProvider({
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials, _req) {
        const user = await prisma.user.findUnique({
          where: {
            email: credentials?.email,
          },
        });

        if (!user) return null;

        const isCorrectPassword = await compare(
          credentials?.password || "",
          user.password
        );

        if (isCorrectPassword) {
          return {
            id: user.id,
            email: user.email,
          };
        }

        return null;
      },
    }),
  ],
  adapter: PrismaAdapter(prisma as unknown as PrismaClient),
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/auth/sign-in",
  },
} satisfies AuthOptions;

export default authOptions;
