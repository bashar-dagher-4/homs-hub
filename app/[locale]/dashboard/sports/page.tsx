import SportsDashboard from "@/components/sections/SportsDashboard";

import { Metadata } from "next"


export const metadata: Metadata = {
  title: "قطاع الرياضة",
  robots: { index: false, follow: false },
}
export default function SportsDashboardPage(){
  return <SportsDashboard/>
}