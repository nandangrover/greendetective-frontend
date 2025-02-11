import { NextResponse } from 'next/server'
import { errorResponse, jsonResponse } from '../../../../utils'

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8000'
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

export async function GET(
  request: Request,
  { params }: { params: { token: string } }
) {
  try {
    const { token } = params

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
      return NextResponse.redirect(new URL(`${SITE_URL}/login?verified=false`))
    }

    const data = await response.json()
    return NextResponse.redirect(new URL(`${SITE_URL}/login?verified=true`))
  } catch (error) {
    console.error('Verification error:', error)
    return errorResponse('An error occurred during verification', 500)
  }
}