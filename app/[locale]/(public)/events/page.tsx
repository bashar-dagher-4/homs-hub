import { EventsList } from "@/components/sections/EventList";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "الفعاليات",
  description: "الفعاليات القادمة في مدينة حمص — رياضية وصحية وتعليمية",
  openGraph: {
    title: "الفعاليات | مجلس مدينة حمص",
    description: "الفعاليات القادمة في مدينة حمص",
  },
}
export default function EventsPage(){
    return <EventsList/>
}