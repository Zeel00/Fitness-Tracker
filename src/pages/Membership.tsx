import React from 'react'
import { useAuth } from '../lib/auth-provider'

export default function Membership() {
  const { user } = useAuth()

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-6">Membership</h1>
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Basic</h2>
          <ul className="space-y-2 mb-4">
            <li>✓ Basic workouts</li>
            <li>✓ Progress tracking</li>
            <li>✓ 3 workouts/month</li>
          </ul>
          <p className="text-2xl font-bold mb-4">Free</p>
          <button className="w-full px-4 py-2 bg-gray-200 text-gray-700 rounded-md">
            Current Plan
          </button>
        </div>

        <div className="bg-white rounded-lg p-6 border-2 border-blue-500">
          <h2 className="text-xl font-semibold mb-4">Premium</h2>
          <ul className="space-y-2 mb-4">
            <li>✓ All Basic features</li>
            <li>✓ Unlimited workouts</li>
            <li>✓ Video access</li>
            <li>✓ Personal trainer</li>
          </ul>
          <p className="text-2xl font-bold mb-4">$9.99/month</p>
          <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-md">
            Upgrade Now
          </button>
        </div>
      </div>
    </div>
  )
} 