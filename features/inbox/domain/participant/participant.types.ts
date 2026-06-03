// features/inbox/domain/participant/participant.types.ts

export const ParticipantTransportRole = {
  FROM: 'from',
  TO: 'to',
  CC: 'cc',
  BCC: 'bcc',
} as const

export type ParticipantTransportRole =
  typeof ParticipantTransportRole[
    keyof typeof ParticipantTransportRole
  ]

export const ParticipantIdentityRole = {
  AGENT: 'agent',
  CUSTOMER: 'customer',
} as const

export type ParticipantIdentityRole =
  typeof ParticipantIdentityRole[
    keyof typeof ParticipantIdentityRole
  ]

export type ParticipantRole =
  | ParticipantTransportRole
  | ParticipantIdentityRole

export type Participant = {
  address: string

  role?: ParticipantRole

  displayName?: string | null
  username?: string | null

  email?: string | null
  phone?: string | null

  avatarUrl?: string | null

  /**
   * Backend-provided display label.
   *
   * Fallback order:
   * display_name
   * → username
   * → email
   * → phone
   * → address
   */
  label?: string | null
}