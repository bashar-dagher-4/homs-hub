"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations, useLocale } from "next-intl";
import { useMutation } from "@tanstack/react-query";
import { faqSchema, type FaqInput } from "@/lib/validations/faq";
import { submitFaq } from "@/lib/api/faq";
import { CheckCircle } from "lucide-react";

const sectors = ["sports", "health", "education"] as const;

export function FaqSection() {
  const t = useTranslations("faq");
  const tCommon = useTranslations("common.sectors");
  const locale = useLocale();
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FaqInput>({
    resolver: zodResolver(faqSchema),
    defaultValues: {
      sector: "" as "sports" ,
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: submitFaq,
    onSuccess: () => {
      setSubmitted(true);
      reset();
    },
  });

  function onSubmit(data: FaqInput) {
    mutate(data);
  }

  return (
    <section className="py-16 px-6">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8">
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
          <p
            className="mt-3 text-lg"
            style={{ color: "var(--muted-foreground)" }}
          >
            {t("subtitle")}
          </p>
        </div>

        <div className="flex justify-center">
          {/* النموذج */}
          <div
            className="rounded-2xl p-6 w-full max-w-lg"
            style={{
              backgroundColor: "var(--card)",
              border: "1px solid var(--border)",
            }}
          >
            {submitted ? (
              /* رسالة النجاح */
              <div className="flex flex-col items-center gap-4 py-8 text-center">
                <CheckCircle size={48} style={{ color: "var(--primary)" }} />
                <p
                  className="font-bold text-lg"
                  style={{ color: "var(--foreground)" }}
                >
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
              /* النموذج */
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col gap-4"
              >
                {/* الاسم */}
                <div className="flex flex-col gap-1.5">
                  <label
                    className="text-sm font-medium"
                    style={{ color: "var(--foreground)" }}
                  >
                    {t("name")}
                  </label>
                  <input
                    {...register("name")}
                    placeholder={t("namePlaceholder")}
                    className="w-full px-4 py-2.5 rounded-xl text-sm outline-none transition-all"
                    style={{
                      backgroundColor: "var(--secondary)",
                      border: "1px solid var(--border)",
                      color: "var(--foreground)",
                    }}
                  />
                </div>
                {/* القسم */}
                <div className="flex flex-col gap-1.5">
                  <label
                    className="text-sm font-medium"
                    style={{ color: "var(--foreground)" }}
                  >
                    {t("sector")}
                  </label>
                  <select
                    {...register("sector")}
                    className="w-full px-4 py-2.5 rounded-xl text-sm outline-none transition-all"
                    style={{
                      backgroundColor: "var(--secondary)",
                      border: "1px solid var(--border)",
                      color: "var(--foreground)",
                    }}
                    aria-label="select-section"
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
                  <label
                    className="text-sm font-medium"
                    style={{ color: "var(--foreground)" }}
                  >
                    {t("question")}
                  </label>
                  <textarea
                    {...register("question")}
                    placeholder={t("questionPlaceholder")}
                    rows={4}
                    className="w-full px-4 py-2.5 rounded-xl text-sm outline-none transition-all resize-none"
                    style={{
                      backgroundColor: "var(--secondary)",
                      border: "1px solid var(--border)",
                      color: "var(--foreground)",
                    }}
                  />
                  {errors.question && (
                    <p
                      className="text-xs"
                      style={{ color: "var(--danger-500)" }}
                    >
                      {errors.question.message}
                    </p>
                  )}
                </div>

                {/* زر الإرسال */}
                <button
                  type="submit"
                  disabled={isPending}
                  className="w-full py-3 rounded-xl font-bold text-sm text-white transition-all hover:opacity-90 disabled:opacity-50"
                  style={{ backgroundColor: "var(--primary)" }}
                >
                  {isPending
                    ? locale === "ar"
                      ? "جار الإرسال..."
                      : "Sending..."
                    : t("send")}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
