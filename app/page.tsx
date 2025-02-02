"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Database,
  ChartBar,
  FileSearch,
  Search,
} from "lucide-react";
import { useAuth } from "@/hooks/use-auth";

export default function Home() {
  const { isAuthenticated } = useAuth();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "GreenDetective",
    "url": process.env.NEXT_PUBLIC_SITE_URL,
    "description": "AI-powered platform for detecting greenwashing and verifying environmental claims",
    "potentialAction": {
      "@type": "SearchAction",
      "target": `${process.env.NEXT_PUBLIC_SITE_URL}/search?q={search_term_string}`,
      "query-input": "required name=search_term_string"
    }
  }

  return (
    <main className="flex flex-col min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center min-h-[70vh] text-center px-4">
        <h1 className="!leading-relaxed text-4xl md:text-6xl font-bold mb-7 bg-gradient-to-r from-white to-primary bg-clip-text text-transparent flex flex-wrap items-center justify-center gap-2 md:gap-4">
          AI-Powered Greenwashing
          <span className="flex items-center gap-2">
            Detection
            <Search className="h-8 w-8 md:h-12 md:w-12 text-primary transition-all duration-300 hover:scale-110" />
          </span>
        </h1>
        <p className="text-lg md:text-2xl mb-8 max-w-2xl text-accent-foreground px-4">
          Protect your organization with data-driven environmental claim verification
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          {isAuthenticated ? (
            <Button size="lg" asChild className="group">
              <Link href="/reports">
                Start Analysis
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          ) : (
            <>
              <Button size="lg" asChild className="group">
                <Link href="/request-invite">
                  Request Invite
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/about">
                  Learn More
                </Link>
              </Button>
            </>
          )}
        </div>
        {!isAuthenticated && (
          <div className="mt-4 text-sm text-muted-foreground">
            Currently in private beta. Access is invite-only.
          </div>
        )}
      </section>

      {/* How It Works Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="!leading-relaxed text-3xl md:text-4xl mb-7 bg-gradient-to-r from-white to-primary bg-clip-text text-transparent flex items-center justify-center gap-4">
            Streamlined Greenwashing Detection
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            {/* Step 1 */}
            <div className="relative group">
              <div className="bg-card p-6 md:p-8 rounded-2xl border border-border shadow-lg hover:shadow-primary/5 transition-all duration-300 h-full">
                <div className="absolute -top-6 left-8 bg-primary/20 rounded-xl p-3 group-hover:bg-primary/30 transition-colors duration-300">
                  <Database className="h-8 w-8 text-primary" strokeWidth={1.5} />
                </div>
                <div className="mt-4">
                  <div className="flex items-center gap-4 mb-4">
                    <span className="text-3xl md:text-4xl font-bold text-accent-foreground">1</span>
                    <h3 className="text-lg md:text-xl font-bold text-accent-foreground">Input Company Data</h3>
                  </div>
                  <p className="text-sm md:text-base text-accent-foreground/80">
                    Simply provide a company name or URL. Our system automatically gathers and processes relevant data from multiple sources.
                  </p>
                </div>
              </div>
              <div className="hidden md:block absolute -right-8 top-1/2 -translate-y-1/2 z-10">
                <ArrowRight className="w-6 h-6 text-accent-foreground/30" />
              </div>
            </div>

            {/* Step 2 */}
            <div className="relative group">
              <div className="bg-card p-6 md:p-8 rounded-2xl border border-border shadow-lg hover:shadow-primary/5 transition-all duration-300 h-full">
                <div className="absolute -top-6 left-8 bg-primary/20 rounded-xl p-3 group-hover:bg-primary/30 transition-colors duration-300">
                  <ChartBar className="h-8 w-8 text-primary" strokeWidth={1.5} />
                </div>
                <div className="mt-4">
                  <div className="flex items-center gap-4 mb-4">
                    <span className="text-3xl md:text-4xl font-bold text-accent-foreground">2</span>
                    <h3 className="text-lg md:text-xl font-bold text-accent-foreground">AI-Powered Analysis</h3>
                  </div>
                  <p className="text-sm md:text-base text-accent-foreground/80">
                    Our advanced algorithms perform comprehensive analysis using vector similarity and natural language processing.
                  </p>
                </div>
              </div>
              <div className="hidden md:block absolute -right-8 top-1/2 -translate-y-1/2 z-10">
                <ArrowRight className="w-6 h-6 text-accent-foreground/30" />
              </div>
            </div>

            {/* Step 3 */}
            <div className="relative group">
              <div className="bg-card p-6 md:p-8 rounded-2xl border border-border shadow-lg hover:shadow-primary/5 transition-all duration-300 h-full">
                <div className="absolute -top-6 left-8 bg-primary/20 rounded-xl p-3 group-hover:bg-primary/30 transition-colors duration-300">
                  <FileSearch className="h-8 w-8 text-primary" strokeWidth={1.5} />
                </div>
                <div className="mt-4">
                  <div className="flex items-center gap-4 mb-4">
                    <span className="text-3xl md:text-4xl font-bold text-accent-foreground">3</span>
                    <h3 className="text-lg md:text-xl font-bold text-accent-foreground">Comprehensive Report</h3>
                  </div>
                  <p className="text-sm md:text-base text-accent-foreground/80">
                    Receive detailed insights with risk scores, evidence-based assessments, and actionable recommendations.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
