"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Checkbox } from "@/components/ui/checkbox"
import { CreditCard, Lock, ArrowLeft, Crown, Zap, Check, Shield, Calendar, DollarSign } from "lucide-react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"

export function PaymentPage() {
  const searchParams = useSearchParams()
  const planParam = searchParams.get("plan")

  const [selectedPlan, setSelectedPlan] = useState<any>(null)
  const [paymentMethod, setPaymentMethod] = useState("card")
  const [isProcessing, setIsProcessing] = useState(false)

  const plans = {
    free: {
      name: "Free",
      price: 0,
      credits: 10,
      description: "Perfect for trying out BestPhoto AI",
    },
    pro: {
      name: "Pro",
      price: 20,
      credits: 50,
      description: "For photographers and enthusiasts",
    },
    proplus: {
      name: "Pro Plus",
      price: 200,
      credits: 500,
      description: "For professional photographers",
    },
  }

  useEffect(() => {
    if (planParam && plans[planParam as keyof typeof plans]) {
      setSelectedPlan(plans[planParam as keyof typeof plans])
    }
  }, [planParam])

  const handlePayment = async () => {
    setIsProcessing(true)
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false)
      // Redirect to success page or dashboard
      window.location.href = "/desktop/dashboard/billing?success=true"
    }, 3000)
  }

  if (!selectedPlan) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="p-6 text-center">
            <h2 className="text-xl font-semibold mb-2">No Plan Selected</h2>
            <p className="text-gray-600 mb-4">Please select a plan first.</p>
            <Button asChild>
              <Link href="/desktop/dashboard/billing/upgrade">Select Plan</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900 p-4">
      <div className="container mx-auto max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/desktop/dashboard/billing/upgrade"
            className="inline-flex items-center text-white hover:text-cyan-400 mb-4"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Plans
          </Link>
          <h1 className="text-4xl font-bold text-white mb-2">Complete Your Purchase</h1>
          <p className="text-gray-300 text-lg">Secure payment powered by industry-leading encryption</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Payment Form */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lock className="h-5 w-5 text-green-500" />
                Payment Information
              </CardTitle>
              <CardDescription>Your payment information is secure and encrypted</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Payment Method Selection */}
              <div className="space-y-3">
                <Label>Payment Method</Label>
                <div className="grid grid-cols-1 gap-3">
                  <Button
                    variant={paymentMethod === "card" ? "default" : "outline"}
                    className="justify-start"
                    onClick={() => setPaymentMethod("card")}
                  >
                    <CreditCard className="mr-2 h-4 w-4" />
                    Credit Card
                  </Button>
                </div>
              </div>

              {paymentMethod === "card" && (
                <>
                  {/* Card Information */}
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="cardNumber">Card Number</Label>
                      <Input id="cardNumber" placeholder="1234 5678 9012 3456" className="font-mono" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="expiry">Expiry Date</Label>
                        <Input id="expiry" placeholder="MM/YY" className="font-mono" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="cvc">CVC</Label>
                        <Input id="cvc" placeholder="123" className="font-mono" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="cardName">Cardholder Name</Label>
                      <Input id="cardName" placeholder="John Doe" />
                    </div>
                  </div>

                  {/* Billing Address */}
                  <div className="space-y-4">
                    <h3 className="font-medium">Billing Address</h3>
                    <div className="space-y-2">
                      <Label htmlFor="country">Country</Label>
                      <select className="w-full px-3 py-2 border border-input bg-background rounded-md">
                        <option>United States</option>
                        <option>Canada</option>
                        <option>United Kingdom</option>
                        <option>Turkey</option>
                      </select>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="city">City</Label>
                        <Input id="city" placeholder="San Francisco" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="zip">ZIP Code</Label>
                        <Input id="zip" placeholder="94102" />
                      </div>
                    </div>
                  </div>
                </>
              )}

              {/* Terms */}
              <div className="flex items-center space-x-2">
                <Checkbox id="terms" />
                <label
                  htmlFor="terms"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  I agree to the{" "}
                  <Link href="/terms" className="text-cyan-600 hover:underline">
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link href="/privacy" className="text-cyan-600 hover:underline">
                    Privacy Policy
                  </Link>
                </label>
              </div>

              {/* Payment Button */}
              <Button
                className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700"
                size="lg"
                onClick={handlePayment}
                disabled={isProcessing}
              >
                {isProcessing ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Processing...
                  </>
                ) : (
                  <>
                    <Lock className="mr-2 h-4 w-4" />
                    Pay ${selectedPlan.price}/month
                  </>
                )}
              </Button>

              {/* Security Notice */}
              <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
                <Shield className="h-4 w-4" />
                <span>Secured by 256-bit SSL encryption</span>
              </div>
            </CardContent>
          </Card>

          {/* Order Summary */}
          <Card>
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Plan Details */}
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-cyan-600 to-blue-600 flex items-center justify-center">
                    {selectedPlan.name === "Pro Plus" ? (
                      <Crown className="h-6 w-6 text-white" />
                    ) : (
                      <Zap className="h-6 w-6 text-white" />
                    )}
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">{selectedPlan.name} Plan</h3>
                    <p className="text-sm text-gray-600">{selectedPlan.description}</p>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                  <div className="flex justify-between">
                    <span>Monthly subscription</span>
                    <span>${selectedPlan.price}.00</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Credits per month</span>
                    <span>{selectedPlan.credits}</span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Billing cycle</span>
                    <span>Monthly</span>
                  </div>
                </div>
              </div>

              <Separator />

              {/* Total */}
              <div className="space-y-2">
                <div className="flex justify-between text-lg font-semibold">
                  <span>Total</span>
                  <span>${selectedPlan.price}.00/month</span>
                </div>
                <p className="text-sm text-gray-600">
                  You will be charged ${selectedPlan.price}.00 today and then ${selectedPlan.price}.00 every month.
                </p>
              </div>

              {/* Features */}
              <div className="space-y-3">
                <h4 className="font-medium">What's included:</h4>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-green-500" />
                    <span className="text-sm">{selectedPlan.credits} credits per month</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-green-500" />
                    <span className="text-sm">Advanced AI photo selection</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-green-500" />
                    <span className="text-sm">Priority customer support</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-green-500" />
                    <span className="text-sm">Cancel anytime</span>
                  </li>
                </ul>
              </div>

              {/* Next Billing */}
              <div className="bg-blue-50 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Calendar className="h-4 w-4 text-blue-600" />
                  <span className="font-medium text-blue-900">Next billing date</span>
                </div>
                <p className="text-sm text-blue-700">
                  {new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
