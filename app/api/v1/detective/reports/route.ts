import { jsonResponse, mockReports } from '../../../utils'

export async function GET() {
  return jsonResponse({
    status: 'success',
    data: mockReports
  })
}

