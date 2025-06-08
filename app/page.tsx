import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Shield, Smartphone, TrendingUp, Users, Zap, Lock, Star, CheckCircle, Gift, Award } from "lucide-react"
import { PriceTicker } from "@/components/price-ticker"
import Link from "next/link"

export default function HomePage() {
  const testimonials = [
    {
      name: "Adebayo Ogundimu",
      role: "Crypto Trader",
      content: "DigiX has made USDT trading so simple and secure. The rates are always competitive!",
      rating: 5,
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      name: "Fatima Hassan",
      role: "Business Owner",
      content: "I use DigiX for all my international payments. Fast, reliable, and trustworthy.",
      rating: 5,
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      name: "Chinedu Okoro",
      role: "Freelancer",
      content: "The escrow feature gives me confidence when dealing with new clients. Highly recommended!",
      rating: 5,
      avatar: "/placeholder.svg?height=40&width=40",
    },
  ]

  const stats = [
    { label: "Active Users", value: "50,000+" },
    { label: "Total Volume", value: "₦2.5B+" },
    { label: "Transactions", value: "500,000+" },
    { label: "Success Rate", value: "99.9%" },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-digix-blue-50 to-white">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-digix-blue-600 rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-lg">D</span>
            </div>
            <span className="text-2xl font-bold text-digix-blue-900">DigiX</span>
          </div>
          <nav className="hidden md:flex items-center space-x-6">
            <Link href="#features" className="text-gray-600 hover:text-digix-blue-600">
              Features
            </Link>
            <Link href="#security" className="text-gray-600 hover:text-digix-blue-600">
              Security
            </Link>
            <Link href="#testimonials" className="text-gray-600 hover:text-digix-blue-600">
              Reviews
            </Link>
            <Link href="/escrow" className="text-gray-600 hover:text-digix-blue-600">
              Escrow
            </Link>
          </nav>
          <div className="flex items-center space-x-3">
            <Link href="/login">
              <Button variant="ghost" className="text-digix-blue-600">
                Login
              </Button>
            </Link>
            <Link href="/register">
              <Button className="bg-digix-blue-600 hover:bg-digix-blue-700">Get Started</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <Badge className="mb-6 bg-digix-green-100 text-digix-green-800 border-digix-green-200">
            <CheckCircle className="w-4 h-4 mr-1" />
            Trusted by 50,000+ Nigerians
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold text-digix-blue-900 mb-6">
            Nigeria's Premier USDT Trading Platform
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Buy, sell, and trade USDT with confidence. Secure escrow services, real-time rates, and instant transactions
            designed for Nigerians.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link href="/register">
              <Button size="lg" className="bg-digix-blue-600 hover:bg-digix-blue-700 px-8">
                Start Trading Now
              </Button>
            </Link>
            <Link href="/escrow">
              <Button size="lg" variant="outline" className="px-8 border-digix-blue-600 text-digix-blue-600">
                Try Escrow Service
              </Button>
            </Link>
          </div>

          {/* Live Price Display */}
          <Card className="max-w-lg mx-auto">
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
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 bg-digix-blue-600 text-white">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            {stats.map((stat, index) => (
              <div key={index}>
                <div className="text-3xl font-bold mb-2">{stat.value}</div>
                <div className="text-digix-blue-100">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 bg-white">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-digix-blue-900">Why Choose DigiX?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-digix-blue-100">
              <CardHeader>
                <Shield className="w-12 h-12 text-digix-green-600 mb-4" />
                <CardTitle className="text-digix-blue-900">Bank-Level Security</CardTitle>
                <CardDescription>
                  Your funds are protected with military-grade encryption and multi-factor authentication
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-digix-blue-100">
              <CardHeader>
                <Zap className="w-12 h-12 text-digix-green-600 mb-4" />
                <CardTitle className="text-digix-blue-900">Instant Transactions</CardTitle>
                <CardDescription>
                  Buy and sell USDT instantly with real-time processing and immediate confirmations
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-digix-blue-100">
              <CardHeader>
                <Smartphone className="w-12 h-12 text-digix-green-600 mb-4" />
                <CardTitle className="text-digix-blue-900">Mobile First</CardTitle>
                <CardDescription>
                  Optimized for mobile devices with a seamless experience across all platforms
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-digix-blue-100">
              <CardHeader>
                <TrendingUp className="w-12 h-12 text-digix-green-600 mb-4" />
                <CardTitle className="text-digix-blue-900">Real-Time Rates</CardTitle>
                <CardDescription>
                  Get the best exchange rates with live market data and transparent pricing
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-digix-blue-100">
              <CardHeader>
                <Users className="w-12 h-12 text-digix-green-600 mb-4" />
                <CardTitle className="text-digix-blue-900">Escrow Protection</CardTitle>
                <CardDescription>
                  All transactions are protected by our secure escrow system for complete peace of mind
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-digix-blue-100">
              <CardHeader>
                <Lock className="w-12 h-12 text-digix-green-600 mb-4" />
                <CardTitle className="text-digix-blue-900">Regulatory Compliant</CardTitle>
                <CardDescription>
                  Fully compliant with Nigerian financial regulations and international standards
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 px-4 bg-gray-50">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-digix-blue-900">What Our Users Say</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="border-digix-blue-100">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-gray-600 mb-4">"{testimonial.content}"</p>
                  <div className="flex items-center space-x-3">
                    <img
                      src={testimonial.avatar || "/placeholder.svg"}
                      alt={testimonial.name}
                      className="w-10 h-10 rounded-full"
                    />
                    <div>
                      <p className="font-medium text-digix-blue-900">{testimonial.name}</p>
                      <p className="text-sm text-gray-500">{testimonial.role}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Referral Program Section */}
      <section className="py-20 px-4 bg-white">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold text-digix-blue-900 mb-6">Earn While You Share</h2>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Join our referral program and earn rewards for every friend you bring to DigiX
          </p>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="text-center">
              <div className="w-16 h-16 bg-digix-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Gift className="w-8 h-8 text-digix-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-digix-blue-900 mb-2">₦2,500 Bonus</h3>
              <p className="text-gray-600">For each successful referral</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-digix-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-8 h-8 text-digix-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-digix-blue-900 mb-2">0.75% Commission</h3>
              <p className="text-gray-600">On all their trading activity</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-digix-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-digix-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-digix-blue-900 mb-2">Tier Rewards</h3>
              <p className="text-gray-600">Unlock higher rewards as you grow</p>
            </div>
          </div>

          <Link href="/register">
            <Button size="lg" className="bg-digix-blue-600 hover:bg-digix-blue-700 px-8">
              Start Earning Today
            </Button>
          </Link>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-digix-blue-600 text-white">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Start Trading?</h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of Nigerians already trading USDT securely with DigiX
          </p>
          <Link href="/register">
            <Button size="lg" variant="secondary" className="px-8 bg-white text-digix-blue-600 hover:bg-gray-100">
              Create Free Account
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-digix-blue-900 text-white py-12 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-digix-blue-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">D</span>
                </div>
                <span className="text-xl font-bold">DigiX</span>
              </div>
              <p className="text-digix-blue-100">Nigeria's most trusted USDT trading platform</p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Platform</h3>
              <ul className="space-y-2 text-digix-blue-100">
                <li>
                  <Link href="/buy">Buy USDT</Link>
                </li>
                <li>
                  <Link href="/sell">Sell USDT</Link>
                </li>
                <li>
                  <Link href="/escrow">Escrow Service</Link>
                </li>
                <li>
                  <Link href="/wallet">Wallet</Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-digix-blue-100">
                <li>
                  <Link href="/help">Help Center</Link>
                </li>
                <li>
                  <Link href="/contact">Contact Us</Link>
                </li>
                <li>
                  <Link href="/fees">Fees</Link>
                </li>
                <li>
                  <Link href="/terms">Terms of Service</Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Security</h3>
              <ul className="space-y-2 text-digix-blue-100">
                <li>
                  <Link href="/security">Security Center</Link>
                </li>
                <li>
                  <Link href="/privacy">Privacy Policy</Link>
                </li>
                <li>
                  <Link href="/compliance">Compliance</Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-digix-blue-800 mt-8 pt-8 text-center text-digix-blue-100">
            <p>&copy; 2024 DigiX. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
