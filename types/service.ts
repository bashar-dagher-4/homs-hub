export type Service = {
  id: string
  title_ar: string
  title_en: string
  description_ar: string
  description_en: string
  sector: "sports" | "health" | "education"
  cost?: string
}