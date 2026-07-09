import type { News } from "@/types/news"
import type { Sector } from "@/types/common"

import { apiRequest } from "@/lib/api/client"



export async function getNews(sector?: Sector): Promise<News[]> {
  const query = sector && sector !== "all" ? `?sector=${sector}` : ""
  return apiRequest<News[]>(`/api/news/${query}`)
}

export async function getNewsById(id: string): Promise<News | null> {
  return apiRequest<News>(`/api/news/${id}/`)
}

// دالة مساعدة تبني FormData بشكل صحيح
function buildNewsFormData(data: Partial<News> & { image?: FileList }): FormData {
  const formData = new FormData()

  Object.entries(data).forEach(([key, value]) => {
    if (value === undefined || value === null) return

    if (key === "image") {
      if (value instanceof FileList && value.length > 0) {
        formData.append("image", value[0])
      }
      // إذا لم توجد صورة جديدة، لا نرسل الحقل أصلاً (نترك الصورة القديمة كما هي)
      return
    }

    formData.append(key, String(value))
  })

  return formData
}

export async function createNews(
  data: Partial<News> & { image?: FileList }
): Promise<News> {
  const formData = buildNewsFormData(data)
  return apiRequest<News>(`/api/news/`, {
    method: "POST",
    body: formData,
    headers: {},
  })
}

export async function updateNews(
  id: string,
  data: Partial<News> & { image?: FileList }
): Promise<News> {
  const formData = buildNewsFormData(data)
  return apiRequest<News>(`/api/news/${id}/`, {
    method: "PATCH",
    body: formData,
    headers: {},
  })
}

export async function deleteNews(id: string): Promise<void> {
  return apiRequest<void>(`/api/news/${id}/`, {
    method: "DELETE",
  })
}