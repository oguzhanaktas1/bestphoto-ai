"use client"

import { motion } from "framer-motion"
import { Check, X } from "lucide-react"
import { cn } from "@/lib/utils"

const comparisonData = [
  {
    feature: "AI-Powered Selection",
    bestphoto: true,
    manual: false,
    basic: false,
  },
  {
    feature: "Quality Analysis",
    bestphoto: true,
    manual: false,
    basic: true,
  },
  {
    feature: "Batch Processing",
    bestphoto: true,
    manual: false,
    basic: true,
  },
  {
    feature: "Smart Duplicate Detection",
    bestphoto: true,
    manual: false,
    basic: false,
  },
  {
    feature: "Storage Optimization",
    bestphoto: true,
    manual: true,
    basic: false,
  },
  {
    feature: "One-Click Enhancement",
    bestphoto: true,
    manual: false,
    basic: true,
  },
  {
    feature: "Processing Speed",
    bestphoto: "Fast",
    manual: "Slow",
    basic: "Medium",
  },
  {
    feature: "Time Saved",
    bestphoto: "80%+",
    manual: "0%",
    basic: "30%",
  },
]

export function FeatureComparison() {
  return (
    <section className="py-20 px-4 bg-black/30">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Why Choose BestPhoto AI?</h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            See how BestPhoto AI compares to manual selection and basic photo management tools.
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full max-w-4xl mx-auto">
            <thead>
              <tr>
                <th className="p-4 text-left text-gray-300">Feature</th>
                <th className="p-4 text-center bg-gradient-to-r from-cyan-900/40 to-blue-900/40 text-white rounded-t-lg">
                  BestPhoto AI
                </th>
                <th className="p-4 text-center text-gray-300">Manual Selection</th>
                <th className="p-4 text-center text-gray-300">Basic Photo Tools</th>
              </tr>
            </thead>
            <tbody>
              {comparisonData.map((row, index) => (
                <motion.tr
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  viewport={{ once: true }}
                  className={cn(index % 2 === 0 ? "bg-white/5" : "bg-transparent", "border-b border-white/5")}
                >
                  <td className="p-4 text-white">{row.feature}</td>
                  <td className="p-4 text-center bg-gradient-to-r from-cyan-900/20 to-blue-900/20">
                    {typeof row.bestphoto === "boolean" ? (
                      row.bestphoto ? (
                        <Check className="h-5 w-5 text-cyan-400 mx-auto" />
                      ) : (
                        <X className="h-5 w-5 text-red-400 mx-auto" />
                      )
                    ) : (
                      <span className="text-cyan-400 font-medium">{row.bestphoto}</span>
                    )}
                  </td>
                  <td className="p-4 text-center">
                    {typeof row.manual === "boolean" ? (
                      row.manual ? (
                        <Check className="h-5 w-5 text-green-400 mx-auto" />
                      ) : (
                        <X className="h-5 w-5 text-red-400 mx-auto" />
                      )
                    ) : (
                      <span className="text-gray-300">{row.manual}</span>
                    )}
                  </td>
                  <td className="p-4 text-center">
                    {typeof row.basic === "boolean" ? (
                      row.basic ? (
                        <Check className="h-5 w-5 text-green-400 mx-auto" />
                      ) : (
                        <X className="h-5 w-5 text-red-400 mx-auto" />
                      )
                    ) : (
                      <span className="text-gray-300">{row.basic}</span>
                    )}
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}
