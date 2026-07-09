import NextAuth, { type NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import type { AuthUser } from "@/types/auth"

const API_URL = process.env.NEXT_PUBLIC_API_URL

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },

     async authorize(credentials): Promise<AuthUser | null> {
      // console.log("Authorizing with credentials:", credentials) // Debugging line
  if (!credentials?.username || !credentials?.password) return null
  
  try {
    const res = await fetch(`${API_URL}/api/login/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: credentials.username,
        password: credentials.password,
      }),
    })
    if (!res.ok) return null
    const data = await res.json()
    return {
      id: data.user.id,
      name: data.user.name,
      username: data.user.username,
      role: data.user.role,
      sector: data.user.sector,
      accessToken: data.access,
    }
  } catch {
    return null
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
        token.accessToken = authUser.accessToken
      }
      return token
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.role = token.role
        session.user.sector = token.sector
        session.accessToken = token.accessToken
      }
      return session
    },
  },

  pages: { signIn: "/login" },
  session: { strategy: "jwt" as const, maxAge: 60 * 60 * 8 },
  secret: process.env.NEXTAUTH_SECRET,
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }