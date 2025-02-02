import { jsonResponse, errorResponse } from '../../../utils'

const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:8000'

export async function POST(request: Request) {
  try {
    const { refresh_token } = await request.json()

    const response = await fetch(`${BACKEND_URL}/api/v1/token/refresh/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ refresh: refresh_token }),
    })

    if (!response.ok) {
      const errorData = await response.json()
      return errorResponse(errorData.message || 'Failed to refresh token', response.status)
    }

    const data = await response.json()
    return jsonResponse({
      status: 'success',
      data: {
        access_token: data.access,
      },
    })
  } catch (error) {
    console.error('Token refresh error:', error)
    return errorResponse('An error occurred during token refresh', 500)
  }
}

