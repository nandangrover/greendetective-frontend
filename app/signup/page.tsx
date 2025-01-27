"use client"

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import Link from 'next/link'
import { Progress } from "@/components/ui/progress"
import { useSearchParams } from 'next/navigation'
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { CheckCircle } from 'lucide-react'

export default function Signup() {
  const [step, setStep] = useState(1)
  const [showVerifiedMessage, setShowVerifiedMessage] = useState(false)
  const searchParams = useSearchParams()
  const [formData, setFormData] = useState({
    // Account Details
    inviteCode: '',
    email: '',
    password: '',
    confirmPassword: '',
    
    // Business Profile
    businessName: '',
    website: '',
    industry: '',
    companySize: '',
    
    // Personal Details
    username: '',
    jobTitle: '',
    phone: '',
  })

  useEffect(() => {
    // Check if the verified query parameter is present
    if (searchParams.get('verified') === 'true') {
      setShowVerifiedMessage(true)
      
      // Automatically hide the message after 5 seconds
      const timer = setTimeout(() => {
        setShowVerifiedMessage(false)
      }, 5000)
      
      return () => clearTimeout(timer)
    }
  }, [searchParams])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prevData => ({ ...prevData, [name]: value }))
  }

  const nextStep = () => {
    if (step === 1 && (!formData.inviteCode || !formData.email || !formData.password || !formData.confirmPassword)) {
      alert('Please fill in all fields')
      return
    }
    if (step === 1 && formData.password !== formData.confirmPassword) {
      alert("Passwords don't match")
      return
    }
    if (step < 3) setStep(step + 1)
  }

  const prevStep = () => {
    if (step > 1) setStep(step - 1)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    const profile = {
      job_title: formData.jobTitle,
      phone: formData.phone,
      business: {
        name: formData.businessName,
        website: formData.website,
        industry: formData.industry,
        size: formData.companySize
      }
    }

    const signupData = {
      username: formData.username,
      email: formData.email,
      password: formData.password,
      invite_code: formData.inviteCode,
      profile
    }

    console.log('Signup form submitted:', signupData)
    // Implement API call to signup endpoint
  }

  return (
    <div className="space-y-4">
      {showVerifiedMessage && (
        <Alert className="max-w-[400px] mx-auto">
          <CheckCircle className="h-4 w-4" />
          <AlertTitle>Email Verified!</AlertTitle>
          <AlertDescription>
            Your email has been successfully verified. You can now login.
          </AlertDescription>
        </Alert>
      )}
      <Card className="w-[400px] mx-auto">
        <CardHeader>
          <CardTitle>Sign Up</CardTitle>
          <CardDescription>Step {step} of 3</CardDescription>
          <Progress value={step * 33.33} className="mt-2" />
        </CardHeader>
        <CardContent>
          <form className="space-y-4">
            {step === 1 && (
              <>
                <div>
                  <label htmlFor="inviteCode" className="block text-sm font-medium text-foreground">Invite Code</label>
                  <Input
                    type="text"
                    id="inviteCode"
                    name="inviteCode"
                    value={formData.inviteCode}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-foreground">Email</label>
                  <Input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-foreground">Password</label>
                  <Input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-foreground">Confirm Password</label>
                  <Input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                  />
                </div>
              </>
            )}

            {step === 2 && (
              <>
                <div>
                  <label htmlFor="businessName" className="block text-sm font-medium text-foreground">Business Name</label>
                  <Input
                    type="text"
                    id="businessName"
                    name="businessName"
                    value={formData.businessName}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="website" className="block text-sm font-medium text-foreground">Website</label>
                  <Input
                    type="url"
                    id="website"
                    name="website"
                    value={formData.website}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="industry" className="block text-sm font-medium text-foreground">Industry</label>
                  <Input
                    type="text"
                    id="industry"
                    name="industry"
                    value={formData.industry}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="companySize" className="block text-sm font-medium text-foreground">Company Size</label>
                  <Input
                    type="text"
                    id="companySize"
                    name="companySize"
                    value={formData.companySize}
                    onChange={handleChange}
                    required
                  />
                </div>
              </>
            )}

            {step === 3 && (
              <>
                <div>
                  <label htmlFor="username" className="block text-sm font-medium text-foreground">Username</label>
                  <Input
                    type="text"
                    id="username"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="jobTitle" className="block text-sm font-medium text-foreground">Job Title</label>
                  <Input
                    type="text"
                    id="jobTitle"
                    name="jobTitle"
                    value={formData.jobTitle}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-foreground">Phone</label>
                  <Input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                  />
                </div>
              </>
            )}
          </form>
        </CardContent>
        <CardFooter className="flex justify-between">
          {step > 1 && (
            <Button variant="outline" onClick={prevStep}>
              Previous
            </Button>
          )}
          {step < 3 ? (
            <Button onClick={nextStep} className={step === 1 ? "w-full" : ""}>
              Next
            </Button>
          ) : (
            <Button onClick={handleSubmit}>
              Complete Signup
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  )
}

