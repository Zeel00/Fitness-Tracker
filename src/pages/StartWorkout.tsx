import { useEffect, useState, useRef } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ArrowLeft, CheckCircle, Clock, Pause, Play, RotateCcw, ChevronRight } from 'lucide-react'
import { Progress } from '@/components/ui/progress'
import { useWorkout } from '../lib/workout-provider'
import { toast } from 'sonner'
import { cn } from '@/lib/utils'
import Plyr from 'plyr'
import 'plyr/dist/plyr.css'

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

const videoUrls = [
  'https://example.com/video1.mp4',
  'https://example.com/video2.mp4',
  'https://example.com/video3.mp4',
  'https://example.com/video4.mp4',
  'https://example.com/video5.mp4',
  'https://example.com/video6.mp4',
  'https://example.com/video7.mp4',
]

export default function StartWorkout() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { getWorkoutPlanById } = useWorkout()
  const [workoutPlan, setWorkoutPlan] = useState<WorkoutPlan | null>(null)
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0)
  const [currentSet, setCurrentSet] = useState(1)
  const [isResting, setIsResting] = useState(false)
  const [timer, setTimer] = useState(0)
  const [isRunning, setIsRunning] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [workoutComplete, setWorkoutComplete] = useState(false)
  const [videoProgress, setVideoProgress] = useState(0)
  const [videoDuration, setVideoDuration] = useState(0)
  const [overallProgress, setOverallProgress] = useState(() => {
    // Try to get saved progress from localStorage
    const saved = localStorage.getItem('workoutProgress')
    return saved ? JSON.parse(saved) : {
      currentWorkout: '1',
      progress: 0,
      completedWorkouts: []
    }
  })
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0)

  // Save progress whenever it changes
  useEffect(() => {
    localStorage.setItem('workoutProgress', JSON.stringify(overallProgress))
  }, [overallProgress])

  // Update overall progress when a workout completes
  const handleWorkoutComplete = () => {
    setOverallProgress(prev => ({
      currentWorkout: (parseInt(id as string) + 1).toString(),
      progress: calculateTotalProgress(),
      completedWorkouts: [...prev.completedWorkouts, id]
    }))
    setWorkoutComplete(true)
  }

  // Handle next workout navigation
  const handleNextWorkout = () => {
    const nextWorkoutId = (parseInt(id as string) + 1).toString()
    navigate(`/start-workout/${nextWorkoutId}`)
  }

  // Check if there's a next workout available
  const hasNextWorkout = getWorkoutPlanById((parseInt(id as string) + 1).toString())

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

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null
    if (isRunning && timer > 0) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1)
      }, 1000)
    } else if (timer === 0 && isResting) {
      setIsResting(false)
      setIsRunning(false)
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isRunning, timer, isResting])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const handleStartRest = () => {
    if (!workoutPlan) return
    const currentExercise = workoutPlan.exercises[currentExerciseIndex]
    setTimer(currentExercise.restTime)
    setIsResting(true)
    setIsRunning(true)
  }

  const handleNextSet = () => {
    if (!workoutPlan) return
    const currentExercise = workoutPlan.exercises[currentExerciseIndex]
    
    if (currentSet < currentExercise.sets) {
      setCurrentSet(currentSet + 1)
      handleStartRest()
    } else {
      // Move to next exercise
      if (currentExerciseIndex < workoutPlan.exercises.length - 1) {
        setCurrentExerciseIndex(currentExerciseIndex + 1)
        setCurrentSet(1)
      } else {
        handleWorkoutComplete()
      }
    }
  }

  const handleRestartWorkout = () => {
    setCurrentExerciseIndex(0)
    setCurrentSet(1)
    setIsResting(false)
    setTimer(0)
    setIsRunning(false)
    setWorkoutComplete(false)
  }

  // Calculate total progress including video progress
  const calculateTotalProgress = () => {
    const exerciseProgress = ((currentExerciseIndex * currentExercise.sets + (currentSet - 1)) / 
      (workoutPlan.exercises.reduce((acc, ex) => acc + ex.sets, 0))) * 70 // Exercise worth 70%
    
    const videoProgressValue = videoProgress * 30 // Video worth 30%
    
    return Math.min(exerciseProgress + videoProgressValue, 100)
  }

  const handleNextVideo = () => {
    setCurrentVideoIndex((prevIndex) => (prevIndex + 1) % videoUrls.length)
  }

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-gradient-to-b from-background to-muted">
        <div className="text-center">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
          <p className="mt-4 text-sm text-muted-foreground">Loading your workout...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex h-screen items-center justify-center bg-gradient-to-b from-background to-muted">
        <div className="text-center">
          <div className="rounded-full bg-red-100 p-3 text-red-600 mx-auto mb-4">
            <Icons.alertCircle className="h-6 w-6" />
          </div>
          <div className="text-red-600">{error}</div>
          <Button
            variant="ghost"
            className="mt-4"
            onClick={() => navigate('/dashboard')}
          >
            Back to Dashboard
          </Button>
        </div>
      </div>
    )
  }

  if (workoutComplete) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-background to-muted p-6">
        <div className="max-w-2xl mx-auto text-center">
          <div className="rounded-full bg-green-100 p-6 inline-block mb-6">
            <CheckCircle className="h-12 w-12 text-green-600" />
          </div>
          <h1 className="text-4xl font-bold mb-4">Workout Complete!</h1>
          <p className="text-lg text-muted-foreground mb-8">
            Congratulations! You've completed {workoutPlan.name}. 
            {hasNextWorkout ? " Ready for the next challenge?" : " You've completed all workouts!"}
          </p>
          
          {/* Progress Summary */}
          <Card className="mb-8 bg-card/50 backdrop-blur">
            <CardContent className="pt-6">
              <div className="flex justify-between text-sm mb-2">
                <span>Overall Program Progress</span>
                <span>{Math.round(overallProgress.progress)}%</span>
              </div>
              <Progress value={overallProgress.progress} className="h-2 mb-4" />
              <p className="text-sm text-muted-foreground">
                Completed {overallProgress.completedWorkouts.length} of 4 workouts
              </p>
            </CardContent>
          </Card>

          <div className="flex gap-4 justify-center">
            <Button
              variant="outline"
              size="lg"
              onClick={() => navigate('/dashboard')}
              className="min-w-[160px]"
            >
              Dashboard
            </Button>
            {hasNextWorkout ? (
              <Button
                size="lg"
                onClick={handleNextWorkout}
                className="min-w-[160px] bg-primary"
              >
                Next Workout
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            ) : (
              <Button
                size="lg"
                onClick={handleRestartWorkout}
                className="min-w-[160px]"
              >
                Start Again
              </Button>
            )}
          </div>
        </div>
      </div>
    )
  }

  const currentExercise = workoutPlan.exercises[currentExerciseIndex]
  const nextExercise = workoutPlan.exercises[currentExerciseIndex + 1]

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header with Overall Progress */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate(-1)}
              className="rounded-full hover:bg-background/50"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-2xl font-bold">{workoutPlan.name}</h1>
              <p className="text-sm text-muted-foreground">
                Workout {id} of 4 • {workoutPlan.duration_minutes} min
              </p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm font-medium">Overall Progress</p>
            <p className="text-xs text-muted-foreground">
              {Math.round(overallProgress.progress)}%
            </p>
          </div>
        </div>

        {/* Progress Cards */}
        <div className="grid gap-4 mb-6">
          {/* Overall Program Progress */}
          <Card className="bg-card/50 backdrop-blur">
            <CardContent className="pt-6">
              <div className="flex justify-between text-sm mb-2">
                <span>Program Progress</span>
                <span>{Math.round(overallProgress.progress)}%</span>
              </div>
              <Progress value={overallProgress.progress} className="h-2" />
            </CardContent>
          </Card>

          {/* Current Workout Progress */}
          <Card className="bg-card/50 backdrop-blur">
            <CardContent className="pt-6">
              <div className="flex justify-between text-sm mb-2">
                <span>Current Workout</span>
                <span>{Math.round(calculateTotalProgress())}%</span>
              </div>
              <Progress value={calculateTotalProgress()} className="h-2" />
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Card className="bg-card/50 backdrop-blur overflow-hidden">
          <div className="p-6">
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold mb-4">{currentExercise.name}</h2>
                <div className="grid grid-cols-2 gap-4">
                  <div className="rounded-xl bg-muted/50 backdrop-blur p-4 border border-border/5">
                    <p className="text-sm text-muted-foreground mb-1">Sets</p>
                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl font-bold">{currentSet}</span>
                      <span className="text-muted-foreground">/ {currentExercise.sets}</span>
                    </div>
                  </div>
                  <div className="rounded-xl bg-muted/50 backdrop-blur p-4 border border-border/5">
                    <p className="text-sm text-muted-foreground mb-1">Reps</p>
                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl font-bold">{currentExercise.reps}</span>
                      <span className="text-muted-foreground">reps</span>
                    </div>
                  </div>
                </div>
              </div>

              {isResting ? (
                <div className="rounded-xl bg-muted/50 backdrop-blur p-6 border border-border/5 text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-background mb-4">
                    <Clock className="h-8 w-8 text-primary" />
                  </div>
                  <p className="text-lg mb-2">Rest Time</p>
                  <p className="text-4xl font-bold mb-4 tabular-nums">{formatTime(timer)}</p>
                  <Button
                    variant="outline"
                    size="lg"
                    onClick={() => setIsRunning(!isRunning)}
                    className="min-w-[140px]"
                  >
                    {isRunning ? (
                      <><Pause className="h-4 w-4 mr-2" /> Pause</>
                    ) : (
                      <><Play className="h-4 w-4 mr-2" /> Resume</>
                    )}
                  </Button>
                </div>
              ) : (
                <Button
                  size="lg"
                  className="w-full py-8 text-lg font-semibold rounded-xl bg-primary hover:bg-primary/90"
                  onClick={handleNextSet}
                >
                  Complete Set
                </Button>
              )}
            </div>
          </div>
        </Card>

        <div className="mt-4">
          <h2 className="text-2xl font-bold mb-4">Video Player</h2>
          <div className="video-container mb-4">
            <video
              key={currentVideoIndex}
              controls
              width="100%"
              src={videoUrls[currentVideoIndex]}
            >
              Your browser does not support the video tag.
            </video>
          </div>
          <button
            className="px-4 py-2 bg-primary text-white rounded-md"
            onClick={handleNextVideo}
          >
            Next Video
          </button>
        </div>
      </div>
    </div>
  )
}