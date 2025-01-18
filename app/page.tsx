import Link from 'next/link'
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)]">
      <h1 className="text-4xl font-bold mb-4 text-primary">Welcome to GreenDetective</h1>
      <p className="text-xl mb-8 text-muted-foreground">Uncover the truth behind corporate environmental claims</p>
      <div className="space-x-4">
        <Button asChild>
          <Link href="/signup">Sign Up</Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="/login">Log In</Link>
        </Button>
      </div>
    </div>
  )
}

