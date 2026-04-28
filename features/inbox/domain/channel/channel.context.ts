// domain/channel/channel.context.ts

import { ChannelType } from './channel.types'

export type ChannelContext = {
  type: ChannelType
  address: string
}