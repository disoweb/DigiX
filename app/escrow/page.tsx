"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Shield, Clock, CheckCircle, AlertCircle, Users, Plus } from "lucide-react"
import Link from "next/link"

interface EscrowTransaction {
  id: string
  title: string
  amount: number
  currency: string
  status: "pending" | "funded" | "completed" | "disputed"
  createdAt: string
  counterparty: string
  description: string
  role: "creator" | "participant"
}

export default function EscrowPage() {
  const [activeTab, setActiveTab] = useState("create")
  const [formData, setFormData] = useState({
    title: "",
    amount: "",
    currency: "USDT",
    counterpartyEmail: "",
    description: "",
    terms: "",
  })

  const mockTransactions: EscrowTransaction[] = [
    {
      id: "ESC001",
      title: "Website Development Project",
      amount: 500,
      currency: "USDT",
      status: "pending",
      createdAt: "2024-01-15",
      counterparty: "developer@example.com",
      description: "Payment for e-commerce website development",
      role: "creator",
    },
    {
      id: "ESC002",
      title: "Graphic Design Services",
      amount: 200,
      currency: "USDT",
      status: "funded",
      createdAt: "2024-01-14",
      counterparty: "client@example.com",
      description: "Logo and branding design package",
      role: "participant",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "funded":
        return "bg-blue-100 text-blue-800"
      case "completed":
        return "bg-digix-green-100 text-digix-green-800"
      case "disputed":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <Clock className="w-4 h-4" />
      case "funded":
        return <Shield className="w-4 h-4" />
      case "completed":
        return <CheckCircle className="w-4 h-4" />
      case "disputed":
        return <AlertCircle className="w-4 h-4" />
      default:
        return <Clock className="w-4 h-4" />
    }
  }

  const handleCreateEscrow = () => {
    // Handle escrow creation
    console.log("Creating escrow:", formData)
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
          <h1 className="text-2xl font-bold text-digix-blue-900 mb-2">Escrow Service</h1>
          <p className="text-gray-600">Secure transactions with built-in protection for both parties</p>
        </div>

        {/* How It Works */}
        <Card className="mb-8 border-digix-blue-100">
          <CardHeader>
            <CardTitle className="text-digix-blue-900 flex items-center space-x-2">
              <Shield className="w-5 h-5 text-digix-green-600" />
              <span>How DigiX Escrow Works</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="w-12 h-12 bg-digix-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-digix-blue-600 font-bold">1</span>
                </div>
                <h3 className="font-medium text-digix-blue-900 mb-2">Create Escrow</h3>
                <p className="text-sm text-gray-600">User A creates an escrow transaction with terms</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-digix-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-digix-blue-600 font-bold">2</span>
                </div>
                <h3 className="font-medium text-digix-blue-900 mb-2">Fund Escrow</h3>
                <p className="text-sm text-gray-600">Funds are securely held by DigiX</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-digix-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-digix-blue-600 font-bold">3</span>
                </div>
                <h3 className="font-medium text-digix-blue-900 mb-2">Complete Work</h3>
                <p className="text-sm text-gray-600">User B fulfills the agreed terms</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-digix-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <CheckCircle className="w-5 h-5 text-digix-green-600" />
                </div>
                <h3 className="font-medium text-digix-blue-900 mb-2">Release Payment</h3>
                <p className="text-sm text-gray-600">User A approves and payment is released</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="create" className="flex items-center space-x-2">
              <Plus className="w-4 h-4" />
              <span>Create Escrow</span>
            </TabsTrigger>
            <TabsTrigger value="manage" className="flex items-center space-x-2">
              <Users className="w-4 h-4" />
              <span>My Escrows</span>
            </TabsTrigger>
          </TabsList>

          {/* Create Escrow Tab */}
          <TabsContent value="create">
            <Card className="border-digix-blue-100">
              <CardHeader>
                <CardTitle className="text-digix-blue-900">Create New Escrow</CardTitle>
                <CardDescription>Set up a secure escrow transaction</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label htmlFor="title">Transaction Title</Label>
                  <Input
                    id="title"
                    placeholder="e.g., Website Development Project"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="border-digix-blue-200 focus:border-digix-blue-500"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="amount">Amount</Label>
                    <Input
                      id="amount"
                      type="number"
                      placeholder="0.00"
                      value={formData.amount}
                      onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                      className="border-digix-blue-200 focus:border-digix-blue-500"
                    />
                  </div>
                  <div>
                    <Label htmlFor="currency">Currency</Label>
                    <Input id="currency" value="USDT" disabled className="border-digix-blue-200 bg-gray-50" />
                  </div>
                </div>

                <div>
                  <Label htmlFor="counterparty">Counterparty Email</Label>
                  <Input
                    id="counterparty"
                    type="email"
                    placeholder="counterparty@example.com"
                    value={formData.counterpartyEmail}
                    onChange={(e) => setFormData({ ...formData, counterpartyEmail: e.target.value })}
                    className="border-digix-blue-200 focus:border-digix-blue-500"
                  />
                </div>

                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Describe what this escrow is for..."
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="border-digix-blue-200 focus:border-digix-blue-500"
                  />
                </div>

                <div>
                  <Label htmlFor="terms">Terms & Conditions</Label>
                  <Textarea
                    id="terms"
                    placeholder="Specify the terms that must be met for payment release..."
                    value={formData.terms}
                    onChange={(e) => setFormData({ ...formData, terms: e.target.value })}
                    className="border-digix-blue-200 focus:border-digix-blue-500"
                  />
                </div>

                <div className="bg-digix-green-50 p-4 rounded-lg border border-digix-green-100">
                  <h4 className="font-medium text-digix-green-900 mb-2">Escrow Protection</h4>
                  <ul className="text-sm text-digix-green-800 space-y-1">
                    <li>• Funds are held securely until terms are met</li>
                    <li>• Both parties are protected throughout the process</li>
                    <li>• Dispute resolution available if needed</li>
                    <li>• 1% escrow fee applies (split between parties)</li>
                  </ul>
                </div>

                <Button
                  className="w-full bg-digix-blue-600 hover:bg-digix-blue-700"
                  size="lg"
                  onClick={handleCreateEscrow}
                  disabled={!formData.title || !formData.amount || !formData.counterpartyEmail}
                >
                  Create Escrow Transaction
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Manage Escrows Tab */}
          <TabsContent value="manage">
            <div className="space-y-4">
              {mockTransactions.map((transaction) => (
                <Card key={transaction.id} className="border-digix-blue-100">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="font-semibold text-digix-blue-900 mb-1">{transaction.title}</h3>
                        <p className="text-sm text-gray-600 mb-2">{transaction.description}</p>
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <span>ID: {transaction.id}</span>
                          <span>Created: {transaction.createdAt}</span>
                          <span>Role: {transaction.role === "creator" ? "Creator" : "Participant"}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-digix-blue-900 mb-1">
                          {transaction.amount} {transaction.currency}
                        </div>
                        <Badge className={getStatusColor(transaction.status)}>
                          {getStatusIcon(transaction.status)}
                          <span className="ml-1 capitalize">{transaction.status}</span>
                        </Badge>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="text-sm text-gray-600">Counterparty: {transaction.counterparty}</div>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm" className="border-digix-blue-200 text-digix-blue-600">
                          View Details
                        </Button>
                        {transaction.status === "funded" && transaction.role === "creator" && (
                          <Button size="sm" className="bg-digix-green-600 hover:bg-digix-green-700">
                            Approve Release
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}

              {mockTransactions.length === 0 && (
                <Card className="border-digix-blue-100">
                  <CardContent className="p-8 text-center">
                    <Shield className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No Escrow Transactions</h3>
                    <p className="text-gray-600 mb-4">
                      You haven't created or participated in any escrow transactions yet.
                    </p>
                    <Button
                      onClick={() => setActiveTab("create")}
                      className="bg-digix-blue-600 hover:bg-digix-blue-700"
                    >
                      Create Your First Escrow
                    </Button>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
