import { createContext, useContext, useState, ReactNode } from 'react'
import { useAuth } from './auth-provider'

interface Exercise {
  name: string
  sets: number
  reps: number
  restTime: number // in seconds
}

interface WorkoutPlan {
  id: number
  name: string
  description: string
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  duration_minutes: number
  exercises: Exercise[]
  targetMuscles: string[]
  equipment: string[]
  videoUrl?: string
  thumbnailUrl?: string
}

interface WorkoutContextType {
  workoutPlans: WorkoutPlan[]
  loading: boolean
  error: string | null
  fetchWorkoutPlans: () => Promise<void>
  fetchWorkoutPlansByDifficulty: (difficulty: WorkoutPlan['difficulty']) => Promise<void>
  getWorkoutPlanById: (id: string) => WorkoutPlan | undefined
}

const defaultWorkoutPlans: WorkoutPlan[] = [
  {
    id: 1,
    name: "Beginner Full Body Workout",
    description: "A comprehensive full-body workout perfect for beginners focusing on building basic strength and form.",
    difficulty: "beginner",
    duration_minutes: 45,
    videoUrl: "/workout-videos/full-body-workout.mp4",
    thumbnailUrl: "/workout-thumbnails/full-body-workout.png",
    exercises: [
      {
        name: "Bodyweight Squats",
        sets: 3,
        reps: 12,
        restTime: 60
      },
      {
        name: "Push-ups (Modified if needed)",
        sets: 3,
        reps: 10,
        restTime: 60
      },
      {
        name: "Dumbbell Rows",
        sets: 3,
        reps: 12,
        restTime: 60
      },
      {
        name: "Plank Hold",
        sets: 3,
        reps: 30,
        restTime: 45
      }
    ],
    targetMuscles: ["Legs", "Chest", "Back", "Core"],
    equipment: ["Dumbbells", "Exercise Mat"]
  },
  {
    id: 2,
    name: "Intermediate Strength Builder",
    description: "A challenging workout designed to build strength and muscle mass with compound exercises.",
    difficulty: "intermediate",
    duration_minutes: 60,
    videoUrl: "/workout-videos/core.mp4",
    thumbnailUrl: "/workout-thumbnails/full-body-workout.png",
    exercises: [
      {
        name: "Barbell Squats",
        sets: 4,
        reps: 8,
        restTime: 90
      },
      {
        name: "Bench Press",
        sets: 4,
        reps: 8,
        restTime: 90
      },
      {
        name: "Deadlifts",
        sets: 4,
        reps: 8,
        restTime: 120
      },
      {
        name: "Pull-ups",
        sets: 3,
        reps: 10,
        restTime: 90
      }
    ],
    targetMuscles: ["Legs", "Chest", "Back", "Shoulders"],
    equipment: ["Barbell", "Bench", "Power Rack", "Weight Plates"]
  },
  {
    id: 3,
    name: "Advanced HIIT Circuit",
    description: "High-intensity interval training combining strength and cardio for maximum calorie burn.",
    difficulty: "advanced",
    duration_minutes: 40,
    videoUrl: "/workout-videos/HIIT.mp4",
    thumbnailUrl: "/workout-thumbnails/full-body-workout.png",
    exercises: [
      {
        name: "Burpees",
        sets: 4,
        reps: 15,
        restTime: 30
      },
      {
        name: "Kettlebell Swings",
        sets: 4,
        reps: 20,
        restTime: 30
      },
      {
        name: "Box Jumps",
        sets: 4,
        reps: 12,
        restTime: 30
      },
      {
        name: "Battle Rope Slams",
        sets: 4,
        reps: 30,
        restTime: 30
      }
    ],
    targetMuscles: ["Full Body", "Core", "Shoulders", "Legs"],
    equipment: ["Kettlebell", "Plyo Box", "Battle Ropes"]
  },
  {
    id: 4,
    name: "Core and Flexibility",
    description: "Focus on building core strength and improving overall flexibility.",
    difficulty: "beginner",
    duration_minutes: 30,
    videoUrl: "/workout-videos/cardio kick.mp4",
    thumbnailUrl: "/workout-thumbnails/full-body-workout.png",
    exercises: [
      {
        name: "Planks",
        sets: 3,
        reps: 45,
        restTime: 45
      },
      {
        name: "Russian Twists",
        sets: 3,
        reps: 20,
        restTime: 45
      },
      {
        name: "Bird Dogs",
        sets: 3,
        reps: 12,
        restTime: 30
      },
      {
        name: "Superman Holds",
        sets: 3,
        reps: 30,
        restTime: 45
      }
    ],
    targetMuscles: ["Core", "Lower Back", "Obliques"],
    equipment: ["Exercise Mat", "Light Dumbbell"]
  }
]

const WorkoutContext = createContext<WorkoutContextType | undefined>(undefined)

export function WorkoutProvider({ children }: { children: ReactNode }) {
  const [workoutPlans, setWorkoutPlans] = useState<WorkoutPlan[]>(defaultWorkoutPlans)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { user } = useAuth()

  const fetchWorkoutPlans = async () => {
    if (!user) return
    setLoading(true)
    setError(null)
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 500))
      setWorkoutPlans(defaultWorkoutPlans)
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to fetch workout plans')
    } finally {
      setLoading(false)
    }
  }

  const fetchWorkoutPlansByDifficulty = async (difficulty: WorkoutPlan['difficulty']) => {
    if (!user) return
    setLoading(true)
    setError(null)
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 500))
      const filteredPlans = defaultWorkoutPlans.filter(plan => plan.difficulty === difficulty)
      setWorkoutPlans(filteredPlans)
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to fetch workout plans')
    } finally {
      setLoading(false)
    }
  }

  const getWorkoutPlanById = (id: string) => {
    return defaultWorkoutPlans.find(plan => plan.id === parseInt(id))
  }

  return (
    <WorkoutContext.Provider value={{ 
      workoutPlans, 
      loading, 
      error, 
      fetchWorkoutPlans, 
      fetchWorkoutPlansByDifficulty,
      getWorkoutPlanById 
    }}>
      {children}
    </WorkoutContext.Provider>
  )
}

export function useWorkout() {
  const context = useContext(WorkoutContext)
  if (context === undefined) {
    throw new Error('useWorkout must be used within a WorkoutProvider')
  }
  return context
} 