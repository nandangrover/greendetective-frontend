"use client"

import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Rocket, Users, FileText, Settings, QrCode, MapPin, BookOpen, Shield, TrendingUp, Globe, Database, BarChart3 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import Link from "next/link"
import { motion } from "framer-motion"

// Add these animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
}

export default function Future() {
  return (
    <div className="container max-w-7xl mx-auto px-3 md:px-4 py-8 md:py-12 space-y-8 md:space-y-12">
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
          {/* Timeline Line - adjusted for mobile */}
          <div className="absolute left-4 md:left-1/2 h-full w-0.5 bg-border transform md:-translate-x-1/2" />

          {/* Timeline Items */}
          <div className="space-y-16">
            {/* Phase 1 - Foundation */}
            <RoadmapSection
              date="Phase 1 - Greenwashing Detection"
              timeframe="Q1 2024"
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
              timeframe="Q2-Q3 2024"
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
              timeframe="Q4 2024"
              items={[
                {
                  icon: <Database className="h-6 w-6" />,
                  title: "Advanced Data Collection",
                  description: "Real-time web scraping and document processing",
                  status: "Planned"
                },
                {
                  icon: <FileText className="h-6 w-6" />,
                  title: "Regulatory Analysis",
                  description: "Comprehensive regulatory filing analysis",
                  status: "Planned"
                },
                {
                  icon: <Shield className="h-6 w-6" />,
                  title: "Compliance Assessments",
                  description: "Regulatory compliance and risk analysis",
                  status: "Planned"
                }
              ]}
            />

            {/* Phase 4 - Leadership */}
            <RoadmapSection
              date="Phase 4 - Industry Standard"
              timeframe="Q1-Q2 2025"
              items={[
                {
                  icon: <TrendingUp className="h-6 w-6" />,
                  title: "Custom Scoring Models",
                  description: "Tailored ESG scoring for stakeholders",
                  status: "Planned"
                },
                {
                  icon: <BarChart3 className="h-6 w-6" />,
                  title: "Impact Measurement",
                  description: "Comprehensive ESG impact analysis",
                  status: "Planned"
                },
                {
                  icon: <Users className="h-6 w-6" />,
                  title: "Stakeholder Reporting",
                  description: "Customized reports for different stakeholders",
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
              subtitle="Data Intelligence"
              description="Advanced data collection and analysis"
              icon={<Database className="h-6 w-6" />}
            />
            <EvolutionPhase
              title="Phase 4"
              subtitle="Industry Leadership"
              description="Custom scoring and impact measurement"
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

function RoadmapSection({ date, timeframe, items }: {
  date: string,
  timeframe: string,
  items: {
    icon: React.ReactNode,
    title: string,
    description: string,
    status: string
  }[]
}) {
  return (
    <div className="relative">
      {/* Date Marker - Adjusted positioning and sizing for mobile */}
      <div 
        className="absolute left-0 md:left-1/2 top-0 -translate-y-1/2 md:-translate-x-1/2 ml-12 md:ml-0 z-10"
      >
        <motion.div 
          className="bg-background px-3 md:px-4 py-1.5 md:py-2 rounded-full border text-sm font-medium flex flex-col items-center space-y-0.5 md:space-y-1 cursor-default"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="font-semibold text-sm md:text-base">{date}</span>
          <span className="text-[10px] md:text-xs text-muted-foreground tracking-wide">{timeframe}</span>
        </motion.div>
      </div>

      {/* Items Container - Adjusted spacing */}
      <motion.div 
        className="pt-12 md:pt-16 space-y-4 relative"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={containerVariants}
      >
        {items.map((item, i) => (
          <motion.div 
            key={i} 
            className="grid grid-cols-[auto_1fr] md:grid-cols-[1fr_auto_1fr] gap-3 md:gap-4 relative"
            variants={itemVariants}
          >
            {/* Timeline dot - Adjusted positioning */}
            <div className="absolute left-[13px] top-1/2 w-2.5 h-2.5 bg-primary rounded-full md:hidden" />
            
            {/* Left column */}
            <div className="hidden md:block" />

            {/* Item Card - Improved mobile layout */}
            <Card className="bg-background/30 backdrop-blur-sm hover:shadow-lg transition-shadow ml-6 md:ml-0">
              <CardHeader className="flex flex-row items-start space-x-3 md:space-x-4 p-4 md:p-6">
                <div className="p-1.5 md:p-2 bg-primary/10 rounded-lg text-primary shrink-0">
                  {item.icon}
                </div>
                <div>
                  <CardTitle className="text-base md:text-lg">{item.title}</CardTitle>
                  <CardDescription className="text-sm">{item.description}</CardDescription>
                </div>
              </CardHeader>
              <CardContent className="p-4 md:p-6 pt-0 md:pt-0">
                <div className="text-xs md:text-sm text-muted-foreground">
                  Status: <span className="font-medium">{item.status}</span>
                </div>
              </CardContent>
            </Card>

            {/* Right column */}
            <div className="hidden md:block" />
          </motion.div>
        ))}
      </motion.div>
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
    <motion.div 
      className="flex flex-col items-center text-center space-y-4"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5 }}
    >
      <div className="p-3 bg-primary/10 rounded-full text-primary">
        {icon}
      </div>
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="text-sm text-muted-foreground">{description}</p>
    </motion.div>
  )
}

function EvolutionPhase({ title, subtitle, description, icon }: {
  title: string,
  subtitle: string,
  description: string,
  icon: React.ReactNode
}) {
  return (
    <motion.div 
      className="flex flex-col items-center text-center space-y-4"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5 }}
    >
      <div className="p-3 bg-primary/10 rounded-full text-primary">
        {icon}
      </div>
      <div>
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="text-sm text-muted-foreground">{subtitle}</p>
      </div>
      <p className="text-sm text-muted-foreground">{description}</p>
    </motion.div>
  )
} 