"use client"

import { motion } from "framer-motion"
import { Upload, Cpu, CheckCircle, Download, ArrowRight } from "lucide-react"

const steps = [
  {
    icon: <Upload className="h-8 w-8 text-cyan-400" />,
    title: "Upload Your Photos",
    description:
      "Upload a batch of similar photos from your device. Our system accepts all common image formats including JPG, PNG, HEIC, and RAW files.",
  },
  {
    icon: <Cpu className="h-8 w-8 text-cyan-400" />,
    title: "AI Analysis",
    description:
      "Our advanced AI analyzes each photo for quality factors including focus, exposure, composition, facial expressions, and more.",
  },
  {
    icon: <CheckCircle className="h-8 w-8 text-cyan-400" />,
    title: "Smart Selection",
    description:
      "The AI identifies and selects the best photos from your batch based on comprehensive quality scoring and intelligent comparison.",
  },
  {
    icon: <Download className="h-8 w-8 text-cyan-400" />,
    title: "Save & Organize",
    description:
      "Download your selected best photos and optionally remove the rest to free up storage space. Your photos are also automatically organized.",
  },
]

export function ProcessSteps() {
  return (
    <section className="py-16 px-4">
      <div className="container mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-5xl font-bold text-white mb-6"
          >
            How{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">
              BestPhoto AI
            </span>{" "}
            Works
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-gray-300 text-lg"
          >
            Our intelligent photo selection process is simple, fast, and effective. See how we help you find your best
            photos in just a few steps.
          </motion.p>
        </div>

        <div className="max-w-5xl mx-auto">
          <div className="relative">
            {/* Connecting line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-cyan-500/80 to-blue-600/80 hidden md:block" />

            {/* Steps */}
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="relative mb-16 last:mb-0"
              >
                <div className="flex flex-col md:flex-row items-center">
                  {/* Step number and icon */}
                  <div className="flex-shrink-0 mb-6 md:mb-0">
                    <div className="relative">
                      <div className="w-20 h-20 rounded-full bg-gradient-to-br from-cyan-500/20 to-blue-600/20 flex items-center justify-center border border-cyan-500/50 z-10 relative">
                        {step.icon}
                      </div>
                      <div className="absolute -inset-2 bg-cyan-500/10 rounded-full blur-md" />
                      <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-cyan-600 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
                        {index + 1}
                      </div>
                    </div>
                  </div>

                  {/* Arrow for mobile */}
                  {index < steps.length - 1 && (
                    <div className="my-4 md:hidden">
                      <ArrowRight className="h-6 w-6 text-cyan-500/50" />
                    </div>
                  )}

                  {/* Content - alternating sides */}
                  <div
                    className={`md:w-1/2 md:px-10 ${
                      index % 2 === 0 ? "md:ml-auto" : "md:mr-auto md:order-first text-right"
                    }`}
                  >
                    <div className="bg-black/30 backdrop-blur-sm p-6 rounded-xl border border-white/10">
                      <h3 className="text-xl font-semibold text-white mb-2">{step.title}</h3>
                      <p className="text-gray-300">{step.description}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
