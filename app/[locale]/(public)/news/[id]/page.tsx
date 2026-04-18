import { notFound } from "next/navigation"
import { getNewsById } from "@/lib/api/news"
import { getLocalizedText } from "@/lib/utils"
import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Calendar } from "lucide-react"

type Props = {
  params: Promise<{ id: string; locale: string }>
}

// Metadata ديناميكي حسب الخبر
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id, locale } = await params
  const news = await getNewsById(id)
  if (!news) return { title: "خبر غير موجود" }

  return {
    title: getLocalizedText(news.title_ar, news.title_en, locale),
    description: getLocalizedText(news.description_ar, news.description_en, locale),
  }
}

export default async function NewsDetailPage({ params }: Props) {
  const { id, locale } = await params
  const news = await getNewsById(id)

  if (!news) notFound()

  const title = getLocalizedText(news.title_ar, news.title_en, locale)
  const description = getLocalizedText(news.description_ar, news.description_en, locale)

  const formattedDate = new Date(news.date).toLocaleDateString(
    locale === "ar" ? "ar-SY" : "en-US",
    { year: "numeric", month: "long", day: "numeric" }
  )

  const sectorNames: Record<string, Record<string, string>> = {
    sports:    { ar: "الرياضة",  en: "Sports" },
    health:    { ar: "الصحة",    en: "Health" },
    education: { ar: "التعليم",  en: "Education" },
  }

  const sectorName = sectorNames[news.sector]?.[locale] ?? news.sector

  return (
    <div
      className="min-h-screen"
      style={{ backgroundColor: "var(--background)" }}
    >
      <div className="mx-auto max-w-3xl px-6 py-12">

        {/* زر الرجوع */}
        <Link
          href={`/${locale}/news`}
          className="inline-flex items-center gap-2 text-sm font-bold mb-8 hover:opacity-70 transition-opacity"
          style={{ color: "var(--primary)" }}
        >
          <ArrowLeft size={16} className="rtl:rotate-180" />
          {locale === "ar" ? "العودة للأخبار" : "Back to News"}
        </Link>

        {/* الصورة */}
        {news.image && (
          <div className="relative h-72 md:h-96 w-full rounded-2xl overflow-hidden mb-8">
            <Image
              src={news.image}
              alt={title}
              fill
              priority
              className="object-cover"
            />
          </div>
        )}

        {/* المعلومات */}
        <div className="flex items-center gap-3 mb-4 flex-wrap">
          <span
            className="px-3 py-1 rounded-full text-xs font-bold text-white"
            style={{ backgroundColor: "var(--primary)" }}
          >
            {sectorName}
          </span>
          <div
            className="flex items-center gap-1.5 text-sm"
            style={{ color: "var(--muted-foreground)" }}
          >
            <Calendar size={14} />
            {formattedDate}
          </div>
        </div>

        {/* العنوان */}
        <h1
          className="text-2xl md:text-4xl font-black leading-snug mb-6"
          style={{ color: "var(--foreground)" }}
        >
          {title}
        </h1>

        {/* الفاصل */}
        <div
          className="w-16 h-1 rounded-full mb-8"
          style={{ backgroundColor: "var(--primary)" }}
        />

        {/* المحتوى */}
        <p
          className="text-base leading-loose"
          style={{ color: "var(--foreground)" }}
        >
          {description}
        </p>

      </div>
    </div>
  )
}