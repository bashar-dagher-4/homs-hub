"use client"

import { useSession } from "next-auth/react"
import { useTranslations, useLocale } from "next-intl"
import { useQuery } from "@tanstack/react-query"
import { Trophy, Heart, GraduationCap, TrendingUp } from "lucide-react"
import {
  LineChart, Line, XAxis, YAxis,
  CartesianGrid, Tooltip, Legend,
  ResponsiveContainer, BarChart, Bar,
} from "recharts"
import { getMonthlyStats, getSectorStats } from "@/lib/api/stats"
import { cn } from "@/lib/utils"

export function DashboardOverview() {
  const { data: session } = useSession()
  const t = useTranslations("dashboard")
  const locale = useLocale()

  // ← هنا الفرق — React Query بدل بيانات ثابتة
  const { data: monthlyStats, isLoading: monthlyLoading } = useQuery({
    queryKey: ["monthly-stats"],
    queryFn: getMonthlyStats,
    staleTime: 1000 * 60 * 5, // 5 دقائق
  })

  const { data: sectorStats, isLoading: sectorLoading } = useQuery({
    queryKey: ["sector-stats"],
    queryFn: getSectorStats,
    staleTime: 1000 * 60 * 5,
  })

  const sectorCards = [
    { key: "sports",    label: t("sports"),    icon: Trophy,       color: "#3b82f6" },
    { key: "health",    label: t("health"),    icon: Heart,        color: "#22c55e" },
    { key: "education", label: t("education"), icon: GraduationCap,color: "#f59e0b" },
  ]

  // بيانات الـ Line Chart
  const lineData = (monthlyStats ?? []).map((item) => ({
    ...item,
    name: locale === "ar" ? item.month : item.month_en,
  }))
 
  const barData = (sectorStats ?? []).map((item) => ({
    name: t(item.sector as "sports" | "health" | "education"),
    [locale === "ar" ? "أخبار"    : "News"]:      item.news,
    [locale === "ar" ? "فعاليات"  : "Events"]:    item.events,
    [locale === "ar" ? "خدمات"    : "Services"]:  item.services,
    [locale === "ar" ? "منشآت"    : "Facilities"]: item.facilities,
  }))

  return (
    <div className="flex flex-col gap-8">

      {/* الترحيب */}
      <div>
        <h2 className="text-2xl font-black" style={{ color: "var(--foreground)" }}>
          {t("welcome")}، {session?.user?.name} 👋
        </h2>
        <p className="text-sm mt-1" style={{ color: "var(--muted-foreground)" }}>
          {new Date().toLocaleDateString(
            locale === "ar" ? "ar-SY" : "en-US",
            { weekday: "long", year: "numeric", month: "long", day: "numeric" }
          )}
        </p>
      </div>

      {/* كاردز القطاعات */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {sectorCards.map((card) => {
          const Icon = card.icon
          const stat = sectorStats?.find((s) => s.sector === card.key)

          return (
            <div
              key={card.key}
              className="rounded-2xl p-6"
              style={{
                backgroundColor: "var(--card)",
                border: "1px solid var(--border)",
              }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div
                  className="p-2.5 rounded-xl"
                  style={{ backgroundColor: `${card.color}20` }}
                >
                  <Icon size={20} style={{ color: card.color }} />
                </div>
                <h3 className="font-bold" style={{ color: "var(--foreground)" }}>
                  {card.label}
                </h3>
              </div>

              {sectorLoading ? (
                <div className="grid grid-cols-2 gap-4">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="h-16 rounded-xl animate-pulse"
                      style={{ backgroundColor: "var(--muted)" }}
                    />
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { label: locale === "ar" ? "أخبار"    : "News",       value: stat?.news       ?? 0 },
                    { label: locale === "ar" ? "فعاليات"  : "Events",     value: stat?.events     ?? 0 },
                    { label: locale === "ar" ? "خدمات"    : "Services",   value: stat?.services   ?? 0 },
                    { label: locale === "ar" ? "منشآت"    : "Facilities", value: stat?.facilities ?? 0 },
                  ].map((item) => (
                    <div
                      key={item.label}
                      className="rounded-xl p-3 text-center"
                      style={{ backgroundColor: "var(--secondary)" }}
                    >
                      <p className="text-2xl font-black" style={{ color: card.color }}>
                        {item.value}
                      </p>
                      <p className="text-xs mt-1" style={{ color: "var(--muted-foreground)" }}>
                        {item.label}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* Line Chart */}
      <div
        className="rounded-2xl p-6"
        style={{
          backgroundColor: "var(--card)",
          border: "1px solid var(--border)",
        }}
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2.5 rounded-xl" style={{ backgroundColor: "var(--primary-light)" }}>
            <TrendingUp size={20} style={{ color: "var(--primary)" }} />
          </div>
          <h3 className="font-bold" style={{ color: "var(--foreground)" }}>
            {locale === "ar" ? "النمو الشهري" : "Monthly Growth"}
          </h3>
        </div>

        {monthlyLoading ? (
          <div className="h-64 rounded-xl animate-pulse" style={{ backgroundColor: "var(--muted)" }} />
        ) : (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={lineData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis dataKey="name" tick={{ fill: "var(--muted-foreground)", fontSize: 12 }} />
              <YAxis tick={{ fill: "var(--muted-foreground)", fontSize: 12 }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "var(--card)",
                  border: "1px solid var(--border)",
                  borderRadius: "12px",
                  color: "var(--foreground)",
                }}
              />
              <Legend />
              <Line type="monotone" dataKey="news"
                name={locale === "ar" ? "أخبار" : "News"}
                stroke="#3b82f6" strokeWidth={2} dot={{ fill: "#3b82f6" }} />
              <Line type="monotone" dataKey="events"
                name={locale === "ar" ? "فعاليات" : "Events"}
                stroke="#22c55e" strokeWidth={2} dot={{ fill: "#22c55e" }} />
              <Line type="monotone" dataKey="services"
                name={locale === "ar" ? "خدمات" : "Services"}
                stroke="#f59e0b" strokeWidth={2} dot={{ fill: "#f59e0b" }} />
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>

      {/* Bar Chart */}
      <div
        className="rounded-2xl p-6"
        style={{
          backgroundColor: "var(--card)",
          border: "1px solid var(--border)",
        }}
      >
        <h3 className="font-bold mb-6" style={{ color: "var(--foreground)" }}>
          {locale === "ar" ? "توزيع المحتوى حسب القطاع" : "Content by Sector"}
        </h3>

        {sectorLoading ? (
          <div className="h-64 rounded-xl animate-pulse" style={{ backgroundColor: "var(--muted)" }} />
        ) : (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={barData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis dataKey="name" tick={{ fill: "var(--muted-foreground)", fontSize: 12 }} />
              <YAxis tick={{ fill: "var(--muted-foreground)", fontSize: 12 }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "var(--card)",
                  border: "1px solid var(--border)",
                  borderRadius: "12px",
                  color: "var(--foreground)",
                }}
              />
              <Legend />
              <Bar dataKey={locale === "ar" ? "أخبار"    : "News"}
                fill="#3b82f6" radius={[4, 4, 0, 0]} />
              <Bar dataKey={locale === "ar" ? "فعاليات"  : "Events"}
                fill="#22c55e" radius={[4, 4, 0, 0]} />
              <Bar dataKey={locale === "ar" ? "خدمات"    : "Services"}
                fill="#f59e0b" radius={[4, 4, 0, 0]} />
              <Bar dataKey={locale === "ar" ? "منشآت"    : "Facilities"}
                fill="#8b5cf6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>

    </div>
  )
}
