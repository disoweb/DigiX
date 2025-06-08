"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Zap, Wifi, Tv, Smartphone, CreditCard, Clock, CheckCircle } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

interface BillCategory {
  id: string
  name: string
  icon: any
  providers: BillProvider[]
}

interface BillProvider {
  id: string
  name: string
  logo: string
  type: string
}

export default function BillsPage() {
  const router = useRouter()
  const [selectedCategory, setSelectedCategory] = useState("")
  const [selectedProvider, setSelectedProvider] = useState("")
  const [customerInfo, setCustomerInfo] = useState("")
  const [amount, setAmount] = useState("")
  const [processing, setProcessing] = useState(false)

  const billCategories: BillCategory[] = [
    {
      id: "electricity",
      name: "Electricity",
      icon: Zap,
      providers: [
        { id: "eko", name: "Eko Electricity", logo: "/placeholder.svg", type: "prepaid" },
        { id: "ikeja", name: "Ikeja Electric", logo: "/placeholder.svg", type: "prepaid" },
        { id: "abuja", name: "Abuja Electricity", logo: "/placeholder.svg", type: "prepaid" },
        { id: "kano", name: "Kano Electricity", logo: "/placeholder.svg", type: "prepaid" },
      ],
    },
    {
      id: "internet",
      name: "Internet",
      icon: Wifi,
      providers: [
        { id: "mtn-data", name: "MTN Data", logo: "/placeholder.svg", type: "data" },
        { id: "airtel-data", name: "Airtel Data", logo: "/placeholder.svg", type: "data" },
        { id: "glo-data", name: "Glo Data", logo: "/placeholder.svg", type: "data" },
        { id: "9mobile-data", name: "9mobile Data", logo: "/placeholder.svg", type: "data" },
      ],
    },
    {
      id: "cable",
      name: "Cable TV",
      icon: Tv,
      providers: [
        { id: "dstv", name: "DStv", logo: "/placeholder.svg", type: "subscription" },
        { id: "gotv", name: "GOtv", logo: "/placeholder.svg", type: "subscription" },
        { id: "startimes", name: "StarTimes", logo: "/placeholder.svg", type: "subscription" },
      ],
    },
    {
      id: "airtime",
      name: "Airtime",
      icon: Smartphone,
      providers: [
        { id: "mtn", name: "MTN", logo: "/placeholder.svg", type: "airtime" },
        { id: "airtel", name: "Airtel", logo: "/placeholder.svg", type: "airtime" },
        { id: "glo", name: "Glo", logo: "/placeholder.svg", type: "airtime" },
        { id: "9mobile", name: "9mobile", logo: "/placeholder.svg", type: "airtime" },
      ],
    },
  ]

  const recentBills = [
    { id: "1", provider: "Eko Electricity", amount: 5000, status: "completed", date: "2024-01-20" },
    { id: "2", provider: "DStv", amount: 8500, status: "completed", date: "2024-01-18" },
    { id: "3", provider: "MTN Data", amount: 2000, status: "pending", date: "2024-01-17" },
  ]

  const handlePayBill = () => {
    setProcessing(true)

    // Simulate payment processing
    setTimeout(() => {
      router.push(`/bills/success?provider=${selectedProvider}&amount=${amount}&customer=${customerInfo}`)
    }, 2000)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-digix-green-100 text-digix-green-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "failed":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const selectedCategoryData = billCategories.find((cat) => cat.id === selectedCategory)
  const selectedProviderData = selectedCategoryData?.providers.find((p) => p.id === selectedProvider)

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
          <h1 className="text-2xl font-bold text-digix-blue-900 mb-2">Bill Payments</h1>
          <p className="text-gray-600">Pay your bills quickly and securely with USDT</p>
        </div>

        <Tabs defaultValue="pay" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="pay">Pay Bills</TabsTrigger>
            <TabsTrigger value="history">Payment History</TabsTrigger>
          </TabsList>

          {/* Pay Bills Tab */}
          <TabsContent value="pay">
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Bill Categories */}
              <Card className="border-digix-blue-100">
                <CardHeader>
                  <CardTitle className="text-digix-blue-900">Select Service</CardTitle>
                  <CardDescription>Choose the type of bill you want to pay</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    {billCategories.map((category) => (
                      <button
                        key={category.id}
                        onClick={() => {
                          setSelectedCategory(category.id)
                          setSelectedProvider("")
                        }}
                        className={`p-4 rounded-lg border-2 transition-colors ${
                          selectedCategory === category.id
                            ? "border-digix-blue-500 bg-digix-blue-50"
                            : "border-gray-200 hover:border-digix-blue-300"
                        }`}
                      >
                        <category.icon className="w-8 h-8 mx-auto mb-2 text-digix-blue-600" />
                        <p className="text-sm font-medium text-digix-blue-900">{category.name}</p>
                      </button>
                    ))}
                  </div>

                  {selectedCategoryData && (
                    <div className="mt-6">
                      <Label>Select Provider</Label>
                      <Select value={selectedProvider} onValueChange={setSelectedProvider}>
                        <SelectTrigger className="border-digix-blue-200 focus:border-digix-blue-500">
                          <SelectValue placeholder="Choose provider" />
                        </SelectTrigger>
                        <SelectContent>
                          {selectedCategoryData.providers.map((provider) => (
                            <SelectItem key={provider.id} value={provider.id}>
                              {provider.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Payment Form */}
              <Card className="border-digix-blue-100">
                <CardHeader>
                  <CardTitle className="text-digix-blue-900">Payment Details</CardTitle>
                  <CardDescription>Enter your payment information</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {selectedProviderData && (
                    <>
                      <div>
                        <Label htmlFor="customer-info">
                          {selectedProviderData.type === "airtime" || selectedProviderData.type === "data"
                            ? "Phone Number"
                            : selectedProviderData.type === "subscription"
                              ? "Smart Card Number"
                              : "Meter Number"}
                        </Label>
                        <Input
                          id="customer-info"
                          placeholder={
                            selectedProviderData.type === "airtime" || selectedProviderData.type === "data"
                              ? "08012345678"
                              : selectedProviderData.type === "subscription"
                                ? "1234567890"
                                : "12345678901"
                          }
                          value={customerInfo}
                          onChange={(e) => setCustomerInfo(e.target.value)}
                          className="border-digix-blue-200 focus:border-digix-blue-500"
                        />
                      </div>

                      <div>
                        <Label htmlFor="amount">Amount (NGN)</Label>
                        <Input
                          id="amount"
                          type="number"
                          placeholder="0.00"
                          value={amount}
                          onChange={(e) => setAmount(e.target.value)}
                          className="border-digix-blue-200 focus:border-digix-blue-500"
                        />
                      </div>

                      {selectedProviderData.type === "airtime" && (
                        <div className="grid grid-cols-4 gap-2">
                          {[100, 200, 500, 1000].map((quickAmount) => (
                            <Button
                              key={quickAmount}
                              variant="outline"
                              size="sm"
                              onClick={() => setAmount(quickAmount.toString())}
                              className="border-digix-blue-200 text-digix-blue-600"
                            >
                              ₦{quickAmount}
                            </Button>
                          ))}
                        </div>
                      )}

                      {amount && (
                        <div className="bg-digix-blue-50 p-4 rounded-lg space-y-2 border border-digix-blue-100">
                          <h4 className="font-medium text-digix-blue-900">Payment Summary</h4>
                          <div className="flex justify-between text-sm">
                            <span>Service:</span>
                            <span>{selectedProviderData.name}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span>Amount:</span>
                            <span>₦{Number(amount).toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span>Service fee:</span>
                            <span>₦50</span>
                          </div>
                          <div className="border-t pt-2 flex justify-between font-medium text-digix-blue-900">
                            <span>Total:</span>
                            <span>₦{(Number(amount) + 50).toLocaleString()}</span>
                          </div>
                        </div>
                      )}

                      <Button
                        className="w-full bg-digix-blue-600 hover:bg-digix-blue-700"
                        onClick={handlePayBill}
                        disabled={!customerInfo || !amount || processing}
                      >
                        {processing ? "Processing Payment..." : "Pay Bill"}
                      </Button>
                    </>
                  )}

                  {!selectedProvider && (
                    <div className="text-center py-8 text-gray-500">
                      <CreditCard className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                      <p>Select a service category and provider to continue</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Payment History Tab */}
          <TabsContent value="history">
            <Card className="border-digix-blue-100">
              <CardHeader>
                <CardTitle className="text-digix-blue-900">Payment History</CardTitle>
                <CardDescription>Your recent bill payments</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentBills.map((bill) => (
                    <div
                      key={bill.id}
                      className="flex items-center justify-between p-4 border rounded-lg border-digix-blue-100"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-digix-blue-100 rounded-full flex items-center justify-center">
                          <CreditCard className="w-5 h-5 text-digix-blue-600" />
                        </div>
                        <div>
                          <p className="font-medium text-digix-blue-900">{bill.provider}</p>
                          <p className="text-sm text-gray-500">Paid on {bill.date}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="text-right">
                          <p className="font-semibold text-digix-blue-900">₦{bill.amount.toLocaleString()}</p>
                          <div
                            className={`inline-flex items-center px-2 py-1 rounded-full text-xs ${getStatusColor(bill.status)}`}
                          >
                            {bill.status === "completed" ? (
                              <CheckCircle className="w-3 h-3 mr-1" />
                            ) : (
                              <Clock className="w-3 h-3 mr-1" />
                            )}
                            {bill.status}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {recentBills.length === 0 && (
                  <div className="text-center py-8">
                    <CreditCard className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No Payment History</h3>
                    <p className="text-gray-600">Your bill payments will appear here</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
