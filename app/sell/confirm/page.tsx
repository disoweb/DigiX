"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, CheckCircle, Copy, Loader2 } from "lucide-react"
import { useSearchParams, useRouter } from "next/navigation"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"

export default function SellConfirmPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [copied, setCopied] = useState(false)
  const [countdown, setCountdown] = useState(900) // 15 minutes in seconds
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Get transaction details from URL params
  const amount = searchParams.get("amount") || "0"
  const ngnAmount = searchParams.get("ngn") || "0"
  const walletOption = searchParams.get("wallet") || "digix"
  const bankAccount = searchParams.get("bank") || ""
  const externalWallet = searchParams.get("external") || ""

  // Generate a transaction reference
  const transactionRef = `DIGIX-SELL-${Date.now().toString().slice(-8)}`

  // Mock DigiX wallet address for receiving USDT
  const digixWalletAddress = "TYN2U4EBLRkPXj6oLTAy2MBeJ6eHjDDBut"

  useEffect(() => {
    // Countdown timer
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000)
      return () => clearTimeout(timer)
    }
  }, [countdown])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleConfirm = () => {
    setIsSubmitting(true)

    // Simulate processing
    setTimeout(() => {
      router.push(`/sell/success?ref=${transactionRef}&amount=${amount}&ngn=${ngnAmount}`)
    }, 2000)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <div className="mb-6">
          <Link href="/sell" className="flex items-center text-digix-blue-600 hover:text-digix-blue-700">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Sell
          </Link>
        </div>

        <Card className="border-digix-blue-100 mb-6">
          <CardHeader className="text-center">
            <CardTitle className="text-digix-blue-900">Confirm Your Sale</CardTitle>
            <CardDescription>Please review your transaction details before proceeding</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Transaction Summary */}
            <div className="bg-digix-blue-50 p-4 rounded-lg space-y-3 border border-digix-blue-100">
              <h3 className="font-medium text-digix-blue-900">Transaction Details</h3>
              <div className="flex justify-between text-sm">
                <span>Amount to sell:</span>
                <span className="font-medium">{amount} USDT</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>You will receive:</span>
                <span className="font-medium">₦{Number(ngnAmount).toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Source:</span>
                <span>{walletOption === "digix" ? "DigiX Wallet" : "External Wallet"}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Receiving bank:</span>
                <span>{bankAccount === "gtb-123" ? "GTBank ****1234" : "Access Bank ****5678"}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Transaction reference:</span>
                <span className="font-mono">{transactionRef}</span>
              </div>
            </div>

            {/* External Wallet Instructions */}
            {walletOption === "external" && (
              <div className="border border-digix-blue-200 rounded-lg p-4">
                <h3 className="font-medium text-digix-blue-900 mb-3">Send USDT to DigiX Wallet</h3>
                <p className="text-sm text-gray-600 mb-3">
                  Please send exactly <span className="font-medium">{amount} USDT</span> to the following address:
                </p>

                <div className="bg-digix-blue-50 p-3 rounded-md flex items-center justify-between mb-3">
                  <code className="text-xs sm:text-sm font-mono text-digix-blue-900 break-all">
                    {digixWalletAddress}
                  </code>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => copyToClipboard(digixWalletAddress)}
                    className="ml-2 shrink-0"
                  >
                    {copied ? <CheckCircle className="w-4 h-4 text-digix-blue-600" /> : <Copy className="w-4 h-4" />}
                  </Button>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center text-digix-blue-900">
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    <span>Waiting for payment</span>
                  </div>
                  <Badge variant="outline" className="text-digix-blue-600 border-digix-blue-200">
                    {formatTime(countdown)} remaining
                  </Badge>
                </div>

                <div className="mt-4 text-xs text-gray-500">
                  <p>• Make sure to send USDT on the TRC-20 network</p>
                  <p>• Send exactly {amount} USDT to avoid processing issues</p>
                  <p>• Include the transaction reference in the memo field if possible</p>
                </div>
              </div>
            )}

            {/* DigiX Wallet Confirmation */}
            {walletOption === "digix" && (
              <div className="border border-digix-blue-200 rounded-lg p-4">
                <h3 className="font-medium text-digix-blue-900 mb-2">Confirm from DigiX Wallet</h3>
                <p className="text-sm text-gray-600 mb-3">
                  You are about to sell <span className="font-medium">{amount} USDT</span> from your DigiX wallet.
                </p>
                <div className="flex items-center justify-between text-sm bg-digix-blue-50 p-3 rounded-md">
                  <span>Current wallet balance:</span>
                  <span className="font-medium">1,250.00 USDT</span>
                </div>
                <div className="flex items-center justify-between text-sm mt-2 bg-digix-blue-50 p-3 rounded-md">
                  <span>Balance after transaction:</span>
                  <span className="font-medium">{(1250 - Number(amount)).toFixed(2)} USDT</span>
                </div>
              </div>
            )}

            {/* Bank Account Information */}
            <div className="border border-digix-blue-200 rounded-lg p-4">
              <h3 className="font-medium text-digix-blue-900 mb-2">Payment Information</h3>
              <p className="text-sm text-gray-600 mb-3">
                You will receive <span className="font-medium">₦{Number(ngnAmount).toLocaleString()}</span> in your bank
                account:
              </p>
              <div className="bg-digix-blue-50 p-3 rounded-md">
                <div className="flex items-center justify-between text-sm">
                  <span>Bank:</span>
                  <span>{bankAccount === "gtb-123" ? "GTBank" : "Access Bank"}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span>Account Number:</span>
                  <span>{bankAccount === "gtb-123" ? "****1234" : "****5678"}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span>Account Name:</span>
                  <span>John Doe</span>
                </div>
              </div>
            </div>

            {/* Security Notice */}
            <div className="bg-digix-green-50 p-4 rounded-lg border border-digix-green-100">
              <h4 className="font-medium text-digix-green-900 mb-2 flex items-center">
                <CheckCircle className="w-4 h-4 mr-2 text-digix-green-600" />
                Secure Transaction
              </h4>
              <ul className="text-sm text-digix-green-800 space-y-1">
                <li>• Your transaction is protected by DigiX's secure escrow system</li>
                <li>• You'll receive payment once USDT is confirmed</li>
                <li>• Customer support is available 24/7 if you need assistance</li>
              </ul>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                variant="outline"
                className="flex-1 border-digix-blue-200 text-digix-blue-600"
                onClick={() => router.back()}
              >
                Cancel
              </Button>
              <Button
                className="flex-1 bg-digix-blue-600 hover:bg-digix-blue-700"
                onClick={handleConfirm}
                disabled={isSubmitting || walletOption === "external"}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Processing...
                  </>
                ) : (
                  "Confirm Sale"
                )}
              </Button>
            </div>

            {walletOption === "external" && (
              <p className="text-center text-sm text-gray-500">
                The transaction will automatically proceed once we receive your USDT
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
