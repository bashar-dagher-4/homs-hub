import type { Service } from "@/types/service"
import type { Sector } from "@/types/common"
import { mockServices } from "@/lib/mock/services"

const USE_MOCK = true

export async function getServices(sector?: Sector): Promise<Service[]> {
  if (USE_MOCK) {
    if (!sector || sector === "all") return mockServices
    return mockServices.filter((s) => s.sector === sector)
  }
  const url = sector && sector !== "all"
    ? `/api/services?sector=${sector}`
    : `/api/services`
  const res = await fetch(url)
  if (!res.ok) throw new Error("فشل جلب الخدمات")
  return res.json()
}

export async function getServiceById(id: string): Promise<Service | null> {
  if (USE_MOCK) {
    return mockServices.find((s) => s.id === id) ?? null
  }

  const res = await fetch(`/api/services/${id}`)
  if (!res.ok) return null
  return res.json()
}