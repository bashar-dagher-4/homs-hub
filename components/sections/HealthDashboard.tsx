"use client"

import { useState } from "react"
import { useTranslations, useLocale } from "next-intl"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { Plus } from "lucide-react"
import { DataTable } from "@/components/shared/DataTable"
import { DeleteConfirmModal } from "@/components/shared/DeleteConfirmModal"
import { NewsFormModal } from "@/components/shared/NewsFormModal"
import { EventFormModal } from "@/components/shared/EventFormModal"
import { ServiceFormModal } from "@/components/shared/ServiceFormModal"
import { FacilityFormModal } from "@/components/shared/FacilityFormModal"
import { getNews, createNews, updateNews, deleteNews } from "@/lib/api/news"
import { getEvents, createEvent, updateEvent, deleteEvents } from "@/lib/api/events"
import { getServices, createService, updateService, deleteServices } from "@/lib/api/services"
import { getFacilities, createFacility, updateFacility, deleteFacility } from "@/lib/api/facilities"
import { getLocalizedText } from "@/lib/utils"
import type { News } from "@/types/news"
import type { Event } from "@/types/event"
import type { Service } from "@/types/service"
import type { Facility } from "@/types/facility"

type Tab = "news" | "events" | "services" | "facilities"
const SECTOR = "health"

export default function HealthDashboard() {
  const t = useTranslations("dashboard")
  const tTabs = useTranslations("dashboard.tabs")
  const locale = useLocale()
  const queryClient = useQueryClient()

  const [activeTab, setActiveTab] = useState<Tab>("news")
  const [deleteItem, setDeleteItem] = useState<{ id: string } | null>(null)

  const [editNews, setEditNews] = useState<News | null>(null)
  const [isNewsModalOpen, setIsNewsModalOpen] = useState(false)

  const [editEvent, setEditEvent] = useState<Event | null>(null)
  const [isEventModalOpen, setIsEventModalOpen] = useState(false)

  const [editService, setEditService] = useState<Service | null>(null)
  const [isServiceModalOpen, setIsServiceModalOpen] = useState(false)

  const [editFacility, setEditFacility] = useState<Facility | null>(null)
  const [isFacilityModalOpen, setIsFacilityModalOpen] = useState(false)

  const { data: news, isLoading: newsLoading } = useQuery({
    queryKey: ["news", SECTOR],
    queryFn: () => getNews(SECTOR),
  })

  const { data: events, isLoading: eventsLoading } = useQuery({
    queryKey: ["events", SECTOR],
    queryFn: () => getEvents(SECTOR),
  })

  const { data: services, isLoading: servicesLoading } = useQuery({
    queryKey: ["services", SECTOR],
    queryFn: () => getServices(SECTOR),
  })

  const { data: facilities, isLoading: facilitiesLoading } = useQuery({
    queryKey: ["facilities", SECTOR],
    queryFn: () => getFacilities(SECTOR),
  })

  // حذف حقيقي حسب الـ Tab النشط
  const { mutate: deleteRecord, isPending: isDeleting } = useMutation({
    mutationFn: async (id: string) => {
      if (activeTab === "news") return deleteNews(id)
      if (activeTab === "events") return deleteEvents(id)
      if (activeTab === "services") return deleteServices(id)
      if (activeTab === "facilities") return deleteFacility(id)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [activeTab, SECTOR], refetchType: "active" })
      setDeleteItem(null)
    },
  })

  const { mutate: saveNews, isPending: isSavingNews } = useMutation({
    mutationFn: async (data: Partial<News> & { image?: FileList }) => {
      if (editNews) return updateNews(editNews.id, data)
      return createNews(data)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["news", SECTOR], refetchType: "active" })
      setIsNewsModalOpen(false)
      setEditNews(null)
    },
  })

  const { mutate: saveEvent, isPending: isSavingEvent } = useMutation({
    mutationFn: async (data: Partial<Event> & { image?: FileList }) => {
      if (editEvent) return updateEvent(editEvent.id, data)
      return createEvent(data)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["events", SECTOR], refetchType: "active" })
      setIsEventModalOpen(false)
      setEditEvent(null)
    },
  })

  const { mutate: saveService, isPending: isSavingService } = useMutation({
    mutationFn: async (data: Partial<Service>) => {
      if (editService) return updateService(editService.id, data)
      return createService(data)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["services", SECTOR], refetchType: "active" })
      setIsServiceModalOpen(false)
      setEditService(null)
    },
  })

  const { mutate: saveFacility, isPending: isSavingFacility } = useMutation({
    mutationFn: async (data: Partial<Facility> & { image?: FileList }) => {
      if (editFacility) return updateFacility(editFacility.id, data)
      return createFacility(data)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["facilities", SECTOR], refetchType: "active" })
      setIsFacilityModalOpen(false)
      setEditFacility(null)
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

  function handleAddClick() {
    if (activeTab === "news") {
      setEditNews(null)
      setIsNewsModalOpen(true)
    } else if (activeTab === "events") {
      setEditEvent(null)
      setIsEventModalOpen(true)
    } else if (activeTab === "services") {
      setEditService(null)
      setIsServiceModalOpen(true)
    } else if (activeTab === "facilities") {
      setEditFacility(null)
      setIsFacilityModalOpen(true)
    }
  }

  return (
    <div className="flex flex-col gap-6">

      {/* الهيدر */}
      <div className="flex items-center justify-between">
        <div>
          <h2
            className="text-2xl font-black"
            style={{ color: "var(--foreground)" }}
          >
            {t("health")}
          </h2>
          <div
            className="mt-1 w-10 h-1 rounded-full"
            style={{ backgroundColor: "var(--primary)" }}
          />
        </div>
        <button
          onClick={handleAddClick}
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
          onEdit={(item) => {
            setEditNews(item)
            setIsNewsModalOpen(true)
          }}
          onDelete={(item) => setDeleteItem(item)}
          isLoading={newsLoading}
        />
      )}

      {activeTab === "events" && (
        <DataTable
          data={events ?? []}
          columns={eventsColumns}
          onEdit={(item) => {
            setEditEvent(item)
            setIsEventModalOpen(true)
          }}
          onDelete={(item) => setDeleteItem(item)}
          isLoading={eventsLoading}
        />
      )}

      {activeTab === "services" && (
        <DataTable
          data={services ?? []}
          columns={servicesColumns}
          onEdit={(item) => {
            setEditService(item)
            setIsServiceModalOpen(true)
          }}
          onDelete={(item) => setDeleteItem(item)}
          isLoading={servicesLoading}
        />
      )}

      {activeTab === "facilities" && (
        <DataTable
          data={facilities ?? []}
          columns={facilitiesColumns}
          onEdit={(item) => {
            setEditFacility(item)
            setIsFacilityModalOpen(true)
          }}
          onDelete={(item) => setDeleteItem(item)}
          isLoading={facilitiesLoading}
        />
      )}

      {/* Modal الأخبار */}
      <NewsFormModal
        isOpen={isNewsModalOpen}
        onClose={() => {
          setIsNewsModalOpen(false)
          setEditNews(null)
        }}
        onSubmit={(data) => saveNews({ ...data, sector: SECTOR })}
        editItem={editNews}
        isLoading={isSavingNews}
      />

      {/* Modal الفعاليات */}
      <EventFormModal
        isOpen={isEventModalOpen}
        onClose={() => {
          setIsEventModalOpen(false)
          setEditEvent(null)
        }}
        onSubmit={(data) => saveEvent({ ...data, sector: SECTOR })}
        editItem={editEvent}
        isLoading={isSavingEvent}
      />

      {/* Modal الخدمات */}
      <ServiceFormModal
        isOpen={isServiceModalOpen}
        onClose={() => {
          setIsServiceModalOpen(false)
          setEditService(null)
        }}
        onSubmit={(data) => saveService({ ...data, sector: SECTOR })}
        editItem={editService}
        isLoading={isSavingService}
      />

      {/* Modal المنشآت */}
      <FacilityFormModal
        isOpen={isFacilityModalOpen}
        onClose={() => {
          setIsFacilityModalOpen(false)
          setEditFacility(null)
        }}
        onSubmit={(data) => saveFacility({ ...data, sector: SECTOR })}
        editItem={editFacility}
        isLoading={isSavingFacility}
      />

      {/* Modal الحذف */}
      <DeleteConfirmModal
        isOpen={!!deleteItem}
        onConfirm={() => deleteItem && deleteRecord(deleteItem.id)}
        onCancel={() => setDeleteItem(null)}
        isLoading={isDeleting}
      />

    </div>
  )
}