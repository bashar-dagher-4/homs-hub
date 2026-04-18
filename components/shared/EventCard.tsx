import Link from "next/link";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { Calendar, ArrowRight } from "lucide-react";
import { getLocalizedText } from "@/lib/utils";
import type { Event } from "@/types/event";

type Props = {
  event: Event;
};

export function EventCard({ event }: Props) {
  const locale = useLocale();
  const t = useTranslations("common");

  const formattedDate = new Date(event.date).toLocaleDateString(
    locale === "ar" ? "ar-SY" : "en-US",
    { year: "numeric", month: "long", day: "numeric" },
  );

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
        {event.image ? (
          <Image
            src={event.image}
            alt={event.title_ar}
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
            {t(`sectors.${event.sector}`)}
          </span>
        </div>

        {/* التاريخ فوق الصورة */}
        <div
          className="absolute bottom-3 inset-s-3 flex items-center gap-1.5 px-3 py-1 rounded-full"
          style={{ backgroundColor: "rgba(0,0,0,0.6)" }}
        >
          <Calendar size={12} className="text-white" />
          <span className="text-white text-xs font-medium">
            {formattedDate}
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
          {getLocalizedText(event.title_ar, event.title_en, locale)}
        </h3>

        {/* الوصف */}
        <p
          className="text-sm line-clamp-2 leading-relaxed"
          style={{ color: "var(--muted-foreground)" }}
        >
          {getLocalizedText(event.description_ar, event.description_en, locale)}
        </p>

        {/* رابط */}
        <Link
          href={`/${locale}/events/${event.id}`}
          className="mt-1 text-sm font-bold hover:underline flex items-center gap-1 w-fit"
          style={{ color: "var(--primary)" }}
        >
          {t("readMore")}
          <ArrowRight size={16} className="rtl:rotate-180" />
        </Link>
      </div>
    </div>
  );
}
