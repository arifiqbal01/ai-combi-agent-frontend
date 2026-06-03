// features/inbox/infrastructure/dto/participant.dto.ts

export type ParticipantDTO = {
  address: string

  display_name?: string | null
  username?: string | null

  email?: string | null
  phone?: string | null

  avatar_url?: string | null

  label?: string | null
}