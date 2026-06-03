import Image from 'next/image'

type BrandLogoProps = {
  size?: 'sm' | 'md' | 'lg'
  logoOnly?: boolean
}

export function BrandLogo({
  size = 'md',
  logoOnly = false,
}: BrandLogoProps) {
  const dimensions = {
    sm: {
      width: 28,
      height: 28,
    },
    md: {
      width: 120,
      height: 32,
    },
    lg: {
      width: 180,
      height: 48,
    },
  }

  const { width, height } = dimensions[size]

  return (
    <Image
      src={
        logoOnly
          ? '/branding/autply-logo.svg'
          : '/branding/autply-monogram.svg'
      }
      alt="Autply"
      width={width}
      height={height}
      priority
    />
  )
}