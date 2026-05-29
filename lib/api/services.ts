import type { Service } from "@/types/service"
import type { ApiResponse, Sector } from "@/types/common"
import { mockServices } from "@/lib/mock/services"
import { apiRequest } from "@/lib/api/client"

const USE_MOCK = false

export async function getServices(sector?: Sector): Promise<Service[]> {
  if (USE_MOCK) {
    if (!sector || sector === "all") return mockServices
    return mockServices.filter((s) => s.sector === sector)
  }
  const url = sector && sector !== "all"
    ? `/api/services?sector=${sector}`
    : `/api/services`
  const res = await fetch(url)
   const json: ApiResponse<Service[]> = await res.json()
  if (!json.success) throw new Error(json.message)

  return json.data 
}

export async function getServiceById(id: string): Promise<Service | null> {
  if (USE_MOCK) {
    return mockServices.find((s) => s.id === id) ?? null
  }

  const res = await fetch(`/api/services/${id}`)
  if (!res.ok) return null
  return res.json()
}
export async function createService(data: Partial<Service>): Promise<Service> {
  return apiRequest<Service>("/api/services/", {
    method: "POST",
    body: JSON.stringify(data),
  })
}

export async function updateService(id: string, data: Partial<Service>): Promise<Service> {
  return apiRequest<Service>(`/api/services/${id}/`, {
    method: "PUT",
    body: JSON.stringify(data),
  })
}

export async function deleteService(id: string): Promise<void> {
  return apiRequest<void>(`/api/services/${id}/`, {
    method: "DELETE",
  })
}