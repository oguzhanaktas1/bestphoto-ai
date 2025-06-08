"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/components/context/AuthContext"
import { DashboardNotificationsPage } from "@/components/desktop/dashboard/dashboard-notifications-page"

export default function MyPhotosPage() {
  const { user, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && !user) {
      router.push("/desktop/dashboard/signin")
    }
  }, [user, loading, router])

  

  return <DashboardNotificationsPage />
}
