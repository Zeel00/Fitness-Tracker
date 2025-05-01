import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

interface WorkoutPlan {
  id: number
  title: string
  description: string
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  duration: number
  exercises: number
}

export default function Workout() {
  const navigate = useNavigate()
  const [filter, setFilter] = useState<'beginner' | 'intermediate' | 'advanced' | 'all'>('all')

  const workoutPlans: WorkoutPlan[] = [
    {
      id: 1,
      title: "Beginner Full Body Workout",
      description: "A comprehensive full-body workout perfect for beginners focusing on building basic strength and form.",
      difficulty: "beginner",
      duration: 45,
      exercises: 4
    },
    {
      id: 2,
      title: "Intermediate Strength Builder",
      description: "A challenging workout designed to build strength and muscle mass with compound exercises.",
      difficulty: "intermediate",
      duration: 60,
      exercises: 4
    },
    {
      id: 3,
      title: "Advanced HIIT Circuit",
      description: "High-intensity interval training combining strength and cardio for maximum calorie burn.",
      difficulty: "advanced",
      duration: 40,
      exercises: 4
    }
  ]

  const filteredWorkouts = filter === 'all' 
    ? workoutPlans 
    : workoutPlans.filter(workout => workout.difficulty === filter)

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner':
        return 'bg-green-600'
      case 'intermediate':
        return 'bg-yellow-600'
      case 'advanced':
        return 'bg-red-600'
      default:
        return 'bg-gray-600'
    }
  }

  return (
    <div 
      className="min-h-screen bg-cover bg-center"
      style={{ 
        backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(/fitness-background.jpg)'
      }}
    >
      <div className="container mx-auto py-8 px-4">
        {/* Filter Buttons */}
        <div className="flex gap-4 mb-8">
          <button
            onClick={() => setFilter('beginner')}
            className={`px-6 py-2 rounded-md ${
              filter === 'beginner' ? 'bg-green-600' : 'bg-green-600/50'
            } text-white font-medium transition-colors`}
          >
            Beginner
          </button>
          <button
            onClick={() => setFilter('intermediate')}
            className={`px-6 py-2 rounded-md ${
              filter === 'intermediate' ? 'bg-yellow-600' : 'bg-yellow-600/50'
            } text-white font-medium transition-colors`}
          >
            Intermediate
          </button>
          <button
            onClick={() => setFilter('advanced')}
            className={`px-6 py-2 rounded-md ${
              filter === 'advanced' ? 'bg-red-600' : 'bg-red-600/50'
            } text-white font-medium transition-colors`}
          >
            Advanced
          </button>
        </div>

        {/* Workout Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {filteredWorkouts.map((workout) => (
            <div key={workout.id} className="bg-gray-900 rounded-lg overflow-hidden">
              <div className="p-6">
                <h2 className="text-xl font-semibold text-white mb-2">
                  {workout.title}
                </h2>
                <p className="text-gray-400 mb-4">
                  {workout.description}
                </p>
                
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Difficulty</span>
                    <span className={`px-3 py-1 rounded-full text-sm ${getDifficultyColor(workout.difficulty)}`}>
                      {workout.difficulty}
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Duration</span>
                    <span className="text-white">{workout.duration} mins</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Exercises</span>
                    <span className="text-white">{workout.exercises}</span>
                  </div>
                </div>

                <div className="flex gap-4 mt-6">
                  <button
                    onClick={() => navigate(`/workout-details/${workout.id}`)}
                    className="flex-1 px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700 transition-colors"
                  >
                    View Details
                  </button>
                  <button
                    onClick={() => navigate(`/start-workout/${workout.id}`)}
                    className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                  >
                    Start
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
} 