import type { Facility } from "@/types/facility"
import type { Sector } from "@/types/common"
import { mockFacilities } from "@/lib/mock/facilities"

const USE_MOCK = true

export async function getFacilities(sector?: Sector): Promise<Facility[]> {
  if (USE_MOCK) {
    if (!sector || sector === "all") return mockFacilities
    return mockFacilities.filter((f) => f.sector === sector)
  }
  const url = sector && sector !== "all"
    ? `/api/facilities?sector=${sector}`
    : `/api/facilities`
  const res = await fetch(url)
  if (!res.ok) throw new Error("فشل جلب المنشآت")
  return res.json()
}

export async function getFacilityById(id: string): Promise<Facility | null> {
  if (USE_MOCK) {
    return mockFacilities.find((f) => f.id === id) ?? null
  }

  const res = await fetch(`/api/facilities/${id}`)
  if (!res.ok) return null
  return res.json()
}