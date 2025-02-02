"use client"

import { useAuth } from "@/hooks/use-auth"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { User, Building2, Briefcase, Phone, Mail, Globe, Building, Factory, HelpCircle, Users, Send } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Label } from "@/components/ui/label"

export default function Profile() {
  const { isAuthenticated, user } = useAuth()
  const router = useRouter()
  const [activeTab, setActiveTab] = useState<'profile' | 'invite'>('profile')

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login')
    }
  }, [isAuthenticated, router])

  if (!user) {
    return null
  }

  return (
    <div className="container max-w-4xl mx-auto">
      {/* Tab Navigation */}
      <div className="border-b border-border/40 mb-8">
        <nav className="flex space-x-8">
          <button
            onClick={() => setActiveTab('profile')}
            className={`flex items-center px-4 py-3 border-b-2 font-medium ${
              activeTab === 'profile'
                ? 'text-primary border-primary'
                : 'text-muted-foreground border-transparent hover:border-muted-foreground/50'
            }`}
          >
            <User className="w-4 h-4 mr-2" />
            Profile
          </button>
          <button
            onClick={() => setActiveTab('invite')}
            className={`flex items-center px-4 py-3 border-b-2 font-medium ${
              activeTab === 'invite'
                ? 'text-primary border-primary'
                : 'text-muted-foreground border-transparent hover:border-muted-foreground/50'
            }`}
          >
            <Users className="w-4 h-4 mr-2" />
            Invite Users
          </button>
        </nav>
      </div>

      {activeTab === 'profile' && (
        <Card className="bg-background/30 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5 text-primary" />
              Manage Your Profile Information
            </CardTitle>
            <CardDescription>
              View and manage your account details
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-8">
            {/* Personal Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-foreground">Personal Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name" className="flex items-center gap-2">
                    <User className="h-4 w-4 text-muted-foreground" />
                    Name
                  </Label>
                  <Input id="name" value={user.name} disabled className="bg-muted/50" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    Email
                  </Label>
                  <Input id="email" value={user.email} disabled className="bg-muted/50" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="jobTitle" className="flex items-center gap-2">
                    <Briefcase className="h-4 w-4 text-muted-foreground" />
                    Job Title
                  </Label>
                  <Input id="jobTitle" value={user.profile.job_title || ''} disabled className="bg-muted/50" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone" className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    Phone
                  </Label>
                  <Input id="phone" value={user.profile.phone || ''} disabled className="bg-muted/50" />
                </div>
              </div>
            </div>

            {/* Business Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-foreground">Business Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="company" className="flex items-center gap-2">
                    <Building2 className="h-4 w-4 text-muted-foreground" />
                    Company
                  </Label>
                  <Input id="company" value={user.profile.business.name || ''} disabled className="bg-muted/50" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="website" className="flex items-center gap-2">
                    <Globe className="h-4 w-4 text-muted-foreground" />
                    Website
                  </Label>
                  <Input id="website" value={user.profile.business.website || ''} disabled className="bg-muted/50" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="industry" className="flex items-center gap-2">
                    <Factory className="h-4 w-4 text-muted-foreground" />
                    Industry
                  </Label>
                  <Input id="industry" value={user.profile.business.industry || ''} disabled className="bg-muted/50" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="size" className="flex items-center gap-2">
                    <Building className="h-4 w-4 text-muted-foreground" />
                    Company Size
                  </Label>
                  <Input id="size" value={user.profile.business.size || ''} disabled className="bg-muted/50" />
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between items-center">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <HelpCircle className="h-4 w-4" />
              Profile editing will be available after beta
            </div>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div>
                    <Button disabled>
                      Save Changes
                    </Button>
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Profile editing is not available during pre-beta.<br />Please contact support to update your information.</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </CardFooter>
        </Card>
      )}

      {activeTab === 'invite' && (
        <Card className="bg-background/30 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5 text-primary" />
              Invite New Users
            </CardTitle>
            <CardDescription>
              Send invitations to join your organization
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-8">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="inviteEmail" className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  Email Address
                </Label>
                <Input id="inviteEmail" placeholder="Enter email address to invite" disabled />
              </div>
              <div className="space-y-2">
                <Label htmlFor="inviteMessage" className="flex items-center gap-2">
                  <Send className="h-4 w-4 text-muted-foreground" />
                  Custom Message
                </Label>
                <Input id="inviteMessage" placeholder="Add a custom message (optional)" disabled />
              </div>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div>
                      <Button disabled className="w-full">
                        Send Invitation
                      </Button>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>User invitations will be available after beta.<br />Please contact support for assistance.</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between items-center">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <HelpCircle className="h-4 w-4" />
              User invitations will be available after beta
            </div>
          </CardFooter>
        </Card>
      )}
    </div>
  )
} 