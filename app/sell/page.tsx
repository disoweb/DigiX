"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { ArrowLeft, Banknote, Wallet, ExternalLink, ArrowRight, Calculator, Info, TrendingDown } from "lucide-react"
import { PriceTicker } from "@/components/price-ticker"
import { usePrice } from "@/hooks/use-price"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Badge } from "@/components/ui/badge"

export default function SellPage() {
  const router = useRouter()
  const [usdtAmount, setUsdtAmount] = useState("")
  const [ngnAmount, setNgnAmount] = useState("")
  const [bankAccount, setBankAccount] = useState("")
  const [walletOption, setWalletOption] = useState("digix")
  const [externalWallet, setExternalWallet] = useState("")
  const [processing, setProcessing] = useState(false)
  const [activeInput, setActiveInput] = useState<"usdt" | "ngn">("usdt")

  const { price } = usePrice()
  const currentRate = price?.ngn || 1645 // Slightly lower for selling
  const fee = 0.5 // 0.5%
  const availableBalance = 1250.0

  const calculateNGN = (usdtAmount: string) => {
    if (!usdtAmount) return ""
    const usdt = Number.parseFloat(usdtAmount)
    const ngnAmount = usdt * currentRate
    const feeAmount = ngnAmount * (fee / 100)
    return (ngnAmount - feeAmount).toFixed(2)
  }

  const calculateUSDT = (ngnAmount: string) => {
    if (!ngnAmount) return ""
    const ngn = Number.parseFloat(ngnAmount)
    const feeAmount = ngn * (fee / 100)
    const netAmount = ngn + feeAmount
    return (netAmount / currentRate).toFixed(6)
  }

  const handleUSDTChange = (value: string) => {
    setActiveInput("usdt")
    setUsdtAmount(value)
    setNgnAmount(calculateNGN(value))
  }

  const handleNGNChange = (value: string) => {
    setActiveInput("ngn")
    setNgnAmount(value)
    setUsdtAmount(calculateUSDT(value))
  }

  const handleSell = () => {
    setProcessing(true)

    // In a real app, we would initiate the transaction here
    setTimeout(() => {
      // Navigate to confirmation page with transaction details
      router.push(
        `/sell/confirm?amount=${usdtAmount}&ngn=${ngnAmount}&wallet=${walletOption}&bank=${bankAccount}${walletOption === "external" ? `&external=${externalWallet}` : ""}`,
      )
    }, 1000)
  }

  const quickAmounts = [
    { usdt: 100, label: "100 USDT" },
    { usdt: 250, label: "250 USDT" },
    { usdt: 500, label: "500 USDT" },
    { usdt: 1000, label: "1K USDT" },
  ]

  const bankAccounts = [
    {
      id: "gtb-123",
      bank: "GTBank",
      accountNumber: "****1234",
      accountName: "John Doe",
    },
    {
      id: "access-456",
      bank: "Access Bank",
      accountNumber: "****5678",
      accountName: "John Doe",
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
          <h1 className="text-3xl font-bold text-digix-blue-900 mb-2">Sell USDT</h1>
          <p className="text-gray-600">Convert your USDT to Nigerian Naira - Fast and secure</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Current Rate & Balance Card */}
            <Card className="border-digix-blue-100 bg-gradient-to-r from-digix-blue-50 to-blue-50">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-digix-blue-600 font-medium mb-1">Selling Rate</p>
                    <div className="flex items-center space-x-2">
                      <PriceTicker />
                      <TrendingDown className="w-4 h-4 text-orange-500" />
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-digix-blue-600 font-medium">Available Balance</p>
                    <p className="text-2xl font-bold text-digix-blue-900">{availableBalance.toFixed(2)} USDT</p>
                    <p className="text-xs text-gray-500">≈ ₦{(availableBalance * currentRate).toLocaleString()}</p>
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
                <CardDescription>Enter the amount of USDT you want to sell</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Amount Input with Visual Converter */}
                <div className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div
                      className={`relative ${activeInput === "usdt" ? "ring-2 ring-digix-blue-500 rounded-lg" : ""}`}
                    >
                      <Label htmlFor="usdt-amount" className="text-sm font-medium">
                        You Sell (USDT)
                      </Label>
                      <Input
                        id="usdt-amount"
                        type="number"
                        placeholder="0.000000"
                        value={usdtAmount}
                        onChange={(e) => handleUSDTChange(e.target.value)}
                        className="text-lg h-12 border-digix-blue-200 focus:border-digix-blue-500"
                        onFocus={() => setActiveInput("usdt")}
                        max={availableBalance}
                      />
                      <div className="absolute right-3 top-8 text-gray-400">
                        <span className="text-sm">USDT</span>
                      </div>
                      {usdtAmount && Number.parseFloat(usdtAmount) > availableBalance && (
                        <p className="text-xs text-red-500 mt-1">Insufficient balance</p>
                      )}
                    </div>

                    <div className="flex items-center justify-center">
                      <div className="bg-digix-blue-100 p-2 rounded-full">
                        <ArrowRight className="w-4 h-4 text-digix-blue-600" />
                      </div>
                    </div>

                    <div className={`relative ${activeInput === "ngn" ? "ring-2 ring-digix-blue-500 rounded-lg" : ""}`}>
                      <Label htmlFor="ngn-amount" className="text-sm font-medium">
                        You Receive (NGN)
                      </Label>
                      <Input
                        id="ngn-amount"
                        type="number"
                        placeholder="0.00"
                        value={ngnAmount}
                        onChange={(e) => handleNGNChange(e.target.value)}
                        className="text-lg h-12 border-digix-blue-200 focus:border-digix-blue-500"
                        onFocus={() => setActiveInput("ngn")}
                      />
                      <div className="absolute right-3 top-8 text-gray-400">
                        <span className="text-sm">NGN</span>
                      </div>
                    </div>
                  </div>

                  {/* Quick Amount Buttons */}
                  <div>
                    <Label className="text-sm font-medium mb-2 block">Quick Amounts</Label>
                    <div className="grid grid-cols-4 gap-2">
                      {quickAmounts.map((quickAmount) => (
                        <Button
                          key={quickAmount.usdt}
                          variant="outline"
                          size="sm"
                          onClick={() => handleUSDTChange(quickAmount.usdt.toString())}
                          className="border-digix-blue-200 text-digix-blue-600 hover:bg-digix-blue-50 hover:border-digix-blue-300"
                          disabled={quickAmount.usdt > availableBalance}
                        >
                          {quickAmount.label}
                        </Button>
                      ))}
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleUSDTChange(availableBalance.toString())}
                      className="mt-2 border-digix-blue-200 text-digix-blue-600 hover:bg-digix-blue-50 hover:border-digix-blue-300"
                    >
                      Sell All ({availableBalance.toFixed(2)} USDT)
                    </Button>
                  </div>
                </div>

                {/* Transaction Summary */}
                {usdtAmount && ngnAmount && (
                  <div className="bg-digix-blue-50 p-4 rounded-lg space-y-3 border border-digix-blue-100">
                    <h3 className="font-medium text-digix-blue-900 flex items-center">
                      <Info className="w-4 h-4 mr-2" />
                      Transaction Summary
                    </h3>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">USDT to sell:</span>
                        <span className="font-medium">{usdtAmount} USDT</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Exchange rate:</span>
                        <span className="font-medium">₦{currentRate.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Transaction fee:</span>
                        <span className="font-medium">
                          ₦{(Number.parseFloat(ngnAmount) * (fee / 100)).toLocaleString()}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">You receive:</span>
                        <span className="font-medium text-digix-blue-900">
                          ₦{Number.parseFloat(ngnAmount).toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Bank Account Selection */}
            <Card className="border-digix-blue-100">
              <CardHeader>
                <CardTitle className="text-digix-blue-900">Choose Receiving Account</CardTitle>
                <CardDescription>Select the bank account to receive your payment</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {bankAccounts.map((account) => (
                    <div
                      key={account.id}
                      className={`relative p-4 border rounded-lg cursor-pointer transition-all ${
                        bankAccount === account.id
                          ? "border-digix-blue-500 bg-digix-blue-50"
                          : "border-digix-blue-200 hover:border-digix-blue-300"
                      }`}
                      onClick={() => setBankAccount(account.id)}
                    >
                      <div className="flex items-center space-x-3">
                        <div
                          className={`p-2 rounded-lg ${
                            bankAccount === account.id ? "bg-digix-blue-100" : "bg-gray-100"
                          }`}
                        >
                          <Banknote
                            className={`w-5 h-5 ${
                              bankAccount === account.id ? "text-digix-blue-600" : "text-gray-600"
                            }`}
                          />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-medium text-gray-900">{account.bank}</h3>
                          <p className="text-sm text-gray-600">
                            {account.accountNumber} - {account.accountName}
                          </p>
                        </div>
                        <div
                          className={`w-4 h-4 rounded-full border-2 ${
                            bankAccount === account.id ? "border-digix-blue-500 bg-digix-blue-500" : "border-gray-300"
                          }`}
                        >
                          {bankAccount === account.id && (
                            <div className="w-full h-full rounded-full bg-white scale-50"></div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}

                  <Button
                    variant="outline"
                    className="w-full border-dashed border-digix-blue-300 text-digix-blue-600 hover:bg-digix-blue-50"
                  >
                    + Add New Bank Account
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* USDT Source */}
            <Card className="border-digix-blue-100">
              <CardHeader>
                <CardTitle className="text-digix-blue-900 text-lg">USDT Source</CardTitle>
                <CardDescription>Where should we take your USDT from?</CardDescription>
              </CardHeader>
              <CardContent>
                <RadioGroup value={walletOption} onValueChange={setWalletOption} className="space-y-3">
                  <div
                    className={`flex items-center space-x-3 p-3 border rounded-lg ${
                      walletOption === "digix" ? "border-digix-blue-500 bg-digix-blue-50" : "border-digix-blue-200"
                    }`}
                  >
                    <RadioGroupItem value="digix" id="digix-source" />
                    <Label htmlFor="digix-source" className="flex items-center space-x-2 cursor-pointer flex-1">
                      <Wallet className="w-4 h-4 text-digix-blue-600" />
                      <div>
                        <div className="font-medium">DigiX Wallet</div>
                        <div className="text-xs text-gray-500">Balance: {availableBalance.toFixed(2)} USDT</div>
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
                    <RadioGroupItem value="external" id="external-source" />
                    <Label htmlFor="external-source" className="flex items-center space-x-2 cursor-pointer flex-1">
                      <ExternalLink className="w-4 h-4 text-digix-blue-600" />
                      <div>
                        <div className="font-medium">External Wallet</div>
                        <div className="text-xs text-gray-500">Send from your wallet</div>
                      </div>
                    </Label>
                  </div>
                </RadioGroup>

                {walletOption === "external" && (
                  <div className="mt-4">
                    <Label htmlFor="external-wallet" className="text-sm font-medium">
                      Your Wallet Address
                    </Label>
                    <Input
                      id="external-wallet"
                      placeholder="Enter your USDT (TRC-20) address"
                      value={externalWallet}
                      onChange={(e) => setExternalWallet(e.target.value)}
                      className="mt-1 border-digix-blue-200 focus:border-digix-blue-500"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      You'll need to send USDT from this address after confirmation
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Processing Information */}
            <Card className="border-digix-blue-100 bg-digix-blue-50">
              <CardContent className="p-4">
                <h4 className="font-medium text-digix-blue-900 mb-2 flex items-center">
                  <Info className="w-4 h-4 mr-2 text-digix-blue-600" />
                  Processing Information
                </h4>
                <ul className="text-sm text-digix-blue-800 space-y-1">
                  <li>• Bank transfers process within 5-15 minutes</li>
                  <li>• USDT held in secure escrow until payment</li>
                  <li>• SMS and email notifications sent</li>
                  <li>• 24/7 customer support available</li>
                </ul>
              </CardContent>
            </Card>

            {/* Continue Button */}
            <Button
              className="w-full bg-digix-blue-600 hover:bg-digix-blue-700 h-12 text-lg"
              disabled={
                !usdtAmount ||
                !ngnAmount ||
                !bankAccount ||
                processing ||
                (walletOption === "external" && !externalWallet) ||
                Number.parseFloat(usdtAmount) > availableBalance
              }
              onClick={handleSell}
            >
              {processing ? "Processing..." : "Continue to Sell USDT"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
