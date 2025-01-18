import { jsonResponse, errorResponse, mockReports } from '../../../../utils'

export async function GET(
  request: Request,
  { params }: { params: { report_uuid: string } }
) {
  const report = mockReports.find(r => r.uuid === params.report_uuid)

  if (report) {
    return jsonResponse({
      status: 'success',
      data: report
    })
  } else {
    return errorResponse('Report not found', 404)
  }
}

