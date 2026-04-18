"use client"
import { FacilityCardSkeleton , SkeletonGrid } from "../shared/Skeletons"
import { useState } from "react"
import { useQueryState } from "nuqs" 
import { useTranslations, useLocale } from "next-intl"
import { useQuery } from "@tanstack/react-query"
import { SectorFilter } from "@/components/shared/SectorFilter"
import { FacilityCard } from "@/components/shared/FacilityCard"
import { FacilitiesMap } from "@/components/shared/FacilitiesMap"
import { getFacilities } from "@/lib/api/facilities"
import type { Sector } from "@/types/common"
import type { Facility } from "@/types/facility"

type Props = {
  limit?: number
  showMap?: boolean
  showLink?: boolean
}

export function FacilitiesList({ limit, showMap = false, showLink = false }: Props) {
  const t = useTranslations("nav")
  const locale = useLocale()
  const [sector] = useQueryState('sector' , {
    defaultValue: 'all',
  })
  const [selectedFacility, setSelectedFacility] = useState<Facility | null>(null)

  const { data: facilities, isLoading } = useQuery({
    queryKey: ["facilities", sector],
    queryFn: () => getFacilities(sector as Sector),
  })

  const displayed = limit ? facilities?.slice(0, limit) : facilities

  return (
    <div className="py-12 px-6">
      <div className="mx-auto max-w-7xl">

        {/* الهيدر */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h2
              className="text-2xl md:text-3xl font-black"
              style={{ color: "var(--foreground)" }}
            >
              {t("facilities")}
            </h2>
            <div
              className="mt-2 w-12 h-1 rounded-full"
              style={{ backgroundColor: "var(--primary)" }}
            />
          </div>
          <SectorFilter />
        </div>

        {/* الخريطة */}
        {showMap && facilities && (
          <div className="mb-8">
            <FacilitiesMap
              facilities={facilities}
              selectedId={selectedFacility?.id}
              onSelect={setSelectedFacility}
            />
          </div>
        )}

        {/* الكاردز */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
           <SkeletonGrid count={3}>
            <FacilityCardSkeleton/>
           </SkeletonGrid>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {displayed?.map((item) => (
              <FacilityCard
                key={item.id}
                facility={item}
                isSelected={selectedFacility?.id === item.id}
                onClick={() => setSelectedFacility(item)}
              />
            ))}
          </div>
        )}

      </div>
    </div>
  )
}