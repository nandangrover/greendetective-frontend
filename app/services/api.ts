const API_BASE_URL = '/api/v1'

export async function login(email: string, password: string) {
  const response = await fetch(`${API_BASE_URL}/detective/login/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  })
  return response.json()
}

export async function refreshToken(refreshToken: string) {
  const response = await fetch(`${API_BASE_URL}/token/refresh/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ refresh_token: refreshToken }),
  })
  return response.json()
}

export async function triggerDetective(data: {
  companyName: string
  domainName: string
  aboutPageLink: string
  companyInfo: string
  urlsToProcess: string[]
}) {
  const response = await fetch(`${API_BASE_URL}/detective/trigger_detective/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
  return response.json()
}

export async function getReport(reportUuid: string) {
  const response = await fetch(`${API_BASE_URL}/detective/${reportUuid}/report/`)
  return response.json()
}

export async function getAllReports() {
  const response = await fetch(`${API_BASE_URL}/detective/reports/`)
  return response.json()
}

