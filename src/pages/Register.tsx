import { Link, useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useAuth } from '@/lib/auth-provider'
import { useState } from 'react'
import PageBackground from '@/components/PageBackground'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card'
import { Dumbbell } from 'lucide-react'
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "@/hooks/use-toast"
import { Checkbox } from "@/components/ui/checkbox"

const GOALS = [
  { label: 'Weight Loss', value: 'weight_loss' },
  { label: 'Muscle Gain', value: 'muscle_gain' },
  { label: 'Strength', value: 'strength' },
  { label: 'Endurance', value: 'endurance' },
  { label: 'Flexibility', value: 'flexibility' }
]

export default function Register() {
  const { register, isLoading, error: authError } = useAuth()
  const navigate = useNavigate()
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    gender: '',
    age: '',
    bodyType: '',
    goals: [] as string[],
    currentWeight: '',
    targetWeight: '',
  })
  const [error, setError] = useState('')

  const handleGoalChange = (goalValue: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      goals: checked 
        ? [...prev.goals, goalValue]
        : prev.goals.filter(g => g !== goalValue)
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (step === 1) {
      if (!formData.email || !formData.password || !formData.confirmPassword) {
        setError('Please fill in all required fields')
        return
      }

      if (formData.password !== formData.confirmPassword) {
        setError('Passwords do not match')
        return
      }

      setStep(2)
      return
    }

    if (!formData.name) {
      setError('Name is required')
      return
    }

    try {
      // Remove confirmPassword and format data before sending
      const { confirmPassword, ...rest } = formData
      const registrationData = {
        ...rest,
        age: formData.age ? parseInt(formData.age) : undefined,
        currentWeight: formData.currentWeight ? parseFloat(formData.currentWeight) : undefined,
        targetWeight: formData.targetWeight ? parseFloat(formData.targetWeight) : undefined,
      }

      await register(registrationData)
      toast({
        title: "Registration successful!",
        description: "Welcome to Fitness Center",
      })
      navigate('/dashboard')
    } catch (err) {
      setError(authError || 'Registration failed')
      toast({
        title: "Registration failed",
        description: authError || 'Please try again',
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
              <CardTitle>{step === 1 ? 'Create Account' : 'Complete Your Profile'}</CardTitle>
            </div>
            <CardDescription>
              {step === 1 ? 'Enter your details to get started' : 'Tell us more about yourself'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit}>
              {error && (
                <div className="mb-4 p-2 text-sm text-red-500 bg-red-50 rounded">
                  {error}
                </div>
              )}
              
              {step === 1 ? (
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
                      placeholder="Create a password"
                      disabled={isLoading}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm Password</Label>
                    <Input
                      id="confirmPassword"
                      type="password"
                      value={formData.confirmPassword}
                      onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                      placeholder="Confirm your password"
                      disabled={isLoading}
                    />
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Enter your full name"
                      disabled={isLoading}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Gender</Label>
                    <RadioGroup
                      value={formData.gender}
                      onValueChange={(value) => setFormData({ ...formData, gender: value })}
                      disabled={isLoading}
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="male" id="male" />
                        <Label htmlFor="male">Male</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="female" id="female" />
                        <Label htmlFor="female">Female</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="other" id="other" />
                        <Label htmlFor="other">Other</Label>
                      </div>
                    </RadioGroup>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="age">Age</Label>
                    <Input
                      id="age"
                      type="number"
                      value={formData.age}
                      onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                      placeholder="Enter your age"
                      min="13"
                      max="120"
                      disabled={isLoading}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="bodyType">Body Type</Label>
                    <Select
                      value={formData.bodyType}
                      onValueChange={(value) => setFormData({ ...formData, bodyType: value })}
                      disabled={isLoading}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select your body type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ectomorph">Ectomorph</SelectItem>
                        <SelectItem value="mesomorph">Mesomorph</SelectItem>
                        <SelectItem value="endomorph">Endomorph</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Goals</Label>
                    <div className="space-y-2">
                      {GOALS.map(({ label, value }) => (
                        <div key={value} className="flex items-center space-x-2">
                          <Checkbox
                            id={`goal-${value}`}
                            checked={formData.goals.includes(value)}
                            onCheckedChange={(checked) => handleGoalChange(value, checked as boolean)}
                            disabled={isLoading}
                          />
                          <Label htmlFor={`goal-${value}`}>{label}</Label>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="currentWeight">Current Weight (kg)</Label>
                      <Input
                        id="currentWeight"
                        type="number"
                        value={formData.currentWeight}
                        onChange={(e) => setFormData({ ...formData, currentWeight: e.target.value })}
                        placeholder="Current weight"
                        min="30"
                        max="300"
                        disabled={isLoading}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="targetWeight">Target Weight (kg)</Label>
                      <Input
                        id="targetWeight"
                        type="number"
                        value={formData.targetWeight}
                        onChange={(e) => setFormData({ ...formData, targetWeight: e.target.value })}
                        placeholder="Target weight"
                        min="30"
                        max="300"
                        disabled={isLoading}
                      />
                    </div>
                  </div>
                </div>
              )}
            </form>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <div className="flex w-full space-x-4">
              {step === 2 && (
                <Button
                  variant="outline"
                  onClick={() => setStep(1)}
                  className="flex-1"
                  disabled={isLoading}
                >
                  Back
                </Button>
              )}
              <Button
                onClick={handleSubmit}
                className="flex-1"
                disabled={isLoading}
              >
                {isLoading ? "Please wait..." : step === 1 ? "Next" : "Create Account"}
              </Button>
            </div>
            {step === 1 && (
              <p className="text-center text-sm text-gray-600">
                Already have an account?{" "}
                <Link to="/login" className="text-primary hover:underline">
                  Login
                </Link>
              </p>
            )}
          </CardFooter>
        </Card>
      </div>
    </PageBackground>
  )
}