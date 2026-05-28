import type { News } from "@/types/news"
import type { ApiResponse, Sector } from "@/types/common"
import { mockNews } from "@/lib/mock/news"
import { apiRequest } from "@/lib/api/client"

const USE_MOCK = false  // ← غيّرها لـ false عند ربط الباك

export async function getNews(sector?: Sector): Promise<News[]> {
  if (USE_MOCK) {
    if (!sector || sector === "all") return mockNews
    return mockNews.filter((n) => n.sector === sector)
  }
  const url = sector && sector !== "all"
    ? `/api/news?sector=${sector}`
    : `/api/news`
  const res = await fetch(url)
  
  const json: ApiResponse<News[]> = await res.json()
  if (!json.success) throw new Error(json.message)

  return json.data  // ← البيانات الحقيقية
}

export async function getFeaturedNews(): Promise<News[]> {
  const news = await getNews()
  return news.slice(0, 3)   // أول 3 للـ Home
}

export async function getNewsById(id: string): Promise<News | null> {
  if (USE_MOCK) {
    return mockNews.find((n) => n.id === id) ?? null
  }

  const res = await fetch(`/api/news/${id}`)
  if (!res.ok) return null
  return res.json()
}
export async function createNews(data: Partial<News>): Promise<News> {
  return apiRequest<News>("/api/news/", {
    method: "POST",
    body: JSON.stringify(data),
  })
}

export async function updateNews(id: string, data: Partial<News>): Promise<News> {
  return apiRequest<News>(`/api/news/${id}/`, {
    method: "PUT",
    body: JSON.stringify(data),
  })
}

export async function deleteNews(id: string): Promise<void> {
  return apiRequest<void>(`/api/news/${id}/`, {
    method: "DELETE",
  })
}