import { type LucideIcon } from "lucide-react";

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

export function NavEditPhotos({
  editPhotos,
}: {
  editPhotos: {
    name: string;
    url: string;
    icon: LucideIcon;
    isActive?: boolean;
  }[];
}) {
  const { isMobile } = useSidebar();

  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <SidebarGroupLabel>Edit Photos</SidebarGroupLabel>
      <SidebarMenu>
        {editPhotos.map((item) => (
          <SidebarMenuItem key={item.name}>
            <SidebarMenuButton
              asChild
              data-active={item.isActive}
              className="group transition-colors rounded-[6px] data-[active=true]:bg-cyan-700 data-[active=true]:text-white hover:bg-cyan-900 hover:text-white"
            >
              <a
                href={item.url}
                className="flex items-center gap-2 w-full px-2 py-1.5"
              >
                <item.icon />
                <span>{item.name}</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
