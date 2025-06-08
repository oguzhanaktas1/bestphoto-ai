"use client"

import { signOut } from "firebase/auth"
import { useRouter } from "next/navigation"
import { LogOutIcon } from "lucide-react"
import { auth } from "@/lib/firebase"

interface SignInFormProps {
  redirectTo?: string
}
export default function LogoutButton({ redirectTo = "/" }: SignInFormProps) {
  const router = useRouter()

  const handleLogout = async () => {
    try {
      await signOut(auth)
      router.push(redirectTo)
    } catch (error) {
      console.error("Logout failed:", error)
    }
  }

  return (
    <button
      onClick={handleLogout}
      className="flex items-center gap-2 w-full px-3 py-2 text-sm text-white hover:bg-gray-900 rounded-md transition-colors duration-150"
    >
      <LogOutIcon className="h-4 w-4 text-gray-400" />
      <span>Log Out</span>
    </button>
  )
}
