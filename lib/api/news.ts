import type { News } from "@/types/news"
import type { Sector } from "@/types/common"
import { mockNews } from "@/lib/mock/news"

const USE_MOCK = true  // ← غيّرها لـ false عند ربط الباك

export async function getNews(sector?: Sector): Promise<News[]> {
  if (USE_MOCK) {
    if (!sector || sector === "all") return mockNews
    return mockNews.filter((n) => n.sector === sector)
  }
  const url = sector && sector !== "all"
    ? `/api/news?sector=${sector}`
    : `/api/news`
  const res = await fetch(url)
  if (!res.ok) throw new Error("فشل جلب الأخبار")
  return res.json()
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