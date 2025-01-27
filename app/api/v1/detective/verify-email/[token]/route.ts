import { NextResponse } from 'next/server'
import { errorResponse, jsonResponse } from '../../../../utils'

const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:8000'

export async function GET(
  request: Request,
  { params }: { params: { token: string } }
) {
  try {
    const { token } = params

    // Call the backend verification endpoint
    const response = await fetch(`${BACKEND_URL}/api/v1/detective/verify-email/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        token: token,
      }),
    })

    if (!response.ok) {
      const errorData = await response.json()
      return errorResponse(errorData.message || 'Verification failed', response.status)
    }

    const data = await response.json()
    return NextResponse.redirect(new URL('/login?verified=true', request.url))
  } catch (error) {
    console.error('Verification error:', error)
    return errorResponse('An error occurred during verification', 500)
  }
}