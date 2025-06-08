"use client"

import type React from "react"
import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertCircle, Camera, Eye, EyeOff, Loader2, RefreshCw } from "lucide-react"
import Link from "next/link"
import { Checkbox } from "@/components/ui/checkbox"
import { Separator } from "@/components/ui/separator"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useToast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from "@/components/ui/dialog"

//firebase auth islemleri
import { getAuth, createUserWithEmailAndPassword, updateProfile, sendEmailVerification } from "firebase/auth"
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth"
import { auth } from "@/lib/firebase"

interface SignUpFormProps {
  redirectTo?: string
}

export function SignUpForm({ redirectTo = "/desktop/dashboard" }: SignUpFormProps) {
  
  const [isLoading, setIsLoading] = useState(false)
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [acceptTerms, setAcceptTerms] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { toast } = useToast()
  const router = useRouter();
  const [showVerificationDialog, setShowVerificationDialog] = useState(false)
  const [countdown, setCountdown] = useState(5)
  
  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setIsLoading(true);
  setError(null);

  try {
    // Kullanıcıyı oluştur
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    console.log("User signed up:", user);
    toast({
      title: "Registration successful!",
      description: "Your account has been created successfully. Please verify your email.",
      variant: "success",
    })

    // Kullanıcı profilini güncelle (displayName ve photoURL)
    await updateProfile(user, {
      displayName: name, // Buraya kullanıcıdan alınan adı yaz
      photoURL: "https://example.com/avatar.png", // Varsayılan resim ya da dinamik avatar URL
    });

    // Profil güncelleme başarılı, yönlendirme
    console.log("User profile updated");

    // Send email verification
    await sendEmailVerification(user);
    console.log("Verification email sent");

    // Display dialog and start countdown
    setShowVerificationDialog(true);
    let timer = 5;
    const interval = setInterval(() => {
      timer--;
      setCountdown(timer);
      if (timer === 0) {
        clearInterval(interval);
        setShowVerificationDialog(false);
        router.push("/desktop/dashboard/signin");
      }
    }, 1000);

    
  } catch (error: any) {
    // Hata durumları
    if (error.code === "auth/email-already-in-use") {
      setError("This email address is already in use. Please try another email address.");
    } else {
      setError("An error occurred while registering. Please try again.");
    }
    console.error("Signup error:", error.message);
  } finally {
    setIsLoading(false);
  }
};

  
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  const generateRandomPassword = () => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_-+=<>?"
    let result = ""
    const length = 12
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length))
    }
    setPassword(result)
  }

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-76px)] px-4 py-12">
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
            <CardTitle className="text-2xl font-bold text-white">Create an Account</CardTitle>
            <CardDescription className="text-gray-400">Enter your information to create an account</CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
            {/* Display error message if email is already in use */}
            {error && (
              <Alert className="bg-red-900/20 border-red-500/50 text-red-50">
                <AlertCircle className="h-4 w-4 mr-2" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            {/* Social Login Button */}
            <div className="w-full">
              <Button
                variant="outline"
                className="w-full bg-white/5 border-white/20 text-white hover:bg-white/10 flex items-center justify-center"
                onClick={async () => {
                  try {
                    const provider = new GoogleAuthProvider()
                    const result = await signInWithPopup(auth, provider)
                    const user = result.user
                    console.log("Logged in with Google:", user)
                    toast({
                      title: "Registration successful!",
                      description: "Your account has been created successfully. Enjoy being use BestPhoto AI",
                      variant: "success",
                    })
                    
                    router.push(redirectTo)
                  } catch (error: any) {
                    console.error("Google login error:", error.message)
                    if (error.code === "auth/cancelled-popup-request") {
                      toast({
                        title: "Login cancelled",
                        description: "You cancelled the Google login process. Please try again.",
                        variant: "destructive",
                      });
                    } else {
                      toast({
                        title: "Login failed",
                        description: "An error occurred during Google login. Please try again.",
                        variant: "destructive",
                      });
                    }
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
            </div>

            <div className="flex items-center gap-2">
              <Separator className="bg-white/10 flex-1" />
              <span className="text-xs text-gray-400">OR</span>
              <Separator className="bg-white/10 flex-1" />
            </div>

            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-gray-300">
                    Full Name
                  </Label>
                  <Input
                    id="name"
                    placeholder="John Doe"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="bg-black/30 border-white/20 text-white placeholder:text-gray-500"
                  />
                </div>
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
                  <Label htmlFor="password" className="text-gray-300">
                    Password
                  </Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="bg-black/30 border-white/20 text-white pr-24"
                    />
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center space-x-2">
                      <button
                        type="button"
                        onClick={generateRandomPassword}
                        className="text-gray-400 hover:text-cyan-400"
                        title="Generate random password"
                      >
                        <RefreshCw size={16} />
                      </button>
                      <button
                        type="button"
                        onClick={togglePasswordVisibility}
                        className="text-gray-400 hover:text-white"
                      >
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                  </div>
                  <p className="text-xs text-gray-500">Password must be at least 8 characters long</p>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="terms"
                    checked={acceptTerms}
                    onCheckedChange={(checked) => setAcceptTerms(checked as boolean)}
                  />
                  <label
                    htmlFor="terms"
                    className="text-sm text-gray-400 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    I agree to the{" "}
                    <Link href="/terms" className="text-cyan-400 hover:text-cyan-300">
                      Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link href="/privacy" className="text-cyan-400 hover:text-cyan-300">
                      Privacy Policy
                    </Link>
                  </label>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700"
                  disabled={isLoading || !acceptTerms}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Creating account...
                    </>
                  ) : (
                    "Sign Up"
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
          <CardFooter>
            <div className="text-center text-sm text-gray-400 w-full">
              Already have an account?{" "}
              <Link href="/desktop/dashboard/signin" className="text-cyan-400 hover:text-cyan-300">
                Sign in
              </Link>
            </div>
          </CardFooter>
        </Card>
      </motion.div>

      {/* Email Verification Dialog */}
      <Dialog open={showVerificationDialog} onOpenChange={setShowVerificationDialog}>
        <DialogContent className="max-w-sm bg-gray-900 border-gray-700 text-white p-6 rounded-lg shadow-xl">
          <DialogHeader>
            <DialogTitle className="text-cyan-400">Email Verification Sent!</DialogTitle>
            <DialogDescription className="text-gray-300">
              A verification link has been sent to your email address. Please check your inbox to activate your account.
            </DialogDescription>
          </DialogHeader>
          <div className="text-center text-lg font-bold text-white mt-4">
            Redirecting in {countdown} seconds...
          </div>
          <DialogFooter className="mt-6">
            <Button
              variant="outline"
              className="w-full bg-white/10 border-white/20 text-white hover:bg-white/20"
              onClick={() => {
                setShowVerificationDialog(false);
                router.push("/desktop/dashboard/signin");
              }}
            >
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
