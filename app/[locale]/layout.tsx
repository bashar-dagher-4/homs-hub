import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import "../globals.css";
import { QueryProvider } from "@/components/providers/QueryProviders";
import { SessionProvider } from "@/components/providers/SessionProvider";
import { Cairo } from "next/font/google"





export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const isAr = locale === "ar"

  return {
    title: {
      default: isAr
        ? "مجلس مدينة حمص | البوابة الرقمية"
        : "Homs City Council | Digital Portal",
      template: isAr
        ? "%s | مجلس مدينة حمص"
        : "%s | Homs City Council",
    },
    description: isAr
      ? "البوابة الرقمية الرسمية لمجلس مدينة حمص — خدمات وأخبار وفعاليات ومنشآت المدينة"
      : "Official digital portal of Homs City Council — services, news, events and facilities",
    keywords: ["حمص", "مجلس المدينة", "سوريا", "Homs", "City Council", "Syria"],
    alternates: {
      canonical: `https://homshub.vercel.app/${locale}`,
      languages: {
        ar: "https://homshub.vercel.app/ar",
        en: "https://homshub.vercel.app/en",
      },
    },
    openGraph: {
      type: "website",
      locale: isAr ? "ar_SY" : "en_US",
      siteName: isAr ? "مجلس مدينة حمص" : "Homs City Council",
    },
  }
}

const cairo = Cairo({
  subsets: ["arabic", "latin"],
  display: "swap",
  preload: false,
})

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  const messages = await getMessages({ locale });
  return (
    <html lang={locale} dir={locale === "ar" ? "rtl" : "ltr"} className={cairo.className}>
      <head>
        <meta name="viewport" content="width=device-width , initial-scale=1"/>
      </head>
      <body suppressHydrationWarning>
        <ThemeProvider>
          <SessionProvider>
            <QueryProvider>
              <NextIntlClientProvider locale={locale} messages={messages}>
                {children}
              </NextIntlClientProvider>
            </QueryProvider>
          </SessionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
