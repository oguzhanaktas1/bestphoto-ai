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
  Bell,
  Check,
  X,
  Trash2,
  CheckCheck,
  Filter,
  Zap,
  Crown,
  AlertTriangle,
  Info,
  Gift,
  Calendar,
} from "lucide-react"

export function NotificationsContent() {
  const [notifications, setNotifications] = useState([
    {
      id: "1",
      type: "success",
      title: "AI Analysis Complete",
      message: "Your portrait photos have been analyzed. 8 best photos selected out of 24.",
      time: "2 minutes ago",
      read: false,
      icon: Zap,
      color: "text-green-500",
    },
    {
      id: "2",
      type: "info",
      title: "Plan Upgrade Available",
      message: "Upgrade to Pro Plus for unlimited photo processing and advanced features.",
      time: "1 hour ago",
      read: false,
      icon: Crown,
      color: "text-blue-500",
    },
    {
      id: "3",
      type: "warning",
      title: "Credits Running Low",
      message: "You have 5 credits remaining. Consider upgrading your plan.",
      time: "3 hours ago",
      read: true,
      icon: AlertTriangle,
      color: "text-yellow-500",
    },
    {
      id: "4",
      type: "info",
      title: "New Feature Available",
      message: "Try our new batch processing feature for faster photo analysis.",
      time: "1 day ago",
      read: true,
      icon: Info,
      color: "text-blue-500",
    },
    {
      id: "5",
      type: "success",
      title: "Welcome Bonus",
      message: "Welcome to BestPhoto AI! You've received 5 free credits to get started.",
      time: "3 days ago",
      read: true,
      icon: Gift,
      color: "text-green-500",
    },
    {
      id: "6",
      type: "info",
      title: "Monthly Report Ready",
      message: "Your January photo analysis report is ready for download.",
      time: "1 week ago",
      read: true,
      icon: Calendar,
      color: "text-blue-500",
    },
  ])

  const markAsRead = (id: string) => {
    setNotifications((prev) => prev.map((notif) => (notif.id === id ? { ...notif, read: true } : notif)))
  }

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((notif) => ({ ...notif, read: true })))
  }

  const deleteNotification = (id: string) => {
    setNotifications((prev) => prev.filter((notif) => notif.id !== id))
  }

  const unreadCount = notifications.filter((n) => !n.read).length

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
                <BreadcrumbPage>Notifications</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>

      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        {/* Header */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="h-5 w-5" />
                  Notifications
                  {unreadCount > 0 && (
                    <Badge variant="destructive" className="ml-2">
                      {unreadCount}
                    </Badge>
                  )}
                </CardTitle>
                <CardDescription>Stay updated with your account activity and AI analysis results</CardDescription>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Filter className="mr-2 h-4 w-4" />
                  Filter
                </Button>
                {unreadCount > 0 && (
                  <Button variant="outline" size="sm" onClick={markAllAsRead}>
                    <CheckCheck className="mr-2 h-4 w-4" />
                    Mark All Read
                  </Button>
                )}
              </div>
            </div>
          </CardHeader>
        </Card>

        {/* Notifications List */}
        <div className="space-y-2">
          {notifications.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <Bell className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-2">No notifications</h3>
                <p className="text-muted-foreground text-center">
                  You're all caught up! New notifications will appear here.
                </p>
              </CardContent>
            </Card>
          ) : (
            notifications.map((notification) => {
              const IconComponent = notification.icon
              return (
                <Card
                  key={notification.id}
                  className={`transition-all hover:shadow-md ${
                    !notification.read ? "border-cyan-200 bg-cyan-50 dark:bg-cyan-950" : ""
                  }`}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start gap-4">
                      <div className={`p-2 rounded-full bg-gray-100 dark:bg-gray-800 ${notification.color}`}>
                        <IconComponent className="h-4 w-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex-1">
                            <h3 className={`font-medium ${!notification.read ? "font-semibold" : ""}`}>
                              {notification.title}
                            </h3>
                            <p className="text-sm text-muted-foreground mt-1">{notification.message}</p>
                            <p className="text-xs text-muted-foreground mt-2">{notification.time}</p>
                          </div>
                          <div className="flex items-center gap-1">
                            {!notification.read && (
                              <Button size="sm" variant="ghost" onClick={() => markAsRead(notification.id)}>
                                <Check className="h-4 w-4" />
                              </Button>
                            )}
                            <Button size="sm" variant="ghost" onClick={() => deleteNotification(notification.id)}>
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })
          )}
        </div>

        {/* Clear All */}
        {notifications.length > 0 && (
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <p className="text-sm text-muted-foreground">{notifications.length} total notifications</p>
                <Button variant="outline" size="sm">
                  <Trash2 className="mr-2 h-4 w-4" />
                  Clear All
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </>
  )
}
