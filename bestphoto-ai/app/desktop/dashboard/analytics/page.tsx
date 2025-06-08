"use client"

import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { useAuth } from "@/components/context/AuthContext"
import { DashboardAnalyticsPage } from "@/components/desktop/dashboard/dashboard-analytics-page"

export default function AnalyticsPage() {
  const { user, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && !user) {
      router.push("/desktop/dashboard/signin")
    }
  }, [user, loading, router])

  

  return <DashboardAnalyticsPage />
}
