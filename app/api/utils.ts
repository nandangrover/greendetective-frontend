import { NextResponse } from 'next/server'

export type ApiResponse<T> = {
  status: 'success' | 'error'
  data?: T
  message?: string
}

export function jsonResponse<T>(data: ApiResponse<T>, status: number = 200) {
  return NextResponse.json(data, { status })
}

export function errorResponse(message: string, status: number = 400) {
  return jsonResponse({ status: 'error', message }, status)
}

export type Report = {
  uuid: string
  companyName: string
  status: 'pending' | 'in-progress' | 'completed' | 'failed'
  createdAt: string
  updatedAt: string
}

// Mock database
export const mockReports: Report[] = [
  {
    uuid: '1234-5678-90ab-cdef',
    companyName: 'EcoTech Solutions',
    status: 'completed',
    createdAt: '2025-01-15T10:00:00Z',
    updatedAt: '2025-01-15T11:00:00Z'
  },
  {
    uuid: '2345-6789-abcd-ef01',
    companyName: 'Green Energy Corp',
    status: 'in-progress',
    createdAt: '2025-01-16T09:00:00Z',
    updatedAt: '2025-01-16T09:30:00Z'
  },
  {
    uuid: '3456-7890-bcde-f012',
    companyName: 'Sustainable Living Inc',
    status: 'pending',
    createdAt: '2025-01-17T14:00:00Z',
    updatedAt: '2025-01-17T14:00:00Z'
  }
]

