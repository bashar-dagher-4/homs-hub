"use client"

import dynamic from "next/dynamic"
import type { Facility } from "@/types/facility"

const MapClient = dynamic(
  () => import("./MapClient").then((mod) => mod.MapClient),
  {
    ssr: false,
    loading: () => (
      <div
        className="w-full rounded-2xl animate-pulse"
        style={{
          height: "450px",
          backgroundColor: "var(--muted)",
        }}
      />
    ),
  }
)

type Props = {
  facilities: Facility[]
  selectedId?: string
  onSelect?: (facility: Facility) => void
}

export function FacilitiesMap({ facilities, selectedId, onSelect }: Props) {
  return (
    <MapClient
      facilities={facilities}
      selectedId={selectedId}
      onSelect={onSelect}
    />
  )
}