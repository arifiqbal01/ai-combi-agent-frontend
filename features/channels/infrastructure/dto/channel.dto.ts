// features/channels/infrastructure/dto/channel.dto.ts

export type ChannelAccountDTO = {
  id: string
  label: string
  provider: string
  channel_type: string

  status: string
  connection_state: string

  last_synced_at?: string
  created_at: string
}

export type CreateChannelAccountDTO = {
  channel_type: string
  provider: string
  label: string
}

/* 🔥 NEW — unified connect */
export type ConnectRequestDTO = {
  data?: Record<string, unknown>
}

export type ConnectResponseDTO =
  | {
      status: 'oauth_required' | 'manual_required' | 'connected'
      redirect_url?: string | null
    }
  | {
      status: 'valid' | 'invalid'
      connected: boolean
    }

export type SimpleStatusDTO = {
  status: string
}

export type TestConnectionDTO = {
  connection_state: string
  checked_at?: string
}