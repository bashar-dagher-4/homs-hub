import type { Event } from "@/types/event"
import type { Sector } from "@/types/common"
import { mockEvents } from "@/lib/mock/events"

const USE_MOCK = true

export async function getEvents(sector?: Sector): Promise<Event[]> {
  if (USE_MOCK) {
    if (!sector || sector === "all") return mockEvents
    return mockEvents.filter((e) => e.sector === sector)
  }
  const url = sector && sector !== "all"
    ? `/api/events?sector=${sector}`
    : `/api/events`
  const res = await fetch(url)
  if (!res.ok) throw new Error("فشل جلب الفعاليات")
  return res.json()
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