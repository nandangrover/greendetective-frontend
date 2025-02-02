"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/use-auth";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { InfoIcon, FileText, Loader2 } from "lucide-react";
type Report = {
  id: string;
  companyName: string;
  status: "pending" | "in-progress" | "failed" | "success";
  createdAt: string;
  reportUrl?: string;
  username: string;
  urls: string[];
  etaMinutes: number;
};

const statusLabels = {
  pending: "Queued",
  "in-progress": "Analyzing",
  failed: "Error",
  success: "Completed",
};

const statusColors = {
  pending: "bg-primary/20 text-primary hover:bg-primary/30",
  "in-progress": "bg-secondary/20 text-secondary hover:bg-secondary/30",
  failed: "bg-destructive/20 text-destructive hover:bg-destructive/30",
  success: "bg-accent/20 text-accent hover:bg-accent/30",
};

// Add a new badge color for username
const usernameBadgeColor = "bg-purple-500/20 text-purple-500 hover:bg-purple-500/30";

// Update the function to calculate from current time instead of creation time
const calculateCompletionTime = (etaMinutes: number) => {
  const now = new Date();
  const completionDate = new Date(now.getTime() + etaMinutes * 60000);
  return completionDate.toLocaleString();
};

export default function Dashboard() {
  const router = useRouter();
  const { isAuthenticated } = useAuth();
  const [reports, setReports] = useState<Report[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchReports = async () => {
    try {
      setIsLoading(true);
      console.log('Fetching reports...')
      const response = await fetch('/api/v1/detective/reports/', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      const data = await response.json()
      
      // Check if data exists and is an array
      if (!data || !Array.isArray(data)) {
        setReports([]);
        return;
      }
      
      const mappedReports = data.map((report: any): Report => ({
        id: report.uuid,
        companyName: report.company_name,
        status: report.processed ? "success" : "pending",
        createdAt: report.created_at,
        reportUrl: report.s3_url,
        username: report.user.username,
        urls: report.urls || [],
        etaMinutes: report.eta_minutes
      }));
      
      setReports(mappedReports);
    } catch (error) {
      console.error('Error fetching reports:', error);
      setReports([]); // Clear reports on error
    } finally {
      setIsLoading(false);
    }
  };

  // Authentication check effect
  useEffect(() => {
    if (!isAuthenticated) {
      console.log("User is not authenticated, redirecting to login page");
      router.push("/login");
    }
  }, [isAuthenticated, router]);

  // Initial fetch and periodic refresh effect
  useEffect(() => {
    if (!isAuthenticated) return;

    // Initial fetch
    fetchReports();

    // Set up periodic refresh every minute
    const intervalId = setInterval(() => {
      fetchReports();
    }, 60000); // 60000 ms = 1 minute

    // Cleanup interval on unmount
    return () => clearInterval(intervalId);
  }, [isAuthenticated]);

  const renderTooltip = (content: string) => (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <InfoIcon className="h-4 w-4 ml-2 text-muted-foreground" />
        </TooltipTrigger>
        <TooltipContent>
          <p>{content}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );

  return (
    <div>
      <Card className="w-full max-w-6xl mx-auto bg-background/30 backdrop-blur-sm border-border">
        <CardHeader className="border-b border-border">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-primary" />
              <CardTitle className="text-foreground">Reports</CardTitle>
              {renderTooltip(
                "A list of your recent greenwashing analysis reports. During beta, you can generate up to 3 reports. Contact us for more information."
              )}
            </div>
            {reports.length > 0 && reports.length < 3 && (
              <Button 
                className="bg-primary hover:bg-primary/90 text-primary-foreground"
                asChild
              >
                <a href="/investigate">New Analysis</a>
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent className="pt-6">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-primary mb-4" />
              <p className="text-muted-foreground">Loading reports...</p>
            </div>
          ) : reports.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12">
              <FileText className="w-12 h-12 text-accent-foreground mb-4" />
              <h3 className="text-xl font-semibold text-accent-foreground mb-2">
                No Reports Found
              </h3>
              <p className="text-accent-foreground text-center mb-2">
                You haven't generated any reports yet. Start by analyzing a company's website for greenwashing.
              </p>
              <p className="text-sm text-muted-foreground text-center mb-6">
                During beta, you can generate up to 3 reports with a maximum of 3000 pages per report. Contact us for more information.
              </p>
              <Button 
                className="bg-primary hover:bg-primary/90 text-primary-foreground"
                asChild
              >
                <a href="/investigate">Generate Your First Report</a>
              </Button>
            </div>
          ) : (
            <>
              <div className="mb-4 p-4 bg-muted/50 rounded-lg">
                <p className="text-sm text-muted-foreground">
                  Beta Limits: {3 - reports.length} report{3 - reports.length === 1 ? '' : 's'} remaining. Each report analyzes up to 3000 pages.
                </p>
              </div>
              <Table>
                <TableHeader>
                  <TableRow className="border-gray-800">
                    <TableHead className="text-gray-400 px-6">Company Name</TableHead>
                    <TableHead className="text-gray-400">User</TableHead>
                    <TableHead className="text-gray-400">Scope</TableHead>
                    <TableHead className="text-gray-400">Status</TableHead>
                    <TableHead className="text-gray-400">Created At</TableHead>
                    <TableHead className="text-gray-400">ETA</TableHead>
                    <TableHead className="text-right text-gray-400 px-6">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {reports.map((report) => (
                    <TableRow 
                      key={report.id} 
                      className="border-gray-800 hover:bg-white/5"
                    >
                      <TableCell className="font-medium text-gray-300 px-6">
                        {report.companyName}
                      </TableCell>
                      <TableCell>
                        <Badge className={usernameBadgeColor}>
                          {report.username}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-gray-400">
                        {!report.urls?.length ? (
                          "Full Website"
                        ) : (
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger>
                                <div className="flex items-center gap-1">
                                  <span className="underline">Limited Scope</span>
                                  <Badge variant="outline" className="text-xs">
                                    {report.urls.length} URL{report.urls.length > 1 ? 's' : ''}
                                  </Badge>
                                </div>
                              </TooltipTrigger>
                              <TooltipContent className="max-w-md max-h-96 overflow-y-auto">
                                <div>
                                  <p className="font-semibold mb-2">Analyzed URLs:</p>
                                  <div className="grid grid-cols-1 gap-1">
                                    {report.urls.map((url, index) => (
                                      <div key={index} className="truncate text-sm">
                                        {url}
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        )}
                      </TableCell>
                      <TableCell>
                        <Badge
                          className={`${statusColors[report.status]} transition-colors duration-200`}
                        >
                          {statusLabels[report.status]}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-gray-400">
                        {new Date(report.createdAt).toLocaleDateString()}
                      </TableCell>
                      <TableCell className="text-gray-400">
                        {report.status === "success" ? (
                          "—"
                        ) : report.etaMinutes ? (
                          calculateCompletionTime(report.etaMinutes)
                        ) : (
                          "Unknown"
                        )}
                      </TableCell>
                      <TableCell className="text-right px-6">
                        {report.reportUrl && (
                          <Button 
                            variant="outline" 
                            size="sm"
                            className="border-gray-700 hover:bg-gray-800 text-gray-300"
                            asChild
                          >
                            <a href={report.reportUrl} target="_blank" rel="noopener noreferrer">
                              View Report
                            </a>
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
