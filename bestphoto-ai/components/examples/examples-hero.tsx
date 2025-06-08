"use client"

import { motion } from "framer-motion"
import { ImageIcon } from "lucide-react"

export function ExamplesHero() {
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
              <ImageIcon className="h-8 w-8 text-cyan-400" />
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold text-white mb-6"
          >
            See{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">
              BestPhoto AI
            </span>{" "}
            in Action
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-gray-300 text-lg mb-8"
          >
            Browse through real-world examples of how our AI selects the best photos from similar batches across
            different categories and scenarios.
          </motion.p>
        </div>
      </div>
    </section>
  )
}
