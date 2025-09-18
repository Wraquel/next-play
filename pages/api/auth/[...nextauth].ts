import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { UserType } from "@/utils/user";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        name: { label: "Name", type: "text" }
      },
      async authorize(credentials) {
        const res = await fetch("http://localhost:8000/users");
        const users = await res.json();
        const user = users.find((user:UserType) => user.name === credentials?.name);
        return user || null;
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if(user) {
        token.user = user;
      }
      return token;
    },
    async session({ session, token }) {
      session.user = token.user as any;
      return session;
    }
  }
})

declare module "next-auth" {
  
  interface Session {
    user: UserType;
  }
}
export default handler;
