import type { Facility } from "@/types/facility"

export const mockFacilities: Facility[] = [
  {
    id: "1",
    title_ar: "ملعب الباسل",
    title_en: "Al-Basel Stadium",
    description_ar: "الملعب الرئيسي في مدينة حمص",
    description_en: "The main stadium in Homs city",
    sector: "sports",
    image: "",
    location: {
      lat: 34.7324,
      lng: 36.7137,
      address_ar: "حي الزهراء، حمص",
      address_en: "Al-Zahraa District, Homs",
    },
  },
  {
    id: "2",
    title_ar: "مستشفى حمص الوطني",
    title_en: "Homs National Hospital",
    description_ar: "أكبر مستشفى حكومي في المدينة",
    description_en: "The largest public hospital in the city",
    sector: "health",
    image: "",
    location: {
      lat: 34.7300,
      lng: 36.7200,
      address_ar: "وسط المدينة، حمص",
      address_en: "City Center, Homs",
    },
  },
  {
    id: "3",
    title_ar: "مدرسة الفردوس",
    title_en: "Al-Ferdous School",
    description_ar: "مدرسة حكومية في حي عكرمة",
    description_en: "Public school in Akrama district",
    sector: "education",
    image: "",
    location: {
      lat: 34.7400,
      lng: 36.7100,
      address_ar: "حي عكرمة، حمص",
      address_en: "Akrama District, Homs",
    },
  },
]