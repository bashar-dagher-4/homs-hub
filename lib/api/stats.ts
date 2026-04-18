import type { Sector } from "@/types/common"
import { mockMonthlyStats } from "@/lib/mock/stats"

const USE_MOCK = true

export type MonthlyStat = {
  month: string
  month_en: string
  news: number
  events: number
  services: number
  facilities: number
}

export type SectorStat = {
  sector: Sector
  news: number
  events: number
  services: number
  facilities: number
}

export async function getMonthlyStats(): Promise<MonthlyStat[]> {
  if (USE_MOCK) return mockMonthlyStats

  const res = await fetch(`/api/stats/monthly`)
  if (!res.ok) throw new Error("فشل جلب الإحصائيات الشهرية")
  return res.json()
}

export async function getSectorStats(): Promise<SectorStat[]> {
  if (USE_MOCK) {
    // نبني من الـ mock data الموجودة
    return [
      { sector: "sports",    news: 1, events: 3, services: 1, facilities: 1 },
      { sector: "health",    news: 3, events: 3, services: 1, facilities: 1 },
      { sector: "education", news: 3, events: 3, services: 1, facilities: 1 },
    ]
  }

  const res = await fetch(`/api/stats/sectors`)
  if (!res.ok) throw new Error("فشل جلب إحصائيات القطاعات")
  return res.json()
}
