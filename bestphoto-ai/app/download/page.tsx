"use client"

import { DownloadApp } from "@/components/download/download-app"
import ClientLayout from "../client-layout"
import Navbar from "@/components/navbar"

export default function DownloadPage() {
  return (
    <ClientLayout>
      <main className="min-h-screen antialiased relative overflow-hidden">
        {/* AI-themed gradient background */}
        <div className="h-full w-full absolute inset-0 z-0 bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900 bg-grid-white/[0.02]"></div>

        <div className="relative z-10">
          <Navbar />
          <DownloadApp />
        </div>
      </main>
    </ClientLayout>
  )
}
