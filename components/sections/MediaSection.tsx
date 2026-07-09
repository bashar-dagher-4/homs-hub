"use client"

import Image from "next/image"
import { useTranslations, useLocale } from "next-intl"
import { useQuery } from "@tanstack/react-query"
import { getLocalizedText } from "@/lib/utils"
import { getFeaturedMedia } from "@/lib/api/media"
import { Play } from "lucide-react"
import { useState } from "react";
// import Link from "next/link"
// import { ArrowLeft } from "lucide-react"

export function MediaSection() {
  const t = useTranslations("home.sections")
  const locale = useLocale()

  const { data: media, isLoading } = useQuery({
    queryKey: ["media"],
    queryFn: getFeaturedMedia,
  })
  const [imgErr , setImgErr] = useState(false)

  return (
    <section className="py-16 px-6">
      <div className="mx-auto max-w-7xl">

        {/* الهيدر */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h2
              className="text-2xl md:text-3xl font-black"
              style={{ color: "var(--foreground)" }}
            >
              {t("media")}
            </h2>
            <div
              className="mt-2 w-12 h-1 rounded-full"
              style={{ backgroundColor: "var(--primary)" }}
            />
          </div>
        </div>

        {/* الشبكة */}
        {isLoading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="h-48 rounded-2xl animate-pulse"
                style={{ backgroundColor: "var(--muted)" }}
              />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {media?.map((item) => (
              <div
                key={item.id}
                className="group relative h-48 rounded-2xl overflow-hidden cursor-pointer"
                style={{ backgroundColor: "var(--muted)" }}
              >
                {/* الصورة */}
                {item.url && !imgErr ? (
                          <Image
                            src={item.url}
                            alt={item.description_ar}
                            fill
                            sizes="(max-width: 768px) 100vw, 33vw"
                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                            loading="lazy"
                            onError={() => setImgErr(true)}
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <span className="text-4xl">📰</span>
                          </div>
                        )}

                {/* طبقة تعتيم عند hover */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300" />

                {/* أيقونة الفيديو */}
                {item.type === "video" && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div
                      className="w-12 h-12 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: "rgba(255,255,255,0.9)" }}
                    >
                      <Play size={20} style={{ color: "var(--primary)" }} />
                    </div>
                  </div>
                )}

                {/* الوصف عند hover */}
                <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <p className="text-white text-xs font-medium line-clamp-2">
                    {getLocalizedText(item.description_ar, item.description_en, locale)}
                  </p>
                </div>

              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  )
}