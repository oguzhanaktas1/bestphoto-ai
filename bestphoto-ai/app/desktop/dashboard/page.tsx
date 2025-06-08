"use client"

import { useAuth } from "@/components/context/AuthContext"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { DashboardLayout } from "@/components/desktop/dashboard/dashboard-layout"

export default function DashboardPage() {
  const { user, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && !user) {
      router.push("/desktop/dashboard/signin")
    }
  }, [user, loading, router])

  
  if (!user) {
    return null
  }

  return <DashboardLayout />
}
