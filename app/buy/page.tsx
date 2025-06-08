"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {
  ArrowLeft,
  CreditCard,
  Banknote,
  Smartphone,
  Wallet,
  ExternalLink,
  ArrowRight,
  Calculator,
  Info,
} from "lucide-react"
import { PriceTicker } from "@/components/price-ticker"
import { usePrice } from "@/hooks/use-price"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Badge } from "@/components/ui/badge"

export default function BuyPage() {
  const router = useRouter()
  const [amount, setAmount] = useState("")
  const [paymentMethod, setPaymentMethod] = useState("")
  const [walletOption, setWalletOption] = useState("digix")
  const [externalWallet, setExternalWallet] = useState("")
  const [usdtAmount, setUsdtAmount] = useState("")
  const [processing, setProcessing] = useState(false)
  const [activeInput, setActiveInput] = useState<"ngn" | "usdt">("ngn")

  const { price } = usePrice()
  const currentRate = price?.ngn || 1650
  const fee = 0.5 // 0.5%

  const calculateUSDT = (ngnAmount: string) => {
    if (!ngnAmount) return ""
    const ngn = Number.parseFloat(ngnAmount)
    const feeAmount = ngn * (fee / 100)
    const netAmount = ngn - feeAmount
    return (netAmount / currentRate).toFixed(6)
  }

  const calculateNGN = (usdtAmount: string) => {
    if (!usdtAmount) return ""
    const usdt = Number.parseFloat(usdtAmount)
    const ngnAmount = usdt * currentRate
    const feeAmount = ngnAmount * (fee / 100)
    return (ngnAmount + feeAmount).toFixed(2)
  }

  const handleNGNChange = (value: string) => {
    setActiveInput("ngn")
    setAmount(value)
    setUsdtAmount(calculateUSDT(value))
  }

  const handleUSDTChange = (value: string) => {
    setActiveInput("usdt")
    setUsdtAmount(value)
    setAmount(calculateNGN(value))
  }

  const handlePurchase = () => {
    setProcessing(true)

    // Navigate to confirmation page with transaction details
    setTimeout(() => {
      router.push(
        `/buy/confirm?amount=${usdtAmount}&ngn=${amount}&wallet=${walletOption}&payment=${paymentMethod}${walletOption === "external" ? `&external=${externalWallet}` : ""}`,
      )
    }, 1000)
  }

  const quickAmounts = [
    { ngn: 10000, label: "₦10K" },
    { ngn: 25000, label: "₦25K" },
    { ngn: 50000, label: "₦50K" },
    { ngn: 100000, label: "₦100K" },
  ]

  const paymentMethods = [
    {
      id: "bank-transfer",
      name: "Bank Transfer",
      icon: Banknote,
      description: "Direct bank transfer",
      processingTime: "5-15 minutes",
      recommended: true,
    },
    {
      id: "card",
      name: "Debit/Credit Card",
      icon: CreditCard,
      description: "Instant payment",
      processingTime: "Instant",
      recommended: false,
    },
    {
      id: "ussd",
      name: "USSD",
      icon: Smartphone,
      description: "Mobile banking",
      processingTime: "2-5 minutes",
      recommended: false,
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-6">
          <Link href="/dashboard" className="flex items-center text-digix-blue-600 hover:text-digix-blue-700">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Link>
        </div>

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-digix-blue-900 mb-2">Buy USDT</h1>
          <p className="text-gray-600">Purchase USDT with Nigerian Naira - Fast, secure, and reliable</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Current Rate Card */}
            <Card className="border-digix-blue-100 bg-gradient-to-r from-digix-blue-50 to-blue-50">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-digix-blue-600 font-medium mb-1">Current Exchange Rate</p>
                    <PriceTicker />
                  </div>
                  <div className="text-right">
                    <Badge variant="outline" className="text-digix-green-600 border-digix-green-200 bg-digix-green-50">
                      Live Rate
                    </Badge>
                    <p className="text-xs text-gray-500 mt-1">Updates every 30s</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Amount Calculator */}
            <Card className="border-digix-blue-100">
              <CardHeader>
                <CardTitle className="text-digix-blue-900 flex items-center">
                  <Calculator className="w-5 h-5 mr-2" />
                  Amount Calculator
                </CardTitle>
                <CardDescription>Enter the amount you want to spend or receive</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Amount Input with Visual Converter */}
                <div className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className={`relative ${activeInput === "ngn" ? "ring-2 ring-digix-blue-500 rounded-lg" : ""}`}>
                      <Label htmlFor="ngn-amount" className="text-sm font-medium">
                        You Pay (NGN)
                      </Label>
                      <Input
                        id="ngn-amount"
                        type="number"
                        placeholder="0.00"
                        value={amount}
                        onChange={(e) => handleNGNChange(e.target.value)}
                        className="text-lg h-12 border-digix-blue-200 focus:border-digix-blue-500"
                        onFocus={() => setActiveInput("ngn")}
                      />
                      <div className="absolute right-3 top-8 text-gray-400">
                        <span className="text-sm">NGN</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-center">
                      <div className="bg-digix-blue-100 p-2 rounded-full">
                        <ArrowRight className="w-4 h-4 text-digix-blue-600" />
                      </div>
                    </div>

                    <div
                      className={`relative ${activeInput === "usdt" ? "ring-2 ring-digix-blue-500 rounded-lg" : ""}`}
                    >
                      <Label htmlFor="usdt-amount" className="text-sm font-medium">
                        You Receive (USDT)
                      </Label>
                      <Input
                        id="usdt-amount"
                        type="number"
                        placeholder="0.000000"
                        value={usdtAmount}
                        onChange={(e) => handleUSDTChange(e.target.value)}
                        className="text-lg h-12 border-digix-blue-200 focus:border-digix-blue-500"
                        onFocus={() => setActiveInput("usdt")}
                      />
                      <div className="absolute right-3 top-8 text-gray-400">
                        <span className="text-sm">USDT</span>
                      </div>
                    </div>
                  </div>

                  {/* Quick Amount Buttons */}
                  <div>
                    <Label className="text-sm font-medium mb-2 block">Quick Amounts</Label>
                    <div className="grid grid-cols-4 gap-2">
                      {quickAmounts.map((quickAmount) => (
                        <Button
                          key={quickAmount.ngn}
                          variant="outline"
                          size="sm"
                          onClick={() => handleNGNChange(quickAmount.ngn.toString())}
                          className="border-digix-blue-200 text-digix-blue-600 hover:bg-digix-blue-50 hover:border-digix-blue-300"
                        >
                          {quickAmount.label}
                        </Button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Transaction Summary */}
                {amount && usdtAmount && (
                  <div className="bg-digix-blue-50 p-4 rounded-lg space-y-3 border border-digix-blue-100">
                    <h3 className="font-medium text-digix-blue-900 flex items-center">
                      <Info className="w-4 h-4 mr-2" />
                      Transaction Summary
                    </h3>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Amount to pay:</span>
                        <span className="font-medium">₦{Number.parseFloat(amount).toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Exchange rate:</span>
                        <span className="font-medium">₦{currentRate.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Transaction fee:</span>
                        <span className="font-medium">
                          ₦{(Number.parseFloat(amount) * (fee / 100)).toLocaleString()}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">You receive:</span>
                        <span className="font-medium text-digix-blue-900">{usdtAmount} USDT</span>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Payment Method Selection */}
            <Card className="border-digix-blue-100">
              <CardHeader>
                <CardTitle className="text-digix-blue-900">Choose Payment Method</CardTitle>
                <CardDescription>Select how you want to pay for your USDT</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-3">
                  {paymentMethods.map((method) => (
                    <div
                      key={method.id}
                      className={`relative p-4 border rounded-lg cursor-pointer transition-all ${
                        paymentMethod === method.id
                          ? "border-digix-blue-500 bg-digix-blue-50"
                          : "border-digix-blue-200 hover:border-digix-blue-300"
                      }`}
                      onClick={() => setPaymentMethod(method.id)}
                    >
                      <div className="flex items-center space-x-3">
                        <div
                          className={`p-2 rounded-lg ${
                            paymentMethod === method.id ? "bg-digix-blue-100" : "bg-gray-100"
                          }`}
                        >
                          <method.icon
                            className={`w-5 h-5 ${
                              paymentMethod === method.id ? "text-digix-blue-600" : "text-gray-600"
                            }`}
                          />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2">
                            <h3 className="font-medium text-gray-900">{method.name}</h3>
                            {method.recommended && (
                              <Badge
                                variant="outline"
                                className="text-digix-green-600 border-digix-green-200 bg-digix-green-50 text-xs"
                              >
                                Recommended
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm text-gray-600">{method.description}</p>
                          <p className="text-xs text-digix-blue-600 mt-1">Processing: {method.processingTime}</p>
                        </div>
                        <div
                          className={`w-4 h-4 rounded-full border-2 ${
                            paymentMethod === method.id ? "border-digix-blue-500 bg-digix-blue-500" : "border-gray-300"
                          }`}
                        >
                          {paymentMethod === method.id && (
                            <div className="w-full h-full rounded-full bg-white scale-50"></div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Wallet Destination */}
            <Card className="border-digix-blue-100">
              <CardHeader>
                <CardTitle className="text-digix-blue-900 text-lg">USDT Destination</CardTitle>
                <CardDescription>Where should we send your USDT?</CardDescription>
              </CardHeader>
              <CardContent>
                <RadioGroup value={walletOption} onValueChange={setWalletOption} className="space-y-3">
                  <div
                    className={`flex items-center space-x-3 p-3 border rounded-lg ${
                      walletOption === "digix" ? "border-digix-blue-500 bg-digix-blue-50" : "border-digix-blue-200"
                    }`}
                  >
                    <RadioGroupItem value="digix" id="digix" />
                    <Label htmlFor="digix" className="flex items-center space-x-2 cursor-pointer flex-1">
                      <Wallet className="w-4 h-4 text-digix-blue-600" />
                      <div>
                        <div className="font-medium">DigiX Wallet</div>
                        <div className="text-xs text-gray-500">Instant & Free</div>
                      </div>
                    </Label>
                    <Badge
                      variant="outline"
                      className="text-digix-green-600 border-digix-green-200 bg-digix-green-50 text-xs"
                    >
                      Recommended
                    </Badge>
                  </div>
                  <div
                    className={`flex items-center space-x-3 p-3 border rounded-lg ${
                      walletOption === "external" ? "border-digix-blue-500 bg-digix-blue-50" : "border-digix-blue-200"
                    }`}
                  >
                    <RadioGroupItem value="external" id="external" />
                    <Label htmlFor="external" className="flex items-center space-x-2 cursor-pointer flex-1">
                      <ExternalLink className="w-4 h-4 text-digix-blue-600" />
                      <div>
                        <div className="font-medium">External Wallet</div>
                        <div className="text-xs text-gray-500">Your own wallet</div>
                      </div>
                    </Label>
                  </div>
                </RadioGroup>

                {walletOption === "external" && (
                  <div className="mt-4">
                    <Label htmlFor="external-wallet" className="text-sm font-medium">
                      Wallet Address
                    </Label>
                    <Input
                      id="external-wallet"
                      placeholder="Enter USDT (TRC-20) address"
                      value={externalWallet}
                      onChange={(e) => setExternalWallet(e.target.value)}
                      className="mt-1 border-digix-blue-200 focus:border-digix-blue-500"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      ⚠️ Make sure this is a valid USDT (TRC-20) address. Transactions are irreversible.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Security Notice */}
            <Card className="border-digix-green-100 bg-digix-green-50">
              <CardContent className="p-4">
                <h4 className="font-medium text-digix-green-900 mb-2 flex items-center">
                  <Info className="w-4 h-4 mr-2 text-digix-green-600" />
                  Security & Trust
                </h4>
                <ul className="text-sm text-digix-green-800 space-y-1">
                  <li>• Bank-level encryption protection</li>
                  <li>• Instant USDT delivery after payment</li>
                  <li>• 24/7 customer support available</li>
                  <li>• Regulated and compliant platform</li>
                </ul>
              </CardContent>
            </Card>

            {/* Continue Button */}
            <Button
              className="w-full bg-digix-blue-600 hover:bg-digix-blue-700 h-12 text-lg"
              disabled={
                !amount ||
                !usdtAmount ||
                !paymentMethod ||
                processing ||
                (walletOption === "external" && !externalWallet)
              }
              onClick={handlePurchase}
            >
              {processing ? "Processing..." : "Continue to Payment"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
