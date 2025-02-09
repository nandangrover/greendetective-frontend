import { jsonResponse, errorResponse } from '../../../../utils'
import { authenticatedFetch } from '@/lib/auth/api'

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8000'

export async function GET(
  request: Request,
  { params }: { params: { report_uuid: string } }
) {
  try {
    const authHeader = request.headers.get('Authorization')
    
    if (!authHeader) {
      return errorResponse('Authorization header missing', 401)
    }

    const response = await authenticatedFetch(
      `${BACKEND_URL}/api/v1/detective/${params.report_uuid}/report/`,
      {
        headers: {
          'Authorization': authHeader,
        }
      }
    )

    if (!response.ok) {
      const errorData = await response.json()
      return errorResponse(errorData.message || 'Failed to fetch report', response.status)
    }

    const data = await response.json()
    return jsonResponse(data)
  } catch (error) {
    console.error('Error fetching report:', error)
    return errorResponse('An error occurred while fetching the report', 500)
  }
}

