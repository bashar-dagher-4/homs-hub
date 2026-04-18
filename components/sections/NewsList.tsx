"use client"
import { NewsCardSkeleton , SkeletonGrid } from '@/components/shared/Skeletons'
import { useQueryState } from 'nuqs'
import { useTranslations, useLocale } from "next-intl"
import { useQuery } from "@tanstack/react-query"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { SectorFilter } from "@/components/shared/SectorFilter"
import { NewsCard } from "@/components/shared/NewsCard"
import { getNews } from "@/lib/api/news"
import type { Sector } from "@/types/common"


type Props = {
  limit?: number
  showLink?: boolean
}

export function NewsList({ limit, showLink = false }: Props) {
  const t = useTranslations("nav")
  const tSections = useTranslations("home.sections")
  const locale = useLocale()

  // يقرأ sector من الـ URL تلقائياً
  const [sector] = useQueryState('sector', {
    defaultValue: 'all',
  })

  const { data: news, isLoading } = useQuery({
    queryKey: ["news", sector],          // الـ Cache يتغير مع الـ URL
    queryFn: () => getNews(sector as Sector),
  })

  const displayedNews = limit ? news?.slice(0, limit) : news

  return (
    <div className="py-12 px-6">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h2
              className="text-2xl md:text-3xl font-black"
              style={{ color: "var(--foreground)" }}
            >
              {limit ? tSections("news") : t("news")}
            </h2>
            <div
              className="mt-2 w-12 h-1 rounded-full"
              style={{ backgroundColor: "var(--primary)" }}
            />
          </div>
          <div className="flex items-center gap-4 flex-wrap">
            <SectorFilter />
            {showLink && (
              <Link
                href={`/${locale}/news`}
                className="flex items-center gap-1.5 text-sm font-bold hover:underline"
                style={{ color: "var(--primary)" }}
              >
                {t("news")}
                <ArrowLeft size={16} className="rtl:rotate-180" />
              </Link>
            )}
          </div>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <SkeletonGrid count={3}>
              <NewsCardSkeleton/>
            </SkeletonGrid>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {displayedNews?.map((item) => (
              <NewsCard key={item.id} news={item} />
            ))}
          </div>
        )}

      </div>
    </div>
  )
}