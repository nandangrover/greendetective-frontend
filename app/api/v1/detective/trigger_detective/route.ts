import { jsonResponse, errorResponse } from '../../../utils'
import { serverAuthenticatedFetch } from '@/lib/server/auth'

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8000'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { company_name, company_domain, company_about, urls_to_process } = body

    if (!company_name || !company_domain) {
      return errorResponse('Company name and domain name are required', 400)
    }

    if (!company_about) {
      return errorResponse('About page link is required', 400)
    }

    const response = await serverAuthenticatedFetch(
      `${BACKEND_URL}/api/v1/detective/trigger_detective/`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          company_name,
          company_domain,
          company_about,
          urls_to_process,
        }),
      }
    )

    if (!response.ok) {
      const errorData = await response.json()
      return errorResponse(errorData.message || 'Failed to trigger analysis', response.status)
    }

    const data = await response.json()
    return jsonResponse(data)
  } catch (error) {
    console.error('Error triggering analysis:', error)
    return errorResponse('An error occurred while triggering the analysis', 500)
  }
}

