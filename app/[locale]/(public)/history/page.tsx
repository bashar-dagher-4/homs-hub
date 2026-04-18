import { HistoryList } from "@/components/sections/HistoryList";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "التاريخ",
  description: "المعلومات التاريخية لمدينة حمص — تاريخ عريق يمتد لآلاف السنين",
  openGraph: {
    title: "التاريخ | مجلس مدينة حمص",
    description: "المعلومات التاريخية لمدينة حمص",
  },
}
export default function HistoryPage(){
    return <HistoryList/>
}