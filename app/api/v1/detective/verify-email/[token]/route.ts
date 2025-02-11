import { NextResponse } from 'next/server'
import { errorResponse, jsonResponse } from '../../../../utils'

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8000'

export async function GET(
  request: Request,
  { params }: { params: { token: string } }
) {
  try {
    const { token } = params

    console.log('Token:', token)

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
      return NextResponse.redirect(new URL('/login?verified=false', request.url))
    }

    const data = await response.json()
    return NextResponse.redirect(new URL('/login?verified=true', request.url))
  } catch (error) {
    console.error('Verification error:', error)
    return errorResponse('An error occurred during verification', 500)
  }
}