import { useState } from "react"
import axios from "axios"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import { Button } from "@/components/ui/button"

interface FitnessData {
  steps?: number
  weight?: number
  height?: number
  isConnected?: boolean
}

const mockData: FitnessData = {
  steps: 8547,
  weight: 70.5,
  height: 1.75,
  isConnected: false
}

export function GoogleFitData() {
  const [data, setData] = useState<FitnessData>(mockData)
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const handleConnect = async () => {
    try {
      setIsLoading(true)
      const response = await axios.get('http://localhost:3001/api/google-fit/auth-url')
      // Update connection status before redirect
      setData({ ...data, isConnected: true })
      window.location.href = response.data.url
    } catch (error) {
      console.error('Failed to get auth URL:', error)
      toast({
        title: "Connection Failed",
        description: "Could not connect to Google Fit. Please try again later.",
        variant: "destructive",
      })
      setData({ ...data, isConnected: false })
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoading) {
    return (
      <div className="text-center space-y-4">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
        <p>Connecting to Google Fit...</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {!data.isConnected && (
        <div className="text-center mb-4">
          <Button onClick={handleConnect} variant="default" size="lg">
            Connect Google Fit
          </Button>
          <p className="text-sm text-muted-foreground mt-2">
           
          </p>
        </div>
      )}

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Daily Steps</CardTitle>
            <CardDescription>Your step count for today</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{data.steps?.toLocaleString() || 'No data'}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Weight</CardTitle>
            <CardDescription>Your current weight</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{data.weight ? `${data.weight.toFixed(1)} kg` : 'No data'}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Height</CardTitle>
            <CardDescription>Your height</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{data.height ? `${data.height.toFixed(2)} m` : 'No data'}</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
