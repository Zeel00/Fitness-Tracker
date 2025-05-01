import { Outlet } from 'react-router-dom'
import '@fontsource/inter/400.css'
import '@fontsource/inter/500.css'
import '@fontsource/inter/600.css'
import '@fontsource/inter/700.css'
import { Toaster } from '../components/ui/toaster'

export default function Layout() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Outlet />
      <Toaster />
      <nav className="bg-gray-800 rounded-lg p-2">
        <button className="px-4 py-2 text-gray-300 hover:text-white">
          Workout Plans
        </button>
        <button className="px-4 py-2 text-gray-300 hover:text-white">
          Progress
        </button>
      </nav>
    </div>
  )
} 