import { Media } from '@/features/media/domain/media.types'
import { useMediaUrl } from '@/features/media/application/hooks/useMediaUrl'
import { MEDIA_VARIANT } from '@/features/media/domain/media.constants'
import { Icon } from '@/ui'
import { X } from 'lucide-react'

export function LightboxHeader({
  media,
  onClose,
}: {
  media: Media
  onClose: () => void
}) {
  const { data: url } = useMediaUrl(media, MEDIA_VARIANT.FULL)

  return (
    <div className="absolute top-0 left-0 right-0 z-30 flex items-center justify-between px-3 py-2.5 bg-bg-surface/90 backdrop-blur border-b border-border-subtle">
      <button
        onClick={onClose}
        className="w-9 h-9 flex items-center justify-center rounded-md hover:bg-bg-muted"
      >
        <Icon size="sm">
          <X />
        </Icon>
      </button>

      <div className="flex-1 text-center truncate text-sm font-medium">
        {media?.fileName || 'Media'}
      </div>

      {url ? (
        <a
          href={url}
          download
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs px-2.5 py-1.5 rounded-md bg-bg-muted border border-border-subtle"
        >
          Download
        </a>
      ) : (
        <div className="w-9" />
      )}
    </div>
  )
}