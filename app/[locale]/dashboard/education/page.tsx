
import type { Metadata } from "next"
import EducationDashboard from "@/components/sections/EducationDashboard"

export const metadata: Metadata = {
  title: "قطاع التعليم",
  robots: { index: false, follow: false },
}

export default function EducationDashboardPage() {
  return <EducationDashboard />
}