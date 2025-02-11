import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Logo } from "@/components/Logo";
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Policies - GreenDetective',
  description: 'Our privacy and cookie policies',
  alternates: {
    canonical: 'https://www.greendetective.earth/policies',
  },
};

export default function PoliciesPage() {
  return (
    <div>
      <div className="max-w-4xl mx-auto px-4 py-20">
        <section className="space-y-8 mb-16">
          <div className="text-center space-y-6">
            <div className="flex justify-center mb-8 scale-150">
              <Logo />
            </div>
            <p className="text-xl text-accent-foreground/80 leading-relaxed max-w-2xl mx-auto">
              Trust and transparency form the foundation of our service. 
              Below you'll find our comprehensive policies on how we protect and handle your information.
            </p>
          </div>
        </section>

        <Tabs defaultValue="privacy" className="w-full">
          <TabsList className="grid w-full grid-cols-2 h-14 items-center rounded-lg bg-muted p-1 mb-8">
            <TabsTrigger 
              value="privacy" 
              className="inline-flex items-center justify-center whitespace-nowrap rounded-l-md rounded-r-none px-8 py-2 text-lg font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-sm hover:bg-accent hover:text-accent-foreground"
            >
              Privacy Policy
            </TabsTrigger>
            <TabsTrigger 
              value="cookies" 
              className="inline-flex items-center justify-center whitespace-nowrap rounded-r-md rounded-l-none px-8 py-2 text-lg font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-sm hover:bg-accent hover:text-accent-foreground"
            >
              Cookie Policy
            </TabsTrigger>
          </TabsList>

          <TabsContent value="privacy">

            <Accordion type="single" collapsible className="w-full space-y-4">
              <AccordionItem value="who" className="border border-border rounded-xl bg-card/30 backdrop-blur-sm px-6">
                <AccordionTrigger className="text-lg font-semibold hover:text-primary transition-colors">
                  Who we are
                </AccordionTrigger>
                <AccordionContent className="text-accent-foreground">
                  GreenDetective is a service that helps identify potential greenwashing in corporate
                  environmental claims. We're committed to environmental transparency and data protection.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="data-collection" className="border border-border rounded-xl bg-card/30 backdrop-blur-sm px-6">
                <AccordionTrigger className="text-lg font-semibold hover:text-primary transition-colors">
                  Information we collect
                </AccordionTrigger>
                <AccordionContent>
                  <ul className="space-y-3 text-accent-foreground">
                    <li className="flex items-center gap-2">
                      <div className="h-1.5 w-1.5 rounded-full bg-primary"></div>
                      Company names and URLs for analysis
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="h-1.5 w-1.5 rounded-full bg-primary"></div>
                      Public environmental claims and reports
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="h-1.5 w-1.5 rounded-full bg-primary"></div>
                      User account information (if you create an account)
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="h-1.5 w-1.5 rounded-full bg-primary"></div>
                      Usage analytics to improve our detection algorithms
                    </li>
                  </ul>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="usage" className="border border-border rounded-xl bg-card/30 backdrop-blur-sm px-6">
                <AccordionTrigger className="text-lg font-semibold hover:text-primary transition-colors">
                  How we use your data
                </AccordionTrigger>
                <AccordionContent>
                  <ul className="space-y-3 text-accent-foreground">
                    <li className="flex items-center gap-2">
                      <div className="h-1.5 w-1.5 rounded-full bg-primary"></div>
                      To analyze corporate environmental claims
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="h-1.5 w-1.5 rounded-full bg-primary"></div>
                      To improve our greenwashing detection algorithms
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="h-1.5 w-1.5 rounded-full bg-primary"></div>
                      To provide you with analysis reports
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="h-1.5 w-1.5 rounded-full bg-primary"></div>
                      To maintain and optimize our service
                    </li>
                  </ul>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="security" className="border border-border rounded-xl bg-card/30 backdrop-blur-sm px-6">
                <AccordionTrigger className="text-lg font-semibold hover:text-primary transition-colors">
                  Data Security
                </AccordionTrigger>
                <AccordionContent className="text-accent-foreground">
                  We implement strong security measures to protect your data. All data is encrypted
                  and stored securely on servers within the EU/US.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="rights" className="border border-border rounded-xl bg-card/30 backdrop-blur-sm px-6">
                <AccordionTrigger className="text-lg font-semibold hover:text-primary transition-colors">
                  Your Rights
                </AccordionTrigger>
                <AccordionContent>
                  <ul className="space-y-3 text-accent-foreground">
                    <li className="flex items-center gap-2">
                      <div className="h-1.5 w-1.5 rounded-full bg-primary"></div>
                      Access your data
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="h-1.5 w-1.5 rounded-full bg-primary"></div>
                      Request data deletion
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="h-1.5 w-1.5 rounded-full bg-primary"></div>
                      Object to processing
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="h-1.5 w-1.5 rounded-full bg-primary"></div>
                      Export your data
                    </li>
                  </ul>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </TabsContent>

          <TabsContent value="cookies">
            <Accordion type="single" collapsible className="w-full space-y-4">
              <AccordionItem value="essential" className="border border-border rounded-xl bg-card/30 backdrop-blur-sm px-6">
                <AccordionTrigger className="text-lg font-semibold hover:text-primary transition-colors">
                  Essential Cookies
                </AccordionTrigger>
                <AccordionContent className="text-accent-foreground">
                  Required for basic site functionality. These cannot be disabled.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="analytics" className="border border-border rounded-xl bg-card/30 backdrop-blur-sm px-6">
                <AccordionTrigger className="text-lg font-semibold hover:text-primary transition-colors">
                  Analytics Cookies
                </AccordionTrigger>
                <AccordionContent className="text-accent-foreground">
                  Help us understand how visitors interact with our service.
                  You can opt-out of these cookies.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="preferences" className="border border-border rounded-xl bg-card/30 backdrop-blur-sm px-6">
                <AccordionTrigger className="text-lg font-semibold hover:text-primary transition-colors">
                  Managing Preferences
                </AccordionTrigger>
                <AccordionContent className="text-accent-foreground">
                  You can modify your cookie preferences at any time through our
                  cookie consent banner or browser settings.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </TabsContent>
        </Tabs>

        <footer className="mt-12 text-center text-sm text-accent-foreground">
          <p>Last updated: 2025-01-27</p>
        </footer>
      </div>
    </div>
  );
}