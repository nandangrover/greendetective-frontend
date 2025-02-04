"use client"

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast";
import { useRouter } from 'next/navigation';

export default function RequestInvite() {
  const { toast } = useToast();
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    companyName: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prevData => ({ ...prevData, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    try {
      const response = await fetch('/api/v1/detective/request-invite/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          company_name: formData.companyName,
        }),
      })

      const result = await response.json()
      
      if (result.status !== 'success') {
        throw new Error(result.message || 'Failed to submit request')
      }

      toast({
        title: "Request Submitted",
        description: "We'll review your request and get back to you soon.",
      })
      
      // Clear form
      setFormData({
        name: '',
        email: '',
        companyName: '',
      })

      router.push('/')
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "An error occurred",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="space-y-4 px-4">
      <Card className="w-full max-w-[400px] mx-auto">
        <CardHeader>
          <CardTitle className="text-xl">Request Beta Access</CardTitle>
          <CardDescription className="text-sm">
            Join our private beta program to start detecting greenwashing claims.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="name" className="block text-sm font-medium text-foreground">Full Name</label>
              <Input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="text-sm"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-medium text-foreground">Work Email</label>
              <Input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="text-sm"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="companyName" className="block text-sm font-medium text-foreground">Company Name</label>
              <Input
                type="text"
                id="companyName"
                name="companyName"
                value={formData.companyName}
                onChange={handleChange}
                required
                className="text-sm"
              />
            </div>
          </form>
        </CardContent>
        <CardFooter>
          <Button 
            onClick={handleSubmit} 
            className="w-full text-sm" 
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Submitting...' : 'Submit Request'}
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
} 