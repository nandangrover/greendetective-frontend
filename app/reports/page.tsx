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
import { InfoIcon, FileText } from "lucide-react";

type Report = {
  id: string;
  companyName: string;
  status: "pending" | "in-progress" | "failed" | "success";
  createdAt: string;
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

export default function Dashboard() {
  const router = useRouter();
  const { isAuthenticated } = useAuth();
  const [reports, setReports] = useState<Report[]>([]);

  useEffect(() => {
    if (isAuthenticated) {
      console.log("User is not authenticated, redirecting to login page");
      router.push("/login");
      return;
    }
    // Fetch reports from API
    // This is a mock implementation
    const mockReports: Report[] = [
      {
        id: "1",
        companyName: "EcoFriendly Co.",
        status: "success",
        createdAt: "2025-01-15",
      },
      {
        id: "2",
        companyName: "GreenTech Inc.",
        status: "in-progress",
        createdAt: "2025-01-16",
      },
      {
        id: "3",
        companyName: "Sustainable Solutions",
        status: "pending",
        createdAt: "2025-01-17",
      },
      {
        id: "4",
        companyName: "CleanEnergy Corp",
        status: "failed",
        createdAt: "2025-01-18",
      },
    ];
    setReports(mockReports);
  }, []);

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
      <Card className="w-full max-w-4xl mx-auto bg-background/30 backdrop-blur-sm border-border">
        <CardHeader className="border-b border-border">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-primary" />
              <CardTitle className="text-foreground">Reports</CardTitle>
              {renderTooltip(
                "A list of your recent greenwashing analysis reports"
              )}
            </div>
            <Button 
              className="bg-primary hover:bg-primary/90 text-primary-foreground"
              asChild
            >
              <a href="/investigate">New Analysis</a>
            </Button>
          </div>
        </CardHeader>
        <CardContent className="pt-6">
          <Table>
            <TableHeader>
              <TableRow className="border-gray-800">
                <TableHead className="text-gray-400">Company Name</TableHead>
                <TableHead className="text-gray-400">Status</TableHead>
                <TableHead className="text-gray-400">Created At</TableHead>
                <TableHead className="text-right text-gray-400">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {reports.map((report) => (
                <TableRow 
                  key={report.id} 
                  className="border-gray-800 hover:bg-white/5"
                >
                  <TableCell className="font-medium text-gray-300">
                    {report.companyName}
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
                  <TableCell className="text-right">
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="border-gray-700 hover:bg-gray-800 text-gray-300"
                    >
                      View Report
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
