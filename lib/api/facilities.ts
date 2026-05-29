import type { Facility } from "@/types/facility"
import type { ApiResponse, Sector } from "@/types/common"
import { mockFacilities } from "@/lib/mock/facilities"
import { apiRequest } from "@/lib/api/client"

const USE_MOCK = false

export async function getFacilities(sector?: Sector): Promise<Facility[]> {
  if (USE_MOCK) {
    if (!sector || sector === "all") return mockFacilities
    return mockFacilities.filter((f) => f.sector === sector)
  }
  const url = sector && sector !== "all"
    ? `/api/facilities?sector=${sector}`
    : `/api/facilities`
  const res = await fetch(url)
   const json: ApiResponse<Facility[]> = await res.json()
  if (!json.success) throw new Error(json.message)

  return json.data 
}

export async function getFacilityById(id: string): Promise<Facility | null> {
  if (USE_MOCK) {
    return mockFacilities.find((f) => f.id === id) ?? null
  }

  const res = await fetch(`/api/facilities/${id}`)
  if (!res.ok) return null
  return res.json()
}
export async function createFacility(data: Partial<Facility>): Promise<Facility> {
  return apiRequest<Facility>("/api/facilities/", {
    method: "POST",
    body: JSON.stringify(data),
  })
}

export async function updateFacility(id: string, data: Partial<Facility>): Promise<Facility> {
  return apiRequest<Facility>(`/api/facilities/${id}/`, {
    method: "PUT",
    body: JSON.stringify(data),
  })
}

export async function deleteFacility(id: string): Promise<void> {
  return apiRequest<void>(`/api/facilities/${id}/`, {
    method: "DELETE",
  })
}