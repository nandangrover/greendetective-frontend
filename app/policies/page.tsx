'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export default function PoliciesPage() {
  return (
    <main className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8 bg-gradient-to-r from-white to-primary bg-clip-text text-transparent text-center">
        Our Policies
      </h1>

      <Tabs defaultValue="privacy" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-8">
          <TabsTrigger value="privacy">Privacy Policy</TabsTrigger>
          <TabsTrigger value="cookies">Cookie Policy</TabsTrigger>
        </TabsList>

        <TabsContent value="privacy">
          <div className="prose prose-invert max-w-none mb-8">
            <p className="text-lg text-center mb-8">
              Your privacy is respected here. We aim to be transparent about how we handle your data
              in our greenwashing detection service.
            </p>
          </div>

          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="who">
              <AccordionTrigger>Who we are</AccordionTrigger>
              <AccordionContent>
                GreenDetective is a service that helps identify potential greenwashing in corporate
                environmental claims. We're committed to environmental transparency and data protection.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="data-collection">
              <AccordionTrigger>Information we collect</AccordionTrigger>
              <AccordionContent>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Company names and URLs for analysis</li>
                  <li>Public environmental claims and reports</li>
                  <li>User account information (if you create an account)</li>
                  <li>Usage analytics to improve our detection algorithms</li>
                </ul>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="usage">
              <AccordionTrigger>How we use your data</AccordionTrigger>
              <AccordionContent>
                <ul className="list-disc pl-6 space-y-2">
                  <li>To analyze corporate environmental claims</li>
                  <li>To improve our greenwashing detection algorithms</li>
                  <li>To provide you with analysis reports</li>
                  <li>To maintain and optimize our service</li>
                </ul>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="security">
              <AccordionTrigger>Data Security</AccordionTrigger>
              <AccordionContent>
                We implement strong security measures to protect your data. All data is encrypted
                and stored securely on servers within the EU/US.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="rights">
              <AccordionTrigger>Your Rights</AccordionTrigger>
              <AccordionContent>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Access your data</li>
                  <li>Request data deletion</li>
                  <li>Object to processing</li>
                  <li>Export your data</li>
                </ul>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </TabsContent>

        <TabsContent value="cookies">
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="essential">
              <AccordionTrigger>Essential Cookies</AccordionTrigger>
              <AccordionContent>
                Required for basic site functionality. These cannot be disabled.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="analytics">
              <AccordionTrigger>Analytics Cookies</AccordionTrigger>
              <AccordionContent>
                Help us understand how visitors interact with our service.
                You can opt-out of these cookies.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="preferences">
              <AccordionTrigger>Managing Preferences</AccordionTrigger>
              <AccordionContent>
                You can modify your cookie preferences at any time through our
                cookie consent banner or browser settings.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </TabsContent>
      </Tabs>

      <footer className="mt-12 text-center text-sm text-muted-foreground">
        <p>Last updated: {new Date().toLocaleDateString()}</p>
      </footer>
    </main>
  );
}