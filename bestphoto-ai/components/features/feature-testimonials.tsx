"use client"

import { motion } from "framer-motion"
import { Star } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Professional Photographer",
    avatar: "/placeholder.svg?height=40&width=40",
    content:
      "BestPhoto AI has revolutionized my workflow. I used to spend hours selecting the best shots from a photoshoot, but now the AI does it for me with incredible accuracy.",
    rating: 5,
  },
  {
    name: "Michael Chen",
    role: "Travel Blogger",
    avatar: "/placeholder.svg?height=40&width=40",
    content:
      "As someone who takes hundreds of photos during my trips, this tool is a lifesaver. It helps me quickly identify the best shots and frees up gigabytes of storage.",
    rating: 5,
  },
  {
    name: "Emily Rodriguez",
    role: "Parent & Hobbyist",
    avatar: "/placeholder.svg?height=40&width=40",
    content:
      "With kids who don't sit still, I take dozens of similar photos hoping for a good one. BestPhoto AI picks the perfect shots where everyone is smiling and looking at the camera!",
    rating: 4,
  },
]

export function FeatureTestimonials() {
  return (
    <section className="py-20 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">What Our Users Say</h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Join thousands of satisfied users who have transformed their photo management experience.
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
                  <div className="flex items-center mb-4">
                    <Avatar className="h-10 w-10 mr-3">
                      <AvatarImage src={testimonial.avatar || "/placeholder.svg"} alt={testimonial.name} />
                      <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h4 className="text-white font-medium">{testimonial.name}</h4>
                      <p className="text-gray-400 text-sm">{testimonial.role}</p>
                    </div>
                  </div>

                  <div className="flex mb-3">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${i < testimonial.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-500"}`}
                      />
                    ))}
                  </div>

                  <p className="text-gray-300">{testimonial.content}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
