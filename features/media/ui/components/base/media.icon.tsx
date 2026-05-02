'use client'

import { Icon } from '@/ui'
import {
  FileText,
  Image as ImageIcon,
  Video,
  Music,
  File,
} from 'lucide-react'

import { Media } from '@/features/media/domain/media.types'

/**
 * ✅ Always stay in sync with Icon sizes
 */
type Size = React.ComponentProps<typeof Icon>['size']

type Props = {
  media: Media
  size?: Size
}

export function MediaIcon({ media, size = 'sm' }: Props) {
  const type = media.type

  if (type === 'image') {
    return (
      <Icon size={size} tone="muted">
        <ImageIcon />
      </Icon>
    )
  }

  if (type === 'video') {
    return (
      <Icon size={size} tone="muted">
        <Video />
      </Icon>
    )
  }

  if (type === 'audio') {
    return (
      <Icon size={size} tone="muted">
        <Music />
      </Icon>
    )
  }

  if (type === 'document') {
    return (
      <Icon size={size} tone="muted">
        <FileText />
      </Icon>
    )
  }

  return (
    <Icon size={size} tone="muted">
      <File />
    </Icon>
  )
}