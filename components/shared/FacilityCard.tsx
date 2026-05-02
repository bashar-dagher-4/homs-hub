import Image from "next/image"
import { useLocale, useTranslations } from "next-intl"
import { getLocalizedText } from "@/lib/utils"
import { MapPin } from "lucide-react"
import type { Facility } from "@/types/facility"

type Props = {
  facility: Facility
  onClick?: () => void
  isSelected?: boolean
}

export function FacilityCard({ facility, onClick, isSelected }: Props) {
  const locale = useLocale()
  const t = useTranslations("common")

  return (
    <div
      className="group rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer"
      style={{
        backgroundColor: "var(--card)",
        border: isSelected
          ? "2px solid var(--primary)"
          : "1px solid var(--border)",
      }}
      onClick={onClick}
    >
      {/* الصورة */}
      <div
        className="relative h-48 w-full overflow-hidden"
        style={{ backgroundColor: "var(--muted)" }}
      >
        <Image
          src={facility.image}
          alt={getLocalizedText(facility.title_ar, facility.title_en, locale)}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />

        {/* القطاع */}
        <div className="absolute top-3 inset-s-3">
          <span
            className="px-3 py-1 rounded-full text-xs font-bold text-white"
            style={{ backgroundColor: "var(--primary)" }}
          >
            {t(`sectors.${facility.sector}`)}
          </span>
        </div>
      </div>

      {/* المحتوى */}
      <div className="p-5 flex flex-col gap-3">

        {/* العنوان */}
        <h3
          className="font-bold leading-snug line-clamp-2"
          style={{ color: "var(--foreground)" }}
        >
          {getLocalizedText(facility.title_ar, facility.title_en, locale)}
        </h3>

        {/* الوصف */}
        <p
          className="text-sm line-clamp-2 leading-relaxed"
          style={{ color: "var(--muted-foreground)" }}
        >
          {getLocalizedText(facility.description_ar, facility.description_en, locale)}
        </p>

        {/* الموقع */}
        <div
          className="flex items-center gap-1.5"
          style={{ color: "var(--primary)" }}
        >
          <MapPin size={14} />
          <span className="text-xs font-medium">
            {getLocalizedText(
              facility.location.address_ar,
              facility.location.address_en,
              locale
            )}
          </span>
        </div>

      </div>
    </div>
  )
}