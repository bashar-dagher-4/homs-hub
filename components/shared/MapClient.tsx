"use client"

import { useEffect, useRef } from "react"
import { useLocale } from "next-intl"
import { getLocalizedText } from "@/lib/utils"
import type { Facility } from "@/types/facility"
import type { Map } from "leaflet"

type Props = {
  facilities: Facility[]
  selectedId?: string
  onSelect?: (facility: Facility) => void
}

export function MapClient({ facilities, selectedId, onSelect }: Props) {
  const locale = useLocale()
  const containerRef = useRef<HTMLDivElement>(null)
  const mapInitialized = useRef(false)

  // تحميل CSS منفصلاً
  useEffect(() => {
    const link = document.createElement("link")
    link.rel = "stylesheet"
    link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
    document.head.appendChild(link)
    return () => {
      document.head.removeChild(link)
    }
  }, [])

  useEffect(() => {
    if (!containerRef.current || mapInitialized.current) return
    mapInitialized.current = true

    const initMap = async () => {
      const L = (await import("leaflet")).default

      const map = L.map(containerRef.current!).setView([34.7324, 36.7137], 13)

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "© OpenStreetMap",
      }).addTo(map)

      const icon = L.divIcon({
        className: "",
        html: `<div style="
          width: 24px; height: 24px;
          background: #2563eb;
          border: 3px solid white;
          border-radius: 50%;
          box-shadow: 0 2px 8px rgba(0,0,0,0.3);
        "></div>`,
        iconSize: [24, 24],
        iconAnchor: [12, 12],
      })

      facilities.forEach((facility) => {
        const marker = L.marker(
          [facility.location.lat, facility.location.lng],
          { icon }
        ).addTo(map)

        marker.bindPopup(`
          <div style="font-family: Cairo, sans-serif; min-width: 150px; direction: ${locale === "ar" ? "rtl" : "ltr"}">
            <strong>${getLocalizedText(facility.title_ar, facility.title_en, locale)}</strong>
            <p style="font-size: 12px; color: #666; margin-top: 4px;">
              ${getLocalizedText(facility.location.address_ar, facility.location.address_en, locale)}
            </p>
          </div>
        `)

        marker.on("click", () => onSelect?.(facility))
      })

      return map
    }

    let mapInstance: { remove: () => void } | null = null

    initMap().then((m) => {
      mapInstance = m ?? null
    })

    return () => {
      if (mapInstance) {
        mapInstance.remove()
        mapInitialized.current = false
      }
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className="w-full rounded-2xl overflow-hidden"
      style={{
        height: "450px",
        border: "1px solid var(--border)",
        zIndex: 0,
      }}
    />
  )
}
