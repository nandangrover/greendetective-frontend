import Image from 'next/image'
import {
  Building2,
  TrendingUp,
  Sprout,
  HandshakeIcon,
  Globe2,
  Scale,
  FileSearch,
  Clock,
  CheckCircle2,
  AlertTriangle,
  Gauge,
  BarChart3,
} from "lucide-react";

export default function About() {
  return (
    <div>
      <div className="max-w-7xl mx-auto px-4 py-20 space-y-32">
        {/* Vision & Mission */}
        <section className="grid md:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-5xl font-bold leading-tight text-accent-foreground">
                Protecting Environmental Integrity
              </h1>
              <p className="text-xl text-accent-foreground leading-relaxed">
                Empowering businesses and consumers to make informed decisions by detecting and preventing greenwashing practices.
              </p>
            </div>

            <div className="space-y-6 text-accent-foreground">
              <p>
                Our platform revolutionizes environmental claim verification by combining advanced natural language processing, machine learning, and comprehensive data analysis. With a single click, users can initiate a thorough examination of a company's environmental claims, receiving detailed insights within minutes.
              </p>

            </div>
          </div>

          <div className="relative h-[500px] rounded-2xl overflow-hidden">
            <div className="absolute inset-0 z-10" />
            <Image
              src="/images/about_page.png"
              alt="Environmental Technology Visualization"
              fill
              className="object-cover object-center opacity-50"
              priority
              quality={75}
              sizes="(max-width: 768px) 100vw, 50vw"
              placeholder="blur"
              blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDABQODxIPDRQSEBIXFRQdHx4eHRoaHSQrJyEwPENDPzE2O0FBNjpLPS1yWEk6T3ZpYW1xcnNEVX6Fg4OWboaHcnL/2wBDARUXFx4aHR4eHXJsSkxycoaGhoaGhoaGhoaGhoaGhoaGhoaGhoaGhoaGhoaGhoaGhoaGhoaGhoaGhoaGhoaGhob/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
            />
          </div>
        </section>

        {/* Scoring System Section */}
        <section className="space-y-12">
          <div className="max-w-3xl">
            <h2 className="text-3xl font-bold text-accent-foreground mb-4">
              Transparent Scoring Methodology
            </h2>
            <p className="text-accent-foreground">
              Our comprehensive scoring system evaluates environmental claims through four key dimensions, 
              providing a detailed and objective assessment of potential greenwashing risks.
            </p>
          </div>

          {/* Scoring Components Wheel */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="space-y-6">
              <div className="bg-card p-6 rounded-xl border border-border hover:shadow-lg transition-all">
                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 p-2 rounded-lg">
                    <Scale className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-accent-foreground mb-2">
                      Evidence Strength (35%)
                    </h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-green-500"></div>
                        <span>Strong (3pts): Third-party verified claims, specific metrics</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-yellow-500"></div>
                        <span>Moderate (2pts): Internal data with partial verification</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-orange-500"></div>
                        <span>Weak (1pt): Vague claims without substantial backing</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-red-500"></div>
                        <span>None (0pts): No supporting evidence</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-card p-6 rounded-xl border border-border hover:shadow-lg transition-all">
                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 p-2 rounded-lg">
                    <BarChart3 className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-accent-foreground mb-2">
                      Claim Impact (25%)
                    </h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-green-500"></div>
                        <span>High (3pts): Company-wide initiatives with global impact</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-yellow-500"></div>
                        <span>Medium (2pts): Significant but limited scope initiatives</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-orange-500"></div>
                        <span>Low (1pt): Small-scale or localized initiatives</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-red-500"></div>
                        <span>Minimal (0pts): Superficial impact</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-card p-6 rounded-xl border border-border hover:shadow-lg transition-all">
                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 p-2 rounded-lg">
                    <Clock className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-accent-foreground mb-2">
                      Time Relevance (20%)
                    </h3>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <div className="h-2 w-2 rounded-full bg-green-500"></div>
                          <span>Current: 1.0</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="h-2 w-2 rounded-full bg-yellow-500"></div>
                          <span>Last year: 0.8</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="h-2 w-2 rounded-full bg-orange-500"></div>
                          <span>2 years: 0.6</span>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <div className="h-2 w-2 rounded-full bg-orange-500"></div>
                          <span>3 years: 0.4</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="h-2 w-2 rounded-full bg-red-500"></div>
                          <span>4-5 years: 0.2</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="h-2 w-2 rounded-full bg-red-500"></div>
                          <span>5+ years: 0.0</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-card p-6 rounded-xl border border-border hover:shadow-lg transition-all">
                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 p-2 rounded-lg">
                    <CheckCircle2 className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-accent-foreground mb-2">
                      Consistency (20%)
                    </h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-green-500"></div>
                        <span>1.0: Multiple supporting claims, no contradictions</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-yellow-500"></div>
                        <span>0.7-0.9: Generally consistent claims</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-orange-500"></div>
                        <span>0.5: Neutral - no clear support or contradiction</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-red-500"></div>
                        <span>0.0-0.4: Contradictions present</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Risk Levels */}
            <div className="lg:sticky lg:top-8 space-y-6">
              <div className="bg-card p-8 rounded-xl border border-border">
                <h3 className="text-xl font-bold text-accent-foreground mb-6 flex items-center gap-2">
                  <Gauge className="h-6 w-6 text-primary" />
                  Risk Level Assessment
                </h3>
                <div className="space-y-6">
                  <div className="space-y-4">
                    <div className="bg-red-500/10 p-4 rounded-lg border border-red-500/20">
                      <h4 className="font-semibold text-red-500 mb-2">High Risk (7-10)</h4>
                      <p className="text-sm text-accent-foreground">Claims with weak evidence and high potential for greenwashing</p>
                    </div>
                    <div className="bg-yellow-500/10 p-4 rounded-lg border border-yellow-500/20">
                      <h4 className="font-semibold text-yellow-500 mb-2">Medium Risk (4-6.9)</h4>
                      <p className="text-sm text-accent-foreground">Claims with some evidence but room for improvement</p>
                    </div>
                    <div className="bg-green-500/10 p-4 rounded-lg border border-green-500/20">
                      <h4 className="font-semibold text-green-500 mb-2">Low Risk (0-3.9)</h4>
                      <p className="text-sm text-accent-foreground">Well-supported claims with minimal greenwashing risk</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-card p-8 rounded-xl border border-border">
                <div className="flex items-center gap-2 mb-4">
                  <AlertTriangle className="h-5 w-5 text-primary" />
                  <h4 className="font-semibold text-accent-foreground">Important Note</h4>
                </div>
                <p className="text-sm text-accent-foreground">
                  Our scoring system is designed to be transparent and objective. Each component is carefully weighted to provide a comprehensive assessment of environmental claims, helping organizations identify and address potential greenwashing risks.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Industry Solutions */}
        <section className="space-y-12">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-bold text-accent-foreground mb-4">
            Industry Solutions
            </h2>
            <p className="text-accent-foreground">
            Our platform serves professionals across various sectors,
              providing specialized tools for environmental analysis and
              compliance verification.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Journalistic Integrity",
                description: "Support investigative reporting with verifiable data and comprehensive analysis",
                Icon: FileSearch
              },
              {
                title: "Consulting Precision",
                description: "Enhance your advisory services with objective, data-driven insights",
                Icon: Sprout
              },
              {
                title: "Corporate Accountability",
                description: "Maintain brand reputation through transparent environmental practices",
                Icon: Building2
              },
              {
                title: "Legal Compliance",
                description: "Verify environmental compliance claims",
                Icon: Scale,
              },
              {
                title: "Investment Security",
                description: "Make informed ESG investment decisions with reliable data",
                Icon: TrendingUp
              },
              {
                title: "Stakeholder Confidence",
                description: "Build trust with transparent environmental reporting",
                Icon: HandshakeIcon
              }
            ].map(({ title, description, Icon }) => (
              <div
                key={title}
                className="bg-card p-6 rounded-xl hover:bg-card/90 transition-all duration-300 border border-border"
              >
                <div className="flex flex-col space-y-4">
                  <div className="bg-card/10 w-12 h-12 rounded-lg flex items-center justify-center">
                    <Icon className="w-12 h-12 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-accent-foreground">
                    {title}
                  </h3>
                  <p className="text-accent-foreground text-sm">{description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
