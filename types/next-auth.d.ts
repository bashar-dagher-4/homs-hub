import { DefaultSession, DefaultUser } from "next-auth"
import { DefaultJWT } from "next-auth/jwt"
import type { UserRole, UserSector } from "./auth"

declare module "next-auth" {
  interface Session {
    user: {
      role: UserRole
      sector: UserSector
    } & DefaultSession["user"]
  }

  interface User extends DefaultUser {
    role: UserRole
    sector: UserSector
  }
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    role: UserRole
    sector: UserSector
  }
}