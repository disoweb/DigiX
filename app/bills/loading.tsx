import { Loader2 } from "lucide-react"

export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="flex flex-col items-center">
        <Loader2 className="w-10 h-10 text-digix-blue-600 animate-spin mb-4" />
        <p className="text-digix-blue-900">Loading bill payment services...</p>
      </div>
    </div>
  )
}
