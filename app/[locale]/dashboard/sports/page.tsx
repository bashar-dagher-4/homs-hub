
import type { Metadata } from "next"
import SportsDashboard from "@/components/sections/SportsDashboard"

export const metadata: Metadata = {
  title: "قطاع الرياضة",
  robots: { index: false, follow: false },
}

export default function SportsDashboardPage() {
  return <SportsDashboard />
}