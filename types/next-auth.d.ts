import { DefaultSession } from "next-auth"
import { DefaultJWT } from "next-auth/jwt"
import type { UserRole, UserSector } from "./auth"

declare module "next-auth" {
  interface Session {
    accessToken: string
    user: {
      role: UserRole
      sector: UserSector
    } & DefaultSession["user"]
  }

  interface User {
    role: UserRole
    sector: UserSector
    accessToken: string
  }
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    role: UserRole
    sector: UserSector
    accessToken: string
  }
}