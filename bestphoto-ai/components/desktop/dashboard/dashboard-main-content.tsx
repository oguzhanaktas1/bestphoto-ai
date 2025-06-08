"use client"

import { Camera, Upload, ImageIcon, Star, BarChart3, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import Link from "next/link"

export function DashboardMainContent() {
  const quickActions = [
    {
      title: "Upload New Photos",
      description: "Add photos to your collection",
      icon: Upload,
      href: "/desktop/dashboard/portraits",
      color: "bg-blue-500",
    },
    {
      title: "View All Photos",
      description: "Browse your photo library",
      icon: ImageIcon,
      href: "/desktop/dashboard/my-photos",
      color: "bg-green-500",
    },
    {
      title: "Analytics Dashboard",
      description: "View detailed insights",
      icon: BarChart3,
      href: "/desktop/dashboard/analytics",
      color: "bg-purple-500",
    },
    {
      title: "AI Photo Selection",
      description: "Let AI pick your best shots",
      icon: Star,
      href: "/desktop/dashboard/portraits",
      color: "bg-orange-500",
    },
  ]

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
                <BreadcrumbPage>Overview</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>

      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        {/* Welcome Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Camera className="h-5 w-5" />
              Welcome to BestPhoto AI
            </CardTitle>
            <CardDescription>Your AI-powered photo management solution</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              Upload your photos and let our AI select the best ones for you. Get started with the quick actions below.
            </p>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {quickActions.map((action, index) => (
            <Link href={action.href} key={index}>
              <Card className="cursor-pointer hover:shadow-md transition-shadow h-full">
                <CardHeader className="pb-3">
                  <div className={`w-10 h-10 rounded-lg ${action.color} flex items-center justify-center mb-2`}>
                    <action.icon className="h-5 w-5 text-white" />
                  </div>
                  <CardTitle className="text-sm">{action.title}</CardTitle>
                  <CardDescription className="text-xs">{action.description}</CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <Button size="sm" variant="ghost" className="w-full justify-between p-0 h-auto">
                    Get Started
                    <ArrowRight className="h-3 w-3" />
                  </Button>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {/* Category Overview */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Photo Categories</CardTitle>
            <CardDescription>Browse your photos by category</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex justify-center w-full">
              <div
                className="grid gap-4 w-full"
                style={{
                  gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
                  maxWidth: '900px',
                  margin: '0 auto',
                }}
              >
                {[
                  { name: "Portrait", icon: "👤", href: "/desktop/dashboard/portraits" },
                  { name: "Landscape", icon: "🏞️", href: "/desktop/dashboard/landscapes" },
                  { name: "Animals", icon: "🐾", href: "/desktop/dashboard/animals" },
                  
                ].map((category) => (
                  <Link href={category.href} key={category.name}>
                    <div className="text-center p-4 rounded-lg border hover:border-primary hover:shadow-sm cursor-pointer transition-all">
                      <div className="text-3xl mb-2">{category.icon}</div>
                      <div className="text-sm font-medium">{category.name}</div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Getting Started */}
        <Card>
          <CardHeader>
            <CardTitle>Getting Started</CardTitle>
            <CardDescription>Follow these steps to make the most of BestPhoto AI</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex gap-4 items-start">
                <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold">
                  1
                </div>
                <div>
                  <h3 className="font-medium">Upload Your Photos</h3>
                  <p className="text-sm text-muted-foreground">
                    Start by uploading your photos to any category. You can upload multiple photos at once.
                  </p>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <div className="w-8 h-8 rounded-full bg-green-100 text-green-700 flex items-center justify-center font-bold">
                  2
                </div>
                <div>
                  <h3 className="font-medium">Let AI Select the Best</h3>
                  <p className="text-sm text-muted-foreground">
                    Our AI will analyze your photos and select the best ones based on quality, composition, and more.
                  </p>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <div className="w-8 h-8 rounded-full bg-purple-100 text-purple-700 flex items-center justify-center font-bold">
                  3
                </div>
                <div>
                  <h3 className="font-medium">Review and Organize</h3>
                  <p className="text-sm text-muted-foreground">
                    Review the AI's selections, make any adjustments, and organize your photo library.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  )
}
