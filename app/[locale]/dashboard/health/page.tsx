import HealthDashboard from "@/components/sections/HealthDashboard";

import { Metadata } from "next"

export const metadata: Metadata = {
  title: "قطاع الصحة",
  robots: { index: false, follow: false },
}
export default function HealthDashboardPage(){
  return <HealthDashboard/>
}