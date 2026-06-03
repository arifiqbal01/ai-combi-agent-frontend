import { BrandLogo } from './BrandLogo'
import clsx from 'clsx'

export type BrandVariant =
  | 'header'
  | 'sidebar'
  | 'mobile'
  | 'auth'

type BrandProps = {
  variant?: BrandVariant
  className?: string
}

const BRAND_CONFIG = {
  header: {
    showTagline: false,
    logoOnly: true,
    size: 'md',
  },
  sidebar: {
    showTagline: true,
    logoOnly: false,
    size: 'md',
  },
  mobile: {
    showTagline: false,
    logoOnly: false,
    size: 'sm',
  },
  auth: {
    showTagline: true,
    logoOnly: false,
    size: 'lg',
  },
} as const

export function Brand({
  variant = 'header',
  className,
}: BrandProps) {
  const config = BRAND_CONFIG[variant]

  return (
    <div
      className={clsx(
        'flex items-center gap-3',
        className
      )}
    >
      <BrandLogo
        size={config.size}
        logoOnly={config.logoOnly}
      />

      {!config.logoOnly && (
        <div>
          <div className="font-semibold">
            Autply
          </div>

          {config.showTagline && (
            <div className="text-xs text-muted-foreground">
              Communication made simple and smart
            </div>
          )}
        </div>
      )}
    </div>
  )
}