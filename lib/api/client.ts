import { getSession } from "next-auth/react"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import type { Session } from "next-auth"

const API_URL = process.env.NEXT_PUBLIC_API_URL

async function getToken(): Promise<string | null> {
  if (typeof window !== "undefined") {
    const session = await getSession() as Session & { accessToken?: string }
    return session?.accessToken ?? null
  }
  const session = await getServerSession(authOptions) as Session & { accessToken?: string }
  return session?.accessToken ?? null
}

export async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const token = await getToken()

  const headers: HeadersInit = {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...(options.headers as Record<string, string> ?? {}),
  }

  const res = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers,
  })

  if (res.status === 401) {
    if (typeof window !== "undefined") {
      const { signOut } = await import("next-auth/react")
      signOut({ callbackUrl: "/ar/login" })
    }
    throw new Error("انتهت الجلسة")
  }

  if (!res.ok) {
    const error = await res.json().catch(() => ({})) as { message?: string }
    throw new Error(error.message ?? "حدث خطأ")
  }

  return res.json() as Promise<T>
}