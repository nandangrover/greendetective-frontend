import { NextResponse } from 'next/server'
import { errorResponse, jsonResponse } from '../../../utils'

const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:8000'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email, company_name } = body

    // Basic validation
    if (!name || !email || !company_name) {
      return errorResponse('Name, email, and company name are required', 400)
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return errorResponse('Please provide a valid email address', 400)
    }

    // Send request to backend
    const response = await fetch(`${BACKEND_URL}/api/v1/detective/request-invite/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        email,
        company_name,
      }),
    })

    if (!response.ok) {
      const errorData = await response.json()
      return errorResponse(errorData.message || 'Failed to submit invite request', response.status)
    }

    const data = await response.json()
    return jsonResponse({
      status: 'success',
      data: {
        message: 'Invite request submitted successfully',
      },
    })
  } catch (error) {
    console.error('Error submitting invite request:', error)
    return errorResponse('An error occurred while submitting the invite request', 500)
  }
} 