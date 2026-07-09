
import type { Metadata } from "next"
import HealthDashboard from "@/components/sections/HealthDashboard"

export const metadata: Metadata = {
  title: "قطاع الصحة",
  robots: { index: false, follow: false },
}

export default function HealthDashboardPage() {
  return <HealthDashboard />
}