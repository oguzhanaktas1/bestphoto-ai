import Navbar from "@/components/navbar"
import { SignInForm } from "@/components/auth/signin-form"

export default function SignInPage() {
  return (
    <main className="min-h-screen antialiased relative overflow-hidden">
      {/* AI-themed gradient background */}
      <div className="h-full w-full absolute inset-0 z-0 bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900 bg-grid-white/[0.02]"></div>

      <div className="relative z-10">
        <Navbar />
        <SignInForm />
      </div>
    </main>
  )
}
