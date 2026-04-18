import type { FaqInput } from "@/lib/validations/faq"

const USE_MOCK = true

export async function submitFaq(data: FaqInput): Promise<void> {
  if (USE_MOCK) {
    // نحاكي تأخير السيرفر
    await new Promise((resolve) => setTimeout(resolve, 1000))
    console.log("FAQ submitted:", data)
    return
  }

  const res = await fetch("/api/faq", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  })

  if (!res.ok) throw new Error("فشل إرسال السؤال")
}