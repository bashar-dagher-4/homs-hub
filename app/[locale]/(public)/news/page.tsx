import { NewsList } from "@/components/sections/NewsList"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "الأخبار",
  description: "آخر أخبار ومستجدات مجلس مدينة حمص في قطاعات الرياضة والصحة والتعليم",
  openGraph: {
    title: "الأخبار | مجلس مدينة حمص",
    description: "آخر أخبار ومستجدات مجلس مدينة حمص",
  },
}
export default function NewsPage() {
  return <NewsList />
}