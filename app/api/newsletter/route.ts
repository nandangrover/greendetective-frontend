import { jsonResponse, errorResponse } from '@/app/api/utils'

const MAILERLITE_API_KEY = process.env.MAILERLITE_API_KEY
const MAILERLITE_GROUP_ID = '145531029365457991'

export async function POST(request: Request) {
  try {
    const { email } = await request.json()

    // Basic validation
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return errorResponse('Please provide a valid email address', 400)
    }

    const response = await fetch(`https://api.mailerlite.com/api/v2/groups/${MAILERLITE_GROUP_ID}/subscribers`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-MailerLite-ApiKey': MAILERLITE_API_KEY || ''
      },
      body: JSON.stringify({
        email: email,
        resubscribe: true
      })
    })

    if (!response.ok) {
      const errorData = await response.json()
      return errorResponse(errorData.error?.message || 'Failed to subscribe', response.status)
    }

    return jsonResponse({
      status: 'success',
      data: {
        message: 'You have been successfully subscribed!'
      }
    })
  } catch (error) {
    console.error('Newsletter subscription error:', error)
    return errorResponse('An error occurred while processing your subscription', 500)
  }
} 