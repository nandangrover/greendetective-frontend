"use client"

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import Link from 'next/link'
import { Progress } from "@/components/ui/progress"
import { useSearchParams, useRouter } from 'next/navigation'
import PhoneInput from 'react-phone-number-input'
import 'react-phone-number-input/style.css'
import { useAuth } from '@/hooks/use-auth'
import { useToast } from '@/hooks/use-toast'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function Signup() {
  const { signup, isAuthenticated } = useAuth()
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const searchParams = useSearchParams()
  const router = useRouter()
  const { toast } = useToast()
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
    if (searchParams.get('verified') === 'true') {
      toast({
        title: 'Email Verified!',
        description: 'Your email has been successfully verified. You can now login.',
      })
    }
  }, [searchParams, toast])

  useEffect(() => {
    if (isAuthenticated) {
      router.push('/reports')
    }
  }, [isAuthenticated, router])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prevData => ({ ...prevData, [name]: value }))
  }

  const validateStep = () => {
    if (step === 1) {
      if (!formData.inviteCode || formData.inviteCode.length < 6) {
        toast({
          variant: 'destructive',
          title: 'Invalid Invite Code',
          description: 'Invite code must be at least 6 characters',
        })
        return false
      }
      if (!formData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        toast({
          variant: 'destructive',
          title: 'Invalid Email',
          description: 'Please enter a valid email address',
        })
        return false
      }
      if (!formData.password || formData.password.length < 8) {
        toast({
          variant: 'destructive',
          title: 'Invalid Password',
          description: 'Password must be at least 8 characters',
        })
        return false
      }
      if (formData.password !== formData.confirmPassword) {
        toast({
          variant: 'destructive',
          title: 'Passwords Mismatch',
          description: 'Passwords do not match',
        })
        return false
      }
    }

    if (step === 2) {
      if (!formData.businessName || formData.businessName.length < 2) {
        toast({
          variant: 'destructive',
          title: 'Invalid Business Name',
          description: 'Business name must be at least 2 characters',
        })
        return false
      }
      if (formData.website && !/^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/.test(formData.website)) {
        toast({
          variant: 'destructive',
          title: 'Invalid Website',
          description: 'Please enter a valid website URL',
        })
        return false
      }
      if (!formData.industry || formData.industry.length < 2) {
        toast({
          variant: 'destructive',
          title: 'Invalid Industry',
          description: 'Industry must be at least 2 characters',
        })
        return false
      }
      if (!formData.companySize) {
        toast({
          variant: 'destructive',
          title: 'Company Size Required',
          description: 'Please select a company size',
        })
        return false
      }
    }

    if (step === 3) {
      if (!formData.username || formData.username.length < 3) {
        toast({
          variant: 'destructive',
          title: 'Invalid Username',
          description: 'Username must be at least 3 characters',
        })
        return false
      }
      if (!formData.jobTitle || formData.jobTitle.length < 2) {
        toast({
          variant: 'destructive',
          title: 'Invalid Job Title',
          description: 'Job title must be at least 2 characters',
        })
        return false
      }
      if (!formData.phone || !/^\+?[1-9]\d{1,14}$/.test(formData.phone)) {
        toast({
          variant: 'destructive',
          title: 'Invalid Phone Number',
          description: 'Please enter a valid phone number',
        })
        return false
      }
    }

    return true
  }

  const nextStep = () => {
    if (!validateStep()) return
    if (step < 3) setStep(step + 1)
  }

  const prevStep = () => {
    if (step > 1) setStep(step - 1)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    
    // Ensure website has https://
    let website = formData.website
    if (website && !website.startsWith('http')) {
      website = `https://${website}`
    }

    try {
      await signup({
        username: formData.username,
        email: formData.email,
        password: formData.password,
        invite_code: formData.inviteCode,
        profile: {
          job_title: formData.jobTitle,
          phone: formData.phone,
          business: {
            name: formData.businessName,
            website: website,
            industry: formData.industry,
            size: formData.companySize
          }
        }
      })
      
      toast({
        title: 'Signup Successful!',
        description: 'Your account has been created successfully.',
      })
      router.push('/reports')
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Signup failed'
      setError(errorMessage)
      toast({
        variant: 'destructive',
        title: 'Signup Error',
        description: errorMessage,
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-4 px-4">
      <Card className="w-full max-w-[400px] mx-auto">
        <CardHeader>
          <CardTitle className="text-xl">Sign Up</CardTitle>
          <CardDescription className="text-sm">Step {step} of 3</CardDescription>
          <Progress value={step * 33.33} className="mt-2 h-2" />
        </CardHeader>
        <CardContent>
          <form className="space-y-4">
            {step === 1 && (
              <>
                <div className="space-y-2">
                  <label htmlFor="inviteCode" className="block text-sm font-medium text-foreground">Invite Code</label>
                  <Input
                    type="text"
                    id="inviteCode"
                    name="inviteCode"
                    value={formData.inviteCode}
                    onChange={handleChange}
                    required
                    className="text-sm"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="block text-sm font-medium text-foreground">Email</label>
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
                  <label htmlFor="password" className="block text-sm font-medium text-foreground">Password</label>
                  <Input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    className="text-sm"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-foreground">Confirm Password</label>
                  <Input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                    className="text-sm"
                  />
                </div>
              </>
            )}

            {step === 2 && (
              <>
                <div className="space-y-2">
                  <label htmlFor="businessName" className="block text-sm font-medium text-foreground">Business Name</label>
                  <Input
                    type="text"
                    id="businessName"
                    name="businessName"
                    value={formData.businessName}
                    onChange={handleChange}
                    required
                    className="text-sm"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="website" className="block text-sm font-medium text-foreground">Website</label>
                  <Input
                    type="url"
                    id="website"
                    name="website"
                    value={formData.website}
                    onChange={handleChange}
                    required
                    className="text-sm"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="industry" className="block text-sm font-medium text-foreground">Industry</label>
                  <Input
                    type="text"
                    id="industry"
                    name="industry"
                    value={formData.industry}
                    onChange={handleChange}
                    required
                    className="text-sm"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="companySize" className="block text-sm font-medium text-foreground">Company Size</label>
                  <Select
                    value={formData.companySize}
                    onValueChange={(value) => setFormData(prev => ({ ...prev, companySize: value }))}
                    required
                    className="text-sm"
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select company size" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1-10">1-10 employees</SelectItem>
                      <SelectItem value="11-50">11-50 employees</SelectItem>
                      <SelectItem value="51-200">51-200 employees</SelectItem>
                      <SelectItem value="201-500">201-500 employees</SelectItem>
                      <SelectItem value="501+">501+ employees</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </>
            )}

            {step === 3 && (
              <>
                <div className="space-y-2">
                  <label htmlFor="username" className="block text-sm font-medium text-foreground">Username</label>
                  <Input
                    type="text"
                    id="username"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    required
                    className="text-sm"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="jobTitle" className="block text-sm font-medium text-foreground">Job Title</label>
                  <Input
                    type="text"
                    id="jobTitle"
                    name="jobTitle"
                    value={formData.jobTitle}
                    onChange={handleChange}
                    required
                    className="text-sm"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="phone" className="block text-sm font-medium text-foreground">Phone</label>
                  <PhoneInput
                    international
                    defaultCountry="GB"
                    value={formData.phone}
                    onChange={(value) => setFormData(prev => ({ ...prev, phone: value || '' }))}
                    className="border rounded-md p-2 text-sm"
                  />
                </div>
              </>
            )}
          </form>
        </CardContent>
        <CardFooter className="flex justify-between gap-2">
          {step > 1 && (
            <Button variant="outline" onClick={prevStep} className="text-sm">
              Previous
            </Button>
          )}
          {step < 3 ? (
            <Button onClick={nextStep} className={step === 1 ? "w-full text-sm" : "text-sm"}>
              Next
            </Button>
          ) : (
            <Button onClick={handleSubmit} disabled={loading} className="text-sm">
              {loading ? 'Signing up...' : 'Complete Signup'}
            </Button>
          )}
        </CardFooter>
      </Card>
      <div className="text-sm text-center px-4">
        Already have an account? <Link href="/login" className="text-blue-500 hover:underline">Log in</Link>
      </div>
    </div>
  )
}

