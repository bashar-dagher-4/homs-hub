export type Faq = {
  id: string
  name?: string
  sector: string
  question: string
  answer?: string
  status: "pending" | "answered"
  date: string
}