import { Button } from '@/components/ui/button'
import { useAuth } from '@/lib/auth-provider'
import { useWorkout } from '@/lib/workout-provider'
import { useMembership } from '@/lib/membership-provider'
import { useNavigate } from 'react-router-dom'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  Edit, 
  Dumbbell, 
  Check, 
  Save, 
  X, 
  AlertCircle, 
  User, 
  Calendar, 
  TrendingUp, 
  Target, 
  Activity,
  Award,
  Clock,
  BarChart,
  ChevronDown,
  LogOut
} from 'lucide-react'
import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Progress } from '@/components/ui/progress'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "../components/ui/dropdown-menu"
import { GoogleFitConnect } from '@/components/GoogleFitConnect'
import { GoogleFitData } from '@/components/GoogleFitData'

interface FitnessInfo {
  gender: string
  age: number
  bodyType: string
  goals: string[]
  currentWeight: number
  targetWeight: number
}

interface PersonalInfo {
  name: string
  email: string
}

interface Notification {
  type: 'success' | 'error'
  message: string
}

export default function Dashboard() {
  const { logout, user, updateUser } = useAuth()
  const { workoutPlans, loading, error, fetchWorkoutPlansByDifficulty } = useWorkout()
  const { membershipPlans, loading: membershipLoading, error: membershipError } = useMembership()
  const navigate = useNavigate()
  const [fitnessInfo, setFitnessInfo] = useState<FitnessInfo | null>(null)
  const [personalInfo, setPersonalInfo] = useState<PersonalInfo>({
    name: user?.name || '',
    email: user?.email || ''
  })
  const [isEditingPersonal, setIsEditingPersonal] = useState(false)
  const [isEditingFitness, setIsEditingFitness] = useState(false)
  const [editedFitnessInfo, setEditedFitnessInfo] = useState<FitnessInfo | null>(null)
  const [notification, setNotification] = useState<Notification | null>(null)
  const [isGoogleFitConnected, setIsGoogleFitConnected] = useState(false)

  useEffect(() => {
    if (user?.email) {
      const savedInfo = localStorage.getItem(`fitnessInfo_${user.email}`)
      if (savedInfo) {
        const parsedInfo = JSON.parse(savedInfo)
        setFitnessInfo(parsedInfo)
        setEditedFitnessInfo(parsedInfo)
      }
    }

    // Check URL parameters for Google Fit connection status
    const params = new URLSearchParams(window.location.search)
    if (params.get('googleFitConnected') === 'true') {
      setIsGoogleFitConnected(true)
    }
  }, [user?.email, navigate])

  const validateFitnessInfo = (info: FitnessInfo): string | null => {
    if (!info.gender) return 'Please select your gender'
    if (!info.age || info.age < 1 || info.age > 120) return 'Please enter a valid age'
    if (!info.bodyType) return 'Please select your body type'
    if (info.goals.length === 0) return 'Please select at least one fitness goal'
    if (!info.currentWeight || info.currentWeight < 1) return 'Please enter a valid current weight'
    if (!info.targetWeight || info.targetWeight < 1) return 'Please enter a valid target weight'
    return null
  }

  const showNotification = (type: 'success' | 'error', message: string) => {
    setNotification({ type, message })
    setTimeout(() => setNotification(null), 3000)
  }

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    navigate('/login');
  }

  const handleSavePersonalInfo = async () => {
    try {
      await updateUser(personalInfo.name, personalInfo.email)
      setIsEditingPersonal(false)
      showNotification('success', 'Personal information updated successfully')
    } catch (error) {
      console.error('Failed to update personal information:', error)
      showNotification('error', 'Failed to update personal information')
    }
  }

  const handleSaveFitnessInfo = () => {
    if (editedFitnessInfo && user?.email) {
      const error = validateFitnessInfo(editedFitnessInfo)
      if (error) {
        showNotification('error', error)
        return
      }
      localStorage.setItem(`fitnessInfo_${user.email}`, JSON.stringify(editedFitnessInfo))
      setFitnessInfo(editedFitnessInfo)
      setIsEditingFitness(false)
      showNotification('success', 'Fitness information updated successfully')
    }
  }

  const handleCancelEdit = (type: 'personal' | 'fitness') => {
    if (type === 'personal') {
      setPersonalInfo({
        name: user?.name || '',
        email: user?.email || ''
      })
      setIsEditingPersonal(false)
    } else {
      setEditedFitnessInfo(fitnessInfo)
      setIsEditingFitness(false)
    }
  }

  const calculateWeightProgress = () => {
    if (!fitnessInfo) return 0
    const total = Math.abs(fitnessInfo.targetWeight - fitnessInfo.currentWeight)
    const progress = Math.abs(fitnessInfo.targetWeight - fitnessInfo.currentWeight)
    return Math.min(100, (progress / total) * 100)
  }

  return (
    <div 
      className="min-h-screen bg-cover bg-center"
      style={{ 
        backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(/fitness-background.jpg)'
      }}
    >
      <div className="container mx-auto py-8 px-4">
        {/* Top Navigation with Diet button */}
        <div className="bg-gray-800 rounded-lg p-2 mb-8">
          <button 
            onClick={() => navigate('/profile')}
            className="px-4 py-2 text-gray-300 hover:text-white"
          >
            Profile
          </button>
          <button 
            onClick={() => navigate('/workout-plans')}
            className="px-4 py-2 text-gray-300 hover:text-white"
          >
            Workout Plans
          </button>
          <button 
            onClick={() => navigate('/progress')}
            className="px-4 py-2 text-gray-300 hover:text-white"
          >
            Progress
          </button>
          <button 
            onClick={() => navigate('/membership')}
            className="px-4 py-2 text-gray-300 hover:text-white"
          >
            Membership
          </button>
          <button 
            onClick={() => navigate('/diet')}
            className="px-4 py-2 text-gray-300 hover:text-white"
          >
            Diet
          </button>
        </div>

        {/* Notification */}
        {notification && (
          <div className={`fixed top-4 right-4 p-4 rounded-lg shadow-lg ${
            notification.type === 'success' ? 'bg-green-500' : 'bg-red-500'
          } text-white flex items-center space-x-2 z-50`}>
            {notification.type === 'success' ? (
              <Check className="h-5 w-5" />
            ) : (
              <AlertCircle className="h-5 w-5" />
            )}
            <span>{notification.message}</span>
          </div>
        )}

        {/* Header with Dropdown */}
        <div className="flex justify-between items-center mb-8 bg-gray-400 p-4 rounded-lg">
          <div>
            <h1 className="text-2xl font-bold text-black">Dashboard</h1>
            <p className="text-gray-600">Welcome back, {user?.email}</p>
          </div>
          <div className="flex justify-between items-center">
            {/* Dropdown Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="secondary" className="flex items-center gap-2">
                  Menu <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onSelect={() => navigate('/profile')}>
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem onSelect={() => navigate('/membership')}>
                  Membership
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button 
              variant="secondary" 
              onClick={() => {
                logout()
                navigate('/login')
              }}
              className="flex items-center gap-2"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </Button>
          </div>
        </div>

        {/* Stats Cards - Now in 2 rows */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-blue-600 text-white p-6 rounded-lg">
            <h3>Workouts Completed</h3>
            <p className="text-3xl font-bold">24</p>
          </div>
          <div className="bg-purple-600 text-white p-6 rounded-lg">
            <h3>Active Streak</h3>
            <p className="text-3xl font-bold">7 days</p>
          </div>
          <div className="bg-green-600 text-white p-6 rounded-lg">
            <h3>Time Spent</h3>
            <p className="text-3xl font-bold">12.5 hrs</p>
          </div>
          <div className="bg-orange-600 text-white p-6 rounded-lg">
            <h3>Weight Progress</h3>
            <p className="text-3xl font-bold">-2.5 kg</p>
          </div>
        </div>

        {/* Google Fit Connection */}
        {!isGoogleFitConnected ? (
          <div className="mb-8">
            <GoogleFitConnect />
          </div>
        ) : (
          <div className="mb-8">
            <GoogleFitData />
          </div>
        )}

        {/* Main Content */}
        <main className="p-6">
          <div className="max-w-7xl mx-auto space-y-6">
            <Tabs defaultValue="profile" className="space-y-6">
              <TabsList className="bg-[#222222] p-1.5 rounded-lg inline-flex">
                <TabsTrigger 
                  value="profile" 
                  className="data-[state=active]:bg-[#333333] data-[state=active]:text-white text-gray-400 hover:text-gray-200 px-6"
                >
                  Profile
                </TabsTrigger>
              </TabsList>

              {/* Profile Tab Content */}
              <TabsContent value="profile">
                <div className="grid gap-6 md:grid-cols-2">
                  {/* Personal Information Card */}
                  <Card className="bg-[#222222] border-0">
                    <CardHeader className="flex flex-row justify-between items-center">
                      <div>
                        <CardTitle className="text-white">Personal Information</CardTitle>
                        <CardDescription className="text-gray-400">Manage your personal details</CardDescription>
                      </div>
                      {!isEditingPersonal ? (
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="text-white hover:bg-[#333333]"
                          onClick={() => setIsEditingPersonal(true)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                      ) : (
                        <div className="flex space-x-2">
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="text-green-500 hover:bg-[#333333]"
                            onClick={() => handleSavePersonalInfo()}
                          >
                            <Save className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="text-red-500 hover:bg-[#333333]"
                            onClick={() => handleCancelEdit('personal')}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      )}
                    </CardHeader>
                    <CardContent className="text-gray-300">
                      {isEditingPersonal ? (
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <Label htmlFor="name" className="text-white">Name</Label>
                            <Input
                              id="name"
                              value={personalInfo.name}
                              onChange={(e) => setPersonalInfo({ ...personalInfo, name: e.target.value })}
                              className="bg-[#333333] border-0 text-white"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="email" className="text-white">Email</Label>
                            <Input
                              id="email"
                              value={personalInfo.email}
                              onChange={(e) => setPersonalInfo({ ...personalInfo, email: e.target.value })}
                              className="bg-[#333333] border-0 text-white"
                            />
                          </div>
                        </div>
                      ) : (
                        <dl className="space-y-4">
                          <div>
                            <dt className="text-sm font-medium text-gray-400">Name</dt>
                            <dd className="text-lg text-white mt-1">{user?.name}</dd>
                          </div>
                          <div>
                            <dt className="text-sm font-medium text-gray-400">Email</dt>
                            <dd className="text-lg text-white mt-1">{user?.email}</dd>
                          </div>
                        </dl>
                      )}
                    </CardContent>
                  </Card>

                  {/* Fitness Information Card */}
                  <Card className="bg-[#222222] border-0">
                    <CardHeader className="flex flex-row justify-between items-center">
                      <div>
                        <CardTitle className="text-white">Fitness Information</CardTitle>
                        <CardDescription className="text-gray-400">Track your fitness journey</CardDescription>
                      </div>
                      {!isEditingFitness ? (
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="text-white hover:bg-[#333333]"
                          onClick={() => setIsEditingFitness(true)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                      ) : (
                        <div className="flex space-x-2">
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="text-green-500 hover:bg-[#333333]"
                            onClick={handleSaveFitnessInfo}
                          >
                            <Save className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="text-red-500 hover:bg-[#333333]"
                            onClick={() => handleCancelEdit('fitness')}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      )}
                    </CardHeader>
                    <CardContent>
                      {isEditingFitness ? (
                        <div className="space-y-4">
                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="gender" className="text-white">Gender</Label>
                              <Select
                                value={editedFitnessInfo?.gender}
                                onValueChange={(value) => 
                                  setEditedFitnessInfo(prev => prev ? { ...prev, gender: value } : null)
                                }
                              >
                                <SelectTrigger className="bg-[#333333] border-0 text-white">
                                  <SelectValue placeholder="Select gender" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="male">Male</SelectItem>
                                  <SelectItem value="female">Female</SelectItem>
                                  <SelectItem value="other">Other</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="age" className="text-white">Age</Label>
                              <Input
                                id="age"
                                type="number"
                                value={editedFitnessInfo?.age || ''}
                                onChange={(e) => 
                                  setEditedFitnessInfo(prev => 
                                    prev ? { ...prev, age: parseInt(e.target.value) } : null
                                  )
                                }
                                className="bg-[#333333] border-0 text-white"
                              />
                            </div>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="bodyType" className="text-white">Body Type</Label>
                            <Select
                              value={editedFitnessInfo?.bodyType}
                              onValueChange={(value) => 
                                setEditedFitnessInfo(prev => prev ? { ...prev, bodyType: value } : null)
                              }
                            >
                              <SelectTrigger className="bg-[#333333] border-0 text-white">
                                <SelectValue placeholder="Select body type" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="ectomorph">Ectomorph (Lean Body)</SelectItem>
                                <SelectItem value="mesomorph">Mesomorph (Muscular Body)</SelectItem>
                                <SelectItem value="endomorph">Endomorph (Curvy Body)</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="currentWeight" className="text-white">Current Weight (kg)</Label>
                              <Input
                                id="currentWeight"
                                type="number"
                                value={editedFitnessInfo?.currentWeight || ''}
                                onChange={(e) => 
                                  setEditedFitnessInfo(prev => 
                                    prev ? { ...prev, currentWeight: parseFloat(e.target.value) } : null
                                  )
                                }
                                className="bg-[#333333] border-0 text-white"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="targetWeight" className="text-white">Target Weight (kg)</Label>
                              <Input
                                id="targetWeight"
                                type="number"
                                value={editedFitnessInfo?.targetWeight || ''}
                                onChange={(e) => 
                                  setEditedFitnessInfo(prev => 
                                    prev ? { ...prev, targetWeight: parseFloat(e.target.value) } : null
                                  )
                                }
                                className="bg-[#333333] border-0 text-white"
                              />
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="space-y-6">
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <dt className="text-sm font-medium text-gray-400">Gender</dt>
                              <dd className="text-lg text-white mt-1 capitalize">{fitnessInfo?.gender || '-'}</dd>
                            </div>
                            <div>
                              <dt className="text-sm font-medium text-gray-400">Age</dt>
                              <dd className="text-lg text-white mt-1">{fitnessInfo?.age || '-'}</dd>
                            </div>
                          </div>
                          <div>
                            <dt className="text-sm font-medium text-gray-400">Body Type</dt>
                            <dd className="text-lg text-white mt-1 capitalize">{fitnessInfo?.bodyType || '-'}</dd>
                          </div>
                          <div>
                            <dt className="text-sm font-medium text-gray-400">Weight Progress</dt>
                            <div className="mt-2">
                              <div className="flex justify-between text-sm text-gray-400 mb-1">
                                <span>Current: {fitnessInfo?.currentWeight || '-'} kg</span>
                                <span>Target: {fitnessInfo?.targetWeight || '-'} kg</span>
                              </div>
                              <Progress value={calculateWeightProgress()} className="h-2" />
                            </div>
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  )
} 