import { AuthState } from './types'

let authState: AuthState | null = null

export function setAuthStateForAPI(state: AuthState | null) {
  authState = state
}

// TODO: Add refresh token logic

export function getAuthHeader() {
  if (typeof window !== 'undefined') {
    const savedAuth = localStorage.getItem('auth')
    if (savedAuth) {
      const { tokens } = JSON.parse(savedAuth)
      return `Bearer ${tokens.access}`
    }
  }
  return ''
}

export async function authenticatedFetch(url: string, options: RequestInit = {}) {
  let accessToken: string | undefined

  if (typeof window !== 'undefined') {
    // Client-side: use document.cookie
    accessToken = document.cookie
      .split('; ')
      .find(row => row.startsWith('access_token='))
      ?.split('=')[1]
  }

  if (!accessToken) {
    throw new Error('No access token available')
  }

  return fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
  })
} 