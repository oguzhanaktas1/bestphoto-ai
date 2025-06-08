"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Apple, Camera, Download, MonitorDown, ComputerIcon as Windows } from "lucide-react"
import { SparklesCore } from "@/components/sparkles"

export function DownloadApp() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center max-w-3xl mx-auto mb-16">
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
          Download{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">BestPhoto AI</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-gray-300 text-lg mb-8"
        >
          Get the full power of BestPhoto AI on your desktop for faster processing and more features.
        </motion.p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {/* Windows Download */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Card className="bg-black/40 backdrop-blur-sm border border-white/10 h-full relative overflow-hidden">
            <div className="absolute inset-0 z-0">
              <SparklesCore
                id="tsparticles-windows"
                background="transparent"
                minSize={0.6}
                maxSize={1.4}
                particleDensity={40}
                className="h-full w-full"
                particleColor="#3B82F6"
              />
            </div>
            <CardContent className="p-6 relative z-10">
              <div className="flex flex-col items-center text-center">
                <div className="bg-blue-500/20 p-4 rounded-full mb-4">
                  <Windows className="h-10 w-10 text-blue-400" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Windows</h3>
                <p className="text-gray-300 mb-6">For Windows 10 and above</p>
                <div className="space-y-4 w-full">
                  <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                    <Download className="mr-2 h-4 w-4" />
                    Download for Windows
                  </Button>
                  <p className="text-xs text-gray-400">Version 1.2.3 (64-bit) • 45MB</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* macOS Download */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Card className="bg-black/40 backdrop-blur-sm border border-white/10 h-full relative overflow-hidden">
            <div className="absolute inset-0 z-0">
              <SparklesCore
                id="tsparticles-macos"
                background="transparent"
                minSize={0.6}
                maxSize={1.4}
                particleDensity={40}
                className="h-full w-full"
                particleColor="#06B6D4"
              />
            </div>
            <CardContent className="p-6 relative z-10">
              <div className="flex flex-col items-center text-center">
                <div className="bg-cyan-500/20 p-4 rounded-full mb-4">
                  <Apple className="h-10 w-10 text-cyan-400" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">macOS</h3>
                <p className="text-gray-300 mb-6">For macOS 11.0 and above</p>
                <div className="space-y-4 w-full">
                  <Button className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white">
                    <Download className="mr-2 h-4 w-4" />
                    Download for Mac
                  </Button>
                  <p className="text-xs text-gray-400">Version 1.2.3 (Universal) • 52MB</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* FAQ Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.7 }}
        className="mt-16 text-center"
      >
        <h3 className="text-2xl font-bold text-white mb-4">Need Help?</h3>
        <p className="text-gray-300 mb-6">
          Check our{" "}
          <a href="#" className="text-cyan-400 hover:underline">
            installation guide
          </a>{" "}
          or{" "}
          <a href="#" className="text-cyan-400 hover:underline">
            contact support
          </a>{" "}
          if you have any issues.
        </p>
        <Button variant="outline" className="border-cyan-500 text-cyan-400 hover:bg-cyan-950">
          <MonitorDown className="mr-2 h-4 w-4" />
          View Installation Instructions
        </Button>
      </motion.div>
    </div>
  )
}
