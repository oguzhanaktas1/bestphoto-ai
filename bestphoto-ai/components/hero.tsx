"use client"

import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { Info, Sparkles } from "lucide-react"
import { FloatingPhotos } from "@/components/floating-photos"
import { CameraAnimation } from "@/components/camera-animation"
import Link from "next/link"

type HeroProps = {
  seeHowItWorksLink: string;
  seeExamplesLink: string;
  seeHowItWorksText: string;
  seeExamplesText: string;
  seeHowItWorksIcon: React.ReactNode;
  seeExamplesIcon: React.ReactNode;
};

export default function Hero({
  seeHowItWorksLink = "/how-it-works#process-demo",
  seeExamplesLink = "/examples",
  seeHowItWorksText = "See How It Works",
  seeExamplesText = "See Examples",
  seeHowItWorksIcon = <Info className="mr-2 h-5 w-5" />,
  seeExamplesIcon = <Sparkles className="mr-2 h-5 w-5" />
}: HeroProps) {
  return (
    <div className="relative min-h-[calc(100vh-76px)] flex items-center">
      {/* Floating photos background */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <FloatingPhotos count={6} />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6">
              Find Your
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">
                {" "}
                Best Photos
              </span>
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-gray-400 text-xl mb-8 max-w-2xl mx-auto"
          >
            Upload your similar photos and let our AI select the best ones, delete duplicates, and save your storage
            space and time.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Button size="lg" className="bg-cyan-600 hover:bg-cyan-700 text-white px-8" asChild>
              <Link href={seeHowItWorksLink}>
                {seeHowItWorksIcon}
                {seeHowItWorksText}
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="text-white border-cyan-500 hover:bg-cyan-500/20" asChild>
              <Link href={seeExamplesLink}>
                {seeExamplesIcon}
                {seeExamplesText}
              </Link>
            </Button>
          </motion.div>
        </div>
      </div>

      {/* Animated camera */}
      <div className="absolute bottom-0 right-0 w-96 h-96">
        <CameraAnimation />
      </div>
    </div>
  );
}
