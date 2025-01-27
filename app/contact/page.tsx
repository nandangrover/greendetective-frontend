import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Mail, Linkedin, Twitter } from "lucide-react"
import Link from "next/link"

export default function Contact() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-center">Contact Us</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2 text-center">
            <p className="text-muted-foreground">
              Have questions or need support? We're here to help!
            </p>
          </div>

          <div className="flex flex-col gap-4">
            <Button asChild variant="outline" className="w-full">
              <Link href="mailto:support@greendetective.com" className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                Email Support
              </Link>
            </Button>

            <Button asChild variant="outline" className="w-full">
              <Link href="https://www.linkedin.com/company/greendetective" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                <Linkedin className="h-4 w-4" />
                LinkedIn
              </Link>
            </Button>

            <Button asChild variant="outline" className="w-full">
              <Link href="https://twitter.com/greendetective" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                <Twitter className="h-4 w-4" />
                Twitter
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 