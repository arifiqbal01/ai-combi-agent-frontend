import { Media } from '@/features/media/domain/media.types'
import { MediaThumbnailStrip } from '../thumbnails/MediaThumbnailStrip'

export function LightboxFooter({
  mediaList,
  index,
  onSelect,
}: {
  mediaList: Media[]
  index: number
  onSelect: (i: number) => void
}) {
  return (
    <div className="absolute bottom-0 left-0 right-0 z-30 bg-bg-surface/90 backdrop-blur border-t border-border-subtle">
      <MediaThumbnailStrip
        mediaList={mediaList}
        activeIndex={index}
        onSelect={onSelect}
      />
    </div>
  )
}