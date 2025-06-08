"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Check, ChevronRight, ImageIcon, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface PhotoProps {
  src: string
  quality?: number
  selected?: boolean
}

const samplePhotos = [
  {
    src: "/placeholder.svg?height=400&width=300",
    quality: 87,
    selected: false,
  },
  {
    src: "/placeholder.svg?height=400&width=300",
    quality: 65,
    selected: false,
  },
  {
    src: "/placeholder.svg?height=400&width=300",
    quality: 92,
    selected: true,
  },
  {
    src: "/placeholder.svg?height=400&width=300",
    quality: 78,
    selected: false,
  },
]

export default function BeforeAfterComparison() {
  const [isAnimating, setIsAnimating] = useState(false)
  const [showResult, setShowResult] = useState(false)
  const bestPhoto = samplePhotos.find((photo) => photo.selected)

  const handleDemoClick = () => {
    setIsAnimating(true)
    setTimeout(() => {
      setShowResult(true)
      setIsAnimating(false)
    }, 2000)
  }

  const handleReset = () => {
    setShowResult(false)
  }

  return (
    <section className="py-20 px-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-black/90 to-black/70 z-0"></div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            See{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">
              BestPhoto AI
            </span>{" "}
            in Action
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Our AI analyzes multiple similar photos, identifies the best one based on quality, composition, and subject
            expression, and helps you clean up your storage by removing the rest.
          </p>
        </div>

        <div className="flex flex-row gap-4 items-center justify-center">
          {/* Before Section */}
          <div
            className={cn(
              "bg-black/40 backdrop-blur-sm p-4 rounded-xl border border-white/10 transition-all duration-500 w-full max-w-xs",
              showResult && "opacity-50",
            )}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-white flex items-center">
                <span className="bg-red-500/20 text-red-400 p-1 rounded-md mr-2">
                  <ImageIcon size={14} />
                </span>
                Before: Multiple Similar Photos
              </h3>
              {!showResult && (
                <Button
                  onClick={handleDemoClick}
                  disabled={isAnimating}
                  className="bg-cyan-600 hover:bg-cyan-700 text-white"
                  size="sm"
                >
                  {isAnimating ? "Analyzing..." : "Analyze Photos"}
                </Button>
              )}
            </div>

            <div className="grid grid-cols-2 gap-2">
              {samplePhotos.map((photo, index) => (
                <motion.div
                  key={index}
                  className={cn(
                    "relative rounded-lg overflow-hidden border-2",
                    photo.selected && isAnimating ? "border-cyan-500" : "border-transparent",
                    showResult && !photo.selected && "opacity-40",
                  )}
                  animate={
                    isAnimating && photo.selected
                      ? { scale: [1, 1.05, 1], borderColor: ["transparent", "rgb(6 182 212)", "rgb(6 182 212)"] }
                      : {}
                  }
                  transition={{ duration: 1.5 }}
                >
                  <img
                    src={photo.src || "/placeholder.svg"}
                    alt={`Sample photo ${index + 1}`}
                    className="w-full h-32 object-cover"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-black/70 p-2 text-xs text-gray-300 flex justify-between items-center">
                    <span>Photo {index + 1}</span>
                    <span
                      className={cn(
                        photo.quality > 90 ? "text-green-400" : photo.quality > 80 ? "text-yellow-400" : "text-red-400",
                      )}
                    >
                      {photo.quality}% quality
                    </span>
                  </div>
                  {isAnimating && (
                    <motion.div
                      className="absolute inset-0 bg-black/50 flex items-center justify-center"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.5, duration: 0.5 }}
                    >
                      <motion.div
                        className={cn("p-2 rounded-full", photo.selected ? "bg-cyan-500/20" : "bg-red-500/20")}
                        animate={{ scale: [0, 1] }}
                        transition={{ delay: 0.8, duration: 0.3 }}
                      >
                        {photo.selected ? (
                          <Check className="text-cyan-500" size={24} />
                        ) : (
                          <Trash2 className="text-red-500" size={24} />
                        )}
                      </motion.div>
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>

          {/* Arrow between sections */}
          <div className="flex items-center justify-center mx-2">
            <motion.div
              animate={isAnimating ? { x: [0, 10, 0], opacity: [0.5, 1, 0.5] } : {}}
              transition={{ repeat: 3, duration: 0.6 }}
              className="bg-cyan-500/20 p-2 rounded-full"
            >
              <ChevronRight className="text-cyan-500 w-6 h-6" />
            </motion.div>
          </div>

          {/* After Section */}
          <div
            className={cn(
              "bg-black/40 backdrop-blur-sm p-4 rounded-xl border border-white/10 transition-all duration-500 w-full max-w-xs",
              !showResult && "opacity-50",
            )}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-white flex items-center">
                <span className="bg-green-500/20 text-green-400 p-1 rounded-md mr-2">
                  <ImageIcon size={14} />
                </span>
                After: Best Photo Selected
              </h3>
              {showResult && (
                <Button
                  onClick={handleReset}
                  variant="outline"
                  className="border-cyan-600 text-cyan-400 hover:bg-cyan-950"
                  size="sm"
                >
                  Reset Demo
                </Button>
              )}
            </div>

            <div className="flex justify-center">
              {bestPhoto && (
                <motion.div
                  className="relative rounded-lg overflow-hidden border-2 border-cyan-500 max-w-md"
                  initial={!showResult ? { opacity: 0, scale: 0.9 } : {}}
                  animate={showResult ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.5 }}
                >
                  <img
                    src={bestPhoto.src || "/placeholder.svg"}
                    alt="Best selected photo"
                    className="w-full object-cover"
                    style={{ height: "220px" }}
                  />
                  <div className="absolute top-3 right-3 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full flex items-center">
                    <Check size={12} className="mr-1" />
                    BEST PHOTO
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                    <div className="text-white font-medium mb-1">Why this photo was selected:</div>
                    <ul className="text-xs text-gray-300 list-disc pl-4 space-y-1">
                      <li>Highest quality score (92%)</li>
                      <li>Better composition and framing</li>
                      <li>Subject is in focus and well-lit</li>
                      <li>Natural expression captured</li>
                    </ul>
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </div>

        <div className="mt-12 text-center">
          <div className="bg-gradient-to-r from-cyan-900/30 to-blue-900/30 rounded-lg p-4 inline-block">
            <p className="text-gray-300 text-sm">
              <span className="text-cyan-400 font-semibold">Storage saved:</span> By selecting only the best photo,
              you've saved approximately 75% of storage space.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
