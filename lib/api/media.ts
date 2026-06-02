import type { Media } from "@/types/media"
import { apiRequest } from "./client";



export async function getMedia(): Promise<Media[]> {
  return apiRequest<Media[]>("/api/media/")
}

export async function getFeaturedMedia(): Promise<Media[]> {
  const media = await getMedia()
  return media.slice(0, 12)
}