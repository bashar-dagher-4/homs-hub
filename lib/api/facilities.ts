import type { Facility } from "@/types/facility"
import type { Sector } from "@/types/common"
import { apiRequest } from "@/lib/api/client"

export async function getFacilities(sector?: Sector): Promise<Facility[]> {
  const query = sector && sector !== "all" ? `?sector=${sector}` : ""
  return apiRequest<Facility[]>(`/api/facilities/${query}`)
}

export async function getFacilityById(id: string): Promise<Facility | null> {
  return apiRequest<Facility>(`/api/facilities/${id}/`)
}

function buildFacilityFormData(
  data: Partial<Facility> & {
    image?: FileList
    lat?: string | number
    lng?: string | number
    address_ar?: string
    address_en?: string
  }
): FormData {
  const formData = new FormData()

  Object.entries(data).forEach(([key, value]) => {
    if (value === undefined || value === null) return

    if (key === "image") {
      if (value instanceof FileList && value.length > 0) {
        formData.append("image", value[0])
      }
      return
    }

    // location هو object متداخل — لا نرسله مباشرة، نرسل حقوله المسطحة بدلاً منه
    if (key === "location") return

    formData.append(key, String(value))
  })

  return formData
}

export async function createFacility(
  data: Partial<Facility> & {
    image?: FileList
    lat?: string | number
    lng?: string | number
    address_ar?: string
    address_en?: string
  }
): Promise<Facility> {
  const formData = buildFacilityFormData(data)
  return apiRequest<Facility>("/api/facilities/", {
    method: "POST",
    body: formData,
    headers: {},
  })
}

export async function updateFacility(
  id: string,
  data: Partial<Facility> & {
    image?: FileList
    lat?: string | number
    lng?: string | number
    address_ar?: string
    address_en?: string
  }
): Promise<Facility> {
  const formData = buildFacilityFormData(data)
  return apiRequest<Facility>(`/api/facilities/${id}/`, {
    method: "PATCH",
    body: formData,
    headers: {},
  })
}

export async function deleteFacility(id: string): Promise<void> {
  return apiRequest<void>(`/api/facilities/${id}/`, {
    method: "DELETE",
  })
}