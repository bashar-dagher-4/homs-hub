"use client"

import { useState } from "react"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useTranslations, useLocale } from "next-intl"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import Image from "next/image"
import { Eye, EyeOff, Lock, User } from "lucide-react"



const loginSchema = z.object({
  username: z.string().min(1, "اسم المستخدم مطلوب"),
  password: z.string().min(1, "كلمة المرور مطلوبة"),
  rememberMe: z.boolean(),
})

type LoginInput = z.infer<typeof loginSchema>

export default function LoginForm() {
  const t = useTranslations("auth")
  const locale = useLocale()
  const router = useRouter()
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
      rememberMe: false,
    },
  })

  async function onSubmit(data: LoginInput) {
    setIsLoading(true)
    setError("")

    const result = await signIn("credentials", {
      username: data.username,
      password: data.password,
      redirect: false,
    })

    setIsLoading(false)

    if (result?.error) {
      setError(t("error"))
      return
    }

    router.push(`/${locale}/dashboard`)
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{ backgroundColor: "var(--background)" }}
    >
      <div className="w-full max-w-md">

        {/* اللوغو */}
        <div className="flex justify-center mb-8">
          <Image
            src="/logo.png"
            alt="Homs Hub"
            width={150}
            height={50}
            className="object-contain"
          />
        </div>

        {/* الكارد */}
        <div
          className="rounded-2xl p-8"
          style={{
            backgroundColor: "var(--card)",
            border: "1px solid var(--border)",
          }}
        >
          {/* العنوان */}
          <div className="mb-6">
            <h1
              className="text-2xl font-black mb-1"
              style={{ color: "var(--foreground)" }}
            >
              {t("login")}
            </h1>
            <div
              className="w-10 h-1 rounded-full"
              style={{ backgroundColor: "var(--primary)" }}
            />
          </div>

          {/* النموذج */}
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">

            {/* اسم المستخدم */}
            <div className="flex flex-col gap-1.5">
              <label
                className="text-sm font-medium"
                style={{ color: "var(--foreground)" }}
              >
                {t("username")}
              </label>
              <div className="relative">
                <div
                  className="absolute inset-y-0 start-3 flex items-center"
                  style={{ color: "var(--muted-foreground)" }}
                >
                  <User size={16} />
                </div>
                <input
                  {...register("username")}
                  placeholder={t("usernamePlaceholder")}
                  className="w-full ps-10 pe-4 py-2.5 rounded-xl text-sm outline-none transition-all"
                  style={{
                    backgroundColor: "var(--secondary)",
                    border: "1px solid var(--border)",
                    color: "var(--foreground)",
                  }}
                />
              </div>
              {errors.username && (
                <p className="text-xs" style={{ color: "var(--danger-500)" }}>
                  {errors.username.message}
                </p>
              )}
            </div>
            {/* كلمة المرور */}
            <div className="flex flex-col gap-1.5">
              <label
                className="text-sm font-medium"
                style={{ color: "var(--foreground)" }}
              >
                {t("password")}
              </label>
              <div className="relative">
                <div
                  className="absolute inset-y-0 start-3 flex items-center"
                  style={{ color: "var(--muted-foreground)" }}
                >
                  <Lock size={16} />
                </div>
                <input
                  {...register("password")}
                  type={showPassword ? "text" : "password"}
                  placeholder={t("passwordPlaceholder")}
                  className="w-full ps-10 pe-10 py-2.5 rounded-xl text-sm outline-none transition-all"
                  style={{
                    backgroundColor: "var(--secondary)",
                    border: "1px solid var(--border)",
                    color: "var(--foreground)",
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 end-3 flex items-center"
                  style={{ color: "var(--muted-foreground)" }}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {errors.password && (
                <p className="text-xs" style={{ color: "var(--danger-500)" }}>
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* تذكرني */}
            <div className="flex items-center gap-2">
              <input
                {...register("rememberMe")}
                type="checkbox"
                id="rememberMe"
                className="w-4 h-4 rounded"
                style={{ accentColor: "var(--primary)" }}
              />
              <label
                htmlFor="rememberMe"
                className="text-sm"
                style={{ color: "var(--muted-foreground)" }}
              >
                {locale === "ar" ? "تذكرني" : "Remember me"}
              </label>
            </div>

            {/* رسالة الخطأ */}
            {error && (
              <div
                className="px-4 py-3 rounded-xl text-sm font-medium"
                style={{
                  backgroundColor: "var(--danger-100)",
                  color: "var(--danger-500)",
                }}
              >
                {error}
              </div>
            )}

            {/* زر الدخول */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 rounded-xl font-bold text-sm text-white transition-all hover:opacity-90 disabled:opacity-50"
              style={{ backgroundColor: "var(--primary)" }}
            >
              {isLoading
                ? locale === "ar" ? "جار الدخول..." : "Signing in..."
                : t("loginButton")
              }
            </button>

          </form>
        </div>

      </div>
    </div>
  )
}