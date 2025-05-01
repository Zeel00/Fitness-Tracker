import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { createContext } from 'react'
import { useAuth } from './lib/auth-provider'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import WorkoutDetails from './pages/WorkoutDetails'
import StartWorkout from './pages/StartWorkout'
import Profile from './pages/Profile'
import Diet from './pages/Diet'
import Progress from './pages/Progress'
import Membership from './pages/Membership'
import WorkoutPlan from './pages/WorkoutPlan'
import { Toaster } from "@/components/ui/toaster"

// Define membership types
interface MembershipPlan {
  tier: 'free' | 'basic' | 'premium'
  name: string
  maxWorkouts: number
  features: string[]
  limitations?: string[]
  price: number
}

// Create membership context
export const MembershipContext = createContext<{
  currentPlan: MembershipPlan
  remainingWorkouts: number
  workoutsUsed: number
}>({
  currentPlan: {
    tier: 'free',
    name: 'Free Plan',
    maxWorkouts: 3,
    features: ['Basic workouts', 'Progress tracking'],
    limitations: ['No video access', 'Limited workouts'],
    price: 0
  },
  remainingWorkouts: 3,
  workoutsUsed: 0
})

export default function App() {
  const { user } = useAuth()

  // Function to determine if navigation should be shown
  const shouldShowNav = (pathname: string) => {
    const protectedRoutes = ['/dashboard', '/workout-details', '/start-workout']
    return user && protectedRoutes.some(route => pathname.startsWith(route))
  }

  return (
    <Router>
      <div className="min-h-screen pb-16"> {/* Add padding bottom to account for fixed navbar */}
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Protected Routes */}
          <Route 
            path="/dashboard" 
            element={user ? <Dashboard /> : <Navigate to="/login" />} 
          />
          <Route 
            path="/workout-details/:id" 
            element={user ? <WorkoutDetails /> : <Navigate to="/login" />} 
          />
          <Route 
            path="/start-workout/:id" 
            element={user ? <StartWorkout /> : <Navigate to="/login" />} 
          />
          <Route 
            path="/profile" 
            element={user ? <Profile /> : <Navigate to="/login" />} 
          />
          <Route 
            path="/diet" 
            element={user ? <Diet /> : <Navigate to="/login" />} 
          />
          <Route 
            path="/progress" 
            element={user ? <Progress /> : <Navigate to="/login" />} 
          />
          <Route 
            path="/membership" 
            element={user ? <Membership /> : <Navigate to="/login" />} 
          />
          <Route 
            path="/workout-plans" 
            element={user ? <WorkoutPlan /> : <Navigate to="/login" />} 
          />

          {/* Catch all route */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
        {shouldShowNav(window.location.pathname) && <Navbar />} {/* Only show navbar when user is logged in and on protected routes */}
        <Toaster />
      </div>
    </Router>
  )
} 