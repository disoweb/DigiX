"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, ArrowRight, Download } from "lucide-react"
import { useSearchParams, useRouter } from "next/navigation"
import Link from "next/link"

export default function SellSuccessPage() {
  const searchParams = useSearchParams()
  const router = useRouter()

  // Get transaction details from URL params
  const transactionRef = searchParams.get("ref") || ""
  const amount = searchParams.get("amount") || "0"
  const ngnAmount = searchParams.get("ngn") || "0"

  // Format the current date
  const currentDate = new Date().toLocaleDateString("en-NG", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  })

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-md">
        <Card className="border-digix-blue-100">
          <CardHeader className="text-center pb-4">
            <div className="w-16 h-16 bg-digix-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-digix-green-600" />
            </div>
            <CardTitle className="text-digix-blue-900 text-2xl">Sale Successful!</CardTitle>
            <CardDescription>Your USDT has been sold successfully</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Transaction Details */}
            <div className="bg-digix-blue-50 p-4 rounded-lg space-y-3 border border-digix-blue-100">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Amount sold:</span>
                <span className="font-medium text-digix-blue-900">{amount} USDT</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Amount received:</span>
                <span className="font-medium text-digix-blue-900">₦{Number(ngnAmount).toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Transaction reference:</span>
                <span className="font-mono text-digix-blue-900">{transactionRef}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Date & time:</span>
                <span className="text-digix-blue-900">{currentDate}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Status:</span>
                <span className="text-digix-green-600 font-medium">Completed</span>
              </div>
            </div>

            {/* Bank Account Information */}
            <div className="border border-digix-blue-200 rounded-lg p-4">
              <h3 className="font-medium text-digix-blue-900 mb-2">Payment Information</h3>
              <p className="text-sm text-gray-600 mb-3">
                ₦{Number(ngnAmount).toLocaleString()} has been sent to your bank account
              </p>
              <div className="bg-digix-blue-50 p-3 rounded-md">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Bank:</span>
                  <span className="text-digix-blue-900">GTBank</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Account Number:</span>
                  <span className="text-digix-blue-900">****1234</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Account Name:</span>
                  <span className="text-digix-blue-900">John Doe</span>
                </div>
              </div>
            </div>

            {/* Next Steps */}
            <div className="space-y-3">
              <Button
                variant="outline"
                className="w-full border-digix-blue-200 text-digix-blue-600 flex items-center justify-center"
              >
                <Download className="w-4 h-4 mr-2" />
                Download Receipt
              </Button>

              <Link href="/dashboard">
                <Button className="w-full bg-digix-blue-600 hover:bg-digix-blue-700">
                  Return to Dashboard
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>

            <div className="text-center text-sm text-gray-500 pt-2">
              <p>Thank you for using DigiX!</p>
              <p>
                Need help?{" "}
                <Link href="/contact" className="text-digix-blue-600 hover:underline">
                  Contact support
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
