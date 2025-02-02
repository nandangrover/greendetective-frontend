"use client"

import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Rocket, Users, FileText, Settings, QrCode, MapPin, BookOpen, Shield, TrendingUp, Globe, Database, BarChart3 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import Link from "next/link"

export default function Future() {
  return (
    <div className="container max-w-7xl mx-auto px-4 py-12 space-y-12">
      {/* Hero Section */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold tracking-tight text-foreground">
          Platform Evolution Roadmap
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          From greenwashing detection to comprehensive ESG intelligence
        </p>
      </div>

      {/* Roadmap Timeline */}
      <div className="space-y-8">
        {/* Timeline Section */}
        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-4 md:left-1/2 h-full w-0.5 bg-border" />

          {/* Timeline Items */}
          <div className="space-y-16">
            {/* Phase 1 - Foundation */}
            <RoadmapSection
              date="Phase 1 - Greenwashing Detection"
              items={[
                {
                  icon: <Rocket className="h-6 w-6" />,
                  title: "Core AI Analysis Engine",
                  description: "Basic greenwashing detection and claim verification",
                  status: "Live in Beta"
                },
                {
                  icon: <FileText className="h-6 w-6" />,
                  title: "Standard ESG Reports",
                  description: "Basic report generation with risk scoring",
                  status: "Live in Beta"
                },
                {
                  icon: <Database className="h-6 w-6" />,
                  title: "Data Collection Framework",
                  description: "Web scraping and document processing",
                  status: "Live in Beta"
                }
              ]}
            />

            {/* Phase 2 - Expansion */}
            <RoadmapSection
              date="Phase 2 - Comprehensive Analysis"
              items={[
                {
                  icon: <Users className="h-6 w-6" />,
                  title: "Team Collaboration Features",
                  description: "Shared workspaces and team reporting",
                  status: "In Development"
                },
                {
                  icon: <TrendingUp className="h-6 w-6" />,
                  title: "Real-time Monitoring",
                  description: "Continuous tracking of ESG claims",
                  status: "In Development"
                },
                {
                  icon: <Shield className="h-6 w-6" />,
                  title: "Enhanced Verification",
                  description: "Third-party data integration",
                  status: "In Development"
                }
              ]}
            />

            {/* Phase 3 - Maturity */}
            <RoadmapSection
              date="Phase 3 - ESG Intelligence"
              items={[
                {
                  icon: <Globe className="h-6 w-6" />,
                  title: "Global Coverage",
                  description: "Multi-language and regional analysis",
                  status: "Planned"
                },
                {
                  icon: <BookOpen className="h-6 w-6" />,
                  title: "ESG Academy",
                  description: "Training and certification programs",
                  status: "Planned"
                },
                {
                  icon: <Settings className="h-6 w-6" />,
                  title: "API Access",
                  description: "Developer tools and integrations",
                  status: "Planned"
                }
              ]}
            />

            {/* Phase 4 - Leadership */}
            <RoadmapSection
              date="Phase 4 - Industry Standard"
              items={[
                {
                  icon: <QrCode className="h-6 w-6" />,
                  title: "Verification Badges",
                  description: "Public trust indicators for companies",
                  status: "Planned"
                },
                {
                  icon: <MapPin className="h-6 w-6" />,
                  title: "Geospatial Analysis",
                  description: "Location-based ESG impact assessment",
                  status: "Planned"
                },
                {
                  icon: <BarChart3 className="h-6 w-6" />,
                  title: "Advanced Analytics",
                  description: "Industry benchmarking and trend analysis",
                  status: "Planned"
                }
              ]}
            />
          </div>
        </div>

        {/* Evolution Summary Section */}
        <Card className="bg-background/30 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-6 w-6 text-primary" />
              Platform Evolution
            </CardTitle>
            <CardDescription>
              Our journey from detection to comprehensive ESG intelligence
            </CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <EvolutionPhase
              title="Phase 1"
              subtitle="Greenwashing Detection"
              description="Core AI engine for claim verification"
              icon={<Shield className="h-6 w-6" />}
            />
            <EvolutionPhase
              title="Phase 2"
              subtitle="Comprehensive Analysis"
              description="Enhanced verification and monitoring"
              icon={<BarChart3 className="h-6 w-6" />}
            />
            <EvolutionPhase
              title="Phase 3"
              subtitle="ESG Intelligence"
              description="Global coverage and training programs"
              icon={<Globe className="h-6 w-6" />}
            />
            <EvolutionPhase
              title="Phase 4"
              subtitle="Industry Standard"
              description="Advanced analytics and verification badges"
              icon={<TrendingUp className="h-6 w-6" />}
            />
          </CardContent>
        </Card>

        {/* ESG Intelligence Section */}
        <Card className="bg-background/30 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-6 w-6 text-primary" />
              ESG Intelligence Platform
            </CardTitle>
            <CardDescription>
              Comprehensive ESG analysis combining AI and human expertise
            </CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <MonetizationCard
              title="Data Intelligence"
              description="Advanced data collection and processing"
              features={[
                "Real-time web scraping",
                "Regulatory filing analysis",
                "Company disclosures",
                "NGO reports",
                "Industry-specific data"
              ]}
            />
            <MonetizationCard
              title="Expert Analysis"
              description="Human-curated insights and validation"
              features={[
                "Regulatory compliance assessments",
                "Custom scoring models",
                "Stakeholder-specific reporting",
                "Controversy risk analysis",
                "Impact measurement"
              ]}
            />
          </CardContent>
          <CardFooter className="flex justify-center">
            <Button asChild>
              <Link href="/contact">Learn More</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>

      {/* Partnership Section */}
      <Card className="bg-background/30 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="h-6 w-6 text-primary" />
            Partnership Opportunities
          </CardTitle>
          <CardDescription>
            Join us in building a more transparent and sustainable future
          </CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <PartnershipCard
            title="Certification Bodies"
            description="Collaborate on verification standards"
            icon={<Shield className="h-6 w-6" />}
          />
          <PartnershipCard
            title="Sustainability Consultants"
            description="Expand your service offerings"
            icon={<Users className="h-6 w-6" />}
          />
          <PartnershipCard
            title="Eco Product Companies"
            description="Showcase your verified claims"
            icon={<QrCode className="h-6 w-6" />}
          />
          <PartnershipCard
            title="Investment Firms"
            description="Access verified ESG data"
            icon={<TrendingUp className="h-6 w-6" />}
          />
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button asChild>
            <Link href="/contact">Contact Us</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

function RoadmapSection({ date, items }: {
  date: string,
  items: {
    icon: React.ReactNode,
    title: string,
    description: string,
    status: string
  }[]
}) {
  return (
    <div className="relative">
      {/* Date Marker */}
      <div className="absolute left-0 md:left-1/2 -translate-x-1/2 -translate-y-1/2 bg-background px-4 py-2 rounded-full border text-sm font-medium">
        {date}
      </div>

      {/* Items */}
      <div className="pt-8 space-y-4">
        {items.map((item, i) => (
          <div key={i} className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-4">
            {/* Left Spacer */}
            <div className="hidden md:block" />

            {/* Item Card */}
            <Card className="bg-background/30 backdrop-blur-sm hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-start space-x-4">
                <div className="p-2 bg-primary/10 rounded-lg text-primary">
                  {item.icon}
                </div>
                <div>
                  <CardTitle className="text-lg">{item.title}</CardTitle>
                  <CardDescription>{item.description}</CardDescription>
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-sm text-muted-foreground">
                  Status: <span className="font-medium">{item.status}</span>
                </div>
              </CardContent>
            </Card>

            {/* Right Spacer */}
            <div className="hidden md:block" />
          </div>
        ))}
      </div>
    </div>
  )
}

function MonetizationCard({ title, description, features }: {
  title: string,
  description: string,
  features: string[]
}) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="text-sm text-muted-foreground">{description}</p>
      <ul className="space-y-2">
        {features.map((feature, i) => (
          <li key={i} className="flex items-center gap-2 text-sm">
            <div className="h-1.5 w-1.5 rounded-full bg-primary" />
            {feature}
          </li>
        ))}
      </ul>
    </div>
  )
}

function PartnershipCard({ title, description, icon }: {
  title: string,
  description: string,
  icon: React.ReactNode
}) {
  return (
    <div className="flex flex-col items-center text-center space-y-4">
      <div className="p-3 bg-primary/10 rounded-full text-primary">
        {icon}
      </div>
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  )
}

function EvolutionPhase({ title, subtitle, description, icon }: {
  title: string,
  subtitle: string,
  description: string,
  icon: React.ReactNode
}) {
  return (
    <div className="flex flex-col items-center text-center space-y-4">
      <div className="p-3 bg-primary/10 rounded-full text-primary">
        {icon}
      </div>
      <div>
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="text-sm text-muted-foreground">{subtitle}</p>
      </div>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  )
} 