"use client"

import { useTheme } from "next-themes"
import { Sun, Moon, Globe, Menu } from "lucide-react"
import { useLocaleSwitch } from "@/hooks/useLocaleSwitch"
import { useTranslations } from "next-intl"

type Props = {
  onMenuClick: () => void
}

export function DashboardNavbar({ onMenuClick }: Props) {
  const { theme, setTheme } = useTheme()
  const { switchLang, locale } = useLocaleSwitch()
  const t = useTranslations("dashboard")

  return (
    <header
      className="h-16 flex items-center justify-between px-6 shrink-0"
      style={{
        backgroundColor: "var(--card)",
        borderBottom: "1px solid var(--border)",
      }}
    >
      {/* زر فتح السايدبار */}
      <button
        onClick={onMenuClick}
        className="p-2 rounded-lg transition-colors hover:opacity-70"
        style={{ color: "var(--foreground)" }}
      >
        <Menu size={22} />
      </button>

      {/* العنوان */}
      <h1
        className="font-bold text-base md:text-lg"
        style={{ color: "var(--foreground)" }}
      >
        {t("title")}
      </h1>

      {/* الأزرار */}
      <div className="flex items-center gap-2">

        {/* زر اللغة */}
        <button
          onClick={switchLang}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-bold transition-colors"
          style={{
            border: "1px solid var(--border)",
            color: "var(--foreground)",
            backgroundColor: "var(--secondary)",
          }}
        >
          <Globe size={14} />
          <span>{locale === "ar" ? "EN" : "عربي"}</span>
        </button>

        {/* زر الثيم */}
        <button
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="p-2 rounded-lg transition-colors"
          style={{
            border: "1px solid var(--border)",
            color: "var(--foreground)",
            backgroundColor: "var(--secondary)",
          }}
        >
          {theme === "dark" ? <Sun size={17} /> : <Moon size={17} />}
        </button>

      </div>
    </header>
  )
}