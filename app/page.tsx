import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Database, ChartBar, FileSearch, Search } from "lucide-react";

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center min-h-[70vh] text-center px-4">
        <h1 className="!leading-relaxed md:text-6xl font-bold mb-7 bg-gradient-to-r from-white to-primary bg-clip-text text-transparent flex items-center justify-center gap-4">
          Greenwashing Detective
          <Search className="h-12 w-12 text-primary transition-all duration-300 hover:scale-110" />
        </h1>
        <p className="text-xl md:text-2xl mb-8 max-w-2xl text-muted-foreground">
          AI-powered tool that investigates misleading environmental claims in
          corporate communications
        </p>
        <div className="space-x-4">
          <Button size="lg" asChild className="group">
            <Link href="/dashboard">
              Analyze Company
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex flex-col items-center text-center p-6 rounded-lg bg-card">
            <Database className="h-12 w-12 text-primary mb-4" />
            <h3 className="text-xl font-bold mb-2">
              Comprehensive Data Analysis
            </h3>
            <p className="text-muted-foreground">
              Scrapes and analyzes corporate domain, sustainability
              reports, and public statements
            </p>
          </div>
          <div className="flex flex-col items-center text-center p-6 rounded-lg bg-card">
            <ChartBar className="h-12 w-12 text-primary mb-4" />
            <h3 className="text-xl font-bold mb-2">Greenwashing Score</h3>
            <p className="text-muted-foreground">
              Get detailed scores and rankings based on vector similarity
              analysis
            </p>
          </div>
          <div className="flex flex-col items-center text-center p-6 rounded-lg bg-card">
            <FileSearch className="h-12 w-12 text-primary mb-4" />
            <h3 className="text-xl font-bold mb-2">Detailed Reports</h3>
            <p className="text-muted-foreground">
              Receive comprehensive reports highlighting potential greenwashing
              practices and evidence
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
