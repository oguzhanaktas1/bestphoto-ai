"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Check, X } from "lucide-react"
import { cn } from "@/lib/utils"
import Link from "next/link"

export function PricingPlans({
  planRoutes = {
    free: "auth/signup",
    pro: "auth/signup?plan=pro",
    proplus: "auth/signup?plan=proplus"
  }
}: {
  planRoutes?: {
    free?: string
    pro?: string
    proplus?: string
  }
}) {
  const plans = [
    {
      name: "Free",
      description: "Perfect for trying out BestPhoto AI",
      price: 0,
      credits: 10,
      renewal: "No renewal, one-time credits",
      features: [
        { included: true, text: "10 credits for new users" },
        { included: true, text: "Basic AI photo selection" },
        { included: true, text: "Standard quality analysis" },
        { included: false, text: "Batch processing" },
        { included: false, text: "Custom selection criteria" },
        { included: false, text: "Priority processing" },
      ],
      cta: "Get Started",
      ctaLink: planRoutes.free || "/signup",
      popular: false,
      color: "from-gray-600 to-gray-700",
    },
    {
      name: "Pro",
      description: "For photographers and enthusiasts",
      price: 20,
      credits: 50,
      renewal: "Renews monthly",
      features: [
        { included: true, text: "50 credits per month" },
        { included: true, text: "Advanced AI photo selection" },
        { included: true, text: "Detailed quality analysis" },
        { included: true, text: "Batch processing" },
        { included: true, text: "Custom selection criteria" },
        { included: false, text: "Priority processing" },
      ],
      cta: "Start Pro Plan",
      ctaLink: planRoutes.pro || "/signup?plan=pro",
      popular: true,
      color: "from-cyan-600 to-blue-600",
    },
    {
      name: "Pro Plus",
      description: "For professional photographers",
      price: 200,
      credits: 500,
      renewal: "Renews monthly",
      features: [
        { included: true, text: "500 credits per month" },
        { included: true, text: "Premium AI photo selection" },
        { included: true, text: "Advanced quality analysis" },
        { included: true, text: "Unlimited batch processing" },
        { included: true, text: "Custom selection criteria" },
        { included: true, text: "Priority processing" },
      ],
      cta: "Start Pro Plus Plan",
      ctaLink: planRoutes.proplus || "/signup?plan=proplus",
      popular: false,
      color: "from-purple-600 to-indigo-600",
    },
  ]

  return (
    <section className="py-16 px-4">
      <div className="container mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-5xl font-bold text-white mb-6"
          >
            Simple, Transparent{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">Pricing</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-gray-300 text-lg mb-8"
          >
            Choose the plan that's right for you and start finding your best photos today.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-black/30 backdrop-blur-sm rounded-lg p-4 max-w-md mx-auto"
          >
            <p className="text-cyan-400 font-medium mb-1">How credits work:</p>
            <p className="text-gray-300 text-sm">
              Each photo processing uses 1 credit. Process more photos with higher tier plans.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={cn(
                "relative rounded-xl overflow-hidden",
                plan.popular && "md:-mt-4 md:mb-4 md:shadow-xl md:shadow-cyan-500/20",
              )}
            >
              {plan.popular && (
                <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-cyan-500 to-blue-500 text-white text-center text-sm font-medium py-1">
                  Most Popular
                </div>
              )}

              <div
                className={cn(
                  "bg-black/40 backdrop-blur-sm border border-white/10 h-full",
                  plan.popular && "border-cyan-500/50",
                )}
              >
                <div
                  className={cn(
                    "bg-gradient-to-r p-6 text-white",
                    plan.popular ? "from-cyan-600/40 to-blue-600/40" : "from-gray-800/40 to-gray-700/40",
                  )}
                >
                  <h3 className="text-2xl font-bold mb-1">{plan.name}</h3>
                  <p className="text-gray-300 text-sm">{plan.description}</p>
                </div>

                <div className="p-6">
                  <div className="mb-6">
                    <div className="flex items-baseline">
                      <span className="text-4xl font-bold text-white">${plan.price}</span>
                      <span className="text-gray-400 ml-2">/month</span>
                    </div>
                    <div className="mt-2 space-y-2">
                      <div className="flex items-center">
                        <div className="w-3 h-3 rounded-full bg-cyan-500 mr-2"></div>
                        <span className="text-gray-300 text-sm">{plan.credits} credits</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-3 h-3 rounded-full bg-purple-500 mr-2"></div>
                        <span className="text-gray-300 text-sm">{plan.renewal}</span>
                      </div>
                    </div>
                  </div>

                  <ul className="space-y-4 mb-8">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start">
                        {feature.included ? (
                          <Check className="h-5 w-5 text-cyan-400 mr-2 flex-shrink-0 mt-0.5" />
                        ) : (
                          <X className="h-5 w-5 text-gray-500 mr-2 flex-shrink-0 mt-0.5" />
                        )}
                        <span className={feature.included ? "text-gray-300" : "text-gray-500"}>{feature.text}</span>
                      </li>
                    ))}
                  </ul>

                  <Button
                    asChild
                    className={cn(
                      "w-full",
                      plan.popular
                        ? "bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white"
                        : plan.name === "Free"
                          ? "bg-white text-gray-900 hover:bg-gray-100"
                          : "bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white",
                    )}
                  >
                    <Link href={plan.ctaLink}>{plan.cta}</Link>
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
