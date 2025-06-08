"use client"

import { useState } from "react"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Upload,
  Users,
  LandmarkIcon as Landscape,
  Dog,
  Building,
  Flower,
  Car,
  Utensils,
  Baby,
  Heart,
  Plane,
  Gamepad2,
  Music,
  Briefcase,
  GraduationCap,
  Filter,
  Grid3X3,
  List,
  SortAsc,
  Star,
  Zap,
} from "lucide-react"
import { CategoryUploadArea } from "@/components/category/category-upload-area"
import { CategoryPhotoGrid } from "@/components/category/category-photo-grid"
import { CategorySelectionTools } from "@/components/category/category-selection-tools"

const categoryConfig = {
  portraits: {
    name: "Portrait Photos",
    icon: Users,
    color: "bg-blue-500",
    description: "Professional headshots, selfies, and people photography",
    tips: [
      "Focus on facial expressions and eye contact",
      "Ensure good lighting on the subject's face",
      "Check for sharp focus on the eyes",
      "Consider background and composition",
    ],
    aiFeatures: [
      "Facial expression analysis",
      "Eye contact detection",
      "Skin tone optimization",
      "Background blur assessment",
    ],
  },
  landscapes: {
    name: "Landscape Photos",
    icon: Landscape,
    color: "bg-green-500",
    description: "Nature scenes, mountains, beaches, and outdoor photography",
    tips: [
      "Look for interesting foreground elements",
      "Check horizon line positioning",
      "Ensure proper exposure for sky and land",
      "Consider golden hour lighting",
    ],
    aiFeatures: [
      "Horizon line detection",
      "Color saturation analysis",
      "Composition rule evaluation",
      "Dynamic range assessment",
    ],
  },
  animals: {
    name: "Animal Photos",
    icon: Dog,
    color: "bg-orange-500",
    description: "Pets, wildlife, and animal photography",
    tips: [
      "Capture animals in natural poses",
      "Focus on the eyes for connection",
      "Use fast shutter speeds for movement",
      "Consider the animal's environment",
    ],
    aiFeatures: [
      "Animal pose recognition",
      "Eye sharpness detection",
      "Motion blur analysis",
      "Natural behavior assessment",
    ],
  },
}

interface DashboardCategoryLayoutProps {
  category: string
}

export function DashboardCategoryLayout({ category }: DashboardCategoryLayoutProps) {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [showSelectionTools, setShowSelectionTools] = useState(false)

  const config = categoryConfig[category as keyof typeof categoryConfig]

  if (!config) {
    return <div>Category not found</div>
  }

  const IconComponent = config.icon

  return (
    <>
      <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
        <div className="flex items-center gap-2 px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="/desktop/dashboard">Dashboard</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage>{config.name}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>

      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        {/* Category Header */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className={`p-3 rounded-lg ${config.color} text-white`}>
                  <IconComponent className="h-8 w-8" />
                </div>
                <div>
                  <CardTitle className="text-2xl">{config.name}</CardTitle>
                  <CardDescription className="text-base">{config.description}</CardDescription>
                </div>
              </div>
            </div>
          </CardHeader>
        </Card>

        {/* Upload Area */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Upload className="h-5 w-5" />
              Upload {config.name}
            </CardTitle>
            <CardDescription>
              Upload your {config.name.toLowerCase()} and let our AI select the best ones for you
            </CardDescription>
          </CardHeader>
          <CardContent>
            <CategoryUploadArea category={category} config={config} />
          </CardContent>
        </Card>

        {/* AI Tips and Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Photography Tips</CardTitle>
              <CardDescription>Best practices for {config.name.toLowerCase()}</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {config.tips.map((tip, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <Star className="h-4 w-4 text-yellow-500 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">{tip}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Zap className="h-5 w-5 text-cyan-500" />
                AI Features
              </CardTitle>
              <CardDescription>How our AI analyzes your {config.name.toLowerCase()}</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {config.aiFeatures.map((feature, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <Zap className="h-4 w-4 text-cyan-500 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  )
}
