export type Sector = "all" | "sports" | "health" | "education"

export type ApiResponse<T> = {
  data: T
  message: string
  success: boolean
}