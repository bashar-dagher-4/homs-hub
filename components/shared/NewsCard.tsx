import Image from "next/image"
import Link from "next/link"
import { useLocale, useTranslations } from "next-intl"
import { Calendar , ArrowRight } from "lucide-react"
import type { News } from "@/types/news"
import { getLocalizedText } from "@/lib/utils"

type Props = {
  news: News
}

export function NewsCard({ news }: Props) {
  const locale = useLocale()
  const t = useTranslations("common")

  const formattedDate = new Date(news.date).toLocaleDateString(
    locale === "ar" ? "ar-SY" : "en-US",
    { year: "numeric", month: "long", day: "numeric" }
  )

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
        {news.image ? (
          <Image
            src={news.image}
            alt={news.title_ar}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-4xl">📰</span>
          </div>
        )}

        {/* القطاع */}
        <div className="absolute top-3 inset-s-3">
          <span
            className="px-3 py-1 rounded-full text-xs font-bold text-white"
            style={{ backgroundColor: "var(--primary)" }}
          >
            {t(`sectors.${news.sector}`)}
          </span>
        </div>
      </div>

      {/* المحتوى */}
      <div className="p-5 flex flex-col gap-3">

        {/* التاريخ */}
        <div
          className="flex items-center gap-1.5"
          style={{ color: "var(--muted-foreground)" }}
        >
          <Calendar size={14} />
          <span className="text-xs">{formattedDate}</span>
        </div>

        {/* العنوان */}
        <h3
          className="font-bold leading-snug line-clamp-2 transition-colors group-hover:opacity-80"
          style={{ color: "var(--foreground)" }}
        >
          {getLocalizedText(news.title_ar , news.title_en,locale)}
        </h3>

        {/* الوصف */}
        <p
          className="text-sm line-clamp-2 leading-relaxed"
          style={{ color: "var(--muted-foreground)" }}
        >
          {getLocalizedText(news.description_ar , news.description_en,locale)}
        </p>

        {/* رابط */}
        <Link
          href={`/${locale}/news/${news.id}`}
          className="mt-1 text-sm font-bold hover:underline flex items-center gap-1 w-fit"
          style={{ color: "var(--primary)" }}
        >
          {t("readMore")}
          <ArrowRight size={16} className="rtl:rotate-180" />
        </Link>

      </div>
    </div>
  )
}