"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/components/context/AuthContext"
import { DashboardProfilePage } from "@/components/desktop/dashboard/dashboard-profile-page"

export default function ProfilePage() {
  const { user, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && !user) {
      router.push("/desktop/dashboard/signin")
    }
  }, [user, loading, router])

 

  return <DashboardProfilePage />
}
