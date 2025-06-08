import Navbar from "@/components/navbar"
import { PricingPlans } from "@/components/pricing/pricing-plans"
import { PricingFAQ } from "@/components/pricing/pricing-faq"
import { PricingCTA } from "@/components/pricing/pricing-cta"
import ClientLayout from "../client-layout"

export default function PricingPage() {
  return (
    <ClientLayout>
      <main className="min-h-screen antialiased relative overflow-hidden">
        {/* AI-themed gradient background */}
        <div className="h-full w-full absolute inset-0 z-0 bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900 bg-grid-white/[0.02]"></div>

        <div className="relative z-10">
          <Navbar />
          <PricingPlans />
          <PricingFAQ />
          <PricingCTA />
        </div>
      </main>
    </ClientLayout>
  )
}
