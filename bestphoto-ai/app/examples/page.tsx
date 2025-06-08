import Navbar from "@/components/navbar"
import { ExamplesHero } from "@/components/examples/examples-hero"
import { ExamplesCategories } from "@/components/examples/examples-categories"
import { ExamplesShowcase } from "@/components/examples/examples-showcase"
import { ExamplesTestimonials } from "@/components/examples/examples-testimonials"
import { FeatureCTA } from "@/components/features/feature-cta"
import ClientLayout from "../client-layout"

export default function ExamplesPage() {
  return (
    <ClientLayout>
      <main className="min-h-screen antialiased relative overflow-hidden">
        {/* AI-themed gradient background */}
        <div className="h-full w-full absolute inset-0 z-0 bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900 bg-grid-white/[0.02]"></div>

        <div className="relative z-10">
          <Navbar />
          <ExamplesHero />
          <ExamplesCategories />
          <ExamplesShowcase />
          <ExamplesTestimonials />
          <FeatureCTA />
        </div>
      </main>
    </ClientLayout>
  )
}
