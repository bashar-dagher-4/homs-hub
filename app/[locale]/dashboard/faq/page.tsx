import FaqDashboard from "@/components/sections/FaqDashboard";

import { Metadata } from "next"


export const metadata: Metadata = {
  title: "الأسئلة الشائعة",
  robots: { index: false, follow: false },
}
export default function FaqDashboardPage(){
  return <FaqDashboard/>
}