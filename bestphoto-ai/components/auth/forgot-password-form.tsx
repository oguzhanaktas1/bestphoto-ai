"use client"

import type React from "react"
import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Camera, Loader2, Mail } from "lucide-react"
import Link from "next/link"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { sendPasswordResetEmail } from "firebase/auth"
import { auth } from "@/lib/firebase" 
import { useRouter } from 'next/navigation' 

export function ForgotPasswordForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [email, setEmail] = useState("")
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      await sendPasswordResetEmail(auth, email)
      setSubmitted(true)
    } catch (err: any) {
      console.error(err)
      setError("Failed to send reset email. Please check the email address.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-76px)] px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <Card className="bg-black/40 backdrop-blur-sm border border-white/10">
          <CardHeader className="space-y-1 text-center">
            <div className="flex justify-center mb-4">
              <div className="bg-cyan-500/20 p-3 rounded-full">
                <Camera className="h-8 w-8 text-cyan-400" />
              </div>
            </div>
            <CardTitle className="text-2xl font-bold text-white">Reset Password</CardTitle>
            <CardDescription className="text-gray-400">
              Enter your email address and we'll send you a code to reset your password
            </CardDescription>
          </CardHeader>

          {submitted ? (
            <CardContent className="space-y-4">
              <Alert className="bg-cyan-900/20 border-cyan-500/50 text-cyan-50">
                <Mail className="h-4 w-4 mr-2" />
                <AlertDescription>
                  If an account exists with the email <span className="font-medium">{email}</span>, you will receive a
                  password reset code shortly.
                </AlertDescription>
              </Alert>
              <div className="text-center text-gray-300 text-sm">
                <p>Please check your email and follow the instructions to reset your password.</p>
                <p className="mt-2">
                  Didn't receive an email? Check your spam folder or{" "}
                  <button 
                    onClick={() => {
                      setSubmitted(false);
                      router.push('/auth/signin');
                    }}
                    className="text-cyan-400 hover:text-cyan-300 underline"
                  >
                    try again
                  </button>
                </p>
              </div>
            </CardContent>
          ) : (
            <form onSubmit={handleSubmit}>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-gray-300">
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="name@example.com"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-black/30 border-white/20 text-white placeholder:text-gray-500"
                  />
                </div>
                {error && <p className="text-sm text-red-500">{error}</p>}
              </CardContent>
              <CardFooter className="flex flex-col space-y-4">
                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Sending reset code...
                    </>
                  ) : (
                    "Send Reset Code"
                  )}
                </Button>
                <Link
                  href="/auth/signin"
                  className="text-sm text-cyan-400 hover:text-cyan-300 flex items-center justify-center"
                >
                  <ArrowLeft className="h-4 w-4 mr-1" />
                  Back to Sign In
                </Link>
              </CardFooter>
            </form>
          )}
        </Card>
      </motion.div>
    </div>
  )
}
