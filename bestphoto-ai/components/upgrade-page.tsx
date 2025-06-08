"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Check, X, Crown, Zap, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"

export function UpgradePage() {
  const [isProcessing, setIsProcessing] = useState<string | null>(null)

  const plans = [
    {
      id: "free",
      name: "Free",
      description: "Perfect for trying out BestPhoto AI",
      price: 0,
      credits: 10,
      renewal: "One-time credits",
      features: [
        { included: true, text: "10 credits for new users" },
        { included: true, text: "Basic AI photo selection" },
        { included: true, text: "Standard quality analysis" },
        { included: false, text: "Batch processing" },
        { included: false, text: "Custom selection criteria" },
        { included: false, text: "Priority processing" },
      ],
      popular: false,
      color: "from-gray-600 to-gray-700",
    },
    {
      id: "pro",
      name: "Pro",
      description: "For photographers and enthusiasts",
      price: 20,
      credits: 50,
      renewal: "Renews monthly",
      features: [
        { included: true, text: "50 credits per month" },
        { included: true, text: "Advanced AI photo selection" },
        { included: true, text: "Detailed quality analysis" },
        { included: true, text: "Batch processing" },
        { included: true, text: "Custom selection criteria" },
        { included: false, text: "Priority processing" },
      ],
      popular: true,
      color: "from-cyan-600 to-blue-600",
    },
    {
      id: "proplus",
      name: "Pro Plus",
      description: "For professional photographers",
      price: 200,
      credits: 500,
      renewal: "Renews monthly",
      features: [
        { included: true, text: "500 credits per month" },
        { included: true, text: "Premium AI photo selection" },
        { included: true, text: "Advanced quality analysis" },
        { included: true, text: "Unlimited batch processing" },
        { included: true, text: "Custom selection criteria" },
        { included: true, text: "Priority processing" },
      ],
      popular: false,
      color: "from-purple-600 to-indigo-600",
    },
  ]

  const handleSelectPlan = async (planId: string) => {
    setIsProcessing(planId)

    if (planId === "free") {
      
      setTimeout(() => {
        setIsProcessing(null)
        // Show success message and redirect
        alert("10 free credits have been added to your account!")
        window.location.href = "/desktop/dashboard/billing?credits_added=true"
      }, 2000)
    } else {
      // Redirect to payment page for paid plans
      setTimeout(() => {
        setIsProcessing(null)
        window.location.href = `/desktop/dashboard/billing/payment?plan=${planId}`
      }, 1000)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900 p-4">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <Link href="/desktop/dashboard/billing" className="inline-flex items-center text-white hover:text-cyan-400 mb-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Billing
          </Link>
          <h1 className="text-4xl font-bold text-white mb-2">Choose Your Plan</h1>
          <p className="text-gray-300 text-lg">Select the perfect plan for your photo management needs</p>
        </div>

        {/* Plans Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan) => {
            const isFree = plan.id === "free";
            const isCurrent = isFree;
            return (
              <Card
                key={plan.id}
                className={cn(
                  "relative transition-all duration-200 hover:scale-105",
                  plan.popular && "border-cyan-500 shadow-lg",
                  isCurrent && "border-2 border-green-500 shadow-md"
                )}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-4 py-1">
                      Most Popular
                    </Badge>
                  </div>
                )}
                {isCurrent && (
                  <div className="absolute top-3 right-3">
                    <Badge className="bg-green-500 text-white">Current Plan</Badge>
                  </div>
                )}

                <CardHeader className="text-center">
                  <div
                    className={`mx-auto w-16 h-16 rounded-full bg-gradient-to-r ${plan.color} flex items-center justify-center mb-4`}
                  >
                    {plan.name === "Pro Plus" ? (
                      <Crown className="h-8 w-8 text-white" />
                    ) : plan.name === "Pro" ? (
                      <Zap className="h-8 w-8 text-white" />
                    ) : (
                      <Check className="h-8 w-8 text-white" />
                    )}
                  </div>
                  <CardTitle className="text-2xl">{plan.name}</CardTitle>
                  <CardDescription>{plan.description}</CardDescription>
                  <div className="mt-4">
                    <span className="text-4xl font-bold">${plan.price}</span>
                    <span className="text-gray-500">{plan.price === 0 ? "" : "/month"}</span>
                  </div>
                  <div className="mt-2 space-y-1">
                    <div className="flex items-center justify-center">
                      <div className="w-3 h-3 rounded-full bg-cyan-500 mr-2"></div>
                      <span className="text-sm">{plan.credits} credits</span>
                    </div>
                    <div className="flex items-center justify-center">
                      <div className="w-3 h-3 rounded-full bg-purple-500 mr-2"></div>
                      <span className="text-sm">{plan.renewal}</span>
                    </div>
                  </div>
                </CardHeader>

                <CardContent>
                  <ul className="space-y-3 mb-6">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start">
                        {feature.included ? (
                          <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                        ) : (
                          <X className="h-5 w-5 text-gray-400 mr-2 flex-shrink-0 mt-0.5" />
                        )}
                        <span className={feature.included ? "text-gray-700" : "text-gray-400"}>{feature.text}</span>
                      </li>
                    ))}
                  </ul>

                  <Button
                    className={cn(
                      "w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white",
                      isCurrent && "opacity-60 cursor-not-allowed"
                    )}
                    onClick={() => !isCurrent && handleSelectPlan(plan.id)}
                    disabled={isCurrent || isProcessing === plan.id}
                  >
                    {isCurrent
                      ? "Current Plan"
                      : isProcessing === plan.id
                      ? (
                          <>
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                            {plan.id === "free" ? "Adding Credits..." : "Processing..."}
                          </>
                        )
                      : plan.id === "free"
                      ? "Get Free Credits"
                      : "Select Plan"}
                  </Button>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </div>
  )
}
