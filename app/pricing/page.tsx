import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardFooter,
  CardTitle,
} from "@/components/ui/card"

export default function Pricing() {
  return (
    <div className="py-12">
      <h1 className="text-4xl font-bold mb-8 text-center text-accent-foreground">
        Choose Your Plan
      </h1>
      <p className="text-center text-accent-foreground mb-12 max-w-2xl mx-auto">
        Flexible pricing options designed for environmental professionals, 
        consulting firms, and enterprise organizations.
      </p>
      <div className="flex flex-col md:flex-row justify-center gap-8 max-w-7xl mx-auto px-4">
        <Card className="w-full md:w-[350px] flex flex-col">
          <CardHeader>
            <CardTitle>Basic</CardTitle>
            <CardDescription className="text-accent-foreground">For individual professionals</CardDescription>
          </CardHeader>
          <CardContent className="flex-grow space-y-4">
            <div className="text-3xl font-bold relative">
              <span className="blur-md">£299</span>
              <span className="absolute inset-0 flex items-center justify-center text-sm font-normal text-muted-foreground">
                Pricing coming soon
              </span>
            </div>
            <div className="space-y-2">
              <div className="flex items-center">✓ 10 reports per month</div>
              <div className="flex items-center">✓ Basic ESG risk detection</div>
              <div className="flex items-center">✓ Standard report templates</div>
              <div className="flex items-center">✓ Basic data visualization</div>
              <div className="flex items-center">✓ Monthly trend analysis</div>
              <div className="flex items-center">✓ Email support</div>
            </div>
          </CardContent>
          <CardFooter>
            <Button asChild className="w-full">
              <a href="/signup">Start Free Trial</a>
            </Button>
          </CardFooter>
        </Card>

        <Card className="w-full md:w-[350px] flex flex-col border-primary bg-card">
          <CardHeader>
            <CardTitle className="text-card-foreground">Professional</CardTitle>
            <CardDescription className="text-accent-foreground">For consulting firms & teams</CardDescription>
          </CardHeader>
          <CardContent className="flex-grow space-y-4">
            <div className="text-3xl font-bold text-foreground relative">
              <span className="blur-md">£299</span>
              <span className="absolute inset-0 flex items-center justify-center text-sm font-normal text-muted-foreground">
                Pricing coming soon
              </span>
            </div>
            <div className="space-y-2 text-card-foreground">
              <div className="flex items-center">✓ Unlimited reports</div>
              <div className="flex items-center">✓ Advanced AI detection</div>
              <div className="flex items-center">✓ Custom report branding</div>
              <div className="flex items-center">✓ Real-time monitoring</div>
              <div className="flex items-center">✓ Expert report curation</div>
              <div className="flex items-center">✓ Regulatory compliance tracking</div>
              <div className="flex items-center">✓ Priority support</div>
            </div>
          </CardContent>
          <CardFooter>
            <Button asChild className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
              <a href="/signup?plan=pro">Start Free Trial</a>
            </Button>
          </CardFooter>
        </Card>

        <Card className="w-full md:w-[350px] flex flex-col">
          <CardHeader>
            <CardTitle>Enterprise</CardTitle>
            <CardDescription className="text-accent-foreground">For large organizations & ESG firms</CardDescription>
          </CardHeader>
          <CardContent className="flex-grow space-y-4">
            <div className="text-3xl font-bold relative">
              <span className="blur-md">£299</span>
              <span className="absolute inset-0 flex items-center justify-center text-sm font-normal text-muted-foreground">
              Pricing coming soon
              </span>
            </div>
            <div className="space-y-2">
              <div className="flex items-center">✓ Full API access</div>
              <div className="flex items-center">✓ Custom integrations</div>
              <div className="flex items-center">✓ White-label options</div>
              <div className="flex items-center">✓ Dedicated analyst support</div>
              <div className="flex items-center">✓ Custom scoring models</div>
              <div className="flex items-center">✓ Unlimited user seats</div>
              <div className="flex items-center">✓ SLA guarantees</div>
            </div>
          </CardContent>
          <CardFooter>
            <Button asChild className="w-full" variant="outline">
              <a href="mailto:enterprise@greendetective.earth" className="text-accent-foreground">Contact Sales</a>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

