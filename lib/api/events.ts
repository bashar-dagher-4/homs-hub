import type { Event } from "@/types/event"
import type { Sector } from "@/types/common"
import { apiRequest } from "@/lib/api/client"

export async function getEvents(sector?: Sector): Promise<Event[]> {
  const query = sector && sector !== "all" ? `?sector=${sector}` : ""
  return apiRequest<Event[]>(`/api/events/${query}`)
}

export async function getEventById(id: string): Promise<Event | null> {
  return apiRequest<Event>(`/api/events/${id}/`)
}

function buildEventFormData(data: Partial<Event> & { image?: FileList }): FormData {
  const formData = new FormData()

  Object.entries(data).forEach(([key, value]) => {
    if (value === undefined || value === null) return

    if (key === "image") {
      if (value instanceof FileList && value.length > 0) {
        formData.append("image", value[0])
      }
      return
    }

    formData.append(key, String(value))
  })

  return formData
}

export async function createEvent(
  data: Partial<Event> & { image?: FileList }
): Promise<Event> {
  const formData = buildEventFormData(data)
  return apiRequest<Event>("/api/events/", {
    method: "POST",
    body: formData,
    headers: {},
  })
}

export async function updateEvent(
  id: string,
  data: Partial<Event> & { image?: FileList }
): Promise<Event> {
  const formData = buildEventFormData(data)
  return apiRequest<Event>(`/api/events/${id}/`, {
    method: "PATCH",
    body: formData,
    headers: {},
  })
}

export async function deleteEvents(id: string): Promise<void> {
  return apiRequest<void>(`/api/events/${id}/`, {
    method: "DELETE",
  })
}