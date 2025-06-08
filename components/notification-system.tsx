"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Bell, X, CheckCircle, AlertCircle, Info, TrendingUp, Gift, Shield } from "lucide-react"

interface Notification {
  id: string
  type: "success" | "warning" | "info" | "transaction" | "referral" | "security"
  title: string
  message: string
  timestamp: string
  read: boolean
  actionUrl?: string
}

export function NotificationSystem() {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "1",
      type: "success",
      title: "KYC Approved",
      message: "Your identity verification has been approved. You now have access to higher limits.",
      timestamp: "2024-01-20T10:30:00Z",
      read: false,
      actionUrl: "/dashboard",
    },
    {
      id: "2",
      type: "transaction",
      title: "Transaction Completed",
      message: "Your purchase of 500 USDT has been completed successfully.",
      timestamp: "2024-01-20T09:15:00Z",
      read: false,
      actionUrl: "/history",
    },
    {
      id: "3",
      type: "referral",
      title: "Referral Bonus Earned",
      message: "You've earned ₦2,500 from your referral. John Doe completed their first trade.",
      timestamp: "2024-01-19T16:45:00Z",
      read: true,
      actionUrl: "/referrals",
    },
  ])

  const [showNotifications, setShowNotifications] = useState(false)

  const unreadCount = notifications.filter((n) => !n.read).length

  const markAsRead = (id: string) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)))
  }

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })))
  }

  const removeNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id))
  }

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "success":
        return <CheckCircle className="w-5 h-5 text-digix-green-600" />
      case "warning":
        return <AlertCircle className="w-5 h-5 text-yellow-600" />
      case "transaction":
        return <TrendingUp className="w-5 h-5 text-digix-blue-600" />
      case "referral":
        return <Gift className="w-5 h-5 text-purple-600" />
      case "security":
        return <Shield className="w-5 h-5 text-red-600" />
      default:
        return <Info className="w-5 h-5 text-digix-blue-600" />
    }
  }

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp)
    const now = new Date()
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))

    if (diffInHours < 1) return "Just now"
    if (diffInHours < 24) return `${diffInHours}h ago`
    return date.toLocaleDateString()
  }

  return (
    <div className="relative">
      {/* Notification Bell */}
      <Button variant="ghost" size="sm" onClick={() => setShowNotifications(!showNotifications)} className="relative">
        <Bell className="w-5 h-5" />
        {unreadCount > 0 && (
          <Badge className="absolute -top-1 -right-1 w-5 h-5 p-0 flex items-center justify-center bg-red-500 text-white text-xs">
            {unreadCount > 9 ? "9+" : unreadCount}
          </Badge>
        )}
      </Button>

      {/* Notification Dropdown */}
      {showNotifications && (
        <div className="absolute right-0 top-full mt-2 w-80 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
          <div className="p-4 border-b">
            <div className="flex items-center justify-between">
              <h3 className="font-medium text-digix-blue-900">Notifications</h3>
              <div className="flex items-center space-x-2">
                {unreadCount > 0 && (
                  <Button variant="ghost" size="sm" onClick={markAllAsRead} className="text-xs text-digix-blue-600">
                    Mark all read
                  </Button>
                )}
                <Button variant="ghost" size="sm" onClick={() => setShowNotifications(false)}>
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>

          <div className="max-h-96 overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="p-4 text-center text-gray-500">
                <Bell className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                <p>No notifications</p>
              </div>
            ) : (
              notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-4 border-b hover:bg-gray-50 cursor-pointer ${
                    !notification.read ? "bg-digix-blue-50" : ""
                  }`}
                  onClick={() => markAsRead(notification.id)}
                >
                  <div className="flex items-start space-x-3">
                    <div className="shrink-0 mt-1">{getNotificationIcon(notification.type)}</div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className="font-medium text-sm text-digix-blue-900 truncate">{notification.title}</p>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation()
                            removeNotification(notification.id)
                          }}
                          className="p-1 h-auto"
                        >
                          <X className="w-3 h-3" />
                        </Button>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                      <p className="text-xs text-gray-500 mt-2">{formatTimestamp(notification.timestamp)}</p>
                    </div>
                  </div>
                  {!notification.read && (
                    <div className="w-2 h-2 bg-digix-blue-600 rounded-full absolute right-2 top-4"></div>
                  )}
                </div>
              ))
            )}
          </div>

          {notifications.length > 0 && (
            <div className="p-4 border-t">
              <Button variant="outline" size="sm" className="w-full border-digix-blue-200 text-digix-blue-600">
                View All Notifications
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
