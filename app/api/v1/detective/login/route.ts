import { jsonResponse, errorResponse } from '../../../utils'

const validInviteCodes = new Set(['ZNRR9O2V', 'ABC123DE', 'XYZ987WV']) // Add your valid invite codes here

export async function POST(request: Request) {
  const body = await request.json()
  const { email, password, invite_code } = body

  if (!validInviteCodes.has(invite_code)) {
    return errorResponse('Invalid invite code', 401)
  }

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

