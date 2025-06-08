"use client"

import { motion } from "framer-motion"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"
import { Star } from "lucide-react"

const testimonials = [
  {
    quote:
      "I started with the Free plan to test it out, but quickly upgraded to Pro. The time savings alone are worth 10x the price. I can't imagine sorting through photos manually anymore.",
    name: "David Chen",
    role: "Wedding Photographer",
    avatar: "/placeholder.svg?height=40&width=40",
    plan: "Pro",
  },
  {
    quote:
      "As a professional with thousands of photos to process each month, the Pro Plus plan is a no-brainer. The unlimited processing and advanced organization tools have transformed my workflow.",
    name: "Sarah Johnson",
    role: "Commercial Photographer",
    avatar: "/placeholder.svg?height=40&width=40",
    plan: "Pro Plus",
  },
  {
    quote:
      "The Free plan is perfect for my needs as a hobbyist. I don't take thousands of photos, but when I do, BestPhoto AI helps me find the gems without spending hours comparing shots.",
    name: "Michael Rodriguez",
    role: "Photography Enthusiast",
    avatar: "/placeholder.svg?height=40&width=40",
    plan: "Free",
  },
]

export function PricingTestimonials() {
  return (
    <section className="py-20 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">What Our Customers Say</h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Join thousands of satisfied users who have found the perfect plan for their needs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="bg-black/30 backdrop-blur-sm border border-white/10 h-full">
                <CardContent className="p-6">
                  <div className="mb-4">
                    <div className="flex mb-2">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                      ))}
                    </div>
                    <span className="text-sm bg-gradient-to-r from-cyan-500 to-blue-500 bg-clip-text text-transparent font-medium">
                      {testimonial.plan} Plan User
                    </span>
                  </div>

                  <p className="text-gray-300 mb-6 italic">"{testimonial.quote}"</p>

                  <div className="flex items-center">
                    <Avatar className="h-10 w-10 mr-3">
                      <AvatarImage src={testimonial.avatar || "/placeholder.svg"} alt={testimonial.name} />
                      <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h4 className="text-white font-medium">{testimonial.name}</h4>
                      <p className="text-gray-400 text-sm">{testimonial.role}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
