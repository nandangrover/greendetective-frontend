import { jsonResponse, errorResponse } from '../../../utils'

export async function POST(request: Request) {
  const body = await request.json()
  const { refresh_token } = body

  if (refresh_token === 'mock_refresh_token') {
    return jsonResponse({
      status: 'success',
      data: {
        access_token: 'new_mock_access_token'
      }
    })
  } else {
    return errorResponse('Invalid refresh token', 401)
  }
}

