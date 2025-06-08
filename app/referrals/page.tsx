"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  ArrowLeft,
  Copy,
  Share2,
  Users,
  Gift,
  TrendingUp,
  CheckCircle,
  Star,
  Wallet,
  Calendar,
  Award,
} from "lucide-react"
import Link from "next/link"

interface ReferralData {
  referralCode: string
  totalReferrals: number
  activeReferrals: number
  totalEarnings: number
  pendingEarnings: number
  currentTier: string
  nextTier: string
  progressToNextTier: number
}

interface ReferralHistory {
  id: string
  referredUser: string
  joinDate: string
  status: "active" | "pending" | "inactive"
  earnings: number
  lastActivity: string
}

export default function ReferralsPage() {
  const [copied, setCopied] = useState(false)

  // Mock referral data
  const referralData: ReferralData = {
    referralCode: "DIGIX-JD2024",
    totalReferrals: 12,
    activeReferrals: 8,
    totalEarnings: 45000,
    pendingEarnings: 12500,
    currentTier: "Silver",
    nextTier: "Gold",
    progressToNextTier: 65,
  }

  const referralHistory: ReferralHistory[] = [
    {
      id: "REF001",
      referredUser: "user1@example.com",
      joinDate: "2024-01-15",
      status: "active",
      earnings: 5000,
      lastActivity: "2024-01-20",
    },
    {
      id: "REF002",
      referredUser: "user2@example.com",
      joinDate: "2024-01-12",
      status: "active",
      earnings: 8500,
      lastActivity: "2024-01-19",
    },
    {
      id: "REF003",
      referredUser: "user3@example.com",
      joinDate: "2024-01-10",
      status: "pending",
      earnings: 0,
      lastActivity: "2024-01-10",
    },
  ]

  const tiers = [
    { name: "Bronze", minReferrals: 0, commission: "0.5%", bonus: "₦1,000" },
    { name: "Silver", minReferrals: 5, commission: "0.75%", bonus: "₦2,500" },
    { name: "Gold", minReferrals: 15, commission: "1%", bonus: "₦5,000" },
    { name: "Platinum", minReferrals: 30, commission: "1.25%", bonus: "₦10,000" },
    { name: "Diamond", minReferrals: 50, commission: "1.5%", bonus: "₦25,000" },
  ]

  const referralLink = `https://digix.ng/register?ref=${referralData.referralCode}`

  const copyReferralLink = () => {
    navigator.clipboard.writeText(referralLink)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const shareReferralLink = () => {
    if (navigator.share) {
      navigator.share({
        title: "Join DigiX - Nigeria's Premier USDT Trading Platform",
        text: "Trade USDT securely with DigiX. Get started with my referral link!",
        url: referralLink,
      })
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-digix-green-100 text-digix-green-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "inactive":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getTierColor = (tier: string) => {
    switch (tier) {
      case "Bronze":
        return "text-orange-600"
      case "Silver":
        return "text-gray-600"
      case "Gold":
        return "text-yellow-600"
      case "Platinum":
        return "text-purple-600"
      case "Diamond":
        return "text-blue-600"
      default:
        return "text-gray-600"
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="mb-6">
          <Link href="/dashboard" className="flex items-center text-digix-blue-600 hover:text-digix-blue-700">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Link>
        </div>

        <div className="mb-8">
          <h1 className="text-2xl font-bold text-digix-blue-900 mb-2">Referral Program</h1>
          <p className="text-gray-600">Earn rewards by inviting friends to join DigiX</p>
        </div>

        {/* Overview Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card className="border-digix-blue-100">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Referrals</p>
                  <p className="text-2xl font-bold text-digix-blue-900">{referralData.totalReferrals}</p>
                </div>
                <Users className="w-8 h-8 text-digix-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-digix-blue-100">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Active Referrals</p>
                  <p className="text-2xl font-bold text-digix-blue-900">{referralData.activeReferrals}</p>
                </div>
                <TrendingUp className="w-8 h-8 text-digix-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-digix-blue-100">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Earnings</p>
                  <p className="text-2xl font-bold text-digix-blue-900">
                    ₦{referralData.totalEarnings.toLocaleString()}
                  </p>
                </div>
                <Wallet className="w-8 h-8 text-digix-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-digix-blue-100">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Current Tier</p>
                  <p className={`text-2xl font-bold ${getTierColor(referralData.currentTier)}`}>
                    {referralData.currentTier}
                  </p>
                </div>
                <Award className="w-8 h-8 text-digix-blue-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="share">Share & Earn</TabsTrigger>
            <TabsTrigger value="history">Referral History</TabsTrigger>
            <TabsTrigger value="tiers">Tier System</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview">
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Referral Progress */}
              <Card className="border-digix-blue-100">
                <CardHeader>
                  <CardTitle className="text-digix-blue-900">Tier Progress</CardTitle>
                  <CardDescription>Your progress to the next tier level</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className={`font-medium ${getTierColor(referralData.currentTier)}`}>
                      {referralData.currentTier}
                    </span>
                    <span className={`font-medium ${getTierColor(referralData.nextTier)}`}>
                      {referralData.nextTier}
                    </span>
                  </div>

                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div
                      className="bg-digix-blue-600 h-3 rounded-full transition-all duration-300"
                      style={{ width: `${referralData.progressToNextTier}%` }}
                    ></div>
                  </div>

                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <span>{referralData.activeReferrals} referrals</span>
                    <span>{referralData.progressToNextTier}% complete</span>
                  </div>

                  <div className="bg-digix-blue-50 p-3 rounded-lg">
                    <p className="text-sm text-digix-blue-800">
                      You need {15 - referralData.activeReferrals} more active referrals to reach{" "}
                      {referralData.nextTier} tier
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Earnings Summary */}
              <Card className="border-digix-blue-100">
                <CardHeader>
                  <CardTitle className="text-digix-blue-900">Earnings Summary</CardTitle>
                  <CardDescription>Your referral earnings breakdown</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-digix-green-50 rounded-lg">
                    <div>
                      <p className="text-sm text-gray-600">Available Balance</p>
                      <p className="text-xl font-bold text-digix-green-700">
                        ₦{(referralData.totalEarnings - referralData.pendingEarnings).toLocaleString()}
                      </p>
                    </div>
                    <Button size="sm" className="bg-digix-green-600 hover:bg-digix-green-700">
                      Withdraw
                    </Button>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                    <div>
                      <p className="text-sm text-gray-600">Pending Earnings</p>
                      <p className="text-xl font-bold text-yellow-700">
                        ₦{referralData.pendingEarnings.toLocaleString()}
                      </p>
                    </div>
                    <Badge variant="outline" className="text-yellow-600 border-yellow-200">
                      Processing
                    </Badge>
                  </div>

                  <div className="text-xs text-gray-500 space-y-1">
                    <p>• Earnings are credited when your referrals complete their first trade</p>
                    <p>• Minimum withdrawal amount is ₦5,000</p>
                    <p>• Withdrawals are processed within 24 hours</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Share & Earn Tab */}
          <TabsContent value="share">
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Referral Link */}
              <Card className="border-digix-blue-100">
                <CardHeader>
                  <CardTitle className="text-digix-blue-900">Your Referral Link</CardTitle>
                  <CardDescription>Share this link to earn rewards</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Input value={referralLink} readOnly className="border-digix-blue-200 bg-gray-50" />
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={copyReferralLink}
                      className="border-digix-blue-200 text-digix-blue-600"
                    >
                      {copied ? <CheckCircle className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    </Button>
                  </div>

                  <div className="flex space-x-2">
                    <Button className="flex-1 bg-digix-blue-600 hover:bg-digix-blue-700" onClick={shareReferralLink}>
                      <Share2 className="w-4 h-4 mr-2" />
                      Share Link
                    </Button>
                  </div>

                  <div className="bg-digix-blue-50 p-3 rounded-lg">
                    <p className="text-sm text-digix-blue-800 font-medium mb-1">Your Referral Code:</p>
                    <p className="text-lg font-mono text-digix-blue-900">{referralData.referralCode}</p>
                  </div>
                </CardContent>
              </Card>

              {/* How It Works */}
              <Card className="border-digix-blue-100">
                <CardHeader>
                  <CardTitle className="text-digix-blue-900">How It Works</CardTitle>
                  <CardDescription>Earn rewards in 3 simple steps</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <div className="w-8 h-8 bg-digix-blue-100 rounded-full flex items-center justify-center shrink-0">
                        <span className="text-digix-blue-600 font-bold text-sm">1</span>
                      </div>
                      <div>
                        <h3 className="font-medium text-digix-blue-900">Share Your Link</h3>
                        <p className="text-sm text-gray-600">Send your referral link to friends and family</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3">
                      <div className="w-8 h-8 bg-digix-blue-100 rounded-full flex items-center justify-center shrink-0">
                        <span className="text-digix-blue-600 font-bold text-sm">2</span>
                      </div>
                      <div>
                        <h3 className="font-medium text-digix-blue-900">They Sign Up</h3>
                        <p className="text-sm text-gray-600">Your friends create an account using your link</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3">
                      <div className="w-8 h-8 bg-digix-green-100 rounded-full flex items-center justify-center shrink-0">
                        <span className="text-digix-green-600 font-bold text-sm">3</span>
                      </div>
                      <div>
                        <h3 className="font-medium text-digix-blue-900">Earn Rewards</h3>
                        <p className="text-sm text-gray-600">Get commission on their trading activity</p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 p-4 bg-digix-green-50 rounded-lg border border-digix-green-100">
                    <div className="flex items-center space-x-2 mb-2">
                      <Gift className="w-5 h-5 text-digix-green-600" />
                      <span className="font-medium text-digix-green-900">Bonus Rewards</span>
                    </div>
                    <ul className="text-sm text-digix-green-800 space-y-1">
                      <li>• ₦2,500 bonus for each successful referral</li>
                      <li>• 0.75% commission on all their trades</li>
                      <li>• Additional tier bonuses as you progress</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Referral History Tab */}
          <TabsContent value="history">
            <Card className="border-digix-blue-100">
              <CardHeader>
                <CardTitle className="text-digix-blue-900">Referral History</CardTitle>
                <CardDescription>Track your referred users and earnings</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {referralHistory.map((referral) => (
                    <div
                      key={referral.id}
                      className="flex items-center justify-between p-4 border rounded-lg border-digix-blue-100"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-digix-blue-100 rounded-full flex items-center justify-center">
                          <Users className="w-5 h-5 text-digix-blue-600" />
                        </div>
                        <div>
                          <p className="font-medium text-digix-blue-900">{referral.referredUser}</p>
                          <div className="flex items-center space-x-4 text-sm text-gray-500">
                            <span className="flex items-center">
                              <Calendar className="w-3 h-3 mr-1" />
                              Joined: {referral.joinDate}
                            </span>
                            <span>Last active: {referral.lastActivity}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="text-right">
                          <Badge className={getStatusColor(referral.status)}>{referral.status}</Badge>
                          <p className="text-sm text-gray-500 mt-1">Earned: ₦{referral.earnings.toLocaleString()}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {referralHistory.length === 0 && (
                  <div className="text-center py-8">
                    <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No Referrals Yet</h3>
                    <p className="text-gray-600 mb-4">Start sharing your referral link to earn rewards!</p>
                    <Button className="bg-digix-blue-600 hover:bg-digix-blue-700">Share Your Link</Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Tier System Tab */}
          <TabsContent value="tiers">
            <Card className="border-digix-blue-100">
              <CardHeader>
                <CardTitle className="text-digix-blue-900">Tier System</CardTitle>
                <CardDescription>Unlock higher rewards as you refer more users</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {tiers.map((tier, index) => (
                    <div
                      key={tier.name}
                      className={`p-4 rounded-lg border-2 ${
                        tier.name === referralData.currentTier
                          ? "border-digix-blue-500 bg-digix-blue-50"
                          : "border-gray-200"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div
                            className={`w-10 h-10 rounded-full flex items-center justify-center ${
                              tier.name === referralData.currentTier ? "bg-digix-blue-600" : "bg-gray-200"
                            }`}
                          >
                            <Star
                              className={`w-5 h-5 ${
                                tier.name === referralData.currentTier ? "text-white" : "text-gray-500"
                              }`}
                            />
                          </div>
                          <div>
                            <h3 className={`font-bold text-lg ${getTierColor(tier.name)}`}>{tier.name}</h3>
                            <p className="text-sm text-gray-600">{tier.minReferrals}+ active referrals</p>
                          </div>
                        </div>

                        <div className="text-right">
                          <div className="flex items-center space-x-4">
                            <div>
                              <p className="text-sm text-gray-600">Commission</p>
                              <p className="font-bold text-digix-blue-900">{tier.commission}</p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-600">Signup Bonus</p>
                              <p className="font-bold text-digix-green-600">{tier.bonus}</p>
                            </div>
                          </div>
                        </div>
                      </div>

                      {tier.name === referralData.currentTier && (
                        <div className="mt-3 flex items-center space-x-2">
                          <CheckCircle className="w-4 h-4 text-digix-green-600" />
                          <span className="text-sm font-medium text-digix-green-600">Current Tier</span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                <div className="mt-6 p-4 bg-digix-blue-50 rounded-lg border border-digix-blue-100">
                  <h4 className="font-medium text-digix-blue-900 mb-2">Tier Benefits</h4>
                  <ul className="text-sm text-digix-blue-800 space-y-1">
                    <li>• Higher commission rates on referral trades</li>
                    <li>• Increased signup bonuses for new referrals</li>
                    <li>• Priority customer support</li>
                    <li>• Exclusive promotional offers</li>
                    <li>• Early access to new features</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
