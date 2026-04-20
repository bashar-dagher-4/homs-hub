import { notFound } from "next/navigation"
import { getHistoryById } from "@/lib/api/history"
import { getLocalizedText } from "@/lib/utils"
import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

type Props = {
  params: Promise<{ id: string; locale: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id, locale } = await params
  const item = await getHistoryById(id)
  if (!item) return { title: locale === "ar" ? "غير موجود" : "Not Found" }

  return {
    title: getLocalizedText(item.title_ar, item.title_en, locale),
    description: getLocalizedText(item.description_ar, item.description_en, locale),
  }
}

export default async function HistoryDetailPage({ params }: Props) {
  const { id, locale } = await params
  const item = await getHistoryById(id)

  if (!item) notFound()

  const title = getLocalizedText(item.title_ar, item.title_en, locale)
  const description = getLocalizedText(item.description_ar, item.description_en, locale)

  const sectorNames: Record<string, Record<string, string>> = {
    sports:    { ar: "الرياضة",  en: "Sports" },
    health:    { ar: "الصحة",    en: "Health" },
    education: { ar: "التعليم",  en: "Education" },
  }

  const sectorName = sectorNames[item.sector]?.[locale] ?? item.sector

  return (
    <div
      className="min-h-screen"
      style={{ backgroundColor: "var(--background)" }}
    >
      <div className="mx-auto max-w-3xl px-6 py-12">

        {/* زر الرجوع */}
        <Link
          href={`/${locale}/history`}
          className="inline-flex items-center gap-2 text-sm font-bold mb-8 hover:opacity-70 transition-opacity"
          style={{ color: "var(--primary)" }}
        >
          <ArrowLeft size={16} className="rtl:rotate-180" />
          {locale === "ar" ? "العودة للتاريخ" : "Back to History"}
        </Link>

        {/* الصورة */}
        {item.image && (
          <div className="relative h-72 md:h-96 w-full rounded-2xl overflow-hidden mb-8">
            <Image
              src={item.image}
              alt={title}
              fill
              priority
              className="object-cover"
            />
          </div>
        )}

        {/* القطاع */}
        <span
          className="px-3 py-1 rounded-full text-xs font-bold text-white inline-block mb-4"
          style={{ backgroundColor: "var(--primary)" }}
        >
          {sectorName}
        </span>

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