import { getSession } from "next-auth/react"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"

const API_URL = process.env.NEXT_PUBLIC_API_URL

// دالة مساعدة تجلب الـ Token حسب البيئة
async function getToken(): Promise<string | null> {
  // Client Component
  if (typeof window !== "undefined") {
    const session = await getSession()
    return (session as any)?.accessToken ?? null
  }
  // Server Component
  const session = await getServerSession(authOptions)
  return (session as any)?.accessToken ?? null
}

// دالة الطلب الموحدة
export async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const token = await getToken()

  const headers: HeadersInit = {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  }

  const res = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers,
  })

  if (res.status === 401) {
    // Token انتهى → سجّل خروج تلقائي
    if (typeof window !== "undefined") {
      const { signOut } = await import("next-auth/react")
      signOut({ callbackUrl: "/ar/login" })
    }
    throw new Error("انتهت الجلسة")
  }

  if (!res.ok) {
    const error = await res.json().catch(() => ({}))
    throw new Error(error.message ?? "حدث خطأ")
  }

  return res.json()
}