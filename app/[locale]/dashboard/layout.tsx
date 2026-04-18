"use client"

import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useLocale } from "next-intl"
import { useEffect, useState } from "react"
import { DashboardSidebar } from "@/components/layout/DashboardSidebar"
import { DashboardNavbar } from "@/components/layout/DashboardNavbar"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { data: session, status } = useSession()
  const router = useRouter()
  const locale = useLocale()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push(`/${locale}/login`)
    }
  }, [status, router, locale])

  if (status === "loading") {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ backgroundColor: "var(--background)" }}
      >
        <div
          className="w-8 h-8 rounded-full border-2 border-t-transparent animate-spin"
          style={{ borderColor: "var(--primary)" }}
        />
      </div>
    )
  }

  if (!session) return null

  return (
    <div
      className="min-h-screen flex"
      style={{ backgroundColor: "var(--background)" }}
    >
      {/* Sidebar */}
      <DashboardSidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* المحتوى الرئيسي */}
      <div className="flex-1 flex flex-col min-w-0">
        <DashboardNavbar
          onMenuClick={() => setSidebarOpen(!sidebarOpen)}
        />
        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
    </div>
  )
}