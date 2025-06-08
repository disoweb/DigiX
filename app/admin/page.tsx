"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Users,
  TrendingUp,
  DollarSign,
  AlertTriangle,
  Search,
  Eye,
  Ban,
  CheckCircle,
  XCircle,
  Settings,
  BarChart3,
} from "lucide-react"

interface User {
  id: string
  name: string
  email: string
  status: "active" | "suspended" | "pending"
  joinDate: string
  totalVolume: number
  transactionCount: number
}

interface Transaction {
  id: string
  user: string
  type: "buy" | "sell" | "escrow"
  amount: number
  status: "completed" | "pending" | "failed"
  date: string
  reference: string
}

export default function AdminPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  const mockUsers: User[] = [
    {
      id: "USR001",
      name: "John Doe",
      email: "john@example.com",
      status: "active",
      joinDate: "2024-01-15",
      totalVolume: 150000,
      transactionCount: 25,
    },
    {
      id: "USR002",
      name: "Jane Smith",
      email: "jane@example.com",
      status: "pending",
      joinDate: "2024-01-14",
      totalVolume: 75000,
      transactionCount: 12,
    },
  ]

  const mockTransactions: Transaction[] = [
    {
      id: "TXN001",
      user: "john@example.com",
      type: "buy",
      amount: 500,
      status: "completed",
      date: "2024-01-15T10:30:00",
      reference: "REF123456789",
    },
    {
      id: "TXN002",
      user: "jane@example.com",
      type: "sell",
      amount: 200,
      status: "pending",
      date: "2024-01-14T15:45:00",
      reference: "REF987654321",
    },
  ]

  const stats = [
    { label: "Total Users", value: "12,543", change: "+12%", icon: Users },
    { label: "Total Volume", value: "₦2.5B", change: "+8%", icon: DollarSign },
    { label: "Active Transactions", value: "1,234", change: "+15%", icon: TrendingUp },
    { label: "Pending Issues", value: "23", change: "-5%", icon: AlertTriangle },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
      case "completed":
        return "bg-digix-green-100 text-digix-green-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "suspended":
      case "failed":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Admin Header */}
      <header className="bg-white border-b border-digix-blue-100">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-digix-blue-600 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-lg">D</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-digix-blue-900">DigiX Admin</h1>
                <p className="text-sm text-gray-600">Platform Management Dashboard</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Button variant="outline" size="sm" className="border-digix-blue-200">
                <Settings className="w-4 h-4 mr-2" />
                Settings
              </Button>
              <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Stats Overview */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index} className="border-digix-blue-100">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">{stat.label}</p>
                    <p className="text-2xl font-bold text-digix-blue-900">{stat.value}</p>
                    <p className="text-sm text-digix-green-600">{stat.change}</p>
                  </div>
                  <stat.icon className="w-8 h-8 text-digix-blue-600" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Tabs defaultValue="users" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="transactions">Transactions</TabsTrigger>
            <TabsTrigger value="escrow">Escrow</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          {/* Users Tab */}
          <TabsContent value="users">
            <Card className="border-digix-blue-100">
              <CardHeader>
                <CardTitle className="text-digix-blue-900">User Management</CardTitle>
                <CardDescription>Manage platform users and their accounts</CardDescription>
              </CardHeader>
              <CardContent>
                {/* Filters */}
                <div className="flex flex-col md:flex-row gap-4 mb-6">
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                        placeholder="Search users..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 border-digix-blue-200"
                      />
                    </div>
                  </div>
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-full md:w-40 border-digix-blue-200">
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="suspended">Suspended</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Users List */}
                <div className="space-y-4">
                  {mockUsers.map((user) => (
                    <div
                      key={user.id}
                      className="flex items-center justify-between p-4 border rounded-lg border-digix-blue-100"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
                        <div>
                          <p className="font-medium text-digix-blue-900">{user.name}</p>
                          <p className="text-sm text-gray-500">{user.email}</p>
                          <p className="text-xs text-gray-400">
                            Joined: {user.joinDate} • {user.transactionCount} transactions
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="text-right">
                          <Badge className={getStatusColor(user.status)}>{user.status}</Badge>
                          <p className="text-sm text-gray-500 mt-1">₦{user.totalVolume.toLocaleString()}</p>
                        </div>
                        <div className="flex space-x-2">
                          <Button variant="ghost" size="sm">
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Ban className="w-4 h-4 text-red-500" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Transactions Tab */}
          <TabsContent value="transactions">
            <Card className="border-digix-blue-100">
              <CardHeader>
                <CardTitle className="text-digix-blue-900">Transaction Management</CardTitle>
                <CardDescription>Monitor and manage all platform transactions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockTransactions.map((transaction) => (
                    <div
                      key={transaction.id}
                      className="flex items-center justify-between p-4 border rounded-lg border-digix-blue-100"
                    >
                      <div className="flex items-center space-x-4">
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center ${
                            transaction.type === "buy"
                              ? "bg-digix-green-100"
                              : transaction.type === "sell"
                                ? "bg-red-100"
                                : "bg-digix-blue-100"
                          }`}
                        >
                          {transaction.type === "buy" ? (
                            <TrendingUp className="w-5 h-5 text-digix-green-600" />
                          ) : transaction.type === "sell" ? (
                            <TrendingUp className="w-5 h-5 text-red-600 rotate-180" />
                          ) : (
                            <Users className="w-5 h-5 text-digix-blue-600" />
                          )}
                        </div>
                        <div>
                          <p className="font-medium text-digix-blue-900">
                            {transaction.type.toUpperCase()} - {transaction.amount} USDT
                          </p>
                          <p className="text-sm text-gray-500">{transaction.user}</p>
                          <p className="text-xs text-gray-400">
                            {transaction.id} • {new Date(transaction.date).toLocaleString()}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <Badge className={getStatusColor(transaction.status)}>{transaction.status}</Badge>
                        <div className="flex space-x-2">
                          <Button variant="ghost" size="sm">
                            <Eye className="w-4 h-4" />
                          </Button>
                          {transaction.status === "pending" && (
                            <>
                              <Button variant="ghost" size="sm">
                                <CheckCircle className="w-4 h-4 text-digix-green-600" />
                              </Button>
                              <Button variant="ghost" size="sm">
                                <XCircle className="w-4 h-4 text-red-500" />
                              </Button>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Escrow Tab */}
          <TabsContent value="escrow">
            <Card className="border-digix-blue-100">
              <CardHeader>
                <CardTitle className="text-digix-blue-900">Escrow Management</CardTitle>
                <CardDescription>Monitor escrow transactions and resolve disputes</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No Active Escrows</h3>
                  <p className="text-gray-600">All escrow transactions are currently resolved.</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics">
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="border-digix-blue-100">
                <CardHeader>
                  <CardTitle className="text-digix-blue-900 flex items-center space-x-2">
                    <BarChart3 className="w-5 h-5" />
                    <span>Transaction Volume</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center text-gray-500">
                    Chart placeholder - Transaction volume over time
                  </div>
                </CardContent>
              </Card>

              <Card className="border-digix-blue-100">
                <CardHeader>
                  <CardTitle className="text-digix-blue-900 flex items-center space-x-2">
                    <TrendingUp className="w-5 h-5" />
                    <span>User Growth</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center text-gray-500">
                    Chart placeholder - User registration over time
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
