'use client'

import { ReactNode, useState } from 'react'
import { AuthContext } from './auth-context'
import { AuthState, User } from './types'

export function AuthProvider({ children }: { children: ReactNode }) {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
  })

  const login = async (email: string, password: string) => {
    const mockUser: User = { id: '1', email, name: 'Test User' }
    setAuthState({ user: mockUser, isAuthenticated: true })
  }

  const logout = () => {
    setAuthState({ user: null, isAuthenticated: false })
  }

  const signup = async (email: string, password: string, name: string) => {
    const mockUser: User = { id: '1', email, name }
    setAuthState({ user: mockUser, isAuthenticated: true })
  }

  return (
    <AuthContext.Provider value={{ ...authState, login, logout, signup }}>
      {children}
    </AuthContext.Provider>
  )
}