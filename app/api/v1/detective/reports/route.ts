import { jsonResponse, errorResponse } from '../../../utils'
import { serverAuthenticatedFetch } from '@/lib/server/auth'

const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:8000'

export async function GET(request: Request) {
  try {
    const response = await serverAuthenticatedFetch(
      `${BACKEND_URL}/api/v1/detective/reports/`,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )

    if (!response.ok) {
      const errorData = await response.json()
      console.error('API Error:', {
        status: response.status,
        url: response.url,
        error: errorData
      })
      return errorResponse(errorData.detail || 'Failed to fetch reports', response.status)
    }

    const data = await response.json()
    return jsonResponse(data)
  } catch (error) {
    console.error('Error fetching reports:', error)
    return errorResponse('An error occurred while fetching reports', 500)
  }
}

