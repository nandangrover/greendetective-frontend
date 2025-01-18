"use client"

import React, { createContext, useContext, useState, useEffect } from 'react'

type Report = {
  id: string
  companyName: string
  status: 'pending' | 'in progress' | 'failed' | 'success'
  createdAt: string
}

type ReportContextType = {
  reports: Report[]
  addReport: (report: Omit<Report, 'id' | 'createdAt'>) => void
  updateReport: (id: string, updates: Partial<Report>) => void
}

const ReportContext = createContext<ReportContextType | undefined>(undefined)

export function ReportProvider({ children }: { children: React.ReactNode }) {
  const [reports, setReports] = useState<Report[]>([])

  useEffect(() => {
    // Load reports from localStorage or API on initial render
    const savedReports = localStorage.getItem('reports')
    if (savedReports) {
      setReports(JSON.parse(savedReports))
    }
  }, [])

  useEffect(() => {
    // Save reports to localStorage whenever they change
    localStorage.setItem('reports', JSON.stringify(reports))
  }, [reports])

  const addReport = (report: Omit<Report, 'id' | 'createdAt'>) => {
    const newReport = {
      ...report,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    }
    setReports(prevReports => [...prevReports, newReport])
  }

  const updateReport = (id: string, updates: Partial<Report>) => {
    setReports(prevReports =>
      prevReports.map(report =>
        report.id === id ? { ...report, ...updates } : report
      )
    )
  }

  return (
    <ReportContext.Provider value={{ reports, addReport, updateReport }}>
      {children}
    </ReportContext.Provider>
  )
}

export function useReports() {
  const context = useContext(ReportContext)
  if (context === undefined) {
    throw new Error('useReports must be used within a ReportProvider')
  }
  return context
}

