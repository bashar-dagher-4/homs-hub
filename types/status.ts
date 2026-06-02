import type { Sector } from "@/types/common"
export type MonthlyStat = {
  month: string
  month_en: string
  news: number
  events: number
  services: number
  facilities: number
}

export type SectorStat = {
  sector: Sector
  news: number
  events: number
  services: number
  facilities: number
}