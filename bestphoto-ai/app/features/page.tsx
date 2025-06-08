import Navbar from "@/components/navbar"
import { FeatureHero } from "@/components/features/feature-hero"
import { FeatureShowcase } from "@/components/features/feature-showcase"
import { FeatureComparison } from "@/components/features/feature-comparison"
import { FeatureTestimonials } from "@/components/features/feature-testimonials"
import { FeatureCTA } from "@/components/features/feature-cta"
import ClientLayout from "../client-layout"

export default function FeaturesPage() {
  return (
    <ClientLayout>
      <main className="min-h-screen antialiased relative overflow-hidden">
        {/* AI-themed gradient background */}
        <div className="h-full w-full absolute inset-0 z-0 bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900 bg-grid-white/[0.02]"></div>

        <div className="relative z-10">
          <Navbar />
          <FeatureHero />
          <FeatureShowcase />
          <FeatureComparison />
          <FeatureTestimonials />
          <FeatureCTA />
        </div>
      </main>
    </ClientLayout>
  )
}
