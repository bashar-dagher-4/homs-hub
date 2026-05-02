"use client"

import { useQueryState } from 'nuqs'
import { useTranslations } from "next-intl"
import type { Sector } from "@/types/common"

const sectors: Sector[] = ["all", "sports", "health", "education"]

export function SectorFilter({queryKey='sector'}) {
  const t = useTranslations("common.sectors")

  // بدل useState → useQueryState
  // يحفظ القيمة في URL كـ ?sector=sports
  const [sector, setSector] = useQueryState(queryKey, {
    defaultValue: 'all',
  })

  return (
    <div className="flex items-center gap-2 flex-wrap">
      {sectors.map((s) => (
        <button
          key={s}
          onClick={() => setSector(s === 'all' ? null : s)}
          className="px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200"
          style={
            (sector ?? 'all') === s
              ? { backgroundColor: "var(--primary)", color: "white" }
              : { backgroundColor: "var(--secondary)", color: "var(--foreground)" }
          }
        >
          {t(s)}
        </button>
      ))}
    </div>
  )
}
