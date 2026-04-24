export type AuthUser = {
  id: string
  email?: string | null
  name?: string | null
}

export type AuthAdapter = {
  // state
  isLoaded: boolean
  isAuthenticated: boolean
  user: AuthUser | null

  // actions
  getToken: () => Promise<string | null>
  signOut: (opts?: { redirectUrl?: string }) => Promise<void>
}