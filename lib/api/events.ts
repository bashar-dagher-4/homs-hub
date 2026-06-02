import type { Event } from "@/types/event"
import type { Sector } from "@/types/common"
import { mockEvents } from "@/lib/mock/events"
import { apiRequest } from "@/lib/api/client"

const USE_MOCK = false

export async function getEvents(sector?: Sector): Promise<Event[]> {
  if (USE_MOCK) {
    if (!sector || sector === "all") return mockEvents
    return mockEvents.filter((n) => n.sector === sector)
  }

  const query = sector && sector !== "all" ? `?sector=${sector}` : ""
  return apiRequest<Event[]>(`/api/news/${query}`)
}

export async function getEventsById(id: string): Promise<Event | null> {
  if (USE_MOCK) {
    return mockEvents.find((n) => n.id === id) ?? null
  }
  return apiRequest<Event>(`/api/news/${id}/`)
}

export async function createEvents(data: Partial<Event>): Promise<Event> {
  return apiRequest<Event>("/api/news/", {
    method: "POST",
    body: JSON.stringify(data),
  })
}

export async function updateEvents(id: string, data: Partial<Event>): Promise<Event> {
  return apiRequest<Event>(`/api/news/${id}/`, {
    method: "PUT",
    body: JSON.stringify(data),
  })
}

export async function deleteEvents(id: string): Promise<void> {
  return apiRequest<void>(`/api/news/${id}/`, {
    method: "DELETE",
  })
}