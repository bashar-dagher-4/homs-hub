import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { mockUsers } from "@/lib/mock/auth"
import type { AuthUser } from "@/types/auth"

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials): Promise<AuthUser | null> {
        if (!credentials?.username || !credentials?.password) return null

        const user = mockUsers.find(
          (u) =>
            u.username === credentials.username &&
            u.password === credentials.password
        )

        if (!user) return null

        return {
          id: user.id,
          name: user.name,
          username: user.username,
          role: user.role,
          sector: user.sector,
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        const authUser = user as AuthUser
        token.role = authUser.role
        token.sector = authUser.sector
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.role = token.role
        session.user.sector = token.sector
      }
      return session
    },
  },
  pages: {
    signIn: "/login",
  },
session: {
  strategy: "jwt",
  maxAge: 60 * 60 * 8, // 8 ساعات فقط
},
jwt: {
  maxAge: 60 * 60 * 8, // 8 ساعات
},
  secret: process.env.NEXTAUTH_SECRET,
})

export { handler as GET, handler as POST }