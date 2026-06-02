import type { News } from "@/types/news"
import type { Sector } from "@/types/common"
import { mockNews } from "@/lib/mock/news"
import { apiRequest } from "@/lib/api/client"

const USE_MOCK = false

export async function getNews(sector?: Sector): Promise<News[]> {
  if (USE_MOCK) {
    if (!sector || sector === "all") return mockNews
    return mockNews.filter((n) => n.sector === sector)
  }

  const query = sector && sector !== "all" ? `?sector=${sector}` : ""
  return apiRequest<News[]>(`/api/news/${query}`)
}

export async function getNewsById(id: string): Promise<News | null> {
  if (USE_MOCK) {
    return mockNews.find((n) => n.id === id) ?? null
  }
  return apiRequest<News>(`/api/news/${id}/`)
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