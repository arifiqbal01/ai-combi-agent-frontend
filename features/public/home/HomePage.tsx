import { HeroSection } from './HeroSection'
import { FeaturesSection } from './FeaturesSection'
import { HowItWorksSection } from './HowItWorksSection'
import { TrustSection } from './TrustSection'

export function HomePage() {
  return (
    <div className="flex flex-col">

      <HeroSection />

      <FeaturesSection />

      <HowItWorksSection />

      <TrustSection />

    </div>
  )
}