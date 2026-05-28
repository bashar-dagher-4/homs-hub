export type UserRole = "superadmin" | "admin"
export type UserSector = "sports" | "health" | "education" | null

export type AuthUser = {
  id: string
  name: string
  username: string
  role: UserRole
  sector: UserSector
  accessToken: string
}