"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Check, ImageIcon, Loader2, Upload } from "lucide-react"

export function ProcessDemo() {
  const [step, setStep] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const [progress, setProgress] = useState(0)

  const handleNextStep = () => {
    setIsLoading(true)

    // Simulate progress
    let currentProgress = 0
    const interval = setInterval(() => {
      currentProgress += 5
      setProgress(currentProgress)

      if (currentProgress >= 100) {
        clearInterval(interval)
        setIsLoading(false)
        setStep((prev) => prev + 1)
      }
    }, 100)
  }

  const resetDemo = () => {
    setStep(0)
    setProgress(0)
  }

  return (
    <section id="process-demo" className="py-20 px-4 bg-black/30">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">See the Process in Action</h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Follow along with our interactive demo to see how BestPhoto AI selects your best photos.
          </p>
        </div>

        <div className="max-w-4xl mx-auto bg-black/40 backdrop-blur-sm rounded-xl border border-white/10 overflow-hidden">
          {/* Demo header */}
          <div className="bg-gradient-to-r from-cyan-900/40 to-blue-900/40 p-4 flex items-center justify-between">
            <div className="flex items-center">
              <div className="bg-cyan-500/20 p-2 rounded-full mr-3">
                <ImageIcon className="h-5 w-5 text-cyan-400" />
              </div>
              <h3 className="text-white font-medium">BestPhoto AI Demo</h3>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <div className="w-3 h-3 rounded-full bg-yellow-500" />
              <div className="w-3 h-3 rounded-full bg-green-500" />
            </div>
          </div>

          {/* Demo content */}
          <div className="p-6">
            {/* Step indicators */}
            <div className="flex justify-between mb-8">
              {["Upload", "Analysis", "Selection", "Results"].map((label, idx) => (
                <div key={idx} className="flex flex-col items-center">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      step > idx
                        ? "bg-cyan-500 text-white"
                        : step === idx
                          ? "bg-cyan-500/20 border border-cyan-500 text-cyan-400"
                          : "bg-gray-700/30 text-gray-400"
                    }`}
                  >
                    {step > idx ? <Check className="h-4 w-4" /> : idx + 1}
                  </div>
                  <span className={`text-xs mt-2 ${step >= idx ? "text-cyan-400" : "text-gray-400"}`}>{label}</span>
                </div>
              ))}
            </div>

            {/* Step content */}
            <div className="min-h-[300px] flex items-center justify-center">
              {step === 0 && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center">
                  <div className="bg-cyan-500/10 p-6 rounded-xl border border-dashed border-cyan-500/30 mb-6">
                    <Upload className="h-12 w-12 text-cyan-400 mx-auto mb-4" />
                    <p className="text-gray-300">Drag and drop your photos here or click to browse</p>
                  </div>
                  <Button onClick={handleNextStep} className="bg-cyan-600 hover:bg-cyan-700 text-white">
                    Upload Sample Photos
                  </Button>
                </motion.div>
              )}

              {step === 1 && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center w-full">
                  <div className="mb-6">
                    <h4 className="text-white text-lg mb-2">Analyzing Photos</h4>
                    <p className="text-gray-300 mb-4">Our AI is examining quality factors in your photos...</p>

                    {isLoading ? (
                      <div className="space-y-4 w-full">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-300">Analyzing focus quality</span>
                          <span className="text-sm text-cyan-400">{progress}%</span>
                        </div>
                        <Progress value={progress} className="h-2" />
                        <div className="flex justify-center">
                          <Loader2 className="h-6 w-6 text-cyan-400 animate-spin" />
                        </div>
                      </div>
                    ) : (
                      <Button onClick={handleNextStep} className="bg-cyan-600 hover:bg-cyan-700 text-white">
                        Continue to Selection
                      </Button>
                    )}
                  </div>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center w-full">
                  <div className="mb-6">
                    <h4 className="text-white text-lg mb-2">Selecting Best Photos</h4>
                    <p className="text-gray-300 mb-4">Comparing similar images and identifying the best ones...</p>

                    {isLoading ? (
                      <div className="space-y-4 w-full">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-300">Comparing similar photos</span>
                          <span className="text-sm text-cyan-400">{progress}%</span>
                        </div>
                        <Progress value={progress} className="h-2" />
                        <div className="flex justify-center">
                          <Loader2 className="h-6 w-6 text-cyan-400 animate-spin" />
                        </div>
                      </div>
                    ) : (
                      <Button onClick={handleNextStep} className="bg-cyan-600 hover:bg-cyan-700 text-white">
                        View Results
                      </Button>
                    )}
                  </div>
                </motion.div>
              )}

              {step === 3 && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center w-full">
                  <div className="mb-6">
                    <h4 className="text-white text-lg mb-4">Results Ready!</h4>

                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div className="bg-gradient-to-r from-green-500/20 to-cyan-500/20 p-3 rounded-lg border border-green-500/30">
                        <Check className="h-8 w-8 text-green-400 mx-auto mb-2" />
                        <p className="text-white font-medium">3 Best Photos Selected</p>
                      </div>
                      <div className="bg-gradient-to-r from-red-500/20 to-orange-500/20 p-3 rounded-lg border border-red-500/30">
                        <ImageIcon className="h-8 w-8 text-red-400 mx-auto mb-2" />
                        <p className="text-white font-medium">7 Similar Photos Identified</p>
                      </div>
                    </div>

                    <div className="flex justify-center space-x-4">
                      <Button className="bg-cyan-600 hover:bg-cyan-700 text-white">Download Selected Photos</Button>
                      <Button
                        variant="outline"
                        className="border-cyan-500 text-cyan-400 hover:bg-cyan-950"
                        onClick={resetDemo}
                      >
                        Start Over
                      </Button>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
