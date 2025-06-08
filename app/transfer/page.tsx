"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Send, Phone, AtSign, CheckCircle, Clock, ArrowUpRight, ArrowDownLeft, Search } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

interface Contact {
  id: string
  name: string
  username: string
  phone: string
  avatar: string
  lastTransfer?: string
}

interface Transfer {
  id: string
  type: "sent" | "received"
  contact: string
  amount: number
  currency: "USDT" | "NGN"
  status: "completed" | "pending" | "failed"
  date: string
  note?: string
}

export default function TransferPage() {
  const router = useRouter()
  const [recipient, setRecipient] = useState("")
  const [amount, setAmount] = useState("")
  const [currency, setCurrency] = useState("USDT")
  const [note, setNote] = useState("")
  const [recipientInfo, setRecipientInfo] = useState<Contact | null>(null)
  const [searchType, setSearchType] = useState<"phone" | "username">("phone")
  const [processing, setProcessing] = useState(false)

  const recentContacts: Contact[] = [
    {
      id: "1",
      name: "John Doe",
      username: "@johndoe",
      phone: "+234 801 234 5678",
      avatar: "/placeholder.svg",
      lastTransfer: "2024-01-20",
    },
    {
      id: "2",
      name: "Jane Smith",
      username: "@janesmith",
      phone: "+234 802 345 6789",
      avatar: "/placeholder.svg",
      lastTransfer: "2024-01-18",
    },
    {
      id: "3",
      name: "Mike Johnson",
      username: "@mikej",
      phone: "+234 803 456 7890",
      avatar: "/placeholder.svg",
      lastTransfer: "2024-01-15",
    },
  ]

  const transferHistory: Transfer[] = [
    {
      id: "1",
      type: "sent",
      contact: "John Doe",
      amount: 100,
      currency: "USDT",
      status: "completed",
      date: "2024-01-20T10:30:00",
      note: "Payment for services",
    },
    {
      id: "2",
      type: "received",
      contact: "Jane Smith",
      amount: 50000,
      currency: "NGN",
      status: "completed",
      date: "2024-01-19T15:45:00",
      note: "Refund",
    },
    {
      id: "3",
      type: "sent",
      contact: "Mike Johnson",
      amount: 250,
      currency: "USDT",
      status: "pending",
      date: "2024-01-18T09:15:00",
    },
  ]

  const searchRecipient = () => {
    // Simulate API call to search for user
    setTimeout(() => {
      if (recipient) {
        setRecipientInfo({
          id: "found",
          name: "Found User",
          username: searchType === "username" ? recipient : "@founduser",
          phone: searchType === "phone" ? recipient : "+234 801 000 0000",
          avatar: "/placeholder.svg",
        })
      }
    }, 1000)
  }

  const handleTransfer = () => {
    setProcessing(true)

    // Simulate transfer processing
    setTimeout(() => {
      router.push(`/transfer/success?recipient=${recipientInfo?.name}&amount=${amount}&currency=${currency}`)
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
          <h1 className="text-2xl font-bold text-digix-blue-900 mb-2">Send Money</h1>
          <p className="text-gray-600">Transfer USDT or NGN to other DigiX users instantly</p>
        </div>

        <Tabs defaultValue="send" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="send">Send Money</TabsTrigger>
            <TabsTrigger value="history">Transfer History</TabsTrigger>
          </TabsList>

          {/* Send Money Tab */}
          <TabsContent value="send">
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Recipient Selection */}
              <Card className="border-digix-blue-100">
                <CardHeader>
                  <CardTitle className="text-digix-blue-900">Select Recipient</CardTitle>
                  <CardDescription>Find user by phone number or username</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Search Type Toggle */}
                  <div className="flex space-x-2">
                    <Button
                      variant={searchType === "phone" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSearchType("phone")}
                      className={
                        searchType === "phone" ? "bg-digix-blue-600" : "border-digix-blue-200 text-digix-blue-600"
                      }
                    >
                      <Phone className="w-4 h-4 mr-2" />
                      Phone
                    </Button>
                    <Button
                      variant={searchType === "username" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSearchType("username")}
                      className={
                        searchType === "username" ? "bg-digix-blue-600" : "border-digix-blue-200 text-digix-blue-600"
                      }
                    >
                      <AtSign className="w-4 h-4 mr-2" />
                      Username
                    </Button>
                  </div>

                  {/* Search Input */}
                  <div className="flex space-x-2">
                    <Input
                      placeholder={searchType === "phone" ? "08012345678" : "@username"}
                      value={recipient}
                      onChange={(e) => setRecipient(e.target.value)}
                      className="border-digix-blue-200 focus:border-digix-blue-500"
                    />
                    <Button
                      onClick={searchRecipient}
                      disabled={!recipient}
                      className="bg-digix-blue-600 hover:bg-digix-blue-700"
                    >
                      <Search className="w-4 h-4" />
                    </Button>
                  </div>

                  {/* Found Recipient */}
                  {recipientInfo && (
                    <div className="p-4 border rounded-lg border-digix-green-200 bg-digix-green-50">
                      <div className="flex items-center space-x-3">
                        <img
                          src={recipientInfo.avatar || "/placeholder.svg"}
                          alt={recipientInfo.name}
                          className="w-10 h-10 rounded-full"
                        />
                        <div>
                          <p className="font-medium text-digix-green-900">{recipientInfo.name}</p>
                          <p className="text-sm text-digix-green-700">{recipientInfo.username}</p>
                          <p className="text-sm text-digix-green-700">{recipientInfo.phone}</p>
                        </div>
                        <CheckCircle className="w-5 h-5 text-digix-green-600 ml-auto" />
                      </div>
                    </div>
                  )}

                  {/* Recent Contacts */}
                  <div>
                    <Label className="text-sm font-medium text-gray-700">Recent Contacts</Label>
                    <div className="space-y-2 mt-2">
                      {recentContacts.map((contact) => (
                        <button
                          key={contact.id}
                          onClick={() => setRecipientInfo(contact)}
                          className="w-full p-3 text-left border rounded-lg hover:bg-digix-blue-50 border-digix-blue-100"
                        >
                          <div className="flex items-center space-x-3">
                            <img
                              src={contact.avatar || "/placeholder.svg"}
                              alt={contact.name}
                              className="w-8 h-8 rounded-full"
                            />
                            <div className="flex-1">
                              <p className="font-medium text-sm text-digix-blue-900">{contact.name}</p>
                              <p className="text-xs text-gray-500">{contact.username}</p>
                            </div>
                            <p className="text-xs text-gray-400">
                              {contact.lastTransfer && `Last: ${contact.lastTransfer}`}
                            </p>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Transfer Form */}
              <Card className="border-digix-blue-100">
                <CardHeader>
                  <CardTitle className="text-digix-blue-900">Transfer Details</CardTitle>
                  <CardDescription>Enter the amount and details</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {recipientInfo ? (
                    <>
                      {/* Currency Selection */}
                      <div>
                        <Label>Currency</Label>
                        <div className="flex space-x-2 mt-2">
                          <Button
                            variant={currency === "USDT" ? "default" : "outline"}
                            size="sm"
                            onClick={() => setCurrency("USDT")}
                            className={
                              currency === "USDT" ? "bg-digix-blue-600" : "border-digix-blue-200 text-digix-blue-600"
                            }
                          >
                            USDT
                          </Button>
                          <Button
                            variant={currency === "NGN" ? "default" : "outline"}
                            size="sm"
                            onClick={() => setCurrency("NGN")}
                            className={
                              currency === "NGN" ? "bg-digix-blue-600" : "border-digix-blue-200 text-digix-blue-600"
                            }
                          >
                            NGN
                          </Button>
                        </div>
                      </div>

                      {/* Amount Input */}
                      <div>
                        <Label htmlFor="amount">Amount</Label>
                        <Input
                          id="amount"
                          type="number"
                          placeholder="0.00"
                          value={amount}
                          onChange={(e) => setAmount(e.target.value)}
                          className="border-digix-blue-200 focus:border-digix-blue-500"
                        />
                      </div>

                      {/* Quick Amounts */}
                      <div>
                        <Label>Quick Amounts</Label>
                        <div className="grid grid-cols-4 gap-2 mt-2">
                          {currency === "USDT"
                            ? [10, 25, 50, 100].map((quickAmount) => (
                                <Button
                                  key={quickAmount}
                                  variant="outline"
                                  size="sm"
                                  onClick={() => setAmount(quickAmount.toString())}
                                  className="border-digix-blue-200 text-digix-blue-600"
                                >
                                  {quickAmount} USDT
                                </Button>
                              ))
                            : [1000, 5000, 10000, 25000].map((quickAmount) => (
                                <Button
                                  key={quickAmount}
                                  variant="outline"
                                  size="sm"
                                  onClick={() => setAmount(quickAmount.toString())}
                                  className="border-digix-blue-200 text-digix-blue-600"
                                >
                                  ₦{quickAmount.toLocaleString()}
                                </Button>
                              ))}
                        </div>
                      </div>

                      {/* Note */}
                      <div>
                        <Label htmlFor="note">Note (Optional)</Label>
                        <Textarea
                          id="note"
                          placeholder="Add a note for this transfer..."
                          value={note}
                          onChange={(e) => setNote(e.target.value)}
                          className="border-digix-blue-200 focus:border-digix-blue-500"
                        />
                      </div>

                      {/* Transfer Summary */}
                      {amount && (
                        <div className="bg-digix-blue-50 p-4 rounded-lg space-y-2 border border-digix-blue-100">
                          <h4 className="font-medium text-digix-blue-900">Transfer Summary</h4>
                          <div className="flex justify-between text-sm">
                            <span>Recipient:</span>
                            <span>{recipientInfo.name}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span>Amount:</span>
                            <span>
                              {currency === "USDT" ? `${amount} USDT` : `₦${Number(amount).toLocaleString()}`}
                            </span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span>Transfer fee:</span>
                            <span>Free</span>
                          </div>
                          <div className="border-t pt-2 flex justify-between font-medium text-digix-blue-900">
                            <span>Total:</span>
                            <span>
                              {currency === "USDT" ? `${amount} USDT` : `₦${Number(amount).toLocaleString()}`}
                            </span>
                          </div>
                        </div>
                      )}

                      {/* Available Balance */}
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Available Balance:</span>
                          <span className="font-medium text-digix-blue-900">
                            {currency === "USDT" ? "1,250.00 USDT" : "₦50,000.00"}
                          </span>
                        </div>
                      </div>

                      <Button
                        className="w-full bg-digix-blue-600 hover:bg-digix-blue-700"
                        onClick={handleTransfer}
                        disabled={!amount || processing || Number(amount) <= 0}
                      >
                        {processing
                          ? "Processing Transfer..."
                          : `Send ${currency === "USDT" ? `${amount} USDT` : `₦${Number(amount || 0).toLocaleString()}`}`}
                      </Button>
                    </>
                  ) : (
                    <div className="text-center py-8 text-gray-500">
                      <Send className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                      <p>Select a recipient to continue</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Transfer History Tab */}
          <TabsContent value="history">
            <Card className="border-digix-blue-100">
              <CardHeader>
                <CardTitle className="text-digix-blue-900">Transfer History</CardTitle>
                <CardDescription>Your recent money transfers</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {transferHistory.map((transfer) => (
                    <div
                      key={transfer.id}
                      className="flex items-center justify-between p-4 border rounded-lg border-digix-blue-100"
                    >
                      <div className="flex items-center space-x-4">
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center ${
                            transfer.type === "sent" ? "bg-red-100" : "bg-digix-green-100"
                          }`}
                        >
                          {transfer.type === "sent" ? (
                            <ArrowUpRight className="w-5 h-5 text-red-600" />
                          ) : (
                            <ArrowDownLeft className="w-5 h-5 text-digix-green-600" />
                          )}
                        </div>
                        <div>
                          <p className="font-medium text-digix-blue-900">
                            {transfer.type === "sent" ? "Sent to" : "Received from"} {transfer.contact}
                          </p>
                          <p className="text-sm text-gray-500">
                            {new Date(transfer.date).toLocaleDateString()} •{" "}
                            {new Date(transfer.date).toLocaleTimeString()}
                          </p>
                          {transfer.note && <p className="text-xs text-gray-400 mt-1">"{transfer.note}"</p>}
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="text-right">
                          <p
                            className={`font-semibold ${transfer.type === "sent" ? "text-red-600" : "text-digix-green-600"}`}
                          >
                            {transfer.type === "sent" ? "-" : "+"}
                            {transfer.currency === "USDT"
                              ? `${transfer.amount} USDT`
                              : `₦${transfer.amount.toLocaleString()}`}
                          </p>
                          <Badge className={getStatusColor(transfer.status)}>
                            {transfer.status === "completed" ? (
                              <CheckCircle className="w-3 h-3 mr-1" />
                            ) : (
                              <Clock className="w-3 h-3 mr-1" />
                            )}
                            {transfer.status}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {transferHistory.length === 0 && (
                  <div className="text-center py-8">
                    <Send className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No Transfer History</h3>
                    <p className="text-gray-600">Your money transfers will appear here</p>
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
