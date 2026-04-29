// app/layout.tsx
import { ClerkProvider } from '@clerk/nextjs'
import { AuthProvider } from '@/core/auth/AuthProvider'
import { QueryProvider } from '@/core/providers/query-provider'

import '@/styles/globals.css'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body
          suppressHydrationWarning
          className="h-screen overflow-hidden"
        >
          <QueryProvider>
            <AuthProvider>
              {children}
            </AuthProvider>
          </QueryProvider>
        </body>
      </html>
    </ClerkProvider>
  )
}