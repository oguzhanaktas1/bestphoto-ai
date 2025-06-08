"use client";
import {
  Camera,
  ImageIcon,
  LandmarkIcon as Landscape,
  Dog,
  Users,
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
  Home,
  BarChart3,
  Scissors,
  Wand2,
} from "lucide-react";

import { NavMain } from "@/components/nav-main";
import { NavProjects } from "@/components/nav-projects";
import { NavUser } from "@/components/nav-user";
import { TeamSwitcher } from "@/components/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarInset,
  SidebarProvider,
  SidebarRail,
} from "@/components/ui/sidebar";
import { DashboardMainContent } from "@/components/desktop/dashboard/dashboard-main-content";
import { NavHeader } from "@/components/nav-header";
import { NavEditPhotos } from "@/components/nav-editphotos";

// This is sample data.
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
      icon: Wand2,
    },
    {
      name: "Remove Background",
      url: "/desktop/dashboard/remove-background",
      icon: Scissors,
    },
  ],
};

export function DashboardLayout() {
  return (
    <SidebarProvider>
      <Sidebar collapsible="icon">
        <SidebarHeader>
          <NavHeader />
        </SidebarHeader>

        <SidebarContent>
          <NavMain items={data.navMain} />
          <NavProjects projects={data.projects} />
          <NavEditPhotos editPhotos={data.editPhotos}/>
        </SidebarContent>
        <SidebarFooter>
          <NavUser />
        </SidebarFooter>
        <SidebarRail />
      </Sidebar>
      <SidebarInset>
        <DashboardMainContent />
      </SidebarInset>
    </SidebarProvider>
  );
}
