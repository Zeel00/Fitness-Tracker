import { useState } from 'react'
import { useAuth } from '../lib/auth-provider'

interface UserProfile {
  name: string
  email: string
  age: number
  gender: string
  height: number
  weight: number
  goalWeight: number
  fitnessGoal: string
  activityLevel: string
  medicalConditions: string[]
  preferences: {
    workoutDays: string[]
    preferredTime: string
    workoutDuration: string
  }
}

export default function Profile() {
  const { user } = useAuth()
  const [isEditing, setIsEditing] = useState(false)
  
  // Mock user profile data - replace with actual data from your backend
  const [profile, setProfile] = useState<UserProfile>({
    name: 'Zeel',
    email: 'zeel@gmail.com',
    age: 23,
    gender: 'Male',
    height: 175,
    weight: 70,
    goalWeight: 75,
    fitnessGoal: 'Build Muscle',
    activityLevel: 'Intermediate',
    medicalConditions: ['None'],
    preferences: {
      workoutDays: ['Monday', 'Wednesday', 'Friday'],
      preferredTime: 'Morning',
      workoutDuration: '45-60 minutes'
    }
  })

  const handleSave = () => {
    // Add your save logic here
    setIsEditing(false)
  }

  return (
    <div 
      className="min-h-screen bg-cover bg-center"
      style={{ 
        backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(/fitness-background.jpg)'
      }}
    >
      <div className="container mx-auto py-8 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Profile Header */}
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-white">Profile Settings</h1>
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              {isEditing ? 'Cancel' : 'Edit Profile'}
            </button>
          </div>

          {/* Basic Information */}
          <div className="bg-gray-900 rounded-lg p-6 mb-6">
            <h2 className="text-xl font-semibold text-white mb-4">Basic Information</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-400 mb-2">Name</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={profile.name}
                    onChange={(e) => setProfile({...profile, name: e.target.value})}
                    className="w-full bg-gray-800 text-white rounded-lg p-2 border border-gray-700"
                  />
                ) : (
                  <p className="text-white">{profile.name}</p>
                )}
              </div>
              <div>
                <label className="block text-gray-400 mb-2">Email</label>
                <p className="text-white">{profile.email}</p>
              </div>
              <div>
                <label className="block text-gray-400 mb-2">Age</label>
                {isEditing ? (
                  <input
                    type="number"
                    value={profile.age}
                    onChange={(e) => setProfile({...profile, age: Number(e.target.value)})}
                    className="w-full bg-gray-800 text-white rounded-lg p-2 border border-gray-700"
                  />
                ) : (
                  <p className="text-white">{profile.age} years</p>
                )}
              </div>
              <div>
                <label className="block text-gray-400 mb-2">Gender</label>
                {isEditing ? (
                  <select
                    value={profile.gender}
                    onChange={(e) => setProfile({...profile, gender: e.target.value})}
                    className="w-full bg-gray-800 text-white rounded-lg p-2 border border-gray-700"
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                ) : (
                  <p className="text-white">{profile.gender}</p>
                )}
              </div>
            </div>
          </div>

          {/* Physical Stats */}
          <div className="bg-gray-900 rounded-lg p-6 mb-6">
            <h2 className="text-xl font-semibold text-white mb-4">Physical Stats</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <label className="block text-gray-400 mb-2">Height (cm)</label>
                {isEditing ? (
                  <input
                    type="number"
                    value={profile.height}
                    onChange={(e) => setProfile({...profile, height: Number(e.target.value)})}
                    className="w-full bg-gray-800 text-white rounded-lg p-2 border border-gray-700"
                  />
                ) : (
                  <p className="text-white">{profile.height} cm</p>
                )}
              </div>
              <div>
                <label className="block text-gray-400 mb-2">Current Weight (kg)</label>
                {isEditing ? (
                  <input
                    type="number"
                    value={profile.weight}
                    onChange={(e) => setProfile({...profile, weight: Number(e.target.value)})}
                    className="w-full bg-gray-800 text-white rounded-lg p-2 border border-gray-700"
                  />
                ) : (
                  <p className="text-white">{profile.weight} kg</p>
                )}
              </div>
              <div>
                <label className="block text-gray-400 mb-2">Goal Weight (kg)</label>
                {isEditing ? (
                  <input
                    type="number"
                    value={profile.goalWeight}
                    onChange={(e) => setProfile({...profile, goalWeight: Number(e.target.value)})}
                    className="w-full bg-gray-800 text-white rounded-lg p-2 border border-gray-700"
                  />
                ) : (
                  <p className="text-white">{profile.goalWeight} kg</p>
                )}
              </div>
            </div>
          </div>

          {/* Fitness Goals */}
          <div className="bg-gray-900 rounded-lg p-6 mb-6">
            <h2 className="text-xl font-semibold text-white mb-4">Fitness Goals</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-400 mb-2">Primary Goal</label>
                {isEditing ? (
                  <select
                    value={profile.fitnessGoal}
                    onChange={(e) => setProfile({...profile, fitnessGoal: e.target.value})}
                    className="w-full bg-gray-800 text-white rounded-lg p-2 border border-gray-700"
                  >
                    <option value="Lose Weight">Lose Weight</option>
                    <option value="Build Muscle">Build Muscle</option>
                    <option value="Improve Fitness">Improve Fitness</option>
                    <option value="Maintain Health">Maintain Health</option>
                  </select>
                ) : (
                  <p className="text-white">{profile.fitnessGoal}</p>
                )}
              </div>
              <div>
                <label className="block text-gray-400 mb-2">Activity Level</label>
                {isEditing ? (
                  <select
                    value={profile.activityLevel}
                    onChange={(e) => setProfile({...profile, activityLevel: e.target.value})}
                    className="w-full bg-gray-800 text-white rounded-lg p-2 border border-gray-700"
                  >
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                  </select>
                ) : (
                  <p className="text-white">{profile.activityLevel}</p>
                )}
              </div>
            </div>
          </div>

          {/* Workout Preferences */}
          <div className="bg-gray-900 rounded-lg p-6 mb-6">
            <h2 className="text-xl font-semibold text-white mb-4">Workout Preferences</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-400 mb-2">Preferred Time</label>
                {isEditing ? (
                  <select
                    value={profile.preferences.preferredTime}
                    onChange={(e) => setProfile({
                      ...profile,
                      preferences: {...profile.preferences, preferredTime: e.target.value}
                    })}
                    className="w-full bg-gray-800 text-white rounded-lg p-2 border border-gray-700"
                  >
                    <option value="Morning">Morning</option>
                    <option value="Afternoon">Afternoon</option>
                    <option value="Evening">Evening</option>
                  </select>
                ) : (
                  <p className="text-white">{profile.preferences.preferredTime}</p>
                )}
              </div>
              <div>
                <label className="block text-gray-400 mb-2">Workout Duration</label>
                {isEditing ? (
                  <select
                    value={profile.preferences.workoutDuration}
                    onChange={(e) => setProfile({
                      ...profile,
                      preferences: {...profile.preferences, workoutDuration: e.target.value}
                    })}
                    className="w-full bg-gray-800 text-white rounded-lg p-2 border border-gray-700"
                  >
                    <option value="30-45 minutes">30-45 minutes</option>
                    <option value="45-60 minutes">45-60 minutes</option>
                    <option value="60+ minutes">60+ minutes</option>
                  </select>
                ) : (
                  <p className="text-white">{profile.preferences.workoutDuration}</p>
                )}
              </div>
            </div>
          </div>

          {/* Save Button */}
          {isEditing && (
            <div className="flex justify-end">
              <button
                onClick={handleSave}
                className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                Save Changes
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
} 