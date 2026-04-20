import { notFound } from "next/navigation"
import { getEventById } from "@/lib/api/events"
import { getLocalizedText } from "@/lib/utils"
import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Calendar } from "lucide-react"

type Props = {
  params: Promise<{ id: string; locale: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id, locale } = await params
  const event = await getEventById(id)
  if (!event) return { title: locale === "ar" ? "فعالية غير موجودة" : "Event Not Found" }

  return {
    title: getLocalizedText(event.title_ar, event.title_en, locale),
    description: getLocalizedText(event.description_ar, event.description_en, locale),
    openGraph: {
      title: getLocalizedText(event.title_ar, event.title_en, locale),
      images: [{ url: event.image }],
    },
  }
}

export default async function EventDetailPage({ params }: Props) {
  const { id, locale } = await params
  const event = await getEventById(id)

  if (!event) notFound()

  const title = getLocalizedText(event.title_ar, event.title_en, locale)
  const description = getLocalizedText(event.description_ar, event.description_en, locale)

  const formattedDate = new Date(event.date).toLocaleDateString(
    locale === "ar" ? "ar-SY" : "en-US",
    { year: "numeric", month: "long", day: "numeric" }
  )

  const sectorNames: Record<string, Record<string, string>> = {
    sports:    { ar: "الرياضة",  en: "Sports" },
    health:    { ar: "الصحة",    en: "Health" },
    education: { ar: "التعليم",  en: "Education" },
  }

  const sectorName = sectorNames[event.sector]?.[locale] ?? event.sector

  return (
    <div
      className="min-h-screen"
      style={{ backgroundColor: "var(--background)" }}
    >
      <div className="mx-auto max-w-3xl px-6 py-12">

        {/* زر الرجوع */}
        <Link
          href={`/${locale}/events`}
          className="inline-flex items-center gap-2 text-sm font-bold mb-8 hover:opacity-70 transition-opacity"
          style={{ color: "var(--primary)" }}
        >
          <ArrowLeft size={16} className="rtl:rotate-180" />
          {locale === "ar" ? "العودة للفعاليات" : "Back to Events"}
        </Link>

        {/* الصورة */}
        <div className="relative h-72 md:h-96 w-full rounded-2xl overflow-hidden mb-8">
          <Image
            src={event.image}
            alt={title}
            fill
            priority
            className="object-cover"
          />
        </div>

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