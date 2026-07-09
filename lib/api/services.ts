import type { Service } from "@/types/service"
import type { Sector } from "@/types/common"
import { apiRequest } from "@/lib/api/client"

export async function getServices(sector?: Sector): Promise<Service[]> {
  const query = sector && sector !== "all" ? `?sector=${sector}` : ""
  return apiRequest<Service[]>(`/api/services/${query}`)
}

export async function getServiceById(id: string): Promise<Service | null> {
  return apiRequest<Service>(`/api/services/${id}/`)
}

export async function createService(data: Partial<Service>): Promise<Service> {
  return apiRequest<Service>("/api/services/", {
    method: "POST",
    body: JSON.stringify(data),
  })
}

export async function updateService(
  id: string,
  data: Partial<Service>
): Promise<Service> {
  return apiRequest<Service>(`/api/services/${id}/`, {
    method: "PATCH",
    body: JSON.stringify(data),
  })
}

export async function deleteServices(id: string): Promise<void> {
  return apiRequest<void>(`/api/services/${id}/`, {
    method: "DELETE",
  })
}