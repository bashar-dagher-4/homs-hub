import { ServicesList } from "@/components/sections/ServicesList";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "الخدمات",
  description: "خدمات مجلس مدينة حمص المتاحة للمواطنين في قطاعات الرياضة والصحة والتعليم",
  openGraph: {
    title: "الخدمات | مجلس مدينة حمص",
    description: "خدمات مجلس مدينة حمص المتاحة للمواطنين",
  },
}
export default function ServicesPage(){
    return <ServicesList/>
}