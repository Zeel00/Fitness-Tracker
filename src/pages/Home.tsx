import { useNavigate } from 'react-router-dom'
import { Button } from '../components/ui/button'
import { Dumbbell, ArrowRight, CheckCircle } from 'lucide-react'

export default function Home() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-[#1a1a1a] relative">
      {/* Background Overlay */}
      <div 
        className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-black pointer-events-none"
        style={{
          backgroundImage: `url('/images/fitness-bg.jpg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundBlendMode: 'overlay',
          opacity: 0.2,
        }}
      />

      {/* Content Container */}
      <div className="relative z-10">
        {/* Header */}
        <header className="bg-black/50 backdrop-blur-sm py-4 px-6 flex justify-between items-center sticky top-0 z-40">
          <div className="flex items-center space-x-3 text-white">
            <Dumbbell className="h-7 w-7 text-blue-500" />
            <h1 className="text-2xl font-bold">Fitness Center</h1>
          </div>
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              className="text-white hover:bg-white/10"
              onClick={() => navigate('/login')}
            >
              Login
            </Button>
            <Button
              className="bg-blue-600 hover:bg-blue-700"
              onClick={() => navigate('/register')}
            >
              Get Started
            </Button>
          </div>
        </header>

        {/* Hero Section */}
        <section className="py-32 px-6 bg-black/30">
          <div className="max-w-5xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 drop-shadow-lg">
              Transform Your Fitness Journey
            </h1>
            <p className="text-xl text-gray-200 mb-12 max-w-2xl mx-auto drop-shadow">
              Your personal fitness companion for achieving your health and wellness goals. Start your journey today.
            </p>
            <Button
              size="lg"
              className="bg-blue-600 hover:bg-blue-700 text-lg px-8"
              onClick={() => navigate('/register')}
            >
              Start Your Journey <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 px-6 bg-black/80 backdrop-blur-sm">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-white text-center mb-12">
              Why Choose Us?
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white/5 backdrop-blur-sm p-6 rounded-lg border border-white/10 hover:border-blue-500/50 transition-colors">
                <div className="h-12 w-12 bg-blue-500/20 rounded-lg flex items-center justify-center mb-4">
                  <Dumbbell className="h-6 w-6 text-blue-500" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">
                  Personalized Workouts
                </h3>
                <p className="text-gray-300">
                  Custom workout plans tailored to your fitness level and goals
                </p>
              </div>
              <div className="bg-white/5 backdrop-blur-sm p-6 rounded-lg border border-white/10 hover:border-green-500/50 transition-colors">
                <div className="h-12 w-12 bg-green-500/20 rounded-lg flex items-center justify-center mb-4">
                  <CheckCircle className="h-6 w-6 text-green-500" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">
                  Progress Tracking
                </h3>
                <p className="text-gray-300">
                  Monitor your progress and celebrate your fitness achievements
                </p>
              </div>
              <div className="bg-white/5 backdrop-blur-sm p-6 rounded-lg border border-white/10 hover:border-purple-500/50 transition-colors">
                <div className="h-12 w-12 bg-purple-500/20 rounded-lg flex items-center justify-center mb-4">
                  <ArrowRight className="h-6 w-6 text-purple-500" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">
                  Expert Guidance
                </h3>
                <p className="text-gray-300">
                  Access to professional workout plans and nutrition advice
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-6 bg-gradient-to-b from-black/50 to-black/80">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-white mb-6">
              Ready to Start Your Fitness Journey?
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Join thousands of others who have transformed their lives with our platform
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-blue-600 hover:bg-blue-700"
                onClick={() => navigate('/register')}
              >
                Sign Up Now
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="text-white border-white/20 hover:bg-white/10"
                onClick={() => navigate('/login')}
              >
                Learn More
              </Button>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-black/90 py-8 px-6">
          <div className="max-w-6xl mx-auto text-center text-gray-400">
            <p>© 2024 Fitness Center. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </div>
  )
} 