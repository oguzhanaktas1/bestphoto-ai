"use client"

import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { useAuth } from "@/components/context/AuthContext"
import { ForgotPasswordForm } from "@/components/desktop/dashboard/sign/forgot-password-form"

export default function ForgotPasswordPage() {
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

  return <ForgotPasswordForm />
}
