"use client"

import { motion } from "framer-motion"
import { Camera, CheckCircle } from "lucide-react"

export function FeatureHero() {
  return (
    <section className="py-16 px-4">
      <div className="container mx-auto">
        <div className="text-center max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-block mb-4"
          >
            <div className="bg-cyan-500/20 p-3 rounded-full">
              <Camera className="h-8 w-8 text-cyan-400" />
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold text-white mb-6"
          >
            Powerful Features of{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">
              BestPhoto AI
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-gray-300 text-lg mb-8"
          >
            Discover how our AI-powered technology helps you select the best photos, save storage space, and organize
            your photo library effortlessly.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-wrap justify-center gap-3"
          >
            {["Smart Selection", "Quality Analysis", "Storage Optimization", "Batch Processing"].map(
              (feature, index) => (
                <div key={index} className="flex items-center bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                  <CheckCircle className="h-4 w-4 text-cyan-400 mr-2" />
                  <span className="text-white text-sm">{feature}</span>
                </div>
              ),
            )}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
