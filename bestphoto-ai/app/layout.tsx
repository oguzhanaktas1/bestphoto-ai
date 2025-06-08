import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Toaster } from "react-hot-toast";
import { ThemeProvider } from "@/components/theme-provider"
import { AuthProvider } from "@/components/context/AuthContext" // ✅ AuthProvider eklendi

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "BestPhoto AI - Find Your Best Photos",
  description: "AI-powered photo selection and organization tool",
  generator: "v0.dev",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <AuthProvider>
            {children}
          </AuthProvider>
          <Toaster position="bottom-right" />
        </ThemeProvider>
      </body>
    </html>
  )
}
