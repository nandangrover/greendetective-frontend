import { jsonResponse, errorResponse, mockReports } from '../../../utils'

export async function POST(request: Request) {
  const body = await request.json()
  const { companyName, domainName, aboutPageLink, companyInfo, urlsToProcess } = body

  if (!companyName || !domainName) {
    return errorResponse('Company name and domain name are required', 400)
  }

  if (!aboutPageLink && !companyInfo) {
    return errorResponse('Either About Page Link or Company Information is required', 400)
  }

  const newReport = {
    uuid: Math.random().toString(36).substr(2, 9),
    companyName,
    status: 'pending' as const,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }

  mockReports.push(newReport)

  return jsonResponse({
    status: 'success',
    data: {
      report_uuid: newReport.uuid
    },
    message: 'Analysis triggered successfully'
  })
}

