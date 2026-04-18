import type { Service } from "@/types/service"

export const mockServices: Service[] = [
  {
    id: "1",
    title_ar: "تسجيل المرافق الرياضية",
    title_en: "Sports Facility Registration",
    description_ar: "خدمة تسجيل وحجز المرافق الرياضية في المدينة",
    description_en: "Service for registering and booking sports facilities in the city",
    sector: "sports",
  },
  {
    id: "2",
    title_ar: "طلب خدمات صحية",
    title_en: "Health Services Request",
    description_ar: "تقديم طلبات الخدمات الصحية والرعاية الطبية",
    description_en: "Submit requests for health services and medical care",
    sector: "health",
    cost: "مجاني / Free",
  },
  {
    id: "3",
    title_ar: "التسجيل المدرسي",
    title_en: "School Registration",
    description_ar: "خدمة تسجيل الطلاب في المدارس الحكومية",
    description_en: "Student registration service for public schools",
    sector: "education",
  },
]