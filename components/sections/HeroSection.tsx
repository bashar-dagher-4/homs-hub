import Image from "next/image"
import Link from "next/link"
import { useTranslations, useLocale } from "next-intl"

export function HeroSection() {
  const t = useTranslations("home.hero")
  const locale = useLocale()

  return (
    <section className="relative h-[90vh] w-full overflow-hidden">

      {/* الصورة */}
      <Image
        src="/hero.webp"
        alt={t('title')}
        fill
        priority
        className="object-cover"
      />

      {/* طبقة داكنة */}
      <div className="absolute inset-0 bg-linear-to-t from-black/50 via-black/30 to-black/10" />

      {/* المحتوى */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">

        {/* شارة */}
        <div className="mb-6 px-4 py-1.5 rounded-full border border-white/30 bg-white/10 backdrop-blur-sm">
          <p className="text-white/90 text-sm font-medium tracking-widest uppercase">
            {t("badge")}
          </p>
        </div>

        {/* العنوان */}
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white leading-tight mb-6 max-w-4xl">
          {t("title")}
        </h1>

        {/* الوصف */}
        <p className="text-lg md:text-xl text-white/80 mb-10 max-w-2xl leading-relaxed">
          {t("subtitle")}
        </p>

        {/* الأزرار */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            href={`/${locale}/services`}
            className="px-8 py-3.5 rounded-xl bg-[--primary] hover:bg-[--primary-hover] text-white font-bold text-sm transition-all duration-200 hover:scale-105"
          >
            {t("exploreServices")}
          </Link>
          <Link
            href={`/${locale}/news`}
            className="px-8 py-3.5 rounded-xl border border-white/40 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white font-bold text-sm transition-all duration-200"
          >
            {t("latestNews")}
          </Link>
        </div>

      </div>

      {/* سهم للأسفل */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 rounded-full border-2 border-white/50 flex items-start justify-center pt-2">
          <div className="w-1 h-2 rounded-full bg-white/70" />
        </div>
      </div>

    </section>
  )
}