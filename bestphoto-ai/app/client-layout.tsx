"use client"

import type React from "react"
import { usePathname } from "next/navigation"
import { Footer } from "@/components/footer"
import { Toaster } from "@/components/ui/toaster"

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const hideFooter = pathname === "/signin" || pathname === "/signup" || pathname === "/forgot-password"

  return (
    <>
      {children}
      {!hideFooter && <Footer />}
      <Toaster />
    </>
  )
}
