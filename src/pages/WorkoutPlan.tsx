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

export default function WorkoutPlan() {
  const navigate = useNavigate()
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all')

  const workouts: WorkoutPlan[] = [
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

  const filteredWorkouts = selectedDifficulty === 'all'
    ? workouts
    : workouts.filter(workout => workout.difficulty === selectedDifficulty)

  return (
    <div 
      className="min-h-screen bg-cover bg-center"
      style={{ 
        backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(/fitness-background.jpg)'
      }}
    >
      <div className="container mx-auto py-8 px-4">
        {/* Add a back button if desired */}
        <button
          onClick={() => navigate('/dashboard')}
          className="mb-6 text-gray-300 hover:text-white flex items-center gap-2"
        >
          ← Back to Dashboard
        </button>

        {/* Difficulty Filter Buttons */}
        <div className="flex gap-4 mb-8">
          <button
            onClick={() => setSelectedDifficulty('beginner')}
            className={`px-6 py-2 rounded-lg text-white font-medium ${
              selectedDifficulty === 'beginner' ? 'bg-green-600' : 'bg-green-600/40'
            }`}
          >
            Beginner
          </button>
          <button
            onClick={() => setSelectedDifficulty('intermediate')}
            className={`px-6 py-2 rounded-lg text-white font-medium ${
              selectedDifficulty === 'intermediate' ? 'bg-orange-500' : 'bg-orange-500/40'
            }`}
          >
            Intermediate
          </button>
          <button
            onClick={() => setSelectedDifficulty('advanced')}
            className={`px-6 py-2 rounded-lg text-white font-medium ${
              selectedDifficulty === 'advanced' ? 'bg-red-600' : 'bg-red-600/40'
            }`}
          >
            Advanced
          </button>
        </div>

        {/* Workout Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {filteredWorkouts.map((workout) => (
            <div key={workout.id} className="bg-gray-800 rounded-lg p-6">
              <h2 className="text-2xl font-bold text-white mb-2">
                {workout.title}
              </h2>
              <p className="text-gray-400 mb-6">
                {workout.description}
              </p>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Difficulty</span>
                  <span className={`px-3 py-1 rounded-full text-sm ${
                    workout.difficulty === 'beginner' ? 'bg-green-600' :
                    workout.difficulty === 'intermediate' ? 'bg-orange-500' : 'bg-red-600'
                  }`}>
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

              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={() => navigate(`/workout-details/${workout.id}`)}
                  className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
                >
                  View Details
                </button>
                <button
                  onClick={() => navigate(`/start-workout/${workout.id}`)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Start
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
} 