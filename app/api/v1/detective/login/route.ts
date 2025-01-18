import { jsonResponse, errorResponse } from '../../../utils'

export async function POST(request: Request) {
  const body = await request.json()
  const { email, password } = body

  if (email === 'user@example.com' && password === 'password') {
    return jsonResponse({
      status: 'success',
      data: {
        access_token: 'mock_access_token',
        refresh_token: 'mock_refresh_token'
      }
    })
  } else {
    return errorResponse('Invalid credentials', 401)
  }
}

