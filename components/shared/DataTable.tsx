"use client"

import { useTranslations, useLocale } from "next-intl"
import { Pencil, Trash2 } from "lucide-react"

type Column<T> = {
  key: keyof T | string
  label: string
  render?: (item: T) => React.ReactNode
}

type Props<T> = {
  data: T[]
  columns: Column<T>[]
  onEdit: (item: T) => void
  onDelete: (item: T) => void
  isLoading?: boolean
}

export function DataTable<T extends { id: string }>({
  data,
  columns,
  onEdit,
  onDelete,
  isLoading,
}: Props<T>) {
  const t = useTranslations("dashboard.actions")
  const locale = useLocale()

  if (isLoading) {
    return (
      <div className="flex flex-col gap-3">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="h-14 rounded-xl animate-pulse"
            style={{ backgroundColor: "var(--muted)" }}
          />
        ))}
      </div>
    )
  }

  if (!data.length) {
    return (
      <div
        className="text-center py-12 rounded-xl"
        style={{ backgroundColor: "var(--secondary)" }}
      >
        <p style={{ color: "var(--muted-foreground)" }}>
          {locale === "ar" ? "لا توجد بيانات" : "No data found"}
        </p>
      </div>
    )
  }

  return (
    <div className="overflow-x-auto rounded-xl" style={{ border: "1px solid var(--border)" }}>
      <table className="w-full">
        <thead>
          <tr style={{ backgroundColor: "var(--secondary)" }}>
            {columns.map((col) => (
              <th
                key={String(col.key)}
                className="px-4 py-3 text-start text-xs font-bold uppercase tracking-wider"
                style={{ color: "var(--muted-foreground)" }}
              >
                {col.label}
              </th>
            ))}
            <th
              className="px-4 py-3 text-start text-xs font-bold uppercase tracking-wider"
              style={{ color: "var(--muted-foreground)" }}
            >
              {locale === "ar" ? "إجراءات" : "Actions"}
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr
              key={item.id}
              style={{
                backgroundColor: index % 2 === 0 ? "var(--card)" : "var(--secondary)",
                borderTop: "1px solid var(--border)",
              }}
            >
              {columns.map((col) => (
                <td
                  key={String(col.key)}
                  className="px-4 py-3 text-sm"
                  style={{ color: "var(--foreground)" }}
                >
                  {col.render
                    ? col.render(item)
                    : String((item as Record<string,unknown>)[col.key as string] ?? "")}
                </td>
              ))}
              <td className="px-4 py-3">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onEdit(item)}
                    className="p-1.5 rounded-lg transition-colors"
                    style={{
                      backgroundColor: "var(--primary-light)",
                      color: "var(--primary)",
                    }}
                  >
                    <Pencil size={14} />
                  </button>
                  <button
                    onClick={() => onDelete(item)}
                    className="p-1.5 rounded-lg transition-colors"
                    style={{
                      backgroundColor: "var(--danger-100)",
                      color: "var(--danger-500)",
                    }}
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}