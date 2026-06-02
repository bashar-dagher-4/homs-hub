import type { Facility } from "@/types/facility"
import type { Sector } from "@/types/common"
import { mockFacilities } from "@/lib/mock/facilities"
import { apiRequest } from "@/lib/api/client"

const USE_MOCK = false

export async function getFacilities(sector?: Sector): Promise<Facility[]> {
  if (USE_MOCK) {
    if (!sector || sector === "all") return mockFacilities
    return mockFacilities.filter((n) => n.sector === sector)
  }

  const query = sector && sector !== "all" ? `?sector=${sector}` : ""
  return apiRequest<Facility[]>(`/api/news/${query}`)
}

export async function getFacilityById(id: string): Promise<Facility | null> {
  if (USE_MOCK) {
    return mockFacilities.find((n) => n.id === id) ?? null
  }
  return apiRequest<Facility>(`/api/news/${id}/`)
}

export async function createFacility(data: Partial<Facility>): Promise<Facility> {
  return apiRequest<Facility>("/api/news/", {
    method: "POST",
    body: JSON.stringify(data),
  })
}

export async function updateFacility(id: string, data: Partial<Facility>): Promise<Facility> {
  return apiRequest<Facility>(`/api/news/${id}/`, {
    method: "PUT",
    body: JSON.stringify(data),
  })
}

export async function deleteFacility(id: string): Promise<void> {
  return apiRequest<void>(`/api/news/${id}/`, {
    method: "DELETE",
  })
}