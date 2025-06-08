"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/components/context/AuthContext"
import { DashboardSettingsPage } from "@/components/desktop/dashboard/dashboard-settings-page"

export default function SettingsPage() {
  const { user, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && !user) {
      router.push("/desktop/dashboard/signin")
    }
  }, [user, loading, router])

  

  return <DashboardSettingsPage />
}
