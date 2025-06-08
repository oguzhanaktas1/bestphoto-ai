"use client"

import type React from "react"
import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertCircle, Camera, Eye, EyeOff, Loader2 } from "lucide-react"
import Link from "next/link"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useToast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"
// firebase auth islemleri
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth"
import { signInWithEmailAndPassword } from "firebase/auth"
import { auth } from "@/lib/firebase"

interface SignInFormProps {
  redirectTo?: string
}

export function SignInForm({ redirectTo = "/desktop/dashboard" }: SignInFormProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { toast } = useToast()
  const router = useRouter();
  

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)
  
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email.trim(),
        password.trim()
      )
      const user = userCredential.user

      if (!user.emailVerified) {
        await auth.signOut(); // Sign out the unverified user
        setError("Your email has not been verified. Please check your inbox for a verification link.");
        return;
      }

      console.log("Giriş başarılı:", user)
      toast({
        title: "Login successful!",
        description: "Welcome, Enjoy being use BestPhoto AI",
        variant: "success",
      })
      router.push(redirectTo)
    } catch (error: any) {
      console.error("Login error:", error.code)
  
      if (error.code === "auth/invalid-credential") {
        setError("An error occurred. Please try again.")
      } 
      if (error.code === "auth/user-not-found") {
        setError("No account was found with this email address. Please register first.")
      } 
      if (error.code === "auth/wrong-password") {
        setError("The password is incorrect. Please try again.")
      } 
      if (error.code === "auth/too-many-requests") {
        setError("Too many attempts have been made. Please try again later.")
      }
      
    } finally {
      setIsLoading(false)
    }
  }
  

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  return (
    <div className="flex items-center justify-center min-h-[calc(104vh-76px)] px-4">
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
            <CardTitle className="text-2xl font-bold text-white">Sign In</CardTitle>
            <CardDescription className="text-gray-400">
              Enter your email and password to access your account
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
            {/* Display error message if authentication fails */}
            {error && (
              <div className="space-y-2">
                <Alert className="bg-red-900/20 border-red-500/50 text-red-50">
                  <AlertCircle className="h-4 w-4 mr-2" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
                
                {error.includes("kayıtlı bir hesap bulunamadı") && (
                  <div className="text-sm text-white text-center">
                    Don't have an account?{" "}
                    <Link href="/signup" className="text-cyan-400 hover:text-cyan-300 underline">
                      Sign up
                    </Link>
                  </div>
                )}
              </div>
            )}

            {/* Google Sign In Button - Outside the form */}
            <Button
              type="button"
              variant="outline"
              className="w-full bg-white/5 border-white/20 text-white hover:bg-white/10 flex items-center justify-center"
              onClick={async () => {
                try {
                  const provider = new GoogleAuthProvider()
                  const result = await signInWithPopup(auth, provider)
                  const user = result.user
                  console.log("Logged in with Google:", user)
                  toast({
                    title: "Successful login with Google!",
                    description: "Welcome, Enjoy being use BestPhoto AI",
                    variant: "success",
                  })
                  // Başarılıysa download'a yönlendir
                  router.push(redirectTo)
                } catch (error: any) {
                  console.error("Google login error:", error.message)
                }
              }}
            >
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
              </svg>
              Continue with Google
            </Button>

            <div className="relative w-full">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-white/10"></span>
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="bg-black/40 px-2 text-gray-400">OR</span>
              </div>
            </div>

            {/* Regular Sign In Form */}
            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
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
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password" className="text-gray-300">
                      Password
                    </Label>
                    <Link href="/desktop/dashboard/forgot-password" className="text-sm text-cyan-400 hover:text-cyan-300">
                      Forgot password?
                    </Link>
                  </div>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="bg-black/30 border-white/20 text-white pr-10"
                    />
                    <button
                      type="button"
                      onClick={togglePasswordVisibility}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Signing in...
                    </>
                  ) : (
                    "Sign In"
                  )}
                </Button>
              </div>
            </form>
          </CardContent>

          <CardFooter>
            <div className="text-center text-sm text-gray-400 w-full">
              Don't have an account?{" "}
              <Link href="/desktop/dashboard/signup" className="text-cyan-400 hover:text-cyan-300">
                Sign up
              </Link>
            </div>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  )
}
