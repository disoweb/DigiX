"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Wallet,
  TrendingUp,
  TrendingDown,
  Eye,
  EyeOff,
  Plus,
  Minus,
  History,
  Settings,
  Menu,
  X,
  Shield,
  Gift,
  Send,
  CreditCard,
  UserCheck,
} from "lucide-react"
import { PriceTicker } from "@/components/price-ticker"
import { ReferralWidget } from "@/components/referral-widget"
import { NotificationSystem } from "@/components/notification-system"
import Link from "next/link"

export default function DashboardPage() {
  const [showBalance, setShowBalance] = useState(true)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const recentTransactions = [
    { id: 1, type: "buy", amount: 500, rate: 1650, status: "completed", date: "2024-01-15" },
    { id: 2, type: "sell", amount: 200, rate: 1645, status: "pending", date: "2024-01-14" },
    { id: 3, type: "escrow", amount: 1000, rate: 1640, status: "completed", date: "2024-01-13" },
  ]

  // Mock KYC status
  const kycStatus = "pending" // can be: "incomplete", "pending", "approved", "rejected"

  const getKYCStatusColor = (status: string) => {
    switch (status) {
      case "approved":
        return "bg-digix-green-100 text-digix-green-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "rejected":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Header */}
      <header className="lg:hidden bg-white border-b px-4 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-digix-blue-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">D</span>
          </div>
          <span className="font-semibold text-digix-blue-900">DigiX</span>
        </div>
        <div className="flex items-center space-x-2">
          <NotificationSystem />
          <Button variant="ghost" size="sm" onClick={() => setSidebarOpen(!sidebarOpen)}>
            {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside
          className={`${sidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0 fixed lg:static inset-y-0 left-0 z-50 w-64 bg-white border-r transition-transform duration-200 ease-in-out`}
        >
          <div className="p-6 border-b">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-digix-blue-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">D</span>
                </div>
                <span className="text-xl font-bold text-digix-blue-900">DigiX</span>
              </div>
              <div className="hidden lg:block">
                <NotificationSystem />
              </div>
            </div>
          </div>

          <nav className="p-4 space-y-2">
            <Link
              href="/dashboard"
              className="flex items-center space-x-3 px-3 py-2 rounded-lg bg-digix-blue-50 text-digix-blue-700"
            >
              <Wallet className="w-5 h-5" />
              <span>Dashboard</span>
            </Link>
            <Link href="/buy" className="flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-gray-50">
              <Plus className="w-5 h-5" />
              <span>Buy USDT</span>
            </Link>
            <Link href="/sell" className="flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-gray-50">
              <Minus className="w-5 h-5" />
              <span>Sell USDT</span>
            </Link>
            <Link href="/transfer" className="flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-gray-50">
              <Send className="w-5 h-5" />
              <span>Send Money</span>
            </Link>
            <Link href="/bills" className="flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-gray-50">
              <CreditCard className="w-5 h-5" />
              <span>Pay Bills</span>
            </Link>
            <Link href="/escrow" className="flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-gray-50">
              <Shield className="w-5 h-5" />
              <span>Escrow Service</span>
            </Link>
            <Link href="/referrals" className="flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-gray-50">
              <Gift className="w-5 h-5" />
              <span>Referrals</span>
            </Link>
            <Link href="/history" className="flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-gray-50">
              <History className="w-5 h-5" />
              <span>Transaction History</span>
            </Link>
            <Link href="/settings" className="flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-gray-50">
              <Settings className="w-5 h-5" />
              <span>Settings</span>
            </Link>
          </nav>

          <div className="absolute bottom-4 left-4 right-4">
            <Card className="border-digix-blue-100">
              <CardContent className="p-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
                  <div>
                    <p className="font-medium text-sm">John Doe</p>
                    <p className="text-xs text-gray-500">john@example.com</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-4 lg:p-8">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-digix-blue-900 mb-2">Dashboard</h1>
            <p className="text-gray-600">Welcome back! Here's your trading overview.</p>
          </div>

          {/* KYC Status Alert */}
          {kycStatus !== "approved" && (
            <Card className="mb-8 border-yellow-200 bg-yellow-50">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <UserCheck className="w-5 h-5 text-yellow-600" />
                    <div>
                      <p className="font-medium text-yellow-900">
                        {kycStatus === "incomplete" && "Complete your KYC verification"}
                        {kycStatus === "pending" && "KYC verification in progress"}
                        {kycStatus === "rejected" && "KYC verification rejected"}
                      </p>
                      <p className="text-sm text-yellow-800">
                        {kycStatus === "incomplete" && "Verify your identity to unlock higher limits and reduced fees"}
                        {kycStatus === "pending" &&
                          "Your documents are being reviewed. You'll be notified once approved."}
                        {kycStatus === "rejected" && "Please resubmit your documents for verification"}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge className={getKYCStatusColor(kycStatus)}>{kycStatus}</Badge>
                    {kycStatus === "incomplete" && (
                      <Link href="/kyc">
                        <Button size="sm" className="bg-yellow-600 hover:bg-yellow-700">
                          Start KYC
                        </Button>
                      </Link>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Live Price Card */}
          <Card className="mb-8 border-digix-blue-100">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">USDT/NGN Live Rate</p>
                  <PriceTicker />
                </div>
                <div className="text-right">
                  <p className="text-sm text-digix-green-600 font-medium">Live</p>
                  <p className="text-xs text-gray-500">Real-time</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Balance Cards */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <Card className="border-digix-blue-100">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">USDT Balance</CardTitle>
                <Button variant="ghost" size="sm" onClick={() => setShowBalance(!showBalance)}>
                  {showBalance ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                </Button>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-digix-blue-900">{showBalance ? "1,250.00 USDT" : "••••••"}</div>
                <p className="text-xs text-muted-foreground">≈ ₦2,062,500.00</p>
              </CardContent>
            </Card>

            <Card className="border-digix-blue-100">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">NGN Balance</CardTitle>
                <Wallet className="w-4 h-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-digix-blue-900">{showBalance ? "₦50,000.00" : "••••••"}</div>
                <p className="text-xs text-muted-foreground">Available for trading</p>
              </CardContent>
            </Card>

            <Card className="border-digix-blue-100">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Escrow Balance</CardTitle>
                <Shield className="w-4 h-4 text-digix-green-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-digix-blue-900">{showBalance ? "500.00 USDT" : "••••••"}</div>
                <p className="text-xs text-muted-foreground">In active escrows</p>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card className="border-digix-blue-100">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-digix-blue-900">
                  <Plus className="w-5 h-5 text-digix-green-600" />
                  <span>Buy USDT</span>
                </CardTitle>
                <CardDescription>Purchase USDT with Nigerian Naira</CardDescription>
              </CardHeader>
              <CardContent>
                <Link href="/buy">
                  <Button className="w-full bg-digix-blue-600 hover:bg-digix-blue-700">Buy Now</Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="border-digix-blue-100">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-digix-blue-900">
                  <Minus className="w-5 h-5 text-red-600" />
                  <span>Sell USDT</span>
                </CardTitle>
                <CardDescription>Convert your USDT to Nigerian Naira</CardDescription>
              </CardHeader>
              <CardContent>
                <Link href="/sell">
                  <Button variant="outline" className="w-full border-digix-blue-200 text-digix-blue-600">
                    Sell Now
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="border-digix-blue-100">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-digix-blue-900">
                  <Send className="w-5 h-5 text-purple-600" />
                  <span>Send Money</span>
                </CardTitle>
                <CardDescription>Transfer to other DigiX users</CardDescription>
              </CardHeader>
              <CardContent>
                <Link href="/transfer">
                  <Button variant="outline" className="w-full border-purple-200 text-purple-600">
                    Send Now
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="border-digix-blue-100">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-digix-blue-900">
                  <CreditCard className="w-5 h-5 text-orange-600" />
                  <span>Pay Bills</span>
                </CardTitle>
                <CardDescription>Pay electricity, internet, and more</CardDescription>
              </CardHeader>
              <CardContent>
                <Link href="/bills">
                  <Button variant="outline" className="w-full border-orange-200 text-orange-600">
                    Pay Bills
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>

          {/* Referral Widget */}
          <div className="mb-8">
            <ReferralWidget />
          </div>

          {/* Recent Transactions */}
          <Card className="border-digix-blue-100">
            <CardHeader>
              <CardTitle className="text-digix-blue-900">Recent Transactions</CardTitle>
              <CardDescription>Your latest trading activity</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentTransactions.map((transaction) => (
                  <div
                    key={transaction.id}
                    className="flex items-center justify-between p-4 border rounded-lg border-digix-blue-100"
                  >
                    <div className="flex items-center space-x-4">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          transaction.type === "buy"
                            ? "bg-digix-green-100"
                            : transaction.type === "sell"
                              ? "bg-red-100"
                              : "bg-digix-blue-100"
                        }`}
                      >
                        {transaction.type === "buy" ? (
                          <TrendingUp className="w-5 h-5 text-digix-green-600" />
                        ) : transaction.type === "sell" ? (
                          <TrendingDown className="w-5 h-5 text-red-600" />
                        ) : (
                          <Shield className="w-5 h-5 text-digix-blue-600" />
                        )}
                      </div>
                      <div>
                        <p className="font-medium text-digix-blue-900">
                          {transaction.type === "buy" ? "Bought" : transaction.type === "sell" ? "Sold" : "Escrow"}{" "}
                          {transaction.amount} USDT
                        </p>
                        <p className="text-sm text-gray-500">Rate: ₦{transaction.rate.toLocaleString()}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge
                        variant={transaction.status === "completed" ? "default" : "secondary"}
                        className={transaction.status === "completed" ? "bg-digix-green-100 text-digix-green-800" : ""}
                      >
                        {transaction.status}
                      </Badge>
                      <p className="text-sm text-gray-500 mt-1">{transaction.date}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4">
                <Link href="/history">
                  <Button variant="outline" className="w-full border-digix-blue-200 text-digix-blue-600">
                    View All Transactions
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40" onClick={() => setSidebarOpen(false)} />
      )}
    </div>
  )
}
