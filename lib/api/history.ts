import type { History } from "@/types/history"
import type { Sector } from "@/types/common"
import { mockHistory } from "@/lib/mock/history"
import { apiRequest } from "@/lib/api/client"

const USE_MOCK = false

export async function getHistory(sector?: Sector): Promise<History[]> {
  if (USE_MOCK) {
    if (!sector || sector === "all") return mockHistory
    return mockHistory.filter((n) => n.sector === sector)
  }

  const query = sector && sector !== "all" ? `?sector=${sector}` : ""
  return apiRequest<History[]>(`/api/news/${query}`)
}

export async function getHistoryById(id: string): Promise<History | null> {
  if (USE_MOCK) {
    return mockHistory.find((n) => n.id === id) ?? null
  }
  return apiRequest<History>(`/api/news/${id}/`)
}

export async function createHistory(data: Partial<History>): Promise<History> {
  return apiRequest<History>("/api/news/", {
    method: "POST",
    body: JSON.stringify(data),
  })
}

export async function updateHistory(id: string, data: Partial<History>): Promise<History> {
  return apiRequest<History>(`/api/news/${id}/`, {
    method: "PUT",
    body: JSON.stringify(data),
  })
}

export async function deleteHistory(id: string): Promise<void> {
  return apiRequest<void>(`/api/news/${id}/`, {
    method: "DELETE",
  })
}