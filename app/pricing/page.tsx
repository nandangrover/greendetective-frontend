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
    <div>
      <h1 className="text-3xl font-bold mb-6 text-center">Choose Your Plan</h1>
      <div className="flex justify-center gap-6">
        <Card className="w-[300px]">
          <CardHeader>
            <CardTitle>Free Plan</CardTitle>
            <CardDescription>For individual researchers</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="list-disc list-inside space-y-2">
              <li>3 analyses per month</li>
              <li>Basic report features</li>
              <li>Community support</li>
            </ul>
          </CardContent>
          <CardFooter>
            <Button asChild className="w-full">
              <a href="/signup">Start for Free</a>
            </Button>
          </CardFooter>
        </Card>

        <Card className="w-[300px]">
          <CardHeader>
            <CardTitle>Premium Plan</CardTitle>
            <CardDescription>For professional journalists</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="list-disc list-inside space-y-2">
              <li>Unlimited analyses</li>
              <li>Advanced report features</li>
              <li>Priority support</li>
              <li>API access</li>
            </ul>
          </CardContent>
          <CardFooter>
            <Button className="w-full">Upgrade to Premium</Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

