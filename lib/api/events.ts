import type { Event } from "@/types/event"
import type { ApiResponse, Sector } from "@/types/common"
import { mockEvents } from "@/lib/mock/events"
import { apiRequest } from "@/lib/api/client"

const USE_MOCK = false

export async function getEvents(sector?: Sector): Promise<Event[]> {
  if (USE_MOCK) {
    if (!sector || sector === "all") return mockEvents
    return mockEvents.filter((e) => e.sector === sector)
  }
  const url = sector && sector !== "all"
    ? `/api/events?sector=${sector}`
    : `/api/events`
  const res = await fetch(url)
   const json: ApiResponse<Event[]> = await res.json()
  if (!json.success) throw new Error(json.message)

  return json.data 
}

export async function getFeaturedEvents(): Promise<Event[]> {
  const events = await getEvents()
  return events.slice(0, 3)
}

export async function getEventById(id: string): Promise<Event | null> {
  if (USE_MOCK) {
    return mockEvents.find((e) => e.id === id) ?? null
  }

  const res = await fetch(`/api/events/${id}`)
  if (!res.ok) return null
  return res.json()
}
export async function createEvent(data: Partial<Event>): Promise<Event> {
  return apiRequest<Event>("/api/events/", {
    method: "POST",
    body: JSON.stringify(data),
  })
}

export async function updateEvent(id: string, data: Partial<Event>): Promise<Event> {
  return apiRequest<Event>(`/api/events/${id}/`, {
    method: "PUT",
    body: JSON.stringify(data),
  })
}

export async function deleteEvent(id: string): Promise<void> {
  return apiRequest<void>(`/api/events/${id}/`, {
    method: "DELETE",
  })
}