"use client"

import { motion } from "framer-motion"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"
import { Camera, Star } from "lucide-react"

const testimonials = [
  {
    quote:
      "I was skeptical at first, but after seeing how accurately BestPhoto AI selected the best shots from my wedding photoshoot, I'm completely sold. It saved me hours of decision making!",
    name: "Jessica T.",
    role: "Wedding Client",
    avatar: "/placeholder.svg?height=40&width=40",
    rating: 5,
  },
  {
    quote:
      "As a real estate photographer, I take multiple shots of each room. This AI consistently picks the ones with the best lighting and composition, making my workflow so much faster.",
    name: "Marcus L.",
    role: "Real Estate Photographer",
    avatar: "/placeholder.svg?height=40&width=40",
    rating: 5,
  },
  {
    quote:
      "My food blog requires the most appetizing photos possible. BestPhoto AI has an uncanny ability to select images that make the food look most delicious. It's like having a food styling expert!",
    name: "Priya K.",
    role: "Food Blogger",
    avatar: "/placeholder.svg?height=40&width=40",
    rating: 4,
  },
]

export function ExamplesTestimonials() {
  return (
    <section className="py-20 px-4 bg-black/30">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <div className="inline-block bg-cyan-500/20 p-3 rounded-full mb-4">
            <Camera className="h-6 w-6 text-cyan-400" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Success Stories</h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Hear from real users who have transformed their photo selection process with BestPhoto AI.
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
                  <div className="flex mb-4">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${i < testimonial.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-500"}`}
                      />
                    ))}
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
