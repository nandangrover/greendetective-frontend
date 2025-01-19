"use client"

import { useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { InfoIcon, TrashIcon, PlusIcon } from 'lucide-react'
import { triggerDetective } from '../services/api'
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import Link from 'next/link';

const isValidUrl = (url: string) => {
  try {
    const parsedUrl = new URL(url);
    // Check if the hostname contains at least one dot (e.g., "example.com")
    return parsedUrl.hostname.includes('.');
  } catch {
    return false;
  }
};

type FormData = {
  companyName: string
  domainName: string
  aboutInfoType: 'link' | 'text'
  aboutPageLink: string
  companyInfo: string
  urlsToProcess: string[]
}

export default function SubmitForm() {
  const [step, setStep] = useState(1)
  const { toast } = useToast()
  const { register, handleSubmit, watch, control, formState: { errors } } = useForm<FormData>({
    defaultValues: {
      companyName: '',
      domainName: '',
      aboutInfoType: 'link',
      aboutPageLink: '',
      companyInfo: '',
      urlsToProcess: [''],
    },
    // Add form validation rules
    resolver: (data) => {
      const errors: Record<string, any> = {};
      
      // Company name validation
      if (!data.companyName) {
        errors.companyName = { message: 'Company name is required' };
      }
  
      // Domain name validation
      if (!data.domainName) {
        errors.domainName = { message: 'Domain name is required' };
      }
  
      // About page validation based on type
      if (data.aboutInfoType === 'link') {
        if (!data.aboutPageLink) {
          errors.aboutPageLink = { message: 'About page link is required' };
        } else if (!isValidUrl(data.aboutPageLink)) {
          errors.aboutPageLink = { message: 'Please enter a valid URL' };
        }
      } else {
        if (!data.companyInfo) {
          errors.companyInfo = { message: 'Company information is required' };
        }
      }
  
      // URLs validation (optional but must be valid if provided)
      if (data.urlsToProcess.some(url => url && !isValidUrl(url))) {
        errors.urlsToProcess = { message: 'Please enter valid URLs' };
      }
  
      return {
        values: data,
        errors: errors
      };
    }
  })

  const aboutInfoType = watch('aboutInfoType')

  const onSubmit = async (data: FormData) => {
    try {
      const response = await triggerDetective({
        companyName: data.companyName,
        domainName: data.domainName,
        aboutPageLink: data.aboutInfoType === 'link' ? data.aboutPageLink : '',
        companyInfo: data.aboutInfoType === 'text' ? data.companyInfo : '',
        urlsToProcess: data.urlsToProcess,
      })
      if (response.status === 'success') {
        toast({
          title: "Analysis request submitted",
          description: `Report UUID: ${response.data.report_uuid}`,
        })
        // Redirect to dashboard or show success message
      } else {
        throw new Error(response.message)
      }
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "An error occurred",
        variant: "destructive",
      })
    }
  }

  const nextStep = () => setStep(step + 1)
  const prevStep = () => setStep(step - 1)

  const renderTooltip = (content: string) => (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <InfoIcon className="h-4 w-4 ml-2 text-muted-foreground" />
        </TooltipTrigger>
        <TooltipContent>
          <p>{content}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-primary">New Investigation</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {step === 1 && (
            <div className="space-y-4">
              <div>
                <label htmlFor="companyName" className="block text-sm font-medium text-foreground mb-1 flex items-center">
                  Company Name
                  {renderTooltip("Enter the full legal name of the company you want to analyze")}
                </label>
                <Controller
                  name="companyName"
                  control={control}
                  rules={{ required: "Company name is required" }}
                  render={({ field }) => (
                    <Input
                      {...field}
                      id="companyName"
                      className="w-full"
                      placeholder="e.g., EcoTech Solutions Inc."
                    />
                  )}
                />
                {errors.companyName && <p className="text-sm text-red-500 mt-1">{errors.companyName.message}</p>}
              </div>
              <div>
                <label htmlFor="domainName" className="block text-sm font-medium text-foreground mb-1 flex items-center">
                  Domain Name
                  {renderTooltip("Enter the main website domain of the company")}
                </label>
                <Controller
                  name="domainName"
                  control={control}
                  rules={{ required: "Domain name is required" }}
                  render={({ field }) => (
                    <Input
                      {...field}
                      id="domainName"
                      className="w-full"
                      placeholder="e.g., ecotechsolutions.com"
                    />
                  )}
                />
                {errors.domainName && <p className="text-sm text-red-500 mt-1">{errors.domainName.message}</p>}
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-1 flex items-center">
                  Company Information
                  {renderTooltip("Choose how you want to provide information about the company")}
                </label>
                <Controller
                  name="aboutInfoType"
                  control={control}
                  rules={{ required: "Please select an option" }}
                  render={({ field }) => (
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-col space-y-1"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="link" id="link" />
                        <Label htmlFor="link">Provide About Page Link</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="text" id="text" />
                        <Label htmlFor="text">Provide Company Information as Text</Label>
                      </div>
                    </RadioGroup>
                  )}
                />
              </div>

              {aboutInfoType === 'link' && (
                <div>
                  <label htmlFor="aboutPageLink" className="block text-sm font-medium text-foreground mb-1 flex items-center">
                    Company About Page Link
                    {renderTooltip("Provide the full URL to the company's 'About Us' or similar page")}
                  </label>
                  <Controller
                    name="aboutPageLink"
                    control={control}
                    rules={{ required: "About page link is required" }}
                    render={({ field }) => (
                      <Input
                        {...field}
                        type="url"
                        id="aboutPageLink"
                        className="w-full"
                        placeholder="e.g., https://www.ecotechsolutions.com/about-us"
                      />
                    )}
                  />
                  {errors.aboutPageLink && <p className="text-sm text-red-500 mt-1">{errors.aboutPageLink.message}</p>}
                </div>
              )}

              {aboutInfoType === 'text' && (
                <div>
                  <label htmlFor="companyInfo" className="block text-sm font-medium text-foreground mb-1 flex items-center">
                    Company Information
                    {renderTooltip("Provide a brief description of the company's activities and claims")}
                  </label>
                  <Controller
                    name="companyInfo"
                    control={control}
                    rules={{ required: "Company information is required" }}
                    render={({ field }) => (
                      <Textarea
                        {...field}
                        id="companyInfo"
                        className="w-full"
                        placeholder="Enter information about what the company does, their business model, products, and any other relevant details"
                        rows={5}
                      />
                    )}
                  />
                  {errors.companyInfo && <p className="text-sm text-red-500 mt-1">{errors.companyInfo.message}</p>}
                </div>
              )}

              <div>
                <label htmlFor="urlsToProcess" className="block text-sm font-medium text-foreground mb-1 flex items-center">
                  URLs to Process
                  {renderTooltip("Enter specific URLs from the company's website that you want analyzed")}
                </label>
                <Controller
                  name="urlsToProcess"
                  control={control}
                  defaultValue={['']}
                  rules={{
                    validate: (urls) => 
                      urls.every(url => !url || isValidUrl(url)) || 'Please enter valid URLs'
                  }}
                  render={({ field }) => (
                    <div className="space-y-2">
                      {field.value.map((url: string, index: number) => (
                        <div key={index} className="flex flex-col gap-1">
                          <div className="flex gap-2">
                            <input
                              type="url"
                              className={`flex-1 rounded-md border px-3 py-2 ${
                                url && !isValidUrl(url) ? 'border-red-500' : 'border-input'
                              }`}
                              placeholder="https://www.example.com/sustainability"
                              value={url}
                              onChange={(e) => {
                                const newUrls = [...field.value];
                                newUrls[index] = e.target.value;
                                field.onChange(newUrls);
                              }}
                            />
                            <button
                              type="button"
                              onClick={() => {
                                const newUrls = field.value.filter((_, i) => i !== index);
                                field.onChange(newUrls);
                              }}
                              className="p-2 text-red-500 hover:text-red-700"
                            >
                              <TrashIcon className="h-5 w-5" />
                            </button>
                          </div>
                          {url && !isValidUrl(url) && (
                            <p className="text-sm text-red-500">Please enter a valid URL</p>
                          )}
                        </div>
                      ))}
                      <button
                        type="button"
                        onClick={() => field.onChange([...field.value, ''])}
                        className="mt-2 flex items-center gap-2 text-sm text-primary hover:text-primary/80"
                        disabled={!field.value[field.value.length - 1] || !isValidUrl(field.value[field.value.length - 1])}
                      >
                        <PlusIcon className="h-4 w-4" /> Add URL
                      </button>
                    </div>
                  )}
                />
              </div>
            </div>
          )}
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        {step > 1 && (
          <Button onClick={prevStep} variant="outline">
            Previous
          </Button>
        )}
        {step < 2 ? (
          <>
              <Link href="/reports">
  <Button variant="outline">
    Reports
  </Button>
</Link>
          
          <Button onClick={nextStep} className="ml-auto">Next</Button>
          </>
        ) : (
          <Button onClick={handleSubmit(onSubmit)} className="ml-auto">Submit for Analysis</Button>
        )}
      </CardFooter>
    </Card>
  )
}

