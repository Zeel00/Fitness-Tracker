import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { AuthProvider } from './lib/auth-provider'
import { WorkoutProvider } from './lib/workout-provider'
import { MembershipProvider } from './lib/membership-provider'
import './styles/globals.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthProvider>
      <WorkoutProvider>
        <MembershipProvider>
          <App />
        </MembershipProvider>
      </WorkoutProvider>
    </AuthProvider>
  </React.StrictMode>
) 