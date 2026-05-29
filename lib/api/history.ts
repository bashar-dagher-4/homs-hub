import type { History } from "@/types/history"
import type { ApiResponse, Sector } from "@/types/common"
import { mockHistory } from "@/lib/mock/history"
import { apiRequest } from "@/lib/api/client"

const USE_MOCK = false

export async function getHistory(sector?: Sector): Promise<History[]> {
  if (USE_MOCK) {
    if (!sector || sector === "all") return mockHistory
    return mockHistory.filter((h) => h.sector === sector)
  }
  const url = sector && sector !== "all"
    ? `/api/history?sector=${sector}`
    : `/api/history`
  const res = await fetch(url)
   const json: ApiResponse<History[]> = await res.json()
  if (!json.success) throw new Error(json.message)

  return json.data 
}

export async function getHistoryById(id: string): Promise<History | null> {
  if (USE_MOCK) {
    return mockHistory.find((h) => h.id === id) ?? null
  }

  const res = await fetch(`/api/history/${id}`)
  if (!res.ok) return null
  return res.json()
}
export async function createHistory(data: Partial<History>): Promise<History> {
  return apiRequest<History>("/api/history/", {
    method: "POST",
    body: JSON.stringify(data),
  })
}

export async function updateHistory(id: string, data: Partial<History>): Promise<History> {
  return apiRequest<History>(`/api/history/${id}/`, {
    method: "PUT",
    body: JSON.stringify(data),
  })
}

export async function deleteHistory(id: string): Promise<void> {
  return apiRequest<void>(`/api/history/${id}/`, {
    method: "DELETE",
  })
}