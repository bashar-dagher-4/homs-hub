"use client"

import { useTranslations, useLocale } from "next-intl"
import { Trash2 } from "lucide-react"

type Props = {
  isOpen: boolean
  onConfirm: () => void
  onCancel: () => void
  isLoading?: boolean
}

export function DeleteConfirmModal({ isOpen, onConfirm, onCancel, isLoading }: Props) {
  const t = useTranslations("dashboard.actions")
  const locale = useLocale()

  if (!isOpen) return null

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
      >
        {/* Modal */}
        <div
          className="w-full max-w-sm rounded-2xl p-6 flex flex-col gap-6"
          style={{
            backgroundColor: "var(--card)",
            border: "1px solid var(--border)",
          }}
        >
          {/* الأيقونة والنص */}
          <div className="flex flex-col items-center gap-4 text-center">
            <div
              className="p-4 rounded-full"
              style={{ backgroundColor: "var(--danger-100)" }}
            >
              <Trash2 size={24} style={{ color: "var(--danger-500)" }} />
            </div>
            <div>
              <h3
                className="font-bold text-lg mb-1"
                style={{ color: "var(--foreground)" }}
              >
                {locale === "ar" ? "تأكيد الحذف" : "Confirm Delete"}
              </h3>
              <p
                className="text-sm"
                style={{ color: "var(--muted-foreground)" }}
              >
                {t("deleteConfirm")}
              </p>
            </div>
          </div>

          {/* الأزرار */}
          <div className="flex gap-3">
            <button
              onClick={onCancel}
              className="flex-1 py-2.5 rounded-xl font-bold text-sm transition-colors"
              style={{
                backgroundColor: "var(--secondary)",
                color: "var(--foreground)",
                border: "1px solid var(--border)",
              }}
            >
              {t("cancel")}
            </button>
            <button
              onClick={onConfirm}
              disabled={isLoading}
              className="flex-1 py-2.5 rounded-xl font-bold text-sm text-white transition-colors disabled:opacity-50"
              style={{ backgroundColor: "var(--danger-500)" }}
            >
              {isLoading
                ? locale === "ar" ? "جار الحذف..." : "Deleting..."
                : t("delete")
              }
            </button>
          </div>
        </div>
      </div>
    </>
  )
}