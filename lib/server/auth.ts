import { cookies } from 'next/headers'

export function getServerAuthHeader() {
  const cookieStore = cookies()
  const accessToken = cookieStore.get('access_token')?.value

  if (!accessToken) {
    return null
  }

  return `Bearer ${accessToken}`
}

export async function serverAuthenticatedFetch(url: string, options: RequestInit = {}) {
  const authHeader = getServerAuthHeader()
  
  if (!authHeader) {
    // Return a Response object with 401 Unauthorized status
    return new Response(JSON.stringify({ error: 'Unauthorized - No access token available' }), {
      status: 401,
      headers: {
        'Content-Type': 'application/json',
      },
    })
  }

  return fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      'Authorization': authHeader,
      'Content-Type': 'application/json',
    },
  })
} 