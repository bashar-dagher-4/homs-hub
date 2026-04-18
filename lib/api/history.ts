import type { History } from "@/types/history"
import type { Sector } from "@/types/common"
import { mockHistory } from "@/lib/mock/history"

const USE_MOCK = true

export async function getHistory(sector?: Sector): Promise<History[]> {
  if (USE_MOCK) {
    if (!sector || sector === "all") return mockHistory
    return mockHistory.filter((h) => h.sector === sector)
  }
  const url = sector && sector !== "all"
    ? `/api/history?sector=${sector}`
    : `/api/history`
  const res = await fetch(url)
  if (!res.ok) throw new Error("فشل جلب التاريخ")
  return res.json()
}

export async function getHistoryById(id: string): Promise<History | null> {
  if (USE_MOCK) {
    return mockHistory.find((h) => h.id === id) ?? null
  }

  const res = await fetch(`/api/history/${id}`)
  if (!res.ok) return null
  return res.json()
}