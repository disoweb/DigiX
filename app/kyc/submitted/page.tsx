"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Clock, ArrowRight, FileText } from "lucide-react"
import Link from "next/link"

export default function KYCSubmittedPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-md">
        <Card className="border-digix-blue-100">
          <CardHeader className="text-center pb-4">
            <div className="w-16 h-16 bg-digix-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-digix-green-600" />
            </div>
            <CardTitle className="text-digix-blue-900 text-2xl">KYC Submitted Successfully!</CardTitle>
            <CardDescription>Your documents are now under review</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Status Information */}
            <div className="bg-digix-blue-50 p-4 rounded-lg space-y-3 border border-digix-blue-100">
              <div className="flex items-center space-x-2">
                <Clock className="w-5 h-5 text-digix-blue-600" />
                <span className="font-medium text-digix-blue-900">Review in Progress</span>
              </div>
              <p className="text-sm text-digix-blue-800">
                Our team will review your documents within 24-48 hours. You'll receive notifications via email and SMS.
              </p>
            </div>

            {/* What's Next */}
            <div className="space-y-3">
              <h3 className="font-medium text-digix-blue-900">What happens next?</h3>
              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-digix-blue-600 rounded-full mt-2"></div>
                  <span>Document verification (24-48 hours)</span>
                </div>
                <div className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-digix-blue-600 rounded-full mt-2"></div>
                  <span>Email and SMS notification of results</span>
                </div>
                <div className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-digix-blue-600 rounded-full mt-2"></div>
                  <span>Access to enhanced features upon approval</span>
                </div>
              </div>
            </div>

            {/* Benefits After Approval */}
            <div className="bg-digix-green-50 p-4 rounded-lg border border-digix-green-100">
              <h4 className="font-medium text-digix-green-900 mb-2">Benefits After Approval</h4>
              <ul className="text-sm text-digix-green-800 space-y-1">
                <li>• Higher transaction limits (up to ₦5,000,000)</li>
                <li>• Reduced trading fees (0.25% vs 0.5%)</li>
                <li>• Priority customer support</li>
                <li>• Access to advanced trading features</li>
              </ul>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <Link href="/dashboard">
                <Button className="w-full bg-digix-blue-600 hover:bg-digix-blue-700">
                  Return to Dashboard
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>

              <Button
                variant="outline"
                className="w-full border-digix-blue-200 text-digix-blue-600 flex items-center justify-center"
              >
                <FileText className="w-4 h-4 mr-2" />
                View Submission Details
              </Button>
            </div>

            <div className="text-center text-sm text-gray-500 pt-2">
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
