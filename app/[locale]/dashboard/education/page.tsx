import EducationDashboard from "@/components/sections/EducationDashboard";

import { Metadata } from "next"

export const metadata: Metadata = {
  title: "قطاع التعليم",
  robots: { index: false, follow: false },
}
export default function EducationDashboardPage(){
  return <EducationDashboard/>
}