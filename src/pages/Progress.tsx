import { useState } from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts'

export default function Progress() {
  // Mock data for charts
  const weightData = [
    { date: '1 Jan', weight: 75 },
    { date: '15 Jan', weight: 74 },
    { date: '1 Feb', weight: 73.5 },
    { date: '15 Feb', weight: 72.8 },
    { date: '1 Mar', weight: 72 },
    { date: '15 Mar', weight: 71.5 },
  ]

  const workoutData = [
    { month: 'January', workouts: 12 },
    { month: 'February', workouts: 15 },
    { month: 'March', workouts: 18 },
  ]

  return (
    <div 
      className="min-h-screen bg-cover bg-center"
      style={{ 
        backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(/fitness-background.jpg)'
      }}
    >
      <div className="container mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold mb-8 text-white">Progress Tracking</h1>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-gray-900 rounded-lg p-6">
            <h3 className="text-gray-400 text-sm">Total Workouts</h3>
            <p className="text-3xl font-bold text-white">45</p>
            <p className="text-green-500 text-sm">↑ 12% from last month</p>
          </div>
          <div className="bg-gray-900 rounded-lg p-6">
            <h3 className="text-gray-400 text-sm">Current Streak</h3>
            <p className="text-3xl font-bold text-white">7 days</p>
            <p className="text-green-500 text-sm">Personal Best!</p>
          </div>
          <div className="bg-gray-900 rounded-lg p-6">
            <h3 className="text-gray-400 text-sm">Weight Change</h3>
            <p className="text-3xl font-bold text-white">-3.5 kg</p>
            <p className="text-green-500 text-sm">On track with goal</p>
          </div>
          <div className="bg-gray-900 rounded-lg p-6">
            <h3 className="text-gray-400 text-sm">Calories Burned</h3>
            <p className="text-3xl font-bold text-white">12,450</p>
            <p className="text-green-500 text-sm">This month</p>
          </div>
        </div>

        {/* Weight Progress Chart */}
        <div className="bg-gray-900 rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold mb-6 text-white">Weight Progress</h2>
          <div className="h-[300px] w-full">
            <LineChart
              width={800}
              height={300}
              data={weightData}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" stroke="#fff" />
              <YAxis stroke="#fff" />
              <Tooltip />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="weight" 
                stroke="#3b82f6" 
                strokeWidth={2}
              />
            </LineChart>
          </div>
        </div>

        {/* Monthly Workout Summary */}
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-gray-900 rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-6 text-white">Recent Achievements</h2>
            <div className="space-y-4">
              <div className="flex items-center gap-4 bg-gray-800 p-4 rounded">
                <div className="bg-blue-500 p-2 rounded">🏆</div>
                <div>
                  <h3 className="text-white font-medium">7 Day Streak</h3>
                  <p className="text-gray-400">Completed workouts for 7 consecutive days</p>
                </div>
              </div>
              <div className="flex items-center gap-4 bg-gray-800 p-4 rounded">
                <div className="bg-green-500 p-2 rounded">💪</div>
                <div>
                  <h3 className="text-white font-medium">Weight Goal</h3>
                  <p className="text-gray-400">Lost 3.5kg - 70% of target reached</p>
                </div>
              </div>
              <div className="flex items-center gap-4 bg-gray-800 p-4 rounded">
                <div className="bg-purple-500 p-2 rounded">🎯</div>
                <div>
                  <h3 className="text-white font-medium">Personal Best</h3>
                  <p className="text-gray-400">New record in bench press: 80kg</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gray-900 rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-6 text-white">Monthly Workout Summary</h2>
            <div className="space-y-4">
              {workoutData.map((month, index) => (
                <div key={index} className="bg-gray-800 p-4 rounded">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-white">{month.month}</h3>
                    <span className="text-blue-400">{month.workouts} workouts</span>
                  </div>
                  <div className="h-2 bg-gray-700 rounded-full">
                    <div 
                      className="h-full bg-blue-500 rounded-full"
                      style={{ width: `${(month.workouts / 20) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 