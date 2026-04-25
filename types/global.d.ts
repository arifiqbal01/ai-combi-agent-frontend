export {}

declare global {
  interface Window {
    Clerk?: {
      loaded: boolean // ✅ IMPORTANT
      session?: {
        getToken(options?: { template?: string }): Promise<string | null>
      }
    }
  }
}