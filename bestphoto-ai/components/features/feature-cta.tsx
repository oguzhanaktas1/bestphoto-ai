"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight, ImagePlus } from "lucide-react"
import { useRouter } from "next/navigation"

export function FeatureCTA({ getStartedHref = "/signup", pricingHref = "/pricing" }) {
  const router = useRouter()
    return (
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-cyan-900/30 to-blue-900/30 rounded-2xl p-8 md:p-12 max-w-4xl mx-auto text-center"
          >
            <div className="bg-cyan-500/20 p-3 rounded-full inline-block mb-4">
              <ImagePlus className="h-8 w-8 text-cyan-400" />
            </div>

            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Ready to Transform Your Photo Management?</h2>

            <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
              Join thousands of users who save time and storage space with BestPhoto AI's intelligent photo selection
              technology.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              size="lg"
              className="bg-cyan-600 hover:bg-cyan-700 text-white px-8"
              onClick={() => router.push(getStartedHref)}
            >
              Get Started Free
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-white border-cyan-500 hover:bg-cyan-500/20"
              onClick={() => router.push(pricingHref)}
            >
              See Pricing Plans <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>

            <p className="text-gray-400 text-sm mt-6">
              No credit card required. Free plan includes up to 5 Credits per month.
            </p>
          </motion.div>
        </div>
      </section>
    )
}
