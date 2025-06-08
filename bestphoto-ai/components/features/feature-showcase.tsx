"use client"

import { motion } from "framer-motion"
import { Brain, ImagePlus, Zap, HardDrive, Layers, Sparkles, Eye, Trash2 } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

const features = [
  {
    icon: <Brain className="h-10 w-10 text-cyan-400" />,
    title: "AI-Powered Selection",
    description:
      "Our advanced AI analyzes multiple factors to identify your best photos, including focus, exposure, composition, and facial expressions.",
  },
  {
    icon: <Eye className="h-10 w-10 text-cyan-400" />,
    title: "Quality Analysis",
    description:
      "Automatically detects and scores image quality factors like sharpness, lighting, noise levels, and color balance.",
  },
  {
    icon: <HardDrive className="h-10 w-10 text-cyan-400" />,
    title: "Storage Optimization",
    description: "Save up to 80% of storage space by keeping only the best photos and removing similar duplicates.",
  },
  {
    icon: <Layers className="h-10 w-10 text-cyan-400" />,
    title: "Batch Processing",
    description: "Process hundreds of photos at once, saving you hours of manual selection and organization time.",
  },
  {
    icon: <Trash2 className="h-10 w-10 text-cyan-400" />,
    title: "Smart Duplicate Detection",
    description:
      "Identifies similar photos and groups them together, making it easy to select the best and remove the rest.",
  },
  {
    icon: <Sparkles className="h-10 w-10 text-cyan-400" />,
    title: "One-Click Enhancement",
    description:
      "Automatically enhance your selected photos with intelligent adjustments to brightness, contrast, and color.",
  },
  {
    icon: <Zap className="h-10 w-10 text-cyan-400" />,
    title: "Fast Processing",
    description:
      "Our optimized algorithms process your photos quickly, giving you results in seconds rather than minutes.",
  },
  {
    icon: <ImagePlus className="h-10 w-10 text-cyan-400" />,
    title: "Multi-Platform Support",
    description:
      "Works seamlessly across desktop, web, and mobile devices, with cloud synchronization for your convenience.",
  },
]

export function FeatureShowcase() {
  return (
    <section className="py-20 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Comprehensive Photo Management</h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            BestPhoto AI offers a complete suite of tools to help you manage your photo library efficiently and
            effectively.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="bg-black/30 backdrop-blur-sm border border-white/10 h-full">
                <CardContent className="p-6">
                  <div className="bg-gradient-to-br from-cyan-500/20 to-blue-500/20 p-3 rounded-lg inline-block mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
                  <p className="text-gray-300">{feature.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
