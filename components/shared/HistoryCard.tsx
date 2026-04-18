import Image from "next/image"
import { useLocale, useTranslations } from "next-intl"
import { getLocalizedText } from "@/lib/utils"
import type { History } from "@/types/history"

type Props = {
  item: History
}

export function HistoryCard({ item }: Props) {
  const locale = useLocale()
  const t = useTranslations("common")

  return (
    <div
      className="group rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
      style={{
        backgroundColor: "var(--card)",
        border: "1px solid var(--border)",
      }}
    >
      {/* الصورة */}
      <div
        className="relative h-48 w-full overflow-hidden"
        style={{ backgroundColor: "var(--muted)" }}
      >
        {item.image ? (
          <Image
            src={item.image}
            alt={getLocalizedText(item.title_ar, item.title_en, locale)}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-4xl">🏛️</span>
          </div>
        )}

        {/* القطاع */}
        <div className="absolute top-3 inset-s-3">
          <span
            className="px-3 py-1 rounded-full text-xs font-bold text-white"
            style={{ backgroundColor: "var(--primary)" }}
          >
            {t(`sectors.${item.sector}`)}
          </span>
        </div>
      </div>

      {/* المحتوى */}
      <div className="p-5 flex flex-col gap-3">

        {/* العنوان */}
        <h3
          className="font-bold leading-snug line-clamp-2 group-hover:opacity-80 transition-colors"
          style={{ color: "var(--foreground)" }}
        >
          {getLocalizedText(item.title_ar, item.title_en, locale)}
        </h3>

        {/* الوصف */}
        <p
          className="text-sm line-clamp-3 leading-relaxed"
          style={{ color: "var(--muted-foreground)" }}
        >
          {getLocalizedText(item.description_ar, item.description_en, locale)}
        </p>

      </div>
    </div>
  )
}