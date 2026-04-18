import Link from "next/link"

export default function NotFound() {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center gap-6"
      style={{ backgroundColor: "var(--background)" }}
    >
      <h1
        className="text-8xl font-black"
        style={{ color: "var(--primary)" }}
      >
        404
      </h1>
      <p
        className="text-xl font-bold"
        style={{ color: "var(--foreground)" }}
      >
        الصفحة غير موجودة
      </p>
      <Link
        href="/ar"
        className="px-6 py-3 rounded-xl text-white font-bold"
        style={{ backgroundColor: "var(--primary)" }}
      >
        العودة للرئيسية
      </Link>
    </div>
  )
}