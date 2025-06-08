"use client"

import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { useAuth } from "@/components/context/AuthContext"
import { DashboardCategoryPage } from "@/components/desktop/dashboard/dashboard-category-page"

export default function AnimalsPage() {
  const { user, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && !user) {
      router.push("/desktop/dashboard/signin")
    }
  }, [user, loading, router])

  if (loading || !user) {
    return null
  }

  return <DashboardCategoryPage category="animals" />
}
