"use client"
import { ServiceCardSkeleton , SkeletonGrid } from "../shared/Skeletons"
import { useQueryState } from "nuqs" 
import { useTranslations, useLocale } from "next-intl"
import { useQuery } from "@tanstack/react-query"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { SectorFilter } from "@/components/shared/SectorFilter"
import { ServiceCard } from "@/components/shared/ServiceCard"
import { getServices } from "@/lib/api/services"
import type { Sector } from "@/types/common"

type Props = {
  limit?: number
  showLink?: boolean
}

export function ServicesList({ limit, showLink = false }: Props) {
  const t = useTranslations("nav")
  const tSections = useTranslations("home.sections")
  const locale = useLocale()
  const [sector] = useQueryState("sector" , {
    defaultValue: 'all',
  })

  const { data: services, isLoading } = useQuery({
    queryKey: ["services", sector],
    queryFn: () => getServices(sector as Sector),
  })

  const displayed = limit ? services?.slice(0, limit) : services

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
              {limit ? tSections("services") : t("services")}
            </h2>
            <div
              className="mt-2 w-12 h-1 rounded-full"
              style={{ backgroundColor: "var(--primary)" }}
            />
          </div>
          <div className="flex items-center gap-4 flex-wrap">
            <SectorFilter/>
            {showLink && (
              <Link
                href={`/${locale}/services`}
                className="flex items-center gap-1.5 text-sm font-bold hover:underline"
                style={{ color: "var(--primary)" }}
              >
                {t("services")}
                <ArrowLeft size={16} className="rtl:rotate-180" />
              </Link>
            )}
          </div>
        </div>

        {/* الكاردز */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <SkeletonGrid>
              <ServiceCardSkeleton/>
            </SkeletonGrid>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {displayed?.map((item) => (
              <ServiceCard key={item.id} service={item} />
            ))}
          </div>
        )}

      </div>
    </div>
  )
}