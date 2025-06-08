"use client"

import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { useAuth } from "@/components/context/AuthContext"
import { DashboardBillingPage } from "@/components/desktop/dashboard/dashboard-billing-page"

export default function BillingPage() {
  const { user, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && !user) {
      router.push("/desktop/dashboard/signin")
    }
  }, [user, loading, router])

  

  return <DashboardBillingPage />
}
