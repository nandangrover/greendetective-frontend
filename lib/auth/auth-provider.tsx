'use client'

import { ReactNode, useState, useEffect } from 'react'
import { AuthContext } from './auth-context'
import { AuthState, User } from './types'
import { setAuthStateForAPI } from './api'

// Update constants at the top of file
const COOKIE_EXPIRATION_TIME = 24 * 60 * 60 // 24 hours in seconds
const STORAGE_EXPIRATION_TIME = COOKIE_EXPIRATION_TIME - (60 * 60) // 23 hours in seconds

export function AuthProvider({ children }: { children: ReactNode }) {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    tokens: null,
  })
  const [isInitialized, setIsInitialized] = useState(false)

  // Initialize state from localStorage after mount
  useEffect(() => {
    const savedAuth = localStorage.getItem('auth')
    if (savedAuth) {
      const parsed = JSON.parse(savedAuth)
      // Check if the stored auth is still valid
      if (parsed.expiresAt && parsed.expiresAt > Date.now()) {
        const { user, tokens } = parsed
        setAuthState({
          user,
          isAuthenticated: true,
          tokens,
        })
      } else {
        // Clear expired auth data
        localStorage.removeItem('auth')
      }
    }
    setIsInitialized(true)
  }, [])

  // Update API utility with current auth state
  useEffect(() => {
    if (isInitialized) {
      setAuthStateForAPI(authState)
    }
  }, [authState, isInitialized])

  // Add a synchronization effect
  useEffect(() => {
    const syncAuthState = () => {
      const savedAuth = localStorage.getItem('auth')
      const accessToken = document.cookie
        .split('; ')
        .find(row => row.startsWith('access_token='))
        ?.split('=')[1]

      if (!savedAuth || !accessToken) {
        // If either is missing, clear both
        logout()
        return
      }

      const parsed = JSON.parse(savedAuth)
      if (parsed.expiresAt && parsed.expiresAt > Date.now()) {
        const { user, tokens } = parsed
        setAuthState({
          user,
          isAuthenticated: true,
          tokens,
        })
      } else {
        // Clear expired auth data
        logout()
      }
    }

    // Sync on mount
    syncAuthState()

    // Set up interval to check sync
    const intervalId = setInterval(syncAuthState, 60000) // Check every minute

    return () => clearInterval(intervalId)
  }, [])

  const login = async (email: string, password: string) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/detective/login/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.message || 'Login failed')
    }

    const { access, refresh } = await response.json()
    const user = await fetchUserDetails(access)

    // Set cookies with 24 hour expiration
    const cookieOptions = `path=/; max-age=${COOKIE_EXPIRATION_TIME}; SameSite=Strict; ${process.env.NODE_ENV === 'production' ? 'Secure;' : ''}`
    document.cookie = `access_token=${access}; ${cookieOptions}`
    document.cookie = `refresh_token=${refresh}; ${cookieOptions}`

    const newAuthState = {
      user,
      isAuthenticated: true,
      tokens: {
        access,
        refresh,
      },
    }

    setAuthState(newAuthState)
    // Store in localStorage with 23 hour expiration
    localStorage.setItem('auth', JSON.stringify({
      ...newAuthState,
      expiresAt: Date.now() + (STORAGE_EXPIRATION_TIME * 1000),
    }))
  }

  const logout = () => {
    // Clear cookies
    const clearOptions = `path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; ${process.env.NODE_ENV === 'production' ? 'Secure;' : ''}`
    document.cookie = `access_token=; ${clearOptions}`
    document.cookie = `refresh_token=; ${clearOptions}`

    // Clear localStorage
    localStorage.removeItem('auth')

    setAuthState({
      user: null,
      isAuthenticated: false,
      tokens: null,
    })
  }

  const signup = async (signupData: {
    username: string
    email: string
    password: string
    invite_code: string
    profile: {
      job_title: string
      phone: string
      business: {
        name: string
        website: string
        industry: string
        size: string
      }
    }
  }) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/detective/signup/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(signupData),
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.message || 'Signup failed')
    }

    await response.json()
  }

  const handleUnauthorizedResponse = async (response: Response) => {
    try {
      const data = await response.json()
      if (data.shouldLogout) {
        logout()
      }
    } catch (error) {
      console.error('Error handling unauthorized response:', error)
    }
  }

  const fetchUserDetails = async (token: string) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/detective/me/`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      })

      if (!response.ok) {
        if (response.status === 401) {
          await handleUnauthorizedResponse(response)
        }
        throw new Error('Failed to fetch user details')
      }

      const data = await response.json()
      return {
        id: data.id.toString(),
        email: data.email,
        name: data.username,
        profile: data.profile,
      }
    } catch (error) {
      console.error('Error fetching user details:', error)
      throw error
    }
  }

  return (
    <AuthContext.Provider value={{ ...authState, login, logout, signup }}>
      {isInitialized ? children : null}
    </AuthContext.Provider>
  )
}