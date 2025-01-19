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
        <Card className="w-[300px] flex flex-col">
          <CardHeader>
            <CardTitle>Free Plan</CardTitle>
            <CardDescription>For individual researchers</CardDescription>
          </CardHeader>
          <CardContent className="flex-grow space-y-2">
            <div>✓ 3 analyses per month</div>
            <div>✓ Basic report features</div>
            <div>✓ Community support</div>
          </CardContent>
          <CardFooter>
            <Button asChild className="w-full">
              <a href="/signup">Start for Free</a>
            </Button>
          </CardFooter>
        </Card>

        <Card className="w-[300px] flex flex-col">
          <CardHeader>
            <CardTitle>Premium Plan</CardTitle>
            <CardDescription>For professional journalists</CardDescription>
          </CardHeader>
          <CardContent className="flex-grow space-y-2">
            <div>✓ Unlimited analyses</div>
            <div>✓ Advanced report features</div>
            <div>✓ Priority support</div>
          </CardContent>
          <CardFooter>
            <Button asChild className="w-full">
              <a href="mailto:nandangrover.5@gmail.com?subject=Premium Plan Inquiry">Contact Sales</a>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

