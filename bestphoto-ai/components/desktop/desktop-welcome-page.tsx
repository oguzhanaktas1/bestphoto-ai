"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Camera, Sparkles, Zap, Shield, Users, Award } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"

export function DesktopWelcomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <div className="flex items-center justify-center mb-6">
            <div className="relative">
              <Camera className="h-16 w-16 text-blue-600" />
              <Sparkles className="h-6 w-6 text-yellow-500 absolute -top-1 -right-1" />
            </div>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent mb-4">
            BestPhoto AI
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            AI-powered photo selection that finds your best shots automatically. Upload your photos and let our advanced
            AI choose the perfect ones for you.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid md:grid-cols-2 gap-6 mb-8"
        >
          <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl text-gray-800">Welcome Back!</CardTitle>
              <CardDescription className="text-gray-600">
                Sign in to access your AI photo selection dashboard
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button asChild className="w-full h-12 text-lg bg-blue-600 hover:bg-blue-700">
                <Link href="desktop/dashboard/signin">
                  <Zap className="mr-2 h-5 w-5" />
                  Sign In
                </Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl text-gray-800">New Here?</CardTitle>
              <CardDescription className="text-gray-600">
                Create your account and start using AI photo selection
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button
                asChild
                variant="outline"
                className="w-full h-12 text-lg border-2 border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white"
              >
                <Link href="desktop/dashboard/signup">
                  <Users className="mr-2 h-5 w-5" />
                  Create Account
                </Link>
              </Button>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="grid md:grid-cols-3 gap-6"
        >
          <Card className="border-0 shadow-md bg-white/60 backdrop-blur-sm">
            <CardContent className="p-6 text-center">
              <Sparkles className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-800 mb-2">AI-Powered Selection</h3>
              <p className="text-gray-600 text-sm">
                Advanced algorithms analyze your photos and select the best ones automatically
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-md bg-white/60 backdrop-blur-sm">
            <CardContent className="p-6 text-center">
              <Shield className="h-12 w-12 text-green-500 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Secure & Private</h3>
              <p className="text-gray-600 text-sm">Your photos are processed securely and remain completely private</p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-md bg-white/60 backdrop-blur-sm">
            <CardContent className="p-6 text-center">
              <Award className="h-12 w-12 text-purple-500 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Professional Results</h3>
              <p className="text-gray-600 text-sm">Get professional-quality photo selections in seconds, not hours</p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center mt-8"
        >
          <p className="text-gray-500 text-sm">Trusted by photographers and content creators worldwide</p>
        </motion.div>
      </div>
    </div>
  )
}
