"use client"

import { useState } from "react"
import { useLocale, useTranslations } from "next-intl"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { CheckCircle, Clock } from "lucide-react"
import { DeleteConfirmModal } from "@/components/shared/DeleteConfirmModal"
import { getFaqs, answerFaq, deleteFaq } from "@/lib/api/faq"
import type { Faq } from "@/types/faq"

export default function FaqDashboardPage() {
  const locale = useLocale()
  const t = useTranslations("dashboard")
  const queryClient = useQueryClient()

  const [selectedFaq, setSelectedFaq] = useState<Faq | null>(null)
  const [answer, setAnswer] = useState("")
  const [deleteItem, setDeleteItem] = useState<Faq | null>(null)
  const [filter, setFilter] = useState<"all" | "pending" | "answered">("all")

  const { data: faqs, isLoading } = useQuery({
    queryKey: ["faqs"],
    queryFn: getFaqs,
  })

  const { mutate: submitAnswer, isPending: isAnswering } = useMutation({

    mutationFn: ({ id, answer }: { id: string; answer: string }) =>
      answerFaq(id, answer),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["faqs"] })
      setSelectedFaq(null)
      setAnswer("")
    },
  })

  const { mutate: handleDelete, isPending: isDeleting } = useMutation({
    mutationFn: (id: string) => deleteFaq(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["faqs"] })
      setDeleteItem(null)
    },
  })

  const filtered = faqs?.filter((f) =>
    filter === "all" ? true : f.status === filter
  )

  const sectorName = (sector: string) => {
    const map: Record<string, Record<string, string>> = {
      sports:    { ar: "رياضة",  en: "Sports" },
      health:    { ar: "صحة",    en: "Health" },
      education: { ar: "تعليم",  en: "Education" },
    }
    return map[sector]?.[locale] ?? sector
  }

  if (isLoading) {
    return (
      <div className="flex flex-col gap-4">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="h-32 rounded-2xl animate-pulse"
            style={{ backgroundColor: "var(--muted)" }}
          />
        ))}
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-6">

      {/* الهيدر */}
      <div>
        <h2
          className="text-2xl font-black"
          style={{ color: "var(--foreground)" }}
        >
          {t("faq")}
        </h2>
        <div
          className="mt-1 w-10 h-1 rounded-full"
          style={{ backgroundColor: "var(--primary)" }}
        />
      </div>

      {/* فلتر الحالة */}
      <div
        className="flex gap-1 p-1 rounded-xl w-fit"
        style={{ backgroundColor: "var(--secondary)" }}
      >
        {(["all", "pending", "answered"] as const).map((status) => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className="px-4 py-2 rounded-lg text-sm font-medium transition-all"
            style={
              filter === status
                ? { backgroundColor: "var(--primary)", color: "white" }
                : { color: "var(--muted-foreground)" }
            }
          >
            {status === "all"
              ? locale === "ar" ? "الكل" : "All"
              : status === "pending"
              ? locale === "ar" ? "بانتظار الرد" : "Pending"
              : locale === "ar" ? "تم الرد" : "Answered"}
          </button>
        ))}
      </div>

      {/* لا توجد بيانات */}
      {filtered?.length === 0 && (
        <div
          className="text-center py-12 rounded-2xl"
          style={{ backgroundColor: "var(--secondary)" }}
        >
          <p style={{ color: "var(--muted-foreground)" }}>
            {locale === "ar" ? "لا توجد أسئلة" : "No questions found"}
          </p>
        </div>
      )}

      {/* قائمة الأسئلة */}
      <div className="flex flex-col gap-4">
        {filtered?.map((faq) => (
          <div
            key={faq.id}
            className="rounded-2xl p-5"
            style={{
              backgroundColor: "var(--card)",
              border: "1px solid var(--border)",
            }}
          >
            {/* الهيدر */}
            <div className="flex items-start justify-between gap-4 mb-3">
              <div className="flex items-center gap-3">
                <div
                  className="p-1.5 rounded-full"
                  style={{
                    backgroundColor: faq.status === "answered"
                      ? "var(--success-100)"
                      : "var(--warning-100)",
                  }}
                >
                  {faq.status === "answered"
                    ? <CheckCircle size={14} style={{ color: "var(--success-500)" }} />
                    : <Clock size={14} style={{ color: "var(--warning-500)" }} />
                  }
                </div>
                <div>
                  <p className="text-sm font-bold" style={{ color: "var(--foreground)" }}>
                    {faq.name ?? (locale === "ar" ? "مجهول" : "Anonymous")}
                  </p>
                  <p className="text-xs" style={{ color: "var(--muted-foreground)" }}>
                    {sectorName(faq.sector)} • {new Date(faq.date).toLocaleDateString(
                      locale === "ar" ? "ar-SY" : "en-US"
                    )}
                  </p>
                </div>
              </div>

              <button
                onClick={() => setDeleteItem(faq)}
                className="text-xs px-3 py-1 rounded-lg flex-shrink-0"
                style={{
                  backgroundColor: "var(--danger-100)",
                  color: "var(--danger-500)",
                }}
              >
                {locale === "ar" ? "حذف" : "Delete"}
              </button>
            </div>

            {/* السؤال */}
            <p
              className="text-sm mb-3 leading-relaxed"
              style={{ color: "var(--foreground)" }}
            >
              {faq.question}
            </p>

            {/* الإجابة */}
            {faq.answer && (
              <div
                className="rounded-xl p-3 mb-3"
                style={{ backgroundColor: "var(--secondary)" }}
              >
                <p className="text-xs font-bold mb-1" style={{ color: "var(--primary)" }}>
                  {locale === "ar" ? "الرد:" : "Answer:"}
                </p>
                <p className="text-sm" style={{ color: "var(--foreground)" }}>
                  {faq.answer}
                </p>
              </div>
            )}

            {/* نموذج الرد */}
            {faq.status === "pending" && (
              selectedFaq?.id === faq.id ? (
                <div className="flex flex-col gap-2">
                  <textarea
                    value={answer}
                    onChange={(e) => setAnswer(e.target.value)}
                    placeholder={locale === "ar" ? "اكتب ردك هنا..." : "Write your answer..."}
                    rows={3}
                    className="w-full px-4 py-2.5 rounded-xl text-sm outline-none resize-none"
                    style={{
                      backgroundColor: "var(--secondary)",
                      border: "1px solid var(--border)",
                      color: "var(--foreground)",
                    }}
                  />
                  <div className="flex gap-2">
                    <button
                      onClick={() => { setSelectedFaq(null); setAnswer("") }}
                      className="px-4 py-2 rounded-xl text-sm font-bold"
                      style={{
                        backgroundColor: "var(--secondary)",
                        color: "var(--foreground)",
                        border: "1px solid var(--border)",
                      }}
                    >
                      {locale === "ar" ? "إلغاء" : "Cancel"}
                    </button>
                    <button
                      onClick={() => submitAnswer({ id: faq.id, answer })}
                      disabled={!answer.trim() || isAnswering}
                      className="px-4 py-2 rounded-xl text-sm font-bold text-white disabled:opacity-50"
                      style={{ backgroundColor: "var(--primary)" }}
                    >
                      {isAnswering
                        ? locale === "ar" ? "جار الإرسال..." : "Sending..."
                        : locale === "ar" ? "إرسال الرد" : "Send Answer"
                      }
                    </button>
                  </div>
                </div>
              ) : (
                <button
                  onClick={() => setSelectedFaq(faq)}
                  className="text-sm font-bold"
                  style={{ color: "var(--primary)" }}
                >
                  {locale === "ar" ? "رد على السؤال ←" : "Answer →"}
                </button>
              )
            )}
          </div>
        ))}
      </div>

      {/* Modal الحذف */}
      <DeleteConfirmModal
        isOpen={!!deleteItem}
        onConfirm={() => deleteItem && handleDelete(deleteItem.id)}
        onCancel={() => setDeleteItem(null)}
        isLoading={isDeleting}
      />

    </div>
  )
}