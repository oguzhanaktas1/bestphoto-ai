"use client"

import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { useAuth } from "@/components/context/AuthContext"
import { DashboardMyPhotosPage } from "@/components/desktop/dashboard/dashboard-my-photos-page"

export default function MyPhotosPage() {
  const { user, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && !user) {
      router.push("/desktop/dashboard/signin")
    }
  }, [user, loading, router])

  

  return <DashboardMyPhotosPage />
}
