"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { Users, Mountain, Building, Utensils, Cake, Dog, Flower, Camera } from "lucide-react"

const categories = [
  { name: "All Examples", icon: <Camera className="h-5 w-5" /> },
  { name: "Portraits", icon: <Users className="h-5 w-5" /> },
  { name: "Landscapes", icon: <Mountain className="h-5 w-5" /> },
  { name: "Architecture", icon: <Building className="h-5 w-5" /> },
  { name: "Food", icon: <Utensils className="h-5 w-5" /> },
  { name: "Events", icon: <Cake className="h-5 w-5" /> },
  { name: "Pets", icon: <Dog className="h-5 w-5" /> },
  { name: "Nature", icon: <Flower className="h-5 w-5" /> },
]

export function ExamplesCategories() {
  const [activeCategory, setActiveCategory] = useState("All Examples")

  return (
    <section className="py-8 px-4">
      <div className="container mx-auto">
        <div className="flex justify-center mb-8">
          <div className="bg-black/30 backdrop-blur-sm rounded-full p-2 overflow-x-auto max-w-full">
            <div className="flex space-x-2 min-w-max">
              {categories.map((category) => (
                <button
                  key={category.name}
                  onClick={() => setActiveCategory(category.name)}
                  className={cn(
                    "flex items-center px-4 py-2 rounded-full transition-all",
                    activeCategory === category.name
                      ? "bg-cyan-600 text-white"
                      : "text-gray-300 hover:bg-white/10 hover:text-white",
                  )}
                >
                  <span className="mr-2">{category.icon}</span>
                  <span>{category.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
