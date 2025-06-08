"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Check, ChevronLeft, ChevronRight, ThumbsUp } from "lucide-react"
import { cn } from "@/lib/utils"


const exampleSets = [
  {
    id: 1,
    category: "Portraits",
    title: "Professional Headshots",
    description:
      "Multiple headshots taken during a professional photoshoot. The AI selected the best image based on facial expression, eye contact, and overall composition.",
    images: [
      {
        src: "/placeholder.svg?height=400&width=300",
        quality: 87,
        selected: false,
        notes: "Good expression but slightly out of focus",
      },
      {
        src: "/placeholder.svg?height=400&width=300",
        quality: 65,
        selected: false,
        notes: "Eyes closed, not ideal for a headshot",
      },
      {
        src: "/placeholder.svg?height=400&width=300",
        quality: 92,
        selected: true,
        notes: "Perfect expression, sharp focus, ideal lighting",
      },
      {
        src: "/placeholder.svg?height=400&width=300",
        quality: 78,
        selected: false,
        notes: "Good quality but awkward expression",
      },
    ],
  },
  {
    id: 2,
    category: "Landscapes",
    title: "Mountain Sunset",
    description:
      "A series of landscape photos captured during sunset in the mountains. The AI selected the image with the best lighting, color balance, and composition.",
    images: [
      {
        src: "/placeholder.svg?height=400&width=600",
        quality: 82,
        selected: false,
        notes: "Good composition but underexposed",
      },
      {
        src: "/placeholder.svg?height=400&width=600",
        quality: 94,
        selected: true,
        notes: "Perfect exposure, vibrant colors, balanced composition",
      },
      {
        src: "/placeholder.svg?height=400&width=600",
        quality: 76,
        selected: false,
        notes: "Overexposed sky, loss of detail",
      },
    ],
  },
  {
    id: 3,
    category: "Food",
    title: "Gourmet Dish",
    description:
      "Multiple shots of a gourmet dish for a restaurant menu. The AI selected the image with the most appetizing presentation and best lighting.",
    images: [
      {
        src: "/placeholder.svg?height=400&width=400",
        quality: 91,
        selected: true,
        notes: "Perfect lighting, appetizing colors, sharp details",
      },
      {
        src: "/placeholder.svg?height=400&width=400",
        quality: 84,
        selected: false,
        notes: "Slightly off-center composition",
      },
      {
        src: "/placeholder.svg?height=400&width=400",
        quality: 79,
        selected: false,
        notes: "Shadows obscure some details",
      },
      {
        src: "/placeholder.svg?height=400&width=400",
        quality: 72,
        selected: false,
        notes: "Poor white balance, food appears less appetizing",
      },
    ],
  },
]

export function ExamplesShowcase() {
  const [currentExample, setCurrentExample] = useState(0)
  const [showAllPhotos, setShowAllPhotos] = useState(false)

  const nextExample = () => {
    setCurrentExample((prev) => (prev + 1) % exampleSets.length)
    setShowAllPhotos(false)
  }

  const prevExample = () => {
    setCurrentExample((prev) => (prev - 1 + exampleSets.length) % exampleSets.length)
    setShowAllPhotos(false)
  }

  const toggleShowAll = () => {
    setShowAllPhotos(!showAllPhotos)
  }

  const example = exampleSets[currentExample]
  const bestPhoto = example.images.find((img) => img.selected)

  return (
    <section className="py-12 px-4">
      <div className="container mx-auto">
        <div className="max-w-6xl mx-auto">
          {/* Navigation controls */}
          <div className="flex items-center justify-between mb-8">
            <Button
              variant="outline"
              size="icon"
              className="border-cyan-500 text-cyan-400 hover:bg-cyan-950"
              onClick={prevExample}
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>

            <div className="text-center">
              <span className="bg-cyan-500/20 text-cyan-400 text-xs px-3 py-1 rounded-full">{example.category}</span>
              <h2 className="text-2xl md:text-3xl font-bold text-white mt-2">{example.title}</h2>
            </div>

            <Button
              variant="outline"
              size="icon"
              className="border-cyan-500 text-cyan-400 hover:bg-cyan-950"
              onClick={nextExample}
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>

          {/* Example description */}
          <p className="text-gray-300 text-center mb-8 max-w-3xl mx-auto">{example.description}</p>

          {/* Photo showcase */}
          <div className="bg-black/40 backdrop-blur-sm rounded-xl border border-white/10 p-6">
            {!showAllPhotos ? (
              <div className="flex flex-col md:flex-row gap-8 items-center">
                {/* Best photo */}
                {bestPhoto && (
                  <div className="w-full md:w-1/2">
                    <div className="relative rounded-lg overflow-hidden border-2 border-cyan-500">
                      <img
                        src={bestPhoto.src || "/placeholder.svg"}
                        alt="Best selected photo"
                        className="w-full object-cover"
                        style={{ height: "400px" }}
                      />
                      <div className="absolute top-3 right-3 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full flex items-center">
                        <Check size={12} className="mr-1" />
                        BEST PHOTO
                      </div>
                    </div>
                  </div>
                )}

                {/* Analysis */}
                <div className="w-full md:w-1/2 space-y-6">
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">Why This Photo Was Selected</h3>
                    <ul className="text-gray-300 space-y-2">
                      <li className="flex items-start">
                        <ThumbsUp className="h-5 w-5 text-cyan-400 mr-2 flex-shrink-0 mt-0.5" />
                        <span>
                          <strong className="text-white">Quality Score: {bestPhoto?.quality}%</strong> - Highest overall
                          quality among similar photos
                        </span>
                      </li>
                      <li className="flex items-start">
                        <ThumbsUp className="h-5 w-5 text-cyan-400 mr-2 flex-shrink-0 mt-0.5" />
                        <span>
                          <strong className="text-white">Technical Excellence</strong> - Perfect focus, ideal exposure,
                          and balanced composition
                        </span>
                      </li>
                      <li className="flex items-start">
                        <ThumbsUp className="h-5 w-5 text-cyan-400 mr-2 flex-shrink-0 mt-0.5" />
                        <span>
                          <strong className="text-white">Subject Presentation</strong> - {bestPhoto?.notes}
                        </span>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">Similar Photos</h3>
                    <div className="grid grid-cols-3 gap-2">
                      {example.images
                        .filter((img) => !img.selected)
                        .slice(0, 3)
                        .map((image, idx) => (
                          <div
                            key={idx}
                            className="relative rounded-lg overflow-hidden opacity-60 hover:opacity-100 transition-opacity"
                          >
                            <img
                              src={image.src || "/placeholder.svg"}
                              alt={`Similar photo ${idx + 1}`}
                              className="w-full h-24 object-cover"
                            />
                            <div className="absolute bottom-0 left-0 right-0 bg-black/70 text-xs text-gray-300 p-1">
                              {image.quality}%
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>

                  <Button
                    onClick={toggleShowAll}
                    variant="outline"
                    className="border-cyan-500 text-cyan-400 hover:bg-cyan-950 w-full"
                  >
                    Compare All Photos
                  </Button>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-semibold text-white">All Similar Photos</h3>
                  <Button
                    onClick={toggleShowAll}
                    variant="outline"
                    className="border-cyan-500 text-cyan-400 hover:bg-cyan-950"
                  >
                    Back to Best Photo
                  </Button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {example.images.map((image, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: idx * 0.1 }}
                      className={cn(
                        "relative rounded-lg overflow-hidden",
                        image.selected && "border-2 border-cyan-500",
                      )}
                    >
                      <img
                        src={image.src || "/placeholder.svg"}
                        alt={`Photo ${idx + 1}`}
                        className="w-full h-64 object-cover"
                      />
                      <div
                        className={cn(
                          "absolute bottom-0 left-0 right-0 p-3",
                          image.selected
                            ? "bg-gradient-to-t from-cyan-900/90 to-transparent"
                            : "bg-gradient-to-t from-black/80 to-transparent",
                        )}
                      >
                        <div className="flex justify-between items-center mb-1">
                          <span
                            className={cn(
                              "text-sm font-medium",
                              image.quality > 90
                                ? "text-green-400"
                                : image.quality > 80
                                  ? "text-yellow-400"
                                  : "text-red-400",
                            )}
                          >
                            Quality: {image.quality}%
                          </span>
                          {image.selected && (
                            <span className="bg-green-500 text-white text-xs px-2 py-0.5 rounded-full flex items-center">
                              <Check size={10} className="mr-1" />
                              BEST
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-gray-300">{image.notes}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Example navigation dots */}
          <div className="flex justify-center mt-8 space-x-2">
            {exampleSets.map((_, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setCurrentExample(idx)
                  setShowAllPhotos(false)
                }}
                className={cn(
                  "w-3 h-3 rounded-full",
                  currentExample === idx ? "bg-cyan-500" : "bg-gray-600 hover:bg-gray-500",
                )}
                aria-label={`Go to example ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
