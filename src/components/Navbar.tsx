import { useNavigate } from 'react-router-dom'
import { cn } from '../lib/utils'
import { useState } from 'react'

export default function Navbar() {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('workout-plans')

  const navItems = [
    { name: 'Workout Plans', path: '/workout-plans' },
    { name: 'Progress', path: '/progress' }
  ]

  const handleNavigation = (path: string, name: string) => {
    setActiveTab(name.toLowerCase().replace(' ', '-'))
    navigate(path)
  }

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-gray-900 p-2">
      <div className="container mx-auto flex justify-between items-center">
        {navItems.map((item) => (
          <button
            key={item.name}
            onClick={() => handleNavigation(item.path, item.name)}
            className={cn(
              "px-4 py-2 text-sm font-medium transition-colors",
              activeTab === item.name.toLowerCase().replace(' ', '-')
                ? "text-white"
                : "text-gray-400 hover:text-white"
            )}
          >
            {item.name}
          </button>
        ))}
      </div>
    </nav>
  )
} 