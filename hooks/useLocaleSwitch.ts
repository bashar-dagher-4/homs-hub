"use client"

import { useLocale } from "next-intl"
import { useRouter, usePathname } from "next/navigation"

export function useLocaleSwitch() {
  const locale = useLocale()
  const router = useRouter()
  const pathname = usePathname()

  function switchLang() {
    const newLocale = locale === "ar" ? "en" : "ar"
    const newPath = pathname.replace(`/${locale}`, `/${newLocale}`)
    router.push(newPath)
  }

  return { switchLang, locale }
}