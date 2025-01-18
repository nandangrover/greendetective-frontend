"use client"

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

type Report = {
  id: string
  companyName: string
  status: 'pending' | 'in-progress' | 'failed' | 'success'
  createdAt: string
}

const statusLabels = {
  'pending': 'Queued',
  'in-progress': 'Analyzing',
  'failed': 'Error',
  'success': 'Completed'
}

const statusColors = {
  'pending': 'bg-yellow-100 text-yellow-800',
  'in-progress': 'bg-blue-100 text-blue-800',
  'failed': 'bg-red-100 text-red-800',
  'success': 'bg-green-100 text-green-800'
}

export default function Dashboard() {
  const [reports, setReports] = useState<Report[]>([])

  useEffect(() => {
    // Fetch reports from API
    // This is a mock implementation
    const mockReports: Report[] = [
      { id: '1', companyName: 'EcoFriendly Co.', status: 'success', createdAt: '2025-01-15' },
      { id: '2', companyName: 'GreenTech Inc.', status: 'in-progress', createdAt: '2025-01-16' },
      { id: '3', companyName: 'Sustainable Solutions', status: 'pending', createdAt: '2025-01-17' },
      { id: '4', companyName: 'CleanEnergy Corp', status: 'failed', createdAt: '2025-01-18' },
    ]
    setReports(mockReports)
  }, [])

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-primary">Your Greenwashing Reports</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-6">
          <Button asChild>
            <a href="/submit">New Analysis</a>
          </Button>
        </div>
        <Table>
          <TableCaption>A list of your recent greenwashing analysis reports</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Company Name</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Created At</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {reports.map((report) => (
              <TableRow key={report.id}>
                <TableCell className="font-medium">{report.companyName}</TableCell>
                <TableCell>
                  <Badge className={`${statusColors[report.status]} font-semibold`}>
                    {statusLabels[report.status]}
                  </Badge>
                </TableCell>
                <TableCell>{new Date(report.createdAt).toLocaleDateString()}</TableCell>
                <TableCell className="text-right">
                  <Button variant="outline" size="sm">View Report</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

