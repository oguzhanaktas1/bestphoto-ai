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
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import {
  Upload,
  ImageIcon,
  Zap,
  TrendingUp,
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
  Plus,
  Eye,
} from "lucide-react"
import { PhotoUploadArea } from "@/components/photo-upload-area"
import { PhotoSelectionTools } from "@/components/photo-selection-tools"

const categories = [
  { name: "Portrait Photos", icon: Users, count: 245, color: "bg-blue-500" },
  { name: "Landscape Photos", icon: Landscape, count: 189, color: "bg-green-500" },
  { name: "Animal Photos", icon: Dog, count: 156, color: "bg-orange-500" },
  { name: "Architecture", icon: Building, count: 98, color: "bg-purple-500" },
  { name: "Nature & Plants", icon: Flower, count: 134, color: "bg-pink-500" },
  { name: "Vehicles", icon: Car, count: 67, color: "bg-red-500" },
  { name: "Food & Drinks", icon: Utensils, count: 89, color: "bg-yellow-500" },
  { name: "Family & Kids", icon: Baby, count: 203, color: "bg-cyan-500" },
  { name: "Events & Celebrations", icon: Heart, count: 145, color: "bg-rose-500" },
  { name: "Travel", icon: Plane, count: 178, color: "bg-indigo-500" },
  { name: "Sports & Recreation", icon: Gamepad2, count: 92, color: "bg-emerald-500" },
  { name: "Music & Arts", icon: Music, count: 76, color: "bg-violet-500" },
  { name: "Business & Work", icon: Briefcase, count: 54, color: "bg-slate-500" },
  { name: "Education", icon: GraduationCap, count: 43, color: "bg-amber-500" },
]

export function DashboardContent() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  return (
    <>
      <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
        <div className="flex items-center gap-2 px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage>Overview</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        {/* Stats Cards */}
        <div className="grid auto-rows-min gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Photos</CardTitle>
              <ImageIcon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2,847</div>
              <p className="text-xs text-muted-foreground">+12% from last month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Best Photos Selected</CardTitle>
              <Zap className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1,234</div>
              <p className="text-xs text-muted-foreground">+8% from last month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Storage Saved</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">15.2 GB</div>
              <p className="text-xs text-muted-foreground">+23% from last month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Credits Remaining</CardTitle>
              <Badge variant="secondary" className="bg-cyan-100 text-cyan-800">
                Pro Plan
              </Badge>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">45</div>
              <Progress value={75} className="mt-2" />
              <p className="text-xs text-muted-foreground mt-1">75% of monthly credits used</p>
            </CardContent>
          </Card>
        </div>

        {/* Upload Area */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Upload className="h-5 w-5" />
              Quick Upload
            </CardTitle>
            <CardDescription>Upload photos to get started with AI-powered selection</CardDescription>
          </CardHeader>
          <CardContent>

            <PhotoUploadArea />
            
          </CardContent>
        </Card>

        {/* Photo Categories */}
        <Card>
          <CardHeader>
            <CardTitle>Photo Categories</CardTitle>
            <CardDescription>Organize your photos by category for better management</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {categories.map((category) => (
                <div
                  key={category.name}
                  className="group relative overflow-hidden rounded-lg border p-4 hover:shadow-md transition-all cursor-pointer"
                  onClick={() => setSelectedCategory(category.name)}
                >
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-lg ${category.color} text-white`}>
                      <category.icon className="h-5 w-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">{category.name}</p>
                      <p className="text-sm text-gray-500">{category.count} photos</p>
                    </div>
                  </div>
                  <div className="mt-3 flex items-center justify-between">
                    <Button
                      size="sm"
                      variant="outline"
                      className="opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Eye className="h-3 w-3 mr-1" />
                      View
                    </Button>
                    <Button size="sm" variant="ghost" className="opacity-0 group-hover:opacity-100 transition-opacity">
                      <Plus className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Selection Tools */}
        {selectedCategory && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>{selectedCategory} - Selection Tools</span>
                <Button variant="outline" size="sm" onClick={() => setSelectedCategory(null)}>
                  Close
                </Button>
              </CardTitle>
              <CardDescription>
                Use AI-powered tools to select the best photos from your {selectedCategory.toLowerCase()}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <PhotoSelectionTools category={selectedCategory} />
            </CardContent>
          </Card>
        )}
      </div>
    </>
  )
}
