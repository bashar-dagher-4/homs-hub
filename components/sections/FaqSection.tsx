"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useTranslations, useLocale } from "next-intl"
import { useMutation, useQuery } from "@tanstack/react-query"
import { faqSchema, type FaqInput } from "@/lib/validations/faq"
import { submitFaq, getFaqs } from "@/lib/api/faq"
import { CheckCircle, ChevronDown, ChevronUp } from "lucide-react"

const sectors = ["sports", "health", "education"] as const

export function FaqSection() {
  const t = useTranslations("faq")
  const tCommon = useTranslations("common.sectors")
  const locale = useLocale()
  const [submitted, setSubmitted] = useState(false)
  const [openId, setOpenId] = useState<string | null>(null)  // للـ Accordion

  // جلب الأسئلة المجابة فقط للعرض
  const { data: faqs } = useQuery({
    queryKey: ["faqs-public"],
    queryFn: getFaqs,
    select: (data) => data.filter((f) => f.status === "answered"),
  })

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FaqInput>({
    resolver: zodResolver(faqSchema),
    defaultValues: { sector: "sports" as const },
  })

  const { mutate, isPending } = useMutation({
    mutationFn: submitFaq,
    onSuccess: () => {
      setSubmitted(true)
      reset()
    },
  })

  return (
    <section className="py-16 px-6">
      <div className="mx-auto max-w-7xl">

        {/* العنوان */}
        <div className="mb-10">
          <h2
            className="text-2xl md:text-3xl font-black"
            style={{ color: "var(--foreground)" }}
          >
            {t("title")}
          </h2>
          <div
            className="mt-2 w-12 h-1 rounded-full"
            style={{ backgroundColor: "var(--primary)" }}
          />
          <p className="mt-3 text-lg" style={{ color: "var(--muted-foreground)" }}>
            {t("subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">

          {/* Accordion — الأسئلة المجابة */}
          <div className="flex flex-col gap-3">
            <h3
              className="font-bold text-lg mb-2"
              style={{ color: "var(--foreground)" }}
            >
              {locale === "ar" ? "أسئلة شائعة" : "Common Questions"}
            </h3>

            {faqs?.length === 0 && (
              <p style={{ color: "var(--muted-foreground)" }}>
                {locale === "ar" ? "لا توجد أسئلة بعد" : "No questions yet"}
              </p>
            )}

            {faqs?.map((faq) => (
              <div
                key={faq.id}
                className="rounded-xl overflow-hidden"
                style={{ border: "1px solid var(--border)" }}
              >
                {/* رأس السؤال */}
                <button
                  onClick={() => setOpenId(openId === faq.id ? null : faq.id)}
                  className="w-full flex items-center justify-between p-4 text-start"
                  style={{ backgroundColor: "var(--card)" }}
                >
                  <span
                    className="font-medium text-sm"
                    style={{ color: "var(--foreground)" }}
                  >
                    {faq.question}
                  </span>
                  {openId === faq.id
                    ? <ChevronUp size={16} style={{ color: "var(--primary)" }} />
                    : <ChevronDown size={16} style={{ color: "var(--muted-foreground)" }} />
                  }
                </button>

                {/* الجواب */}
                {openId === faq.id && (
                  <div
                    className="px-4 pb-4 text-sm leading-relaxed"
                    style={{
                      backgroundColor: "var(--secondary)",
                      color: "var(--muted-foreground)",
                    }}
                  >
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* النموذج */}
          <div
            className="rounded-2xl p-6"
            style={{
              backgroundColor: "var(--card)",
              border: "1px solid var(--border)",
            }}
          >
            {submitted ? (
              <div className="flex flex-col items-center gap-4 py-8 text-center">
                <CheckCircle size={48} style={{ color: "var(--primary)" }} />
                <p className="font-bold text-lg" style={{ color: "var(--foreground)" }}>
                  {t("success")}
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="text-sm font-bold hover:underline"
                  style={{ color: "var(--primary)" }}
                >
                  {locale === "ar" ? "إرسال سؤال آخر" : "Send another question"}
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit((data) => mutate(data))} className="flex flex-col gap-4">

                {/* الاسم */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-medium" style={{ color: "var(--foreground)" }}>
                    {t("name")}
                  </label>
                  <input
                    {...register("name")}
                    placeholder={t("namePlaceholder")}
                    className="w-full px-4 py-2.5 rounded-xl text-sm outline-none"
                    style={{
                      backgroundColor: "var(--secondary)",
                      border: "1px solid var(--border)",
                      color: "var(--foreground)",
                    }}
                  />
                </div>

                {/* القسم */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-medium" style={{ color: "var(--foreground)" }}>
                    {t("sector")}
                  </label>
                  <select
                    {...register("sector")}
                    className="w-full px-4 py-2.5 rounded-xl text-sm outline-none"
                    style={{
                      backgroundColor: "var(--secondary)",
                      border: "1px solid var(--border)",
                      color: "var(--foreground)",
                    }}
                  >
                    <option value="" disabled>
                      {locale === "ar" ? "اختر قسماً..." : "Select a sector..."}
                    </option>
                    {sectors.map((sector) => (
                      <option key={sector} value={sector}>
                        {tCommon(sector)}
                      </option>
                    ))}
                  </select>
                  {errors.sector && (
                    <p className="text-xs" style={{ color: "var(--danger-500)" }}>
                      {errors.sector.message}
                    </p>
                  )}
                </div>

                {/* السؤال */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-medium" style={{ color: "var(--foreground)" }}>
                    {t("question")}
                  </label>
                  <textarea
                    {...register("question")}
                    placeholder={t("questionPlaceholder")}
                    rows={4}
                    className="w-full px-4 py-2.5 rounded-xl text-sm outline-none resize-none"
                    style={{
                      backgroundColor: "var(--secondary)",
                      border: "1px solid var(--border)",
                      color: "var(--foreground)",
                    }}
                  />
                  {errors.question && (
                    <p className="text-xs" style={{ color: "var(--danger-500)" }}>
                      {errors.question.message}
                    </p>
                  )}
                </div>

                {/* زر الإرسال */}
                <button
                  type="submit"
                  disabled={isPending}
                  className="w-full py-3 rounded-xl font-bold text-sm text-white disabled:opacity-50"
                  style={{ backgroundColor: "var(--primary)" }}
                >
                  {isPending
                    ? locale === "ar" ? "جار الإرسال..." : "Sending..."
                    : t("send")
                  }
                </button>

              </form>
            )}
          </div>

        </div>
      </div>
    </section>
  )
}