import type { Service } from "@/types/service"
import type { Sector } from "@/types/common"
import { mockServices } from "@/lib/mock/services"
import { apiRequest } from "@/lib/api/client"

const USE_MOCK = false

export async function getServices(sector?: Sector): Promise<Service[]> {
  if (USE_MOCK) {
    if (!sector || sector === "all") return mockServices
    return mockServices.filter((n) => n.sector === sector)
  }

  const query = sector && sector !== "all" ? `?sector=${sector}` : ""
  return apiRequest<Service[]>(`/api/services/${query}`)
}

export async function getServiceById(id: string): Promise<Service | null> {
  if (USE_MOCK) {
    return mockServices.find((n) => n.id === id) ?? null
  }
  return apiRequest<Service>(`/api/services/${id}/`)
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