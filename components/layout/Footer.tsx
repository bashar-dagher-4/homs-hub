import Link from "next/link"
import Image from "next/image"
import { useTranslations, useLocale } from "next-intl"
import { navLinks } from "@/lib/config/navigation"
import { MapPin, Phone, Mail } from "lucide-react"

export function Footer() {
  const t = useTranslations("footer")
  const nav = useTranslations("nav")
  const locale = useLocale()

  const footerLinks = navLinks.filter((link) => link.href !== "/")

  return (
    <footer className="border-t border-[--border] bg-[--card]">

      {/* المحتوى الرئيسي */}
      <div className="mx-auto max-w-7xl px-6 py-14">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">

          {/* العمود الأول — اللوغو 5 أعمدة */}
          <div className="md:col-span-5 flex flex-col gap-5">
            <Link href={`/${locale}`}>
              <Image
                src="/logo.jpg"
                alt="Homs Hub"
                width={140}
                height={45}
                className="object-contain"
              />
            </Link>
            <p className="text-sm text-[--muted-foreground] leading-7 max-w-xs">
              {t("description")}
            </p>
          </div>

          {/* العمود الثاني — روابط 3 أعمدة */}
          <div className="md:col-span-3 flex flex-col gap-5">
            <h3 className="font-bold text-sm uppercase tracking-widest text-[--primary]">
              {t("quickLinks")}
            </h3>
            <div className="flex flex-col gap-3">
              {footerLinks.map((link) => (
                <Link
                  key={link.href}
                  href={`/${locale}${link.href}`}
                  className="text-sm text-[--muted-foreground] hover:text-[--primary] hover:translate-x-1 transition-all duration-200 w-fit"
                >
                  {nav(link.key)}
                </Link>
              ))}
            </div>
          </div>

          {/* العمود الثالث — تواصل 4 أعمدة */}
          <div className="md:col-span-4 md:justify-self-end flex flex-col gap-5">
            <h3 className="font-bold text-sm uppercase tracking-widest text-[--primary]">
              {t("contactUs")}
            </h3>
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <div className="py-2 rounded-lg bg-[--primary-light]">
                  <MapPin size={15} className="text-[--primary]" />
                </div>
                <p className="text-sm text-[--muted-foreground]">{t("address")}</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="py-2 rounded-lg bg-[--primary-light]">
                  <Phone size={15} className="text-[--primary]" />
                </div>
                <p className="text-sm text-[--muted-foreground]">{t("phone")}</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="py-2 rounded-lg bg-[--primary-light]">
                  <Mail size={15} className="text-[--primary]" />
                </div>
                <p className="text-sm text-[--muted-foreground]">{t("email")}</p>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* الحقوق */}
      <div className="border-t border-[--border]">
        <div className="mx-auto max-w-7xl px-6 py-4 flex flex-col md:flex-row items-center justify-between gap-2">
          <p className="text-xs text-[--muted-foreground]">
            {t("rights")}
          </p>
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 rounded-full bg-[--primary]" />
            <p className="text-xs text-[--muted-foreground]">Homs</p>
          </div>
        </div>
      </div>

    </footer>
  )
}