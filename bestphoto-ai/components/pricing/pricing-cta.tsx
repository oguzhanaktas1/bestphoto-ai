"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Check } from "lucide-react"
import Link from "next/link"

export function PricingCTA({
  ctaRoutes = {
    startFree: "/signup",
    comparePlans: "/pricing",
  },
}: {
  ctaRoutes?: {
    startFree?: string
    comparePlans?: string
  }
}) {
  return (
    <section className="py-20 px-4">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-cyan-900/30 to-blue-900/30 rounded-2xl p-8 md:p-12 max-w-4xl mx-auto"
        >
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Still Not Sure?</h2>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              Try our Free plan with no commitment. Experience the power of AI photo selection with 5 free credits.
            </p>
          </div>

          <div className="bg-black/30 backdrop-blur-sm rounded-xl p-6 mb-8 max-w-xl mx-auto">
            <h3 className="text-xl font-semibold text-white mb-4">Free Plan Includes:</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <Check className="h-5 w-5 text-cyan-400 mr-2 flex-shrink-0 mt-0.5" />
                <span className="text-gray-300">5 credits for new users</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 text-cyan-400 mr-2 flex-shrink-0 mt-0.5" />
                <span className="text-gray-300">Basic AI photo selection</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 text-cyan-400 mr-2 flex-shrink-0 mt-0.5" />
                <span className="text-gray-300">Standard quality analysis</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 text-cyan-400 mr-2 flex-shrink-0 mt-0.5" />
                <span className="text-gray-300">No credit card required</span>
              </li>
            </ul>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" className="bg-white text-gray-900 hover:bg-gray-100 px-8" asChild>
              <Link href={ctaRoutes.startFree || "/signup"}>Start Free Plan</Link>
            </Button>
            <Button size="lg" variant="outline" className="text-white border-white hover:bg-white/10" asChild>
              <Link href={ctaRoutes.comparePlans || "/pricing"}>Compare All Plans</Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
