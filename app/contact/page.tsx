'use client'

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Mail, Linkedin, Twitter, Phone, MapPin } from "lucide-react"
import Link from "next/link"

export default function Contact() {
  return (
    <div className="min-h-screen container mx-auto px-4 py-12">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Left Side - Main Content */}
          <div className="space-y-8">
            <div>
              <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-white bg-clip-text text-accent-foreground">
                Contact Us
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed">
                Have questions about our AI-powered greenwashing detection? We'd love to hear from you and discuss how we can help your organization.
              </p>
            </div>

            <div className="space-y-4 pt-4">
              <h2 className="text-xl font-semibold text-white/90">Connect With Us</h2>
              <div className="flex gap-4">
                <Button asChild variant="outline" size="icon" className="h-12 w-12">
                  <Link href="https://www.linkedin.com/company/greendetective" target="_blank" rel="noopener noreferrer">
                    <Linkedin className="h-5 w-5" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="icon" className="h-12 w-12">
                  <Link href="https://twitter.com/greendetective" target="_blank" rel="noopener noreferrer">
                    <Twitter className="h-5 w-5" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>

          {/* Right Side - Contact Methods */}
          <div className="space-y-4">
            <Card className="bg-card/50 backdrop-blur-sm border-primary/20">
              <CardContent className="pt-6">
                <Button asChild variant="ghost" className="w-full h-20 justify-start hover:bg-primary/10">
                  <a href="mailto:info@greendetective.earth" className="flex items-center gap-4 p-4">
                    <Mail className="h-6 w-6 text-primary" />
                    <div className="text-left">
                      <p className="font-medium">Email Us</p>
                      <p className="text-sm text-muted-foreground">
                        info@greendetective.earth
                      </p>
                    </div>
                  </a>
                </Button>

                <Button asChild variant="ghost" className="w-full h-20 justify-start hover:bg-primary/10">
                  <a href="tel:+447776651069" className="flex items-center gap-4 p-4">
                    <Phone className="h-6 w-6 text-primary" />
                    <div className="text-left">
                      <p className="font-medium">Call Us</p>
                      <p className="text-sm text-muted-foreground">
                        +44 7776651069
                      </p>
                    </div>
                  </a>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
} 