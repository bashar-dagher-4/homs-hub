"use client"
import { HistoryCardSkeleton , SkeletonGrid } from "../shared/Skeletons"
import { useQueryState } from "nuqs" 
import { useTranslations, useLocale } from "next-intl"
import { useQuery } from "@tanstack/react-query"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { SectorFilter } from "@/components/shared/SectorFilter"
import { HistoryCard } from "@/components/shared/HistoryCard"
import { getHistory } from "@/lib/api/history"
import type { Sector } from "@/types/common"

type Props = {
  limit?: number
  showLink?: boolean
}

export function HistoryList({ limit, showLink = false }: Props) {
  const t = useTranslations("nav")
  const locale = useLocale()
  const [sector] = useQueryState("history-sector" , {
    defaultValue: 'all',
  })

  const { data: history, isLoading } = useQuery({
    queryKey: ["history", sector],
    queryFn: () => getHistory(sector as Sector),
  })

  const displayed = limit ? history?.slice(0, limit) : history

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
              {t("history")}
            </h2>
            <div
              className="mt-2 w-12 h-1 rounded-full"
              style={{ backgroundColor: "var(--primary)" }}
            />
          </div>
          <div className="flex items-center gap-4 flex-wrap">
            <SectorFilter queryKey="history-sector"/>
            {showLink && (
              <Link
                href={`/${locale}/history`}
                className="flex items-center gap-1.5 text-sm font-bold hover:underline"
                style={{ color: "var(--primary)" }}
              >
                {t("history")}
                <ArrowLeft size={16} className="rtl:rotate-180" />
              </Link>
            )}
          </div>
        </div>

        {/* الكاردز */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <SkeletonGrid count={3}>
              <HistoryCardSkeleton/>
            </SkeletonGrid>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {displayed?.map((item) => (
              <HistoryCard key={item.id} item={item} />
            ))}
          </div>
        )}

      </div>
    </div>
  )
}