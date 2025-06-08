"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Eye, EyeOff, Shield, ArrowLeft, Gift, CheckCircle } from "lucide-react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"

export default function RegisterReferralPage() {
  const searchParams = useSearchParams()
  const referralCode = searchParams.get("ref")

  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [referrerInfo, setReferrerInfo] = useState<{ name: string; tier: string } | null>(null)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    state: "",
    agreeToTerms: false,
    agreeToPrivacy: false,
  })

  const nigerianStates = [
    "Abia",
    "Adamawa",
    "Akwa Ibom",
    "Anambra",
    "Bauchi",
    "Bayelsa",
    "Benue",
    "Borno",
    "Cross River",
    "Delta",
    "Ebonyi",
    "Edo",
    "Ekiti",
    "Enugu",
    "FCT",
    "Gombe",
    "Imo",
    "Jigawa",
    "Kaduna",
    "Kano",
    "Katsina",
    "Kebbi",
    "Kogi",
    "Kwara",
    "Lagos",
    "Nasarawa",
    "Niger",
    "Ogun",
    "Ondo",
    "Osun",
    "Oyo",
    "Plateau",
    "Rivers",
    "Sokoto",
    "Taraba",
    "Yobe",
    "Zamfara",
  ]

  useEffect(() => {
    // Simulate fetching referrer information
    if (referralCode) {
      setTimeout(() => {
        setReferrerInfo({
          name: "John Doe",
          tier: "Silver",
        })
      }, 1000)
    }
  }, [referralCode])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle registration logic here with referral code
    console.log("Registration data:", { ...formData, referralCode })
  }

  const getTierColor = (tier: string) => {
    switch (tier) {
      case "Bronze":
        return "text-orange-600 bg-orange-100"
      case "Silver":
        return "text-gray-600 bg-gray-100"
      case "Gold":
        return "text-yellow-600 bg-yellow-100"
      case "Platinum":
        return "text-purple-600 bg-purple-100"
      case "Diamond":
        return "text-blue-600 bg-blue-100"
      default:
        return "text-gray-600 bg-gray-100"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-digix-blue-50 to-white py-8 px-4">
      <div className="container mx-auto max-w-md">
        <div className="mb-6">
          <Link href="/" className="flex items-center text-digix-blue-600 hover:text-digix-blue-700">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>
        </div>

        {/* Referral Banner */}
        {referralCode && (
          <Card className="mb-6 border-digix-green-200 bg-digix-green-50">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-digix-green-100 rounded-full flex items-center justify-center">
                  <Gift className="w-6 h-6 text-digix-green-600" />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-digix-green-900">You've been invited!</h3>
                  {referrerInfo ? (
                    <div className="flex items-center space-x-2 mt-1">
                      <p className="text-sm text-digix-green-800">
                        Invited by: <span className="font-medium">{referrerInfo.name}</span>
                      </p>
                      <Badge className={getTierColor(referrerInfo.tier)}>{referrerInfo.tier}</Badge>
                    </div>
                  ) : (
                    <p className="text-sm text-digix-green-800">Loading referrer information...</p>
                  )}
                </div>
              </div>

              <div className="mt-3 p-3 bg-white rounded-md border border-digix-green-200">
                <div className="flex items-center space-x-2 mb-2">
                  <CheckCircle className="w-4 h-4 text-digix-green-600" />
                  <span className="font-medium text-digix-green-900">Welcome Bonus</span>
                </div>
                <ul className="text-sm text-digix-green-800 space-y-1">
                  <li>• Get ₦1,000 welcome bonus on your first trade</li>
                  <li>• Reduced trading fees for your first month</li>
                  <li>• Priority customer support</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        )}

        <Card>
          <CardHeader className="text-center">
            <div className="w-12 h-12 bg-digix-blue-600 rounded-lg flex items-center justify-center mx-auto mb-4">
              <span className="text-white font-bold">D</span>
            </div>
            <CardTitle className="text-2xl text-digix-blue-900">Create Your Account</CardTitle>
            <CardDescription>
              {referralCode
                ? "Complete your registration to claim your welcome bonus"
                : "Join thousands of Nigerians trading USDT securely"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    id="firstName"
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    required
                    className="border-digix-blue-200 focus:border-digix-blue-500"
                  />
                </div>
                <div>
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    required
                    className="border-digix-blue-200 focus:border-digix-blue-500"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  className="border-digix-blue-200 focus:border-digix-blue-500"
                />
              </div>

              <div>
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="+234 800 000 0000"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  required
                  className="border-digix-blue-200 focus:border-digix-blue-500"
                />
              </div>

              <div>
                <Label htmlFor="state">State of Residence</Label>
                <Select value={formData.state} onValueChange={(value) => setFormData({ ...formData, state: value })}>
                  <SelectTrigger className="border-digix-blue-200 focus:border-digix-blue-500">
                    <SelectValue placeholder="Select your state" />
                  </SelectTrigger>
                  <SelectContent>
                    {nigerianStates.map((state) => (
                      <SelectItem key={state} value={state.toLowerCase()}>
                        {state}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    required
                    className="border-digix-blue-200 focus:border-digix-blue-500"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </Button>
                </div>
              </div>

              <div>
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                    required
                    className="border-digix-blue-200 focus:border-digix-blue-500"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </Button>
                </div>
              </div>

              {/* Referral Code Display */}
              {referralCode && (
                <div>
                  <Label>Referral Code</Label>
                  <div className="bg-digix-blue-50 p-3 rounded-md border border-digix-blue-200">
                    <code className="text-sm font-mono text-digix-blue-900">{referralCode}</code>
                  </div>
                </div>
              )}

              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="terms"
                    checked={formData.agreeToTerms}
                    onCheckedChange={(checked) => setFormData({ ...formData, agreeToTerms: checked as boolean })}
                  />
                  <Label htmlFor="terms" className="text-sm">
                    I agree to the{" "}
                    <Link href="/terms" className="text-digix-blue-600 hover:underline">
                      Terms of Service
                    </Link>
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="privacy"
                    checked={formData.agreeToPrivacy}
                    onCheckedChange={(checked) => setFormData({ ...formData, agreeToPrivacy: checked as boolean })}
                  />
                  <Label htmlFor="privacy" className="text-sm">
                    I agree to the{" "}
                    <Link href="/privacy" className="text-digix-blue-600 hover:underline">
                      Privacy Policy
                    </Link>
                  </Label>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full bg-digix-blue-600 hover:bg-digix-blue-700"
                disabled={!formData.agreeToTerms || !formData.agreeToPrivacy}
              >
                {referralCode ? "Create Account & Claim Bonus" : "Create Account"}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Already have an account?{" "}
                <Link href="/login" className="text-digix-blue-600 hover:underline">
                  Sign in
                </Link>
              </p>
            </div>

            <div className="mt-6 p-4 bg-digix-green-50 rounded-lg border border-digix-green-100">
              <div className="flex items-center space-x-2">
                <Shield className="w-5 h-5 text-digix-green-600" />
                <span className="text-sm font-medium text-digix-green-800">Your data is secure</span>
              </div>
              <p className="text-xs text-digix-green-700 mt-1">
                We use bank-level encryption to protect your personal information
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
