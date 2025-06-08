"use client"

import {
  Bell,
  ChevronsUpDown,
  CreditCard,
  Sparkles,
  Settings,
  User,
  Coins,
  Crown,
} from "lucide-react"
import Link from "next/link"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import LogoutButton from "./auth/LogoutButton"
import { useAuth } from "@/components/context/AuthContext"

export function NavUser() {
  const { isMobile } = useSidebar()
  const { user } = useAuth()

  const displayName = user?.displayName || "User"
  const email = user?.email || "user@example.com"
  const avatar = user?.photoURL || "/placeholder.svg"
  const initials = displayName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2)

  const plan = "Free"
  const credits = 0

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="rounded-[6px] transition-colors hover:bg-cyan-900 hover:text-white data-[state=open]:bg-cyan-700 data-[state=open]:text-white"
            >
              <Avatar className="h-8 w-8 rounded-lg">
                <AvatarImage src={avatar} alt={displayName} />
                <AvatarFallback className="rounded-lg">{initials}</AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">{displayName}</span>
                <span className="truncate text-xs">{email}</span>
              </div>
              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage src={avatar} alt={displayName} />
                  <AvatarFallback className="rounded-lg">{initials}</AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">{displayName}</span>
                  <span className="truncate text-xs">{email}</span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem
                asChild
                className="rounded-[6px] transition-colors hover:bg-cyan-900 hover:text-white focus:bg-cyan-700 focus:text-white"
              >
                <Link href="/desktop/dashboard/billing">
                  <Crown className="text-yellow-500" />
                  <span>Active Plan: {plan}</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem
                asChild
                className="rounded-[6px] transition-colors hover:bg-cyan-900 hover:text-white focus:bg-cyan-700 focus:text-white"
              >
                <Link href="/desktop/dashboard/billing">
                  <Coins className="text-cyan-500" />
                  <span>Credits: {credits}</span>
                </Link>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem
                asChild
                className="rounded-[6px] transition-colors hover:bg-cyan-900 hover:text-white focus:bg-cyan-700 focus:text-white"
              >
                <Link href="/desktop/dashboard/billing/upgrade">
                  <Sparkles />
                  Upgrade to Pro
                </Link>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem
                asChild
                className="rounded-[6px] transition-colors hover:bg-cyan-900 hover:text-white focus:bg-cyan-700 focus:text-white"
              >
                <Link href="/desktop/dashboard/profile">
                  <User />
                  Profile
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem
                asChild
                className="rounded-[6px] transition-colors hover:bg-cyan-900 hover:text-white focus:bg-cyan-700 focus:text-white"
              >
                <Link href="/desktop/dashboard/billing">
                  <CreditCard />
                  Billing
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem
                asChild
                className="rounded-[6px] transition-colors hover:bg-cyan-900 hover:text-white focus:bg-cyan-700 focus:text-white"
              >
                <Link href="/desktop/dashboard/settings">
                  <Settings />
                  Settings
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem
                asChild
                className="rounded-[6px] transition-colors hover:bg-cyan-900 hover:text-white focus:bg-cyan-700 focus:text-white"
              >
                <Link href="/desktop/dashboard/notifications">
                  <Bell />
                  Notifications
                </Link>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="rounded-[6px] transition-colors hover:bg-red-600 hover:text-white focus:bg-red-700 focus:text-white"
            >
              <LogoutButton redirectTo="/desktop" />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
