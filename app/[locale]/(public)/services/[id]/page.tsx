import { notFound } from "next/navigation"
import { getServiceById } from "@/lib/api/services"
import { getLocalizedText } from "@/lib/utils"
import type { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

type Props = {
  params: Promise<{ id: string; locale: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id, locale } = await params
  const service = await getServiceById(id)
  if (!service) return { title: "خدمة غير موجودة" }

  return {
    title: getLocalizedText(service.title_ar, service.title_en, locale),
    description: getLocalizedText(service.description_ar, service.description_en, locale),
  }
}

export default async function ServiceDetailPage({ params }: Props) {
  const { id, locale } = await params
  const service = await getServiceById(id)

  if (!service) notFound()

  const title = getLocalizedText(service.title_ar, service.title_en, locale)
  const description = getLocalizedText(service.description_ar, service.description_en, locale)

  const sectorNames: Record<string, Record<string, string>> = {
    sports:    { ar: "الرياضة",  en: "Sports" },
    health:    { ar: "الصحة",    en: "Health" },
    education: { ar: "التعليم",  en: "Education" },
  }

  const sectorName = sectorNames[service.sector]?.[locale] ?? service.sector

  return (
    <div
      className="min-h-screen"
      style={{ backgroundColor: "var(--background)" }}
    >
      <div className="mx-auto max-w-3xl px-6 py-12">

        {/* زر الرجوع */}
        <Link
          href={`/${locale}/services`}
          className="inline-flex items-center gap-2 text-sm font-bold mb-8 hover:opacity-70 transition-opacity"
          style={{ color: "var(--primary)" }}
        >
          <ArrowLeft size={16} className="rtl:rotate-180" />
          {locale === "ar" ? "العودة للخدمات" : "Back to Services"}
        </Link>

        {/* الكارد الرئيسي */}
        <div
          className="rounded-2xl p-8"
          style={{
            backgroundColor: "var(--card)",
            border: "1px solid var(--border)",
          }}
        >
          {/* القطاع */}
          <span
            className="px-3 py-1 rounded-full text-xs font-bold text-white inline-block mb-6"
            style={{ backgroundColor: "var(--primary)" }}
          >
            {sectorName}
          </span>

          {/* العنوان */}
          <h1
            className="text-2xl md:text-4xl font-black leading-snug mb-4"
            style={{ color: "var(--foreground)" }}
          >
            {title}
          </h1>

          {/* الفاصل */}
          <div
            className="w-16 h-1 rounded-full mb-6"
            style={{ backgroundColor: "var(--primary)" }}
          />

          {/* الوصف */}
          <p
            className="text-base leading-loose mb-6"
            style={{ color: "var(--foreground)" }}
          >
            {description}
          </p>

          {/* التكلفة */}
          {service.cost && (
            <div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold"
              style={{
                backgroundColor: "var(--primary-light)",
                color: "var(--primary)",
              }}
            >
              {locale === "ar" ? "التكلفة:" : "Cost:"}
              <span>{service.cost}</span>
            </div>
          )}

          {!service.cost && (
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold"
              style={{
                backgroundColor: "var(--success-100)",
                color: "var(--success-500)",
              }}
            >
              {locale === "ar" ? "مجاني" : "Free"}
            </div>
          )}
        </div>

      </div>
    </div>
  )
}
