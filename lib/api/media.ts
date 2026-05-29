import type { Media } from "@/types/media"
import { mockMedia } from "@/lib/mock/media"
import { ApiResponse } from "@/types/common";

const USE_MOCK = false

export async function getMedia(): Promise<Media[]> {
  if (USE_MOCK) return mockMedia

  const res = await fetch("/api/media")
   const json: ApiResponse<Media[]> = await res.json()
  if (!json.success) throw new Error(json.message)

  return json.data 
}

export async function getFeaturedMedia(): Promise<Media[]> {
  const media = await getMedia()
  return media.slice(0, 6)
}