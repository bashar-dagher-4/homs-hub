import { MonthlyStat , SectorStat } from "@/types/status"
import { mockMonthlyStats } from "@/lib/mock/stats"
import { apiRequest } from "./client";

const USE_MOCK = false

export async function getMonthlyStats(): Promise<MonthlyStat[]> {
  if (USE_MOCK) return mockMonthlyStats
  return apiRequest<MonthlyStat[]>("/api/stats/monthly/")
}

export async function getSectorStats(): Promise<SectorStat[]> {
  if (USE_MOCK) return [
    { sector: "sports",    news: 1, events: 3, services: 1, facilities: 1 },
    { sector: "health",    news: 3, events: 3, services: 1, facilities: 1 },
    { sector: "education", news: 3, events: 3, services: 1, facilities: 1 },
  ]
  return apiRequest<SectorStat[]>("/api/stats/sectors/")
}