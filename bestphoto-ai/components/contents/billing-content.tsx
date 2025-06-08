"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import {
  CreditCard,
  Download,
  Calendar,
  Zap,
  Crown,
  Check,
  AlertCircle,
  ExternalLink,
} from "lucide-react";
import Link from "next/link";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "../ui/breadcrumb";
import { SidebarTrigger } from "../ui/sidebar";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export function BillingContent() {
  const currentPlan = {
    name: "Free",
    price: 0,
    credits: 10,
    usedCredits: 0,
    renewalDate: null,
    features: [
      "10 credits per month",
      "Basic AI photo selection",
      "Standard quality analysis",
      "Single photo processing",
      "Community support",
    ],
  };

  const billingHistory: any[] = [];

  type PaymentMethod = { type: string; last4: string; expiry: string } | null;
  const paymentMethod: PaymentMethod = null;

  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvc, setCvc] = useState("");
  const [nameOnCard, setNameOnCard] = useState("");
  const [country, setCountry] = useState("");
  const [zip, setZip] = useState("");
  const [cardType, setCardType] = useState<string | null>(null);

  // Card type detection (simple)
  function detectCardType(number: string) {
    if (/^4/.test(number)) return "Visa";
    if (/^5[1-5]/.test(number)) return "Mastercard";
    if (/^3[47]/.test(number)) return "Amex";
    if (/^6/.test(number)) return "Discover";
    return null;
  }

  function handleCardNumberChange(e: React.ChangeEvent<HTMLInputElement>) {
    let value = e.target.value.replace(/[^0-9]/g, "");
    // Format as 1234 5678 9012 3456
    value = value.replace(/(.{4})/g, "$1 ").trim();
    setCardNumber(value);
    setCardType(detectCardType(value.replace(/\s/g, "")));
  }

  function handleExpiryChange(e: React.ChangeEvent<HTMLInputElement>) {
    let value = e.target.value.replace(/[^0-9]/g, "");
    if (value.length > 2) value = value.slice(0, 2) + "/" + value.slice(2, 4);
    setExpiry(value);
  }

  function handleCvcChange(e: React.ChangeEvent<HTMLInputElement>) {
    setCvc(e.target.value.replace(/[^0-9]/g, "").slice(0, 4));
  }

  return (
    <>
      <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
        <div className="flex items-center gap-2 px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="/desktop/dashboard">
                  Dashboard
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage>Billing & Usage</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              Billing & Usage
            </h1>
            <p className="text-muted-foreground">
              Manage your subscription and view usage statistics
            </p>
          </div>
          <Badge variant="secondary" className="flex items-center gap-1">
            <Crown className="h-3 w-3" />
            {currentPlan.name} Plan
          </Badge>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {/* Current Plan */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Crown className="h-5 w-5 text-yellow-500" />
                Current Plan
              </CardTitle>
              <CardDescription>
                Your active subscription details
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-2xl font-bold">
                    {currentPlan.name} Plan
                  </h3>
                  <p className="text-muted-foreground">
                    {currentPlan.price === 0 ? "Free" : `$${currentPlan.price}/month`}
                  </p>
                </div>
                <Button asChild>
                  <Link href="/desktop/dashboard/billing/upgrade">Upgrade</Link>
                </Button>
              </div>

              <Separator />

              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span>Credits Used</span>
                  <span className="font-medium">
                    {currentPlan.usedCredits}/{currentPlan.credits}
                  </span>
                </div>
                <Progress
                  value={(currentPlan.usedCredits / currentPlan.credits) * 100}
                />
                <p className="text-xs text-muted-foreground">
                  {currentPlan.credits - currentPlan.usedCredits} credits
                  remaining this month
                </p>
              </div>

              <Separator />

              <div className="space-y-2">
                <h4 className="font-medium">Plan Features</h4>
                <ul className="space-y-1">
                  {currentPlan.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-2 text-sm">
                      <Check className="h-3 w-3 text-green-500" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              {currentPlan.renewalDate && (
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  <span>
                    Renews on {new Date(currentPlan.renewalDate).toLocaleDateString()}
                  </span>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Payment Method */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="h-5 w-5" />
                Payment Method
              </CardTitle>
              <CardDescription>Your default payment method</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {paymentMethod && typeof paymentMethod === 'object' ? (
                <>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-6 bg-blue-600 rounded flex items-center justify-center text-white text-xs font-bold">
                        {(paymentMethod as {type: string}).type.toUpperCase()}
                      </div>
                      <div>
                        <p className="font-medium">
                          •••• •••• •••• {(paymentMethod as {last4: string}).last4}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Expires {(paymentMethod as {expiry: string}).expiry}
                        </p>
                      </div>
                    </div>
                    <Button variant="outline" asChild>
                      <Link href="/desktop/dashboard/billing/payment-methods">Update</Link>
                    </Button>
                  </div>
                  <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                    <div className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-green-600" />
                      <span className="text-sm font-medium text-green-800">
                        Payment method verified
                      </span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-medium">Billing Address</h4>
                    <div className="text-sm text-muted-foreground">
                      <p>John Doe</p>
                      <p>123 Main Street</p>
                      <p>San Francisco, CA 94102</p>
                      <p>United States</p>
                    </div>
                  </div>
                </>
              ) : (
                <div className="flex flex-col items-center justify-center gap-4 py-8">
                  <p className="text-muted-foreground">No payment method added.</p>
                  <Button onClick={() => setShowPaymentModal(true)}>
                    Add Payment Method
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Usage Statistics */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="h-5 w-5" />
              Usage Statistics
            </CardTitle>
            <CardDescription>Your credit usage over time</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">0</div>
                <div className="text-sm text-muted-foreground">
                  Photos This Month
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">0</div>
                <div className="text-sm text-muted-foreground">
                  Credits Used
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">0</div>
                <div className="text-sm text-muted-foreground">
                  AI Selections
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600">0</div>
                <div className="text-sm text-muted-foreground">
                  Avg Quality Score
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Billing History */}
        <Card>
          <CardHeader>
            <CardTitle>Billing History</CardTitle>
            <CardDescription>Your recent invoices and payments</CardDescription>
          </CardHeader>
          <CardContent>
            {billingHistory.length === 0 ? (
              <div className="text-center text-muted-foreground py-8">
                No billing history yet.
              </div>
            ) : (
              <div className="space-y-4">
                {billingHistory.map((invoice) => (
                  <div
                    key={invoice.id}
                    className="flex items-center justify-between py-2"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-2 h-2 rounded-full bg-green-500"></div>
                      <div>
                        <p className="font-medium">{invoice.description}</p>
                        <p className="text-sm text-muted-foreground">
                          {new Date(invoice.date).toLocaleDateString()} • Invoice
                          #{invoice.id}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="font-medium">
                        ${invoice.amount.toFixed(2)}
                      </span>
                      <Badge variant="secondary">Paid</Badge>
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4 mr-2" />
                        Download
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Upgrade Notice */}
        <Card className="border-blue-200 bg-blue-50">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <AlertCircle className="h-5 w-5 text-blue-600 mt-0.5" />
              <div className="flex-1">
                <h3 className="font-medium text-blue-900">
                  Need more credits?
                </h3>
                <p className="text-sm text-blue-700 mt-1">
                  Upgrade to Pro Plus for 500 credits per month and priority
                  processing.
                </p>
                <Button className="mt-3" size="sm" asChild>
                  <Link href="/desktop/dashboard/billing/upgrade">
                    View Plans
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Payment Method Modal */}
      {showPaymentModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <Card className="w-full max-w-lg mx-auto shadow-2xl border border-white">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-lg">Add Payment Method</CardTitle>
              <button
                className="text-gray-400 hover:text-gray-600 text-2xl"
                onClick={() => setShowPaymentModal(false)}
                aria-label="Close"
              >
                &times;
              </button>
            </CardHeader>
            <CardContent>
              <form
                onSubmit={e => {
                  e.preventDefault();
                  setShowPaymentModal(false);
                  setCardNumber("");
                  setExpiry("");
                  setCvc("");
                  setNameOnCard("");
                  setCountry("");
                  setZip("");
                }}
                className="space-y-5"
              >
                <div>
                  <Label htmlFor="cardNumber">Card Number</Label>
                  <div className="relative mt-1">
                    <Input
                      id="cardNumber"
                      type="text"
                      inputMode="numeric"
                      autoComplete="cc-number"
                      maxLength={19}
                      value={cardNumber}
                      onChange={handleCardNumberChange}
                      placeholder="1234 5678 9012 3456"
                      required
                      className="pr-14"
                    />
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1">
                      {cardType === "Visa" && <img src="/visa.svg" alt="Visa" className="h-6" />}
                      {cardType === "Mastercard" && <img src="/mastercard.svg" alt="Mastercard" className="h-6" />}
                      {cardType === "Amex" && <img src="/amex.svg" alt="Amex" className="h-6" />}
                      {cardType === "Discover" && <img src="/discover.svg" alt="Discover" className="h-6" />}
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Enter the 16-digit card number on your card.</p>
                </div>
                <div className="flex gap-2">
                  <div className="flex-1">
                    <Label htmlFor="expiry">Expiry</Label>
                    <Input
                      id="expiry"
                      type="text"
                      inputMode="numeric"
                      autoComplete="cc-exp"
                      maxLength={5}
                      value={expiry}
                      onChange={handleExpiryChange}
                      placeholder="MM/YY"
                      required
                    />
                  </div>
                  <div className="flex-1">
                    <Label htmlFor="cvc">CVC</Label>
                    <Input
                      id="cvc"
                      type="text"
                      inputMode="numeric"
                      autoComplete="cc-csc"
                      maxLength={4}
                      value={cvc}
                      onChange={handleCvcChange}
                      placeholder="CVC"
                      required
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="nameOnCard">Name on Card</Label>
                  <Input
                    id="nameOnCard"
                    type="text"
                    autoComplete="cc-name"
                    value={nameOnCard}
                    onChange={e => setNameOnCard(e.target.value)}
                    placeholder="Full Name"
                    required
                  />
                </div>
                <div className="flex gap-2">
                  <div className="flex-1">
                    <Label htmlFor="country">Country</Label>
                    <Select value={country} onValueChange={setCountry} required>
                      <SelectTrigger id="country">
                        <SelectValue placeholder="Select country" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="US">United States</SelectItem>
                        <SelectItem value="UK">United Kingdom</SelectItem>
                        <SelectItem value="CA">Canada</SelectItem>
                        <SelectItem value="DE">Germany</SelectItem>
                        <SelectItem value="TR">Turkey</SelectItem>
                        {/* Add more countries as needed */}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex-1">
                    <Label htmlFor="zip">ZIP/Postal Code</Label>
                    <Input
                      id="zip"
                      type="text"
                      value={zip}
                      onChange={e => setZip(e.target.value)}
                      placeholder="ZIP/Postal Code"
                      required
                    />
                  </div>
                </div>
                <div className="flex gap-2 mt-4">
                  <Button type="button" variant="outline" onClick={() => setShowPaymentModal(false)} className="flex-1">Cancel</Button>
                  <Button type="submit" className="flex-1">Save</Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  );
}
