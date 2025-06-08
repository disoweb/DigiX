"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, CheckCircle, CreditCard, Loader2 } from "lucide-react"
import { useSearchParams, useRouter } from "next/navigation"
import Link from "next/link"
import { initializePayment } from "@/lib/api"

export default function BuyConfirmPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [isProcessing, setIsProcessing] = useState(false)

  // Get transaction details from URL params
  const amount = searchParams.get("amount") || "0"
  const ngnAmount = searchParams.get("ngn") || "0"
  const walletOption = searchParams.get("wallet") || "digix"
  const paymentMethod = searchParams.get("payment") || ""
  const externalWallet = searchParams.get("external") || ""

  // Generate a transaction reference
  const transactionRef = `DIGIX-BUY-${Date.now().toString().slice(-8)}`

  const handleConfirmPayment = async () => {
    setIsProcessing(true)

    try {
      // In a real app, we would call the payment gateway API
      const response = await initializePayment({
        email: "user@example.com", // Get from user context
        amount: Number.parseFloat(ngnAmount) * 100, // Convert to kobo
        reference: transactionRef,
        callback_url: `${window.location.origin}/buy/success?ref=${transactionRef}&amount=${amount}&ngn=${ngnAmount}&wallet=${walletOption}${externalWallet ? `&external=${externalWallet}` : ""}`,
      })

      if (response.success && response.authorizationUrl) {
        // Redirect to payment gateway
        window.location.href = response.authorizationUrl
      } else {
        // Handle error
        console.error("Payment initialization failed")
        setIsProcessing(false)
      }
    } catch (error) {
      console.error("Payment error:", error)
      setIsProcessing(false)
    }

    // For demo purposes, simulate successful payment after 2 seconds
    setTimeout(() => {
      router.push(
        `/buy/success?ref=${transactionRef}&amount=${amount}&ngn=${ngnAmount}&wallet=${walletOption}${externalWallet ? `&external=${externalWallet}` : ""}`,
      )
    }, 2000)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <div className="mb-6">
          <Link href="/buy" className="flex items-center text-digix-blue-600 hover:text-digix-blue-700">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Buy
          </Link>
        </div>

        <Card className="border-digix-blue-100 mb-6">
          <CardHeader className="text-center">
            <CardTitle className="text-digix-blue-900">Confirm Your Purchase</CardTitle>
            <CardDescription>Please review your transaction details before proceeding to payment</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Transaction Summary */}
            <div className="bg-digix-blue-50 p-4 rounded-lg space-y-3 border border-digix-blue-100">
              <h3 className="font-medium text-digix-blue-900">Transaction Details</h3>
              <div className="flex justify-between text-sm">
                <span>Amount to pay:</span>
                <span className="font-medium">₦{Number(ngnAmount).toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>You will receive:</span>
                <span className="font-medium">{amount} USDT</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Destination:</span>
                <span>{walletOption === "digix" ? "DigiX Wallet" : "External Wallet"}</span>
              </div>
              {walletOption === "external" && (
                <div className="flex justify-between text-sm">
                  <span>External wallet:</span>
                  <span className="font-mono text-xs">{externalWallet}</span>
                </div>
              )}
              <div className="flex justify-between text-sm">
                <span>Payment method:</span>
                <span>
                  {paymentMethod === "card"
                    ? "Debit/Credit Card"
                    : paymentMethod === "bank-transfer"
                      ? "Bank Transfer"
                      : "USSD"}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Transaction reference:</span>
                <span className="font-mono">{transactionRef}</span>
              </div>
            </div>

            {/* Payment Method Details */}
            <div className="border border-digix-blue-200 rounded-lg p-4">
              <h3 className="font-medium text-digix-blue-900 mb-3 flex items-center">
                <CreditCard className="w-4 h-4 mr-2 text-digix-blue-600" />
                Payment Information
              </h3>

              <p className="text-sm text-gray-600 mb-3">
                You'll be redirected to our secure payment gateway to complete your payment of{" "}
                <span className="font-medium">₦{Number(ngnAmount).toLocaleString()}</span>.
              </p>

              {paymentMethod === "card" && (
                <div className="bg-digix-blue-50 p-3 rounded-md text-sm">
                  <p>• We accept Mastercard, Visa, and Verve cards</p>
                  <p>• Your card details are secured with bank-level encryption</p>
                  <p>• You may be required to enter your OTP for verification</p>
                </div>
              )}

              {paymentMethod === "bank-transfer" && (
                <div className="bg-digix-blue-50 p-3 rounded-md text-sm">
                  <p>• You'll be provided with account details to make a transfer</p>
                  <p>• Include your transaction reference in the transfer description</p>
                  <p>• Your USDT will be credited once payment is confirmed</p>
                </div>
              )}

              {paymentMethod === "ussd" && (
                <div className="bg-digix-blue-50 p-3 rounded-md text-sm">
                  <p>• You'll receive a USSD code to dial on your registered phone</p>
                  <p>• Follow the prompts to complete your payment</p>
                  <p>• Make sure you're using your registered phone number</p>
                </div>
              )}
            </div>

            {/* Delivery Information */}
            <div className="border border-digix-blue-200 rounded-lg p-4">
              <h3 className="font-medium text-digix-blue-900 mb-2">Delivery Information</h3>

              {walletOption === "digix" ? (
                <p className="text-sm text-gray-600">
                  Your USDT will be credited to your DigiX wallet immediately after successful payment.
                </p>
              ) : (
                <div className="space-y-2">
                  <p className="text-sm text-gray-600">
                    Your USDT will be sent to the following external wallet address:
                  </p>
                  <div className="bg-digix-blue-50 p-3 rounded-md">
                    <code className="text-xs sm:text-sm font-mono text-digix-blue-900 break-all">{externalWallet}</code>
                  </div>
                  <p className="text-xs text-gray-500">
                    Please double-check that this address is correct. Transactions to external wallets cannot be
                    reversed.
                  </p>
                </div>
              )}
            </div>

            {/* Security Notice */}
            <div className="bg-digix-green-50 p-4 rounded-lg border border-digix-green-100">
              <h4 className="font-medium text-digix-green-900 mb-2 flex items-center">
                <CheckCircle className="w-4 h-4 mr-2 text-digix-green-600" />
                Secure Transaction
              </h4>
              <ul className="text-sm text-digix-green-800 space-y-1">
                <li>• Your payment is protected by bank-level encryption</li>
                <li>• USDT will be delivered immediately after payment confirmation</li>
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
                onClick={handleConfirmPayment}
                disabled={isProcessing}
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Processing...
                  </>
                ) : (
                  "Proceed to Payment"
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
