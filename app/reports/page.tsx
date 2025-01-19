"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/use-auth";
import {
  Table,
  TableBody,
  TableCaption,
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
import { InfoIcon } from "lucide-react";

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
  pending: "bg-yellow-100 text-yellow-800",
  "in-progress": "bg-blue-100 text-blue-800",
  failed: "bg-red-100 text-red-800",
  success: "bg-green-100 text-green-800",
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
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader></CardHeader>
      <CardContent>
        <div className="mb-6 flex justify-between">
          <CardTitle className="block flex items-center">
            Reports
            {renderTooltip(
              "A list of your recent greenwashing analysis reports"
            )}
          </CardTitle>
          <Button asChild>
            <a href="/investigate">New Analysis</a>
          </Button>
        </div>
        <Table>
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
                <TableCell className="font-medium">
                  {report.companyName}
                </TableCell>
                <TableCell>
                  <Badge
                    className={`${statusColors[report.status]} font-semibold`}
                  >
                    {statusLabels[report.status]}
                  </Badge>
                </TableCell>
                <TableCell>
                  {new Date(report.createdAt).toLocaleDateString()}
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="outline" size="sm">
                    View Report
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
