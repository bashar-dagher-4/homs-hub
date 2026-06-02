import { apiRequest } from "@/lib/api/client"
import type { FaqInput } from "@/lib/validations/faq"
import { Faq } from "@/types/faq"

export async function getFaqs(): Promise<Faq[]> {
  
  return apiRequest<Faq[]>("/api/faq/")
}

export async function submitFaq(data: FaqInput): Promise<void> {
  return apiRequest<void>("/api/faq/", {
    method: "POST",
    body: JSON.stringify(data),
  })
}

export async function answerFaq(id: string, answer: string): Promise<void> {
  return apiRequest<void>(`/api/faq/${id}/answer/`, {
    method: "POST",
    body: JSON.stringify({ answer }),
  })
}

export async function deleteFaq(id: string): Promise<void> {
  return apiRequest<void>(`/api/faq/${id}/`, {
    method: "DELETE",
  })
}