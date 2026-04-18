"use client"
import Link from "next/link"
import Image from "next/image"
import { useLocale, useTranslations } from "next-intl"
import { usePathname } from "next/navigation"
import { useSession, signOut } from "next-auth/react"
import {
  LayoutDashboard,
  Trophy,
  Heart,
  GraduationCap,
  MessageSquare,
  LogOut,
  X,
} from "lucide-react"
import type { UserRole, UserSector } from "@/types/auth"

type Props = {
  isOpen: boolean
  onClose: () => void
}

const allLinks = [
  {
    href: "/dashboard",
    key: "overview",
    icon: LayoutDashboard,
    sector: null,
    superAdminOnly: false,
  },
  {
    href: "/dashboard/sports",
    key: "sports",
    icon: Trophy,
    sector: "sports",
    superAdminOnly: false,
  },
  {
    href: "/dashboard/health",
    key: "health",
    icon: Heart,
    sector: "health",
    superAdminOnly: false,
  },
  {
    href: "/dashboard/education",
    key: "education",
    icon: GraduationCap,
    sector: "education",
    superAdminOnly: false,
  },
  {
    href: "/dashboard/faq",
    key: "faq",
    icon: MessageSquare,
    sector: null,
    superAdminOnly: true,
  },
]

export function DashboardSidebar({ isOpen, onClose }: Props) {
  const t = useTranslations("dashboard")
  const locale = useLocale()
  const pathname = usePathname()
  const { data: session } = useSession()

  const role = session?.user?.role as UserRole | undefined
  const sector = session?.user?.sector as UserSector | undefined

  const visibleLinks = allLinks.filter((link) => {
    if (!role) return false
    if (link.superAdminOnly && role !== "superadmin") return false
    if (role === "admin" && link.sector !== null && link.sector !== sector) return false
    return true
  })

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className= {`fixed top-0 inset-s-0 h-screen z-50 w-64 flex flex-col transition-transform duration-300 ${isOpen ? "translate-x-0" : "rtl:translate-x-full ltr:-translate-x-full"}`}
        style={{
          backgroundColor: "var(--sidebar)",
          borderInlineEnd: "1px solid var(--sidebar-border)",
        }}
      >
        {/* الهيدر */}
        <div
          className="h-16 flex items-center justify-between px-4 shrink-0"
          style={{ borderBottom: "1px solid var(--sidebar-border)" }}
        >
          <Link href={`/${locale}`}>
            <Image
              src="/logo.png"
              alt="Homs Hub"
              width={100}
              height={35}
              className="object-contain"
            />
          </Link>
          <button
            onClick={onClose}
            className="p-2 rounded-lg transition-colors"
            style={{ color: "var(--muted-foreground)" }}
          >
            <X size={18} />
          </button>
        </div>

        {/* معلومات المستخدم */}
        <div
          className="px-4 py-4 shrink-0"
          style={{ borderBottom: "1px solid var(--sidebar-border)" }}
        >
          <p
            className="text-xs font-medium"
            style={{ color: "var(--muted-foreground)" }}
          >
            {t("welcome")}
          </p>
          <p
            className="font-bold text-sm mt-0.5"
            style={{ color: "var(--foreground)" }}
          >
            {session?.user?.name}
          </p>
          <span
            className="text-xs px-2 py-0.5 rounded-full mt-1 inline-block"
            style={{
              backgroundColor: "var(--primary-light)",
              color: "var(--primary)",
            }}
          >
            {role === "superadmin" ? "Super Admin" : "Admin"}
          </span>
        </div>

        {/* الروابط */}
        <nav className="flex-1 px-2 py-4 flex flex-col gap-1 overflow-y-auto">
          {visibleLinks.map((link) => {
            const Icon = link.icon
            const isActive = pathname === `/${locale}${link.href}`
            return (
              <Link
                key={link.href}
                href={`/${locale}${link.href}`}
                onClick={onClose}
                className="flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200"
                style={
                  isActive
                    ? { backgroundColor: "var(--primary)", color: "white" }
                    : { color: "var(--muted-foreground)" }
                }
              >
                <Icon size={18} className="shrink-0" />
                <span className="text-sm font-medium">{t(link.key)}</span>
              </Link>
            )
          })}
        </nav>

        {/* تسجيل الخروج */}
        <div
          className="p-2 shrink-0"
          style={{ borderTop: "1px solid var(--sidebar-border)" }}
        >
          <button
            onClick={() => signOut({ callbackUrl: `/${locale}/login` })}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200"
            style={{ color: "var(--danger-500)" }}
          >
            <LogOut size={18} className="shrink-0" />
            <span className="text-sm font-medium">{t("logout")}</span>
          </button>
        </div>
      </aside>
    </>
  )
}