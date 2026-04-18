"use client"

import dynamic from "next/dynamic"
import type { Facility } from "@/types/facility"

const FacilitiesMap = dynamic(
  () => import("@/components/shared/FacilitiesMap").then((mod) => mod.FacilitiesMap),
  {
    ssr: false,
    loading: () => (
      <div
        className="w-full rounded-2xl animate-pulse"
        style={{ height: "300px", backgroundColor: "var(--muted)" }}
      />
    ),
  }
)

export function FacilityMapWrapper({ facility }: { facility: Facility }) {
  return <FacilitiesMap facilities={[facility]} />
}