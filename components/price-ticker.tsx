"use client"

import { usePrice } from "@/hooks/use-price"
import { TrendingUp, TrendingDown, RefreshCw } from "lucide-react"

export function PriceTicker() {
  const { price, loading, error } = usePrice()

  if (loading) {
    return (
      <div className="flex items-center space-x-2 text-gray-500">
        <RefreshCw className="w-4 h-4 animate-spin" />
        <span className="text-sm">Loading price...</span>
      </div>
    )
  }

  if (error || !price) {
    return <div className="text-red-500 text-sm">Failed to load price</div>
  }

  const isPositive = price.change24h >= 0

  return (
    <div className="flex items-center space-x-4">
      <div>
        <div className="flex items-center space-x-2">
          <span className="text-2xl font-bold text-digix-blue-600">₦{price.ngn.toLocaleString()}</span>
          <div className={`flex items-center space-x-1 ${isPositive ? "text-digix-green-600" : "text-red-500"}`}>
            {isPositive ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
            <span className="text-sm font-medium">
              {isPositive ? "+" : ""}
              {price.change24h.toFixed(2)}%
            </span>
          </div>
        </div>
        <p className="text-xs text-gray-500">Last updated: {new Date(price.lastUpdated).toLocaleTimeString()}</p>
      </div>
    </div>
  )
}
