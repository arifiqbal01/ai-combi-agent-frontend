import { Header } from '@/features/public/components/Header'
import { Footer } from '@/features/public/components/Footer'
import { AppPanel } from '@/ui/layout/AppPanel'

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="h-screen flex flex-col bg-bg-surface text-text-primary">

      {/* Header */}
      <Header />

      {/* 🔥 Scrollable area */}
      <AppPanel scroll>
        <div className="mx-auto max-w-5xl px-4 py-20">
          {children}
        </div>
      </AppPanel>

      {/* Footer */}
      <Footer />

    </div>
  )
}