import type { Media } from "@/types/media"
import { mockMedia } from "@/lib/mock/media"

const USE_MOCK = true

export async function getMedia(): Promise<Media[]> {
  if (USE_MOCK) return mockMedia

  const res = await fetch("/api/media")
  if (!res.ok) throw new Error("فشل جلب الميديا")
  return res.json()
}

export async function getFeaturedMedia(): Promise<Media[]> {
  const media = await getMedia()
  return media.slice(0, 6)
}