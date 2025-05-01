import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import axios from "axios"
import { useState } from "react"

export function GoogleFitConnect() {
  const [isConnecting, setIsConnecting] = useState(false)
  const { toast } = useToast()

  const handleConnect = async () => {
    try {
      setIsConnecting(true)
      const response = await axios.get('http://localhost:3001/api/google-fit/auth-url')
      window.location.href = response.data.url
    } catch (error) {
      console.error('Failed to get Google Fit auth URL:', error)
      toast({
        title: "Connection Failed",
        description: "Could not connect to Google Fit. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsConnecting(false)
    }
  }

  return (
    <div className="flex flex-col items-center space-y-4 p-4 border rounded-lg bg-white shadow-sm">
      <h2 className="text-xl font-semibold">Connect with Google Fit</h2>
      <p className="text-sm text-gray-600 text-center">
        Connect your Google Fit account to sync your fitness data automatically
      </p>
      <Button
        onClick={handleConnect}
        disabled={isConnecting}
        className="w-full max-w-sm"
      >
        {isConnecting ? "Connecting..." : "Connect Google Fit"}
      </Button>
    </div>
  )
}
