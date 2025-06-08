"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Shield, Bell, User, CreditCard, Smartphone, Eye, EyeOff, Plus, Trash2 } from "lucide-react"
import Link from "next/link"

export default function SettingsPage() {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false)
  const [emailNotifications, setEmailNotifications] = useState(true)
  const [smsNotifications, setSmsNotifications] = useState(true)

  const bankAccounts = [
    { id: 1, bank: "GTBank", accountNumber: "0123456789", accountName: "John Doe" },
    { id: 2, bank: "Access Bank", accountNumber: "9876543210", accountName: "John Doe" },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-6">
          <Link href="/dashboard" className="flex items-center text-green-600 hover:text-green-700">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Link>
        </div>

        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Account Settings</h1>
          <p className="text-gray-600">Manage your account preferences and security settings</p>
        </div>

        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="profile" className="flex items-center space-x-2">
              <User className="w-4 h-4" />
              <span className="hidden sm:inline">Profile</span>
            </TabsTrigger>
            <TabsTrigger value="security" className="flex items-center space-x-2">
              <Shield className="w-4 h-4" />
              <span className="hidden sm:inline">Security</span>
            </TabsTrigger>
            <TabsTrigger value="banking" className="flex items-center space-x-2">
              <CreditCard className="w-4 h-4" />
              <span className="hidden sm:inline">Banking</span>
            </TabsTrigger>
            <TabsTrigger value="notifications" className="flex items-center space-x-2">
              <Bell className="w-4 h-4" />
              <span className="hidden sm:inline">Alerts</span>
            </TabsTrigger>
          </TabsList>

          {/* Profile Tab */}
          <TabsContent value="profile">
            <Card>
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
                <CardDescription>Update your personal information and preferences</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">First Name</Label>
                    <Input id="firstName" defaultValue="John" />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input id="lastName" defaultValue="Doe" />
                  </div>
                </div>

                <div>
                  <Label htmlFor="email">Email Address</Label>
                  <Input id="email" type="email" defaultValue="john@example.com" />
                </div>

                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" type="tel" defaultValue="+234 800 000 0000" />
                </div>

                <div>
                  <Label htmlFor="state">State of Residence</Label>
                  <Select defaultValue="lagos">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="lagos">Lagos</SelectItem>
                      <SelectItem value="abuja">FCT</SelectItem>
                      <SelectItem value="kano">Kano</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button className="bg-green-600 hover:bg-green-700">Update Profile</Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Security Tab */}
          <TabsContent value="security">
            <div className="space-y-6">
              {/* Change Password */}
              <Card>
                <CardHeader>
                  <CardTitle>Change Password</CardTitle>
                  <CardDescription>Update your password to keep your account secure</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="currentPassword">Current Password</Label>
                    <div className="relative">
                      <Input id="currentPassword" type={showCurrentPassword ? "text" : "password"} />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3"
                        onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                      >
                        {showCurrentPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </Button>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="newPassword">New Password</Label>
                    <div className="relative">
                      <Input id="newPassword" type={showNewPassword ? "text" : "password"} />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3"
                        onClick={() => setShowNewPassword(!showNewPassword)}
                      >
                        {showNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </Button>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="confirmPassword">Confirm New Password</Label>
                    <Input id="confirmPassword" type="password" />
                  </div>

                  <Button className="bg-green-600 hover:bg-green-700">Update Password</Button>
                </CardContent>
              </Card>

              {/* Two-Factor Authentication */}
              <Card>
                <CardHeader>
                  <CardTitle>Two-Factor Authentication</CardTitle>
                  <CardDescription>Add an extra layer of security to your account</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <p className="font-medium">Enable 2FA</p>
                      <p className="text-sm text-gray-500">Secure your account with SMS or authenticator app</p>
                    </div>
                    <Switch checked={twoFactorEnabled} onCheckedChange={setTwoFactorEnabled} />
                  </div>
                  {twoFactorEnabled && (
                    <div className="mt-4 p-4 bg-green-50 rounded-lg">
                      <p className="text-sm text-green-800">
                        Two-factor authentication is enabled. You'll receive a code via SMS for each login.
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Login Sessions */}
              <Card>
                <CardHeader>
                  <CardTitle>Active Sessions</CardTitle>
                  <CardDescription>Manage your active login sessions</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        <Smartphone className="w-5 h-5 text-gray-400" />
                        <div>
                          <p className="font-medium">Current Session</p>
                          <p className="text-sm text-gray-500">Lagos, Nigeria • Chrome on Windows</p>
                        </div>
                      </div>
                      <span className="text-sm text-green-600">Active</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Banking Tab */}
          <TabsContent value="banking">
            <Card>
              <CardHeader>
                <CardTitle>Bank Accounts</CardTitle>
                <CardDescription>Manage your bank accounts for USDT transactions</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  {bankAccounts.map((account) => (
                    <div key={account.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        <CreditCard className="w-5 h-5 text-gray-400" />
                        <div>
                          <p className="font-medium">{account.bank}</p>
                          <p className="text-sm text-gray-500">
                            {account.accountNumber} • {account.accountName}
                          </p>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm">
                        <Trash2 className="w-4 h-4 text-red-500" />
                      </Button>
                    </div>
                  ))}
                </div>

                <Button variant="outline" className="w-full flex items-center space-x-2">
                  <Plus className="w-4 h-4" />
                  <span>Add New Bank Account</span>
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Notifications Tab */}
          <TabsContent value="notifications">
            <Card>
              <CardHeader>
                <CardTitle>Notification Preferences</CardTitle>
                <CardDescription>Choose how you want to receive updates about your transactions</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <p className="font-medium">Email Notifications</p>
                      <p className="text-sm text-gray-500">Receive transaction updates via email</p>
                    </div>
                    <Switch checked={emailNotifications} onCheckedChange={setEmailNotifications} />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <p className="font-medium">SMS Notifications</p>
                      <p className="text-sm text-gray-500">Receive transaction updates via SMS</p>
                    </div>
                    <Switch checked={smsNotifications} onCheckedChange={setSmsNotifications} />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <p className="font-medium">Price Alerts</p>
                      <p className="text-sm text-gray-500">Get notified when USDT rates change significantly</p>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <p className="font-medium">Security Alerts</p>
                      <p className="text-sm text-gray-500">Important security notifications (always enabled)</p>
                    </div>
                    <Switch checked disabled />
                  </div>
                </div>

                <Button className="bg-green-600 hover:bg-green-700">Save Preferences</Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
