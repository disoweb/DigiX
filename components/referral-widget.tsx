"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Gift, Copy, CheckCircle, ArrowRight } from "lucide-react"
import Link from "next/link"

export function ReferralWidget() {
  const [copied, setCopied] = useState(false)

  // Mock data
  const referralData = {
    totalReferrals: 12,
    totalEarnings: 45000,
    referralCode: "DIGIX-JD2024",
    currentTier: "Silver",
  }

  const referralLink = `https://digix.ng/register?ref=${referralData.referralCode}`

  const copyReferralCode = () => {
    navigator.clipboard.writeText(referralData.referralCode)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
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
    <Card className="border-digix-blue-100">
      <CardHeader>
        <CardTitle className="text-digix-blue-900 flex items-center space-x-2">
          <Gift className="w-5 h-5 text-digix-blue-600" />
          <span>Referral Program</span>
        </CardTitle>
        <CardDescription>Earn rewards by inviting friends to DigiX</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Stats */}
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center p-3 bg-digix-blue-50 rounded-lg">
            <div className="text-2xl font-bold text-digix-blue-900">{referralData.totalReferrals}</div>
            <div className="text-sm text-gray-600">Total Referrals</div>
          </div>
          <div className="text-center p-3 bg-digix-green-50 rounded-lg">
            <div className="text-2xl font-bold text-digix-green-700">
              ₦{referralData.totalEarnings.toLocaleString()}
            </div>
            <div className="text-sm text-gray-600">Total Earnings</div>
          </div>
        </div>

        {/* Current Tier */}
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">Current Tier:</span>
          <Badge className={getTierColor(referralData.currentTier)}>{referralData.currentTier}</Badge>
        </div>

        {/* Referral Code */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Your Referral Code:</span>
            <Button
              variant="ghost"
              size="sm"
              onClick={copyReferralCode}
              className="text-digix-blue-600 hover:bg-digix-blue-50"
            >
              {copied ? <CheckCircle className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            </Button>
          </div>
          <div className="bg-digix-blue-50 p-3 rounded-md">
            <code className="text-sm font-mono text-digix-blue-900">{referralData.referralCode}</code>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-2">
          <Link href="/referrals">
            <Button className="w-full bg-digix-blue-600 hover:bg-digix-blue-700">
              View Referral Dashboard
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>

        {/* Quick Info */}
        <div className="text-xs text-gray-500 space-y-1">
          <p>• Earn ₦2,500 for each successful referral</p>
          <p>• Get 0.75% commission on their trades</p>
          <p>• Unlock higher tiers for better rewards</p>
        </div>
      </CardContent>
    </Card>
  )
}
