import React from 'react'

interface PageBackgroundProps {
  children?: React.ReactNode
}

export default function PageBackground({ children }: PageBackgroundProps) {
  return (
    <div className="min-h-screen relative">
      {/* Background Image */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: "url('/images/login-bg.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/60" />
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-screen">
        {children}
      </div>
    </div>
  )
} 