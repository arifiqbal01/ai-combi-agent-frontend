import { Message } from '../message/message.types'

export type TimelineItem =
  | {
      type: 'time'
      id: string
      label: string
    }
  | {
      type: 'unread'
      id: string
      label: string
    }
  | {
      type: 'message'
      id: string
      message: Message
      grouped: boolean
    }

export type TimelineGroup = {
  id: string
  label: string
  messages: {
    message: Message
    grouped: boolean
  }[]
}