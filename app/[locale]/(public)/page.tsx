import { EventsList } from "@/components/sections/EventList";
import { FaqSection } from "@/components/sections/FaqSection";
import { HeroSection } from "@/components/sections/HeroSection";
import { MediaSection } from "@/components/sections/MediaSection";
import { NewsList } from "@/components/sections/NewsList";
import { ServicesList } from "@/components/sections/ServicesList";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "الرئيسية",
  description: "مرحباً بك في البوابة الرقمية لمجلس مدينة حمص — تصفح الخدمات والأخبار والفعاليات",
  openGraph: {
    title: "الرئيسية | مجلس مدينة حمص",
    description: "مرحباً بك في البوابة الرقمية لمجلس مدينة حمص",
  },
}
export default function Home() {  
  return (
    <main>
      <HeroSection/>
      <NewsList limit={3} showLink={true}/>
      <ServicesList limit={3} showLink={true}/>
      <EventsList limit={3} showLink={true}/>
      <MediaSection/>
      <FaqSection/>
    </main>
  );
}
