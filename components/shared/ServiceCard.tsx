import Link from "next/link"
import { useLocale, useTranslations } from "next-intl"
import { getLocalizedText } from "@/lib/utils"
import { ArrowRight } from "lucide-react"
import type { Service } from "@/types/service"

type Props = {
  service: Service
}

export function ServiceCard({ service }: Props) {
  const locale = useLocale()
  const t = useTranslations("common")

  return (
    <div
      className="group rounded-2xl p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
      style={{
        backgroundColor: "var(--card)",
        border: "1px solid var(--border)",
      }}
    >
      {/* القطاع */}
      <div className="mb-4">
        <span
          className="px-3 py-1 rounded-full text-xs font-bold text-white"
          style={{ backgroundColor: "var(--primary)" }}
        >
          {t(`sectors.${service.sector}`)}
        </span>
      </div>

      {/* العنوان */}
      <h3
        className="font-bold text-lg leading-snug mb-3 group-hover:opacity-80 transition-colors"
        style={{ color: "var(--foreground)" }}
      >
        {getLocalizedText(service.title_ar, service.title_en, locale)}
      </h3>

      {/* الوصف */}
      <p
        className="text-sm line-clamp-3 leading-relaxed mb-4"
        style={{ color: "var(--muted-foreground)" }}
      >
        {getLocalizedText(service.description_ar, service.description_en, locale)}
      </p>

      {/* التكلفة */}
      {service.cost && (
        <div
          className="text-xs font-bold mb-4 px-3 py-1 rounded-full w-fit"
          style={{
            backgroundColor: "var(--primary-light)",
            color: "var(--primary)",
          }}
        >
          {service.cost}
        </div>
      )}

      {/* رابط */}
      <Link
        href={`/${locale}/services/${service.id}`}
        className="text-sm font-bold hover:underline flex items-center gap-1 w-fit"
        style={{ color: "var(--primary)" }}
      >
        {t("readMore")}
        <ArrowRight size={16} className="rtl:rotate-180" />
      </Link>

    </div>
  )
}