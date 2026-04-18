import { DashboardOverview } from "@/components/sections/DashboardOverview"
import { Metadata } from "next"


export const metadata: Metadata = {
  title: "لوحة التحكم",
  description: "لوحة تحكم مجلس مدينة حمص",
  robots: {
    index: false,  // لوحة التحكم لا تظهر في Google
    follow: false,
  },
}

export default function DashboardPage(){
  return <DashboardOverview/>
}