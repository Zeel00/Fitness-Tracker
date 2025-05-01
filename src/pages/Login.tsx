import { Link, useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useAuth } from '@/lib/auth-provider'
import { useState } from 'react'
import PageBackground from '@/components/PageBackground'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card'
import { Dumbbell } from 'lucide-react'
import { toast } from "@/hooks/use-toast"

export default function Login() {
  const { login, isLoading, error: authError } = useAuth()
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!formData.email || !formData.password) {
      setError('Please fill in all fields')
      return
    }

    try {
      await login(formData.email, formData.password)
      toast({
        title: "Login successful!",
        description: "Welcome back",
      })
      navigate('/dashboard')
    } catch (err) {
      setError(authError || 'Login failed')
      toast({
        title: "Login failed",
        description: authError || 'Please check your credentials and try again',
        variant: "destructive",
      })
    }
  }

  return (
    <PageBackground>
      <div className="flex items-center justify-center min-h-screen p-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <div className="flex items-center space-x-2">
              <Dumbbell className="w-6 h-6" />
              <CardTitle>Welcome Back</CardTitle>
            </div>
            <CardDescription>
              Login to access your fitness journey
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit}>
              {error && (
                <div className="mb-4 p-2 text-sm text-red-500 bg-red-50 rounded">
                  {error}
                </div>
              )}
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="Enter your email"
                    disabled={isLoading}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    placeholder="Enter your password"
                    disabled={isLoading}
                  />
                </div>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <Button
              onClick={handleSubmit}
              className="w-full"
              disabled={isLoading}
            >
              {isLoading ? "Please wait..." : "Login"}
            </Button>
            <p className="text-center text-sm text-gray-600">
              Don't have an account?{" "}
              <Link to="/register" className="text-primary hover:underline">
                Register
              </Link>
            </p>
          </CardFooter>
        </Card>
      </div>
    </PageBackground>
  )
}