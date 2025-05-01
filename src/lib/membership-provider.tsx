import { createContext, useContext, useState, ReactNode } from 'react'
import { useAuth } from './auth-provider'

interface MembershipPlan {
  id: number
  name: string
  description: string
  price: number
  features: string[]
}

interface MembershipContextType {
  membershipPlans: MembershipPlan[]
  loading: boolean
  error: string | null
}

const MembershipContext = createContext<MembershipContextType | undefined>(undefined)

const defaultPlans: MembershipPlan[] = [
  {
    id: 1,
    name: 'Basic',
    description: 'Essential features for your fitness journey',
    price: 499,
    features: [
      'Access to basic workout plans',
      'Basic exercise tracking',
      'Community support',
      'Email assistance'
    ]
  },
  {
    id: 2,
    name: 'Premium',
    description: 'Advanced features for serious fitness enthusiasts',
    price: 999,
    features: [
      'All Basic features',
      'Personalized workout plans',
      'Nutrition tracking',
      'Progress analytics',
      'Priority support'
    ]
  }
]

export function MembershipProvider({ children }: { children: ReactNode }) {
  const [membershipPlans] = useState<MembershipPlan[]>(defaultPlans)
  const [loading] = useState(false)
  const [error] = useState<string | null>(null)

  return (
    <MembershipContext.Provider value={{ membershipPlans, loading, error }}>
      {children}
    </MembershipContext.Provider>
  )
}

export function useMembership() {
  const context = useContext(MembershipContext)
  if (context === undefined) {
    throw new Error('useMembership must be used within a MembershipProvider')
  }
  return context
} 