"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, TrendingUp, TrendingDown, Search, Download, Eye } from "lucide-react"
import Link from "next/link"

export default function HistoryPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [typeFilter, setTypeFilter] = useState("all")

  const transactions = [
    {
      id: "TXN001",
      type: "buy",
      amount: 500,
      rate: 1650,
      total: 825000,
      status: "completed",
      date: "2024-01-15T10:30:00",
      reference: "REF123456789",
    },
    {
      id: "TXN002",
      type: "sell",
      amount: 200,
      rate: 1645,
      total: 329000,
      status: "pending",
      date: "2024-01-14T15:45:00",
      reference: "REF987654321",
    },
    {
      id: "TXN003",
      type: "buy",
      amount: 1000,
      rate: 1640,
      total: 1640000,
      status: "completed",
      date: "2024-01-13T09:15:00",
      reference: "REF456789123",
    },
    {
      id: "TXN004",
      type: "sell",
      amount: 750,
      rate: 1635,
      total: 1226250,
      status: "failed",
      date: "2024-01-12T14:20:00",
      reference: "REF789123456",
    },
    {
      id: "TXN005",
      type: "buy",
      amount: 300,
      rate: 1655,
      total: 496500,
      status: "completed",
      date: "2024-01-11T11:00:00",
      reference: "REF321654987",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "failed":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-NG", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const filteredTransactions = transactions.filter((transaction) => {
    const matchesSearch =
      transaction.reference.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.id.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || transaction.status === statusFilter
    const matchesType = typeFilter === "all" || transaction.type === typeFilter

    return matchesSearch && matchesStatus && matchesType
  })

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Link href="/dashboard" className="flex items-center text-green-600 hover:text-green-700">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Link>
        </div>

        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Transaction History</h1>
          <p className="text-gray-600">View and manage all your USDT transactions</p>
        </div>

        {/* Summary Cards */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-green-600">₦4,587,750</div>
              <p className="text-sm text-gray-600">Total Volume</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold">5</div>
              <p className="text-sm text-gray-600">Total Transactions</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-green-600">3</div>
              <p className="text-sm text-gray-600">Completed</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-yellow-600">1</div>
              <p className="text-sm text-gray-600">Pending</p>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder="Search by transaction ID or reference..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="w-full md:w-40">
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="buy">Buy</SelectItem>
                  <SelectItem value="sell">Sell</SelectItem>
                </SelectContent>
              </Select>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full md:w-40">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="failed">Failed</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" className="flex items-center space-x-2">
                <Download className="w-4 h-4" />
                <span>Export</span>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Transactions List */}
        <Card>
          <CardHeader>
            <CardTitle>Transactions</CardTitle>
            <CardDescription>{filteredTransactions.length} transaction(s) found</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredTransactions.map((transaction) => (
                <div key={transaction.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex flex-col md:flex-row md:items-center justify-between space-y-2 md:space-y-0">
                    <div className="flex items-center space-x-4">
                      <div
                        className={`w-12 h-12 rounded-full flex items-center justify-center ${
                          transaction.type === "buy" ? "bg-green-100" : "bg-red-100"
                        }`}
                      >
                        {transaction.type === "buy" ? (
                          <TrendingUp className="w-6 h-6 text-green-600" />
                        ) : (
                          <TrendingDown className="w-6 h-6 text-red-600" />
                        )}
                      </div>
                      <div>
                        <div className="flex items-center space-x-2">
                          <p className="font-medium">
                            {transaction.type === "buy" ? "Bought" : "Sold"} {transaction.amount} USDT
                          </p>
                          <Badge className={getStatusColor(transaction.status)}>{transaction.status}</Badge>
                        </div>
                        <p className="text-sm text-gray-500">
                          Rate: ₦{transaction.rate.toLocaleString()} • {formatDate(transaction.date)}
                        </p>
                        <p className="text-xs text-gray-400">Ref: {transaction.reference}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <p className="font-semibold">₦{transaction.total.toLocaleString()}</p>
                        <p className="text-sm text-gray-500">{transaction.id}</p>
                      </div>
                      <Button variant="ghost" size="sm">
                        <Eye className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filteredTransactions.length === 0 && (
              <div className="text-center py-8">
                <p className="text-gray-500">No transactions found matching your criteria</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
