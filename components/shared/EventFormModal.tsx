"use client"

import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { useLocale } from "next-intl"
import { X } from "lucide-react"
import type { Event } from "@/types/event"

const eventSchema = z.object({
  title_ar: z.string().min(3, "العنوان العربي مطلوب"),
  title_en: z.string().min(3, "English title is required"),
  description_ar: z.string().min(10, "الوصف العربي مطلوب"),
  description_en: z.string().min(10, "English description is required"),
  date: z.string().min(1, "التاريخ مطلوب"),
  image: z.any().optional(),
})

type EventInput = z.infer<typeof eventSchema>

type Props = {
  isOpen: boolean
  onClose: () => void
  onSubmit: (data: EventInput) => void
  editItem?: Event | null
  isLoading?: boolean
}

export function EventFormModal({ isOpen, onClose, onSubmit, editItem, isLoading }: Props) {
  const locale = useLocale()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<EventInput>({
    resolver: zodResolver(eventSchema),
  })

  useEffect(() => {
    if (editItem) {
      reset({
        title_ar: editItem.title_ar,
        title_en: editItem.title_en,
        description_ar: editItem.description_ar,
        description_en: editItem.description_en,
        date: editItem.date,
      })
    } else {
      reset({
        title_ar: "",
        title_en: "",
        description_ar: "",
        description_en: "",
        date: "",
      })
    }
  }, [editItem, reset])

  if (!isOpen) return null

  const inputStyle = {
    backgroundColor: "var(--secondary)",
    border: "1px solid var(--border)",
    color: "var(--foreground)",
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
    >
      <div
        className="w-full max-w-lg rounded-2xl flex flex-col max-h-[90vh]"
        style={{
          backgroundColor: "var(--card)",
          border: "1px solid var(--border)",
        }}
      >
        {/* الهيدر */}
        <div
          className="flex items-center justify-between p-6 flex-shrink-0"
          style={{ borderBottom: "1px solid var(--border)" }}
        >
          <h3 className="font-bold text-lg" style={{ color: "var(--foreground)" }}>
            {editItem
              ? locale === "ar" ? "تعديل فعالية" : "Edit Event"
              : locale === "ar" ? "إضافة فعالية" : "Add Event"
            }
          </h3>
          <button
            onClick={onClose}
            className="p-2 rounded-lg"
            style={{ color: "var(--muted-foreground)" }}
          >
            <X size={18} />
          </button>
        </div>

        {/* النموذج */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-4 p-6 overflow-y-auto"
        >
          {/* العنوان العربي */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium" style={{ color: "var(--foreground)" }}>
              العنوان بالعربي
            </label>
            <input
              {...register("title_ar")}
              className="w-full px-4 py-2.5 rounded-xl text-sm outline-none"
              style={inputStyle}
            />
            {errors.title_ar && (
              <p className="text-xs" style={{ color: "var(--danger-500)" }}>
                {errors.title_ar.message}
              </p>
            )}
          </div>

          {/* العنوان الإنجليزي */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium" style={{ color: "var(--foreground)" }}>
              Title in English
            </label>
            <input
              {...register("title_en")}
              className="w-full px-4 py-2.5 rounded-xl text-sm outline-none"
              style={inputStyle}
            />
            {errors.title_en && (
              <p className="text-xs" style={{ color: "var(--danger-500)" }}>
                {errors.title_en.message}
              </p>
            )}
          </div>

          {/* الوصف العربي */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium" style={{ color: "var(--foreground)" }}>
              الوصف بالعربي
            </label>
            <textarea
              {...register("description_ar")}
              rows={3}
              className="w-full px-4 py-2.5 rounded-xl text-sm outline-none resize-none"
              style={inputStyle}
            />
            {errors.description_ar && (
              <p className="text-xs" style={{ color: "var(--danger-500)" }}>
                {errors.description_ar.message}
              </p>
            )}
          </div>

          {/* الوصف الإنجليزي */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium" style={{ color: "var(--foreground)" }}>
              Description in English
            </label>
            <textarea
              {...register("description_en")}
              rows={3}
              className="w-full px-4 py-2.5 rounded-xl text-sm outline-none resize-none"
              style={inputStyle}
            />
            {errors.description_en && (
              <p className="text-xs" style={{ color: "var(--danger-500)" }}>
                {errors.description_en.message}
              </p>
            )}
          </div>

          {/* التاريخ */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium" style={{ color: "var(--foreground)" }}>
              {locale === "ar" ? "التاريخ" : "Date"}
            </label>
            <input
              {...register("date")}
              type="date"
              className="w-full px-4 py-2.5 rounded-xl text-sm outline-none"
              style={inputStyle}
            />
            {errors.date && (
              <p className="text-xs" style={{ color: "var(--danger-500)" }}>
                {errors.date.message}
              </p>
            )}
          </div>

          {/* الصورة */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium" style={{ color: "var(--foreground)" }}>
              {locale === "ar" ? "الصورة" : "Image"}
            </label>
            <input
              {...register("image")}
              type="file"
              accept="image/*"
              className="w-full px-4 py-2.5 rounded-xl text-sm outline-none"
              style={inputStyle}
            />
            <p className="text-xs" style={{ color: "var(--muted-foreground)" }}>
              {locale === "ar"
                ? "اتركه فارغاً إذا لا تريد تغيير الصورة الحالية"
                : "Leave empty to keep the current image"}
            </p>
          </div>

          {/* الأزرار */}
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2.5 rounded-xl font-bold text-sm transition-colors"
              style={{
                backgroundColor: "var(--secondary)",
                color: "var(--foreground)",
                border: "1px solid var(--border)",
              }}
            >
              {locale === "ar" ? "إلغاء" : "Cancel"}
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="flex-1 py-2.5 rounded-xl font-bold text-sm text-white transition-colors disabled:opacity-50"
              style={{ backgroundColor: "var(--primary)" }}
            >
              {isLoading
                ? locale === "ar" ? "جار الحفظ..." : "Saving..."
                : locale === "ar" ? "حفظ" : "Save"
              }
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}