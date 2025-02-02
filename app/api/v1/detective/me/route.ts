import { jsonResponse, errorResponse } from '../../../utils'
import { authenticatedFetch } from '@/lib/auth/api'

const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:8000'

export async function GET(request: Request) {
  try {
    const authHeader = request.headers.get('Authorization')
    
    if (!authHeader) {
      return errorResponse('Authorization header missing', 401)
    }

    const response = await authenticatedFetch(
      `${BACKEND_URL}/api/v1/detective/me/`,
      {
        headers: {
          'Authorization': authHeader,
          'Content-Type': 'application/json',
        },
      }
    )

    if (!response.ok) {
      const errorData = await response.json()
      return errorResponse(errorData.message || 'Failed to fetch user details', response.status)
    }

    const data = await response.json()
    return jsonResponse(data)
  } catch (error) {
    console.error('Error fetching user details:', error)
    return errorResponse('An error occurred while fetching user details', 500)
  }
} 