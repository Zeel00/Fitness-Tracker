import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Button } from '../components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import { ArrowLeft, Clock, Dumbbell, Target } from 'lucide-react'
import { useWorkout } from '../lib/workout-provider'

interface Exercise {
  name: string
  sets: number
  reps: number
  restTime: number // in seconds
}

interface DetailedWorkoutPlan {
  id: number
  name: string
  description: string
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  duration_minutes: number
  exercises: Exercise[]
  targetMuscles: string[]
  equipment: string[]
}

export default function WorkoutDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { getWorkoutPlanById } = useWorkout()
  const [workoutPlan, setWorkoutPlan] = useState<DetailedWorkoutPlan | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadWorkoutPlan = async () => {
      if (!id) {
        setError('No workout ID provided')
        setLoading(false)
        return
      }

      try {
        // Simulate loading delay
        await new Promise(resolve => setTimeout(resolve, 500))
        const plan = getWorkoutPlanById(id)
        
        if (!plan) {
          throw new Error('Workout plan not found')
        }
        
        setWorkoutPlan(plan)
      } catch (error) {
        setError(error instanceof Error ? error.message : 'Failed to load workout details')
      } finally {
        setLoading(false)
      }
    }

    loadWorkoutPlan()
  }, [id, getWorkoutPlanById])

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-[#1a1a1a]">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex h-screen items-center justify-center bg-[#1a1a1a]">
        <div className="text-red-400">{error}</div>
      </div>
    )
  }

  if (!workoutPlan || !workoutPlan.exercises || workoutPlan.exercises.length === 0) {
    return (
      <div className="flex h-screen items-center justify-center bg-[#1a1a1a]">
        <div className="text-white">Workout plan not found or has no exercises</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#1a1a1a] p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center mb-6">
          <Button
            variant="ghost"
            className="text-white hover:bg-[#333333] mr-4"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-3xl font-bold text-white">{workoutPlan.name}</h1>
        </div>

        <div className="grid gap-6">
          {/* Overview Card */}
          <Card className="bg-[#222222] border-0">
            <CardHeader>
              <CardTitle className="text-white">Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300 mb-6">{workoutPlan.description}</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center text-gray-300">
                  <Target className="h-5 w-5 mr-2 text-blue-500" />
                  <span>Difficulty: {workoutPlan.difficulty}</span>
                </div>
                <div className="flex items-center text-gray-300">
                  <Clock className="h-5 w-5 mr-2 text-blue-500" />
                  <span>{workoutPlan.duration_minutes} minutes</span>
                </div>
                <div className="flex items-center text-gray-300">
                  <Dumbbell className="h-5 w-5 mr-2 text-blue-500" />
                  <span>{workoutPlan.exercises.length} exercises</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Exercises Card */}
          <Card className="bg-[#222222] border-0">
            <CardHeader>
              <CardTitle className="text-white">Exercises</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {workoutPlan.exercises.map((exercise, index) => (
                  <div key={index} className="p-4 bg-[#333333] rounded-lg">
                    <h3 className="text-lg font-semibold text-white mb-2">{exercise.name}</h3>
                    <div className="grid grid-cols-3 gap-4 text-sm text-gray-300">
                      <div>Sets: {exercise.sets}</div>
                      <div>Reps: {exercise.reps}</div>
                      <div>Rest: {exercise.restTime}s</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Target Muscles & Equipment Card */}
          <Card className="bg-[#222222] border-0">
            <CardHeader>
              <CardTitle className="text-white">Additional Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-3">Target Muscles</h3>
                  <div className="flex flex-wrap gap-2">
                    {workoutPlan.targetMuscles.map((muscle, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-[#333333] rounded-full text-sm text-gray-300"
                      >
                        {muscle}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-3">Required Equipment</h3>
                  <div className="flex flex-wrap gap-2">
                    {workoutPlan.equipment.map((item, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-[#333333] rounded-full text-sm text-gray-300"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Start Workout Button */}
          <Button
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-6 text-lg"
            onClick={() => navigate(`/start-workout/${workoutPlan.id}`)}
          >
            Start Workout
          </Button>
        </div>
      </div>
    </div>
  )
} 