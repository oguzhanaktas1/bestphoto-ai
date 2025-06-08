"use client"

import {
  Camera,
  ImageIcon,
  LandmarkIcon as Landscape,
  Dog,
  Users,
  Home,
  BarChart3,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavProjects } from "@/components/nav-projects"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarInset,
  SidebarProvider,
  SidebarRail,
} from "@/components/ui/sidebar"
import { NavHeader } from "@/components/nav-header"
import { NavEditPhotos } from "@/components/nav-editphotos"
import { UpscalePhotoContent } from "@/components/contents/upscale-photo-contnet"

// Mevcut navigasyon verilerini buraya dahil ediyoruz (veya merkezi bir yerden import edilebilir)
const data = {
  navMain: [
    {
      title: "Dashboard",
      url: "/desktop/dashboard",
      icon: Home,
      isActive: false,
    },
    {
      title: "My Photos",
      url: "/desktop/dashboard/my-photos",
      icon: ImageIcon,
    },
    {
      title: "Analytics",
      url: "/desktop/dashboard/analytics",
      icon: BarChart3,
    },
  ],
  projects: [
    {
      name: "Portrait Photos",
      url: "/desktop/dashboard/portraits",
      icon: Users,
    },
    {
      name: "Landscape Photos",
      url: "/desktop/dashboard/landscapes",
      icon: Landscape,
    },
    {
      name: "Animal Photos",
      url: "/desktop/dashboard/animals",
      icon: Dog,
    },
  ],
  editPhotos: [
    {
      name: "Upscale Photo",
      url: "/desktop/dashboard/upscale-photo",
      icon: Camera,
      isActive: true, // Bu sayfa aktif olacak
    },
    {
      name: "Remove Background",
      url: "/desktop/dashboard/remove-background",
      icon: Camera,
    },
  ],
}

export default function UpscalePhotoPage() {
  // Navigasyon öğelerinin isActive durumunu güncelleyebiliriz, ancak bu sayfa doğrudan kendi active durumunu ayarlıyor
  const updatedNavMain = data.navMain.map((item) => ({
    ...item,
    isActive: item.url === "/desktop/dashboard", // Dashboard ana sayfasını varsayılan olarak inaktif bırakalım
  }))
  const updatedProjects = data.projects.map((project) => ({
    ...project,
    isActive: false, // Projeler kategorilerini inaktif bırakalım
  }))
  const updatedEditPhotos = data.editPhotos.map((item) => ({
    ...item,
    isActive: item.name === "Upscale Photo", // Sadece bu sayfayı aktif yap
  }))

  return (
    <SidebarProvider>
      <Sidebar collapsible="icon">
        <SidebarHeader>
          <NavHeader />
        </SidebarHeader>
        <SidebarContent>
          <NavMain items={updatedNavMain} />
          <NavProjects projects={updatedProjects} />
          <NavEditPhotos editPhotos={updatedEditPhotos} />
        </SidebarContent>
        <SidebarFooter>
          <NavUser />
        </SidebarFooter>
        <SidebarRail />
      </Sidebar>
      <SidebarInset>
        <UpscalePhotoContent />
      </SidebarInset>
    </SidebarProvider>
  )
}
