/* eslint-disable @typescript-eslint/no-explicit-any */
import NextAuth from "next-auth";
import bcrypt from "bcryptjs";
import { PrismaAdapter } from "@auth/prisma-adapter";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { signInSchema } from "./validation/auth-validate";
import { prisma } from "./prismadb";
import { generateBaseUsername } from "./helper";
import { ensureUniqueUsername } from "@/app/actions/auth.action";

export const {
  auth,
  handlers: { GET, POST },
  signIn,
  signOut,
} = NextAuth({
  adapter: PrismaAdapter(prisma),

  providers: [
    GoogleProvider({
      profile: async (profile) => {
        const baseUsername = generateBaseUsername(profile.name);
        const uniqueUsername = await ensureUniqueUsername(baseUsername);
        return {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
          profileImage: profile.picture,
          username: profile.username ? profile.username : uniqueUsername,
        };
      },
    }),
    CredentialsProvider({
      credentials: {
        //username: { label: "emailOrUsername", type: "text" },
        email: { label: "email", type: "email" },
        password: { label: "password", type: "password" },
      },
      authorize: async (credentials): Promise<any> => {
        //const emailOrUsername = credentials.email;
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Invalid credentials");
        }
        try {
          const { email, password } = await signInSchema.parseAsync(
            credentials
          );
          const user = await prisma.user.findUnique({
            where: {
              email: email,
            },
          });
          if (!user || !user?.hashedPassword) {
            throw new Error("User not found.");
          }
          const isMatch = await bcrypt.compare(password, user.hashedPassword);

          if (!isMatch) {
            throw new Error("Email/Password not found.");
          }
          return user;
        } catch (err) {
          throw new Error("Invalid credentials");
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
        token.username = user.username;
      }
      return token;
    },
    async session({ session, token }) {
      // Pass the user's ID and other info into the session
      if (token) {
        session.user.id = String(token.id);
        session.user.email = token.email ?? "";
        session.user.name = token.name;
        session.user.username = token.username;
      }
      return session;
    },
  },
});
