import HeroSection from '../components/tickets-page/HeroSection'
import PricingSection from '../components/tickets-page/PricingSection'
import MarqueeSeparator from '../components/about-page/MarqueeSeparator'

// Tickets Content Component
function TicketsContent({ theme }) {
  return (
    <div className="space-y-0">
      <HeroSection theme={theme} />
      <MarqueeSeparator theme={theme} />
      <PricingSection theme={theme} />
    </div>
  )
}

export default TicketsContent