export type Facility = {
  id: string
  title_ar: string
  title_en: string
  description_ar: string
  description_en: string
  sector: "sports" | "health" | "education"
  image: string
  location: {
    lat: number
    lng: number
    address_ar: string
    address_en: string
  }
}