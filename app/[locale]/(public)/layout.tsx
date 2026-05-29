import { NuqsAdapter } from 'nuqs/adapters/next/app'
import { Navbar } from "@/components/layout/Navbar"
import { Footer } from "@/components/layout/Footer"
import { QueryProvider } from '@/components/providers/QueryProviders';

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <QueryProvider>
    <NuqsAdapter>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </div>
    </NuqsAdapter>
    </QueryProvider>
  )
}