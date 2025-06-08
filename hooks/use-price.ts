"use client"

import { useState, useEffect } from "react"
import { fetchUSDTPrice, type PriceData } from "@/lib/api"

export function usePrice() {
  const [price, setPrice] = useState<PriceData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchPrice = async () => {
      try {
        setLoading(true)
        const data = await fetchUSDTPrice()
        setPrice(data)
        setError(null)
      } catch (err) {
        setError("Failed to fetch price")
      } finally {
        setLoading(false)
      }
    }

    fetchPrice()

    // Update price every 30 seconds
    const interval = setInterval(fetchPrice, 30000)

    return () => clearInterval(interval)
  }, [])

  return { price, loading, error }
}
