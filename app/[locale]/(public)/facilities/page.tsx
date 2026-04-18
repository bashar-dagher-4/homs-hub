import { FacilitiesList } from "@/components/sections/FacilitiesList";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "المنشآت",
  description: "منشآت مدينة حمص — ملاعب، مستشفيات، مدارس وخريطة تفاعلية لمواقعها",
  openGraph: {
    title: "المنشآت | مجلس مدينة حمص",
    description: "منشآت مدينة حمص مع خريطة تفاعلية",
  },
}
export default function FacilitiesPage(){
    return <FacilitiesList showMap={true}/>
}