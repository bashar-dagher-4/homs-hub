"use client"

import { useState } from "react"
import { useTranslations, useLocale } from "next-intl"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { Plus } from "lucide-react"
import { DataTable } from "@/components/shared/DataTable"
import { DeleteConfirmModal } from "@/components/shared/DeleteConfirmModal"
import { NewsFormModal } from "@/components/shared/NewsFormModal"
import { getNews, createNews, updateNews, deleteNews } from "@/lib/api/news"
import { getEvents, deleteEvent } from "@/lib/api/events"
import { getServices, deleteService } from "@/lib/api/services"
import { getFacilities, deleteFacility } from "@/lib/api/facilities"
import { getLocalizedText } from "@/lib/utils"
import type { News } from "@/types/news"
import type { Event } from "@/types/event"
import type { Service } from "@/types/service"
import type { Facility } from "@/types/facility"

type Tab = "news" | "events" | "services" | "facilities"

export default function SportsDashboardPage() {
  const t = useTranslations("dashboard")
  const tTabs = useTranslations("dashboard.tabs")
  const locale = useLocale()
  const queryClient = useQueryClient()

  const [activeTab, setActiveTab] = useState<Tab>("news")
  const [deleteItem, setDeleteItem] = useState<{ id: string } | null>(null)
  const [editNews, setEditNews] = useState<News | null>(null)
  const [isNewsModalOpen, setIsNewsModalOpen] = useState(false)

  const { data: news, isLoading: newsLoading } = useQuery({
    queryKey: ["news", "sports"],
    queryFn: () => getNews("sports"),
  })

  const { data: events, isLoading: eventsLoading } = useQuery({
    queryKey: ["events", "sports"],
    queryFn: () => getEvents("sports"),
  })

  const { data: services, isLoading: servicesLoading } = useQuery({
    queryKey: ["services", "sports"],
    queryFn: () => getServices("sports"),
  })

  const { data: facilities, isLoading: facilitiesLoading } = useQuery({
    queryKey: ["facilities", "sports"],
    queryFn: () => getFacilities("sports"),
  })

  // حذف حسب الـ Tab النشط
  const { mutate: handleDelete, isPending: isDeleting } = useMutation({
    mutationFn: async (id: string) => {
      if (activeTab === "news") return deleteNews(id)
      if (activeTab === "events") return deleteEvent(id)
      if (activeTab === "services") return deleteService(id)
      if (activeTab === "facilities") return deleteFacility(id)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [activeTab, "sports"] })
      setDeleteItem(null)
    },
  })

  // حفظ خبر — إضافة أو تعديل
  const { mutate: saveNews, isPending: isSavingNews } = useMutation({
    mutationFn: async (data: Partial<News>) => {
      if (editNews) return updateNews(editNews.id, data)
      return createNews({ ...data, sector: "sports" })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["news", "sports"] })
      setIsNewsModalOpen(false)
      setEditNews(null)
    },
  })

  const tabs: { key: Tab; label: string }[] = [
    { key: "news", label: tTabs("news") },
    { key: "events", label: tTabs("events") },
    { key: "services", label: tTabs("services") },
    { key: "facilities", label: tTabs("facilities") },
  ]

  const newsColumns = [
    {
      key: "title_ar",
      label: locale === "ar" ? "العنوان" : "Title",
      render: (item: News) => getLocalizedText(item.title_ar, item.title_en, locale),
    },
    {
      key: "date",
      label: locale === "ar" ? "التاريخ" : "Date",
      render: (item: News) => new Date(item.date).toLocaleDateString(
        locale === "ar" ? "ar-SY" : "en-US"
      ),
    },
  ]

  const eventsColumns = [
    {
      key: "title_ar",
      label: locale === "ar" ? "العنوان" : "Title",
      render: (item: Event) => getLocalizedText(item.title_ar, item.title_en, locale),
    },
    {
      key: "date",
      label: locale === "ar" ? "التاريخ" : "Date",
      render: (item: Event) => new Date(item.date).toLocaleDateString(
        locale === "ar" ? "ar-SY" : "en-US"
      ),
    },
  ]

  const servicesColumns = [
    {
      key: "title_ar",
      label: locale === "ar" ? "العنوان" : "Title",
      render: (item: Service) => getLocalizedText(item.title_ar, item.title_en, locale),
    },
    {
      key: "cost",
      label: locale === "ar" ? "التكلفة" : "Cost",
      render: (item: Service) => item.cost ?? (locale === "ar" ? "مجاني" : "Free"),
    },
  ]

  const facilitiesColumns = [
    {
      key: "title_ar",
      label: locale === "ar" ? "العنوان" : "Title",
      render: (item: Facility) => getLocalizedText(item.title_ar, item.title_en, locale),
    },
    {
      key: "location",
      label: locale === "ar" ? "الموقع" : "Location",
      render: (item: Facility) => getLocalizedText(
        item.location.address_ar,
        item.location.address_en,
        locale
      ),
    },
  ]

  return (
    <div className="flex flex-col gap-6">

      {/* الهيدر */}
      <div className="flex items-center justify-between">
        <div>
          <h2
            className="text-2xl font-black"
            style={{ color: "var(--foreground)" }}
          >
            {t("sports")}
          </h2>
          <div
            className="mt-1 w-10 h-1 rounded-full"
            style={{ backgroundColor: "var(--primary)" }}
          />
        </div>
        <button
          onClick={() => {
            setEditNews(null)
            if (activeTab === "news") setIsNewsModalOpen(true)
          }}
          className="flex items-center gap-2 px-4 py-2 rounded-xl font-bold text-sm text-white"
          style={{ backgroundColor: "var(--primary)" }}
        >
          <Plus size={16} />
          {locale === "ar" ? "إضافة" : "Add"}
        </button>
      </div>

      {/* Tabs */}
      <div
        className="flex gap-1 p-1 rounded-xl w-fit flex-wrap"
        style={{ backgroundColor: "var(--secondary)" }}
      >
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className="px-4 py-2 rounded-lg text-sm font-medium transition-all"
            style={
              activeTab === tab.key
                ? { backgroundColor: "var(--primary)", color: "white" }
                : { color: "var(--muted-foreground)" }
            }
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* المحتوى */}
      {activeTab === "news" && (
        <DataTable
          data={news ?? []}
          columns={newsColumns}
          onEdit={(item) => { setEditNews(item); setIsNewsModalOpen(true) }}
          onDelete={(item) => setDeleteItem(item)}
          isLoading={newsLoading}
        />
      )}

      {activeTab === "events" && (
        <DataTable
          data={events ?? []}
          columns={eventsColumns}
          onEdit={(item) => console.log("edit event", item)}
          onDelete={(item) => setDeleteItem(item)}
          isLoading={eventsLoading}
        />
      )}

      {activeTab === "services" && (
        <DataTable
          data={services ?? []}
          columns={servicesColumns}
          onEdit={(item) => console.log("edit service", item)}
          onDelete={(item) => setDeleteItem(item)}
          isLoading={servicesLoading}
        />
      )}

      {activeTab === "facilities" && (
        <DataTable
          data={facilities ?? []}
          columns={facilitiesColumns}
          onEdit={(item) => console.log("edit facility", item)}
          onDelete={(item) => setDeleteItem(item)}
          isLoading={facilitiesLoading}
        />
      )}

      {/* Modal الأخبار */}
      <NewsFormModal
        isOpen={isNewsModalOpen}
        onClose={() => { setIsNewsModalOpen(false); setEditNews(null) }}
        onSubmit={(data) => saveNews(data)}
        editItem={editNews}
        isLoading={isSavingNews}
      />

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