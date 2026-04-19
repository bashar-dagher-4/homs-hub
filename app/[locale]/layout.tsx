import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import "../globals.css";
import { QueryProvider } from "@/components/providers/QueryProviders";
import { SessionProvider } from "@/components/providers/SessionProvider";
import { Cairo } from "next/font/google"


// export const metadata: Metadata = {
//   title: {
//     default: "مجلس مدينة حمص | Homs City Council",
//     template: "%s | مجلس مدينة حمص",
//   },
//   description: "البوابة الرقمية الرسمية لمجلس مدينة حمص — خدمات، أخبار، فعاليات ومنشآت المدينة",
//   keywords: ["حمص", "مجلس المدينة", "خدمات حكومية", "سوريا", "Homs", "City Council"],
//   authors: [{ name: "مجلس مدينة حمص" }],
//   creator: "Homs Hub Team",
//   openGraph: {
//     type: "website",
//     locale: "ar_SY",
//     siteName: "مجلس مدينة حمص",
//     title: "مجلس مدينة حمص | البوابة الرقمية",
//     description: "البوابة الرقمية الرسمية لمجلس مدينة حمص",
//   },
// }


export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params

  return {
    alternates: {
      canonical: `https://homs-hub.vercel.app/${locale}`,
      languages: {
        ar: "https://homs-hub.vercel.app/ar",
        en: "https://homs-hub.vercel.app/en",
      },
    },
  }
}

const cairo = Cairo({
  subsets: ["arabic", "latin"],
  display: "swap",      
  preload: true,
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
