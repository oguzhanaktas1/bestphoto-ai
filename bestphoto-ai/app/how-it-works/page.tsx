import Navbar from "@/components/navbar"
import { ProcessSteps } from "@/components/how-it-works/process-steps"
import { ProcessDemo } from "@/components/how-it-works/process-demo"
import { ProcessFAQ } from "@/components/how-it-works/process-faq"
import { FeatureCTA } from "@/components/features/feature-cta"
import ClientLayout from "../client-layout"

export default function HowItWorksPage() {
  return (
    <ClientLayout>
      <main className="min-h-screen antialiased relative overflow-hidden">
        {/* AI-themed gradient background */}
        <div className="h-full w-full absolute inset-0 z-0 bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900 bg-grid-white/[0.02]"></div>

        <div className="relative z-10">
          <Navbar />
          <ProcessSteps />
          <ProcessDemo />
          <ProcessFAQ />
          <FeatureCTA />
        </div>
      </main>
    </ClientLayout>
  )
}
