import { apiRequest } from "@/lib/api/client"
import type { FaqInput } from "@/lib/validations/faq"

export type FaqItem = {
  id: string
  name?: string
  sector: string
  question: string
  answer?: string
  status: "pending" | "answered"
  date: string
}

const USE_MOCK = false

const mockFaqs: FaqItem[] = [
  {
    id: "1",
    name: "أحمد",
    sector: "sports",
    question: "ما هي مواعيد الملاعب؟",
    status: "pending",
    date: "2025-03-01",
  },
  {
    id: "2",
    sector: "health",
    question: "كيف أحجز موعداً؟",
    answer: "تواصل مع المستشفى على الرقم المدرج",
    status: "answered",
    date: "2025-03-05",
  },
]

// جلب كل الأسئلة (للـ Dashboard)
export async function getFaqs(): Promise<FaqItem[]> {
  if (USE_MOCK) return mockFaqs
  return apiRequest<FaqItem[]>("/api/faq/")
}

// إرسال سؤال جديد (من الموقع العام)
export async function submitFaq(data: FaqInput): Promise<void> {
  if (USE_MOCK) {
    await new Promise((res) => setTimeout(res, 1000))
    return
  }
  return apiRequest<void>("/api/faq/", {
    method: "POST",
    body: JSON.stringify(data),
  })
}

// الرد على سؤال (من لوحة التحكم)
export async function answerFaq(id: string, answer: string): Promise<void> {
  if (USE_MOCK) {
    await new Promise((res) => setTimeout(res, 800))
    return
  }
  return apiRequest<void>(`/api/faq/${id}/answer/`, {
    method: "POST",
    body: JSON.stringify({ answer }),
  })
}

// حذف سؤال (من لوحة التحكم)
export async function deleteFaq(id: string): Promise<void> {
  if (USE_MOCK) {
    await new Promise((res) => setTimeout(res, 800))
    return
  }
  return apiRequest<void>(`/api/faq/${id}/`, {
    method: "DELETE",
  })
}