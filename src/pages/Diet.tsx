import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

interface MealPlan {
  calories: number
  meals: {
    breakfast: string[]
    lunch: string[]
    dinner: string[]
    snacks: string[]
  }
}

const dietPlans: { [key: string]: MealPlan } = {
  '1500': {
    calories: 1500,
    meals: {
      breakfast: [
        'Oatmeal with banana and honey (300 cal)',
        '2 boiled eggs with whole grain toast (200 cal)',
        'Greek yogurt with berries and granola (250 cal)'
      ],
      lunch: [
        'Grilled chicken salad with olive oil dressing (400 cal)',
        'Quinoa bowl with vegetables and tofu (350 cal)',
        'Turkey and avocado sandwich on whole grain bread (400 cal)'
      ],
      dinner: [
        'Baked salmon with brown rice and vegetables (450 cal)',
        'Lean beef stir-fry with vegetables (400 cal)',
        'Grilled chicken breast with sweet potato (400 cal)'
      ],
      snacks: [
        'Apple with almond butter (150 cal)',
        'Carrot sticks with hummus (100 cal)',
        'Handful of mixed nuts (150 cal)'
      ]
    }
  },
  '2000': {
    calories: 2000,
    meals: {
      breakfast: [
        'Protein smoothie with fruits and oats (400 cal)',
        '3 egg omelet with cheese and vegetables (450 cal)',
        'Whole grain pancakes with peanut butter (400 cal)'
      ],
      lunch: [
        'Chicken rice bowl with vegetables (500 cal)',
        'Tuna pasta salad with olive oil (550 cal)',
        'Black bean and quinoa burrito bowl (500 cal)'
      ],
      dinner: [
        'Grilled fish with potatoes and vegetables (600 cal)',
        'Lean steak with sweet potato and broccoli (650 cal)',
        'Chicken curry with brown rice (600 cal)'
      ],
      snacks: [
        'Protein bar (200 cal)',
        'Greek yogurt with honey (150 cal)',
        'Banana with protein shake (200 cal)'
      ]
    }
  },
  '2500': {
    calories: 2500,
    meals: {
      breakfast: [
        'Protein oatmeal with nuts and fruits (500 cal)',
        'Breakfast burrito with eggs and avocado (550 cal)',
        'Protein pancakes with banana and honey (500 cal)'
      ],
      lunch: [
        'Double chicken breast with rice and vegetables (700 cal)',
        'Salmon with quinoa and avocado (650 cal)',
        'Turkey and rice bowl with olive oil (650 cal)'
      ],
      dinner: [
        'Lean beef steak with potato and vegetables (800 cal)',
        'Grilled chicken with pasta and sauce (750 cal)',
        'Fish with rice and stir-fried vegetables (700 cal)'
      ],
      snacks: [
        'Protein smoothie (300 cal)',
        'Mixed nuts and dried fruits (250 cal)',
        'Protein bar with banana (300 cal)'
      ]
    }
  }
}

export default function Diet() {
  const [weight, setWeight] = useState('')
  const [height, setHeight] = useState('')
  const [age, setAge] = useState('')
  const [gender, setGender] = useState('male')
  const [activityLevel, setActivityLevel] = useState('moderate')
  const [calculatedCalories, setCalculatedCalories] = useState<number | null>(null)
  const [selectedPlan, setSelectedPlan] = useState<MealPlan | null>(null)

  const calculateCalories = () => {
    // BMR calculation using Mifflin-St Jeor Equation
    let bmr
    if (gender === 'male') {
      bmr = 10 * Number(weight) + 6.25 * Number(height) - 5 * Number(age) + 5
    } else {
      bmr = 10 * Number(weight) + 6.25 * Number(height) - 5 * Number(age) - 161
    }

    // Activity multiplier
    const activityMultipliers = {
      sedentary: 1.2, // Little or no exercise
      light: 1.375, // Light exercise 1-3 days/week
      moderate: 1.55, // Moderate exercise 3-5 days/week
      active: 1.725, // Heavy exercise 6-7 days/week
      veryActive: 1.9 // Very heavy exercise, physical job
    }

    const calories = Math.round(bmr * activityMultipliers[activityLevel as keyof typeof activityMultipliers])
    setCalculatedCalories(calories)

    // Select appropriate meal plan
    if (calories < 1750) {
      setSelectedPlan(dietPlans['1500'])
    } else if (calories < 2250) {
      setSelectedPlan(dietPlans['2000'])
    } else {
      setSelectedPlan(dietPlans['2500'])
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
        <h1 className="text-3xl font-bold mb-8 text-white">Diet & Nutrition</h1>

        {/* Calorie Calculator Card */}
        <div className="bg-gray-900 rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold mb-6 text-white">Calorie Calculator</h2>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Weight (kg)
                </label>
                <input
                  type="number"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  className="w-full p-2 rounded bg-gray-800 text-white border border-gray-700"
                  placeholder="Enter weight"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Height (cm)
                </label>
                <input
                  type="number"
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                  className="w-full p-2 rounded bg-gray-800 text-white border border-gray-700"
                  placeholder="Enter height"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Age
                </label>
                <input
                  type="number"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  className="w-full p-2 rounded bg-gray-800 text-white border border-gray-700"
                  placeholder="Enter age"
                />
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Gender
                </label>
                <select
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  className="w-full p-2 rounded bg-gray-800 text-white border border-gray-700"
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Activity Level
                </label>
                <select
                  value={activityLevel}
                  onChange={(e) => setActivityLevel(e.target.value)}
                  className="w-full p-2 rounded bg-gray-800 text-white border border-gray-700"
                >
                  <option value="sedentary">Sedentary (little or no exercise)</option>
                  <option value="light">Light (exercise 1-3 days/week)</option>
                  <option value="moderate">Moderate (exercise 3-5 days/week)</option>
                  <option value="active">Active (exercise 6-7 days/week)</option>
                  <option value="veryActive">Very Active (physical job or intense training)</option>
                </select>
              </div>

              <button
                onClick={calculateCalories}
                className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition-colors"
              >
                Calculate Calories
              </button>
            </div>
          </div>

          {calculatedCalories && (
            <div className="mt-6 p-4 bg-gray-800 rounded-lg">
              <h3 className="text-lg font-medium text-white mb-2">Your Daily Calorie Needs</h3>
              <div className="grid gap-4 md:grid-cols-3">
                <div className="p-3 bg-gray-700 rounded-lg text-center">
                  <p className="text-sm text-gray-300">Weight Loss</p>
                  <p className="text-xl font-bold text-white">{calculatedCalories - 500} kcal</p>
                </div>
                <div className="p-3 bg-blue-600 rounded-lg text-center">
                  <p className="text-sm text-gray-100">Maintenance</p>
                  <p className="text-xl font-bold text-white">{calculatedCalories} kcal</p>
                </div>
                <div className="p-3 bg-gray-700 rounded-lg text-center">
                  <p className="text-sm text-gray-300">Weight Gain</p>
                  <p className="text-xl font-bold text-white">{calculatedCalories + 500} kcal</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Meal Plan Section */}
        {selectedPlan && (
          <div className="bg-gray-900 rounded-lg p-6 mt-8">
            <h2 className="text-2xl font-semibold mb-6 text-white">
              Your Personalized Meal Plan ({selectedPlan.calories} calories)
            </h2>
            
            {/* Breakfast */}
            <div className="mb-6">
              <h3 className="text-xl font-medium mb-3 text-blue-400">Breakfast Options</h3>
              <div className="grid gap-3">
                {selectedPlan.meals.breakfast.map((meal, index) => (
                  <div key={index} className="bg-gray-800 p-3 rounded">
                    <p className="text-white">{meal}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Lunch */}
            <div className="mb-6">
              <h3 className="text-xl font-medium mb-3 text-blue-400">Lunch Options</h3>
              <div className="grid gap-3">
                {selectedPlan.meals.lunch.map((meal, index) => (
                  <div key={index} className="bg-gray-800 p-3 rounded">
                    <p className="text-white">{meal}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Dinner */}
            <div className="mb-6">
              <h3 className="text-xl font-medium mb-3 text-blue-400">Dinner Options</h3>
              <div className="grid gap-3">
                {selectedPlan.meals.dinner.map((meal, index) => (
                  <div key={index} className="bg-gray-800 p-3 rounded">
                    <p className="text-white">{meal}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Snacks */}
            <div>
              <h3 className="text-xl font-medium mb-3 text-blue-400">Snack Options</h3>
              <div className="grid gap-3">
                {selectedPlan.meals.snacks.map((meal, index) => (
                  <div key={index} className="bg-gray-800 p-3 rounded">
                    <p className="text-white">{meal}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Tips */}
            <div className="mt-8 bg-blue-900/50 p-4 rounded">
              <h3 className="text-lg font-medium mb-2 text-white">Tips:</h3>
              <ul className="list-disc list-inside text-gray-300 space-y-1">
                <li>Drink at least 8 glasses of water daily</li>
                <li>Eat every 3-4 hours</li>
                <li>Include protein with each meal</li>
                <li>Choose whole grains over refined grains</li>
                <li>Include vegetables in at least two meals</li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  )
} 