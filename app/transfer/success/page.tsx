"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, ArrowRight, Send } from "lucide-react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"

export default function TransferSuccessPage() {
  const searchParams = useSearchParams()

  const recipient = searchParams.get("recipient") || ""
  const amount = searchParams.get("amount") || "0"
  const currency = searchParams.get("currency") || "USDT"

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
            <CardTitle className="text-digix-blue-900 text-2xl">Transfer Successful!</CardTitle>
            <CardDescription>Your money has been sent successfully</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Transfer Details */}
            <div className="bg-digix-blue-50 p-4 rounded-lg space-y-3 border border-digix-blue-100">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Sent to:</span>
                <span className="font-medium text-digix-blue-900">{recipient}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Amount:</span>
                <span className="font-medium text-digix-blue-900">
                  {currency === "USDT" ? `${amount} USDT` : `₦${Number(amount).toLocaleString()}`}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Transfer Fee:</span>
                <span className="font-medium text-digix-green-600">Free</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Date & Time:</span>
                <span className="text-digix-blue-900">{currentDate}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Status:</span>
                <span className="text-digix-green-600 font-medium">Completed</span>
              </div>
            </div>

            {/* Notification */}
            <div className="bg-digix-green-50 p-4 rounded-lg border border-digix-green-100">
              <p className="text-sm text-digix-green-800">
                {recipient} has been notified about this transfer and the funds are now available in their account.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <Link href="/transfer">
                <Button className="w-full bg-digix-blue-600 hover:bg-digix-blue-700">
                  <Send className="w-4 h-4 mr-2" />
                  Send Another Transfer
                </Button>
              </Link>

              <Link href="/dashboard">
                <Button variant="outline" className="w-full border-digix-blue-200 text-digix-blue-600">
                  Return to Dashboard
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>

            <div className="text-center text-sm text-gray-500 pt-2">
              <p>Thank you for using DigiX!</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
