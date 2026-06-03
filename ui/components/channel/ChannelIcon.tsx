import Image from 'next/image'
import {
  ChannelType,
  type ChannelType as ChannelTypeValue,
} from '@/features/inbox/domain/channel/channel.types'

export type ChannelVisualType =
  | 'email'
  | 'gmail'
  | 'instagram'
  | 'messenger'
  | 'whatsapp'

const ICONS: Record<ChannelVisualType, string> = {
  gmail: '/icons/gmail.svg',
  instagram: '/icons/instagram.svg',
  messenger: '/icons/messenger.svg',
  whatsapp: '/icons/whatsapp.svg',
  email: '/icons/mails.svg',
}

export function getChannelVisualType(
  channelType?: string,
  channelAccount?: string
): ChannelVisualType {

  if (channelType === ChannelType.EMAIL) {

    const account = channelAccount?.toLowerCase()

    if (account?.endsWith('@gmail.com')) {
      return 'gmail'
    }

    return 'email'
  }

  switch (channelType) {

    case ChannelType.WHATSAPP:
      return 'whatsapp'

    case ChannelType.INSTAGRAM:
      return 'instagram'

    case ChannelType.FACEBOOK_MESSENGER:
      return 'messenger'

    default:
      return 'email'
  }
}

type Props = {
  channelType?: ChannelTypeValue
  channelAccount?: string
  size?: number
}

export function ChannelIcon({
  channelType,
  channelAccount,
  size = 20,
}: Props) {
  const visualType =
    getChannelVisualType(
      channelType,
      channelAccount
    )

  return (
    <Image
      src={ICONS[visualType]}
      alt={visualType}
      width={size}
      height={size}
    />
  )
}