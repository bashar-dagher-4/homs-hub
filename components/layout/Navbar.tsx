"use client"

import Link from "next/link"
import Image from "next/image"
import { useTheme } from "next-themes"
import { useTranslations } from "next-intl"
import { Sun, Moon, Menu, X } from "lucide-react"
import { useState } from "react"
import { navLinks } from "@/lib/config/navigation"
import { useLocaleSwitch } from "@/hooks/useLocaleSwitch"

export function Navbar() {
  const { theme, setTheme } = useTheme()
  const { locale, switchLang } = useLocaleSwitch()
  const t = useTranslations("nav")
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-[--border] bg-[--card] backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">

        {/* اللوغو */}
        <Link href={`/${locale}`}>
          <Image
            src="/logo.jpg"
            alt="Homs Hub"
            width={80}
            height={40}
            className="object-contain"
            priority
          />
        </Link>

        {/* روابط Desktop */}
        <div className="hidden md:flex items-center gap-3">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={`/${locale}${link.href}`}
              className="px-3 py-2 rounded-lg text-sm font-medium text-[--muted-foreground] hover:text-[--foreground] hover:bg-[--secondary] transition-colors"
            >
              {t(link.key)}
            </Link>
          ))}
        </div>

        {/* الأزرار */}
        <div className="flex items-center gap-2">

          <button
            onClick={switchLang}
            className="px-3 py-1.5 rounded-lg text-sm font-bold border border-[--border] text-[--foreground] hover:bg-[--secondary] transition-colors"
          >
            {locale === "ar" ? "En" : "Ar"}
          </button>

          <button 
          aria-label="toggle-theme"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="p-2 rounded-lg border border-[--border] text-[--foreground] hover:bg-[--secondary] transition-colors"
          >
            {theme === "dark" ? <Sun size={18} aria-labelledby="light-mode"/> : <Moon size={18} aria-labelledby="dark-mode"/>}
          </button>

          <button
          aria-label="target-page"
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden p-2 rounded-lg border border-[--border] text-[--foreground]"
          >
            {menuOpen ? <X size={18} aria-labelledby="close-menu"/> : <Menu size={18} aria-labelledby="open-menu"/>}
          </button>

        </div>
      </div>

      {/* قائمة الموبايل */}
      {menuOpen && (
        <div className="absolute top-16 left-0 right-0 md:hidden border-t border-[--border] bg-[--card] px-4 py-3 flex flex-col gap-1 shadow-xl z-100" 
                style={{backgroundColor:'var(--card)'}}>
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={`/${locale}${link.href}`}
              onClick={() => setMenuOpen(false)}
              className="px-3 py-2 rounded-lg text-sm font-medium text-[--muted-foreground] hover:text-[--foreground] hover:bg-[--secondary] transition-colors"
            >
              {t(link.key)}
            </Link>
          ))}
        </div>
      )}
    </nav>
  )
}