"use client"

import { useState, useEffect } from 'react'
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
// import { triggerDetective } from '../services/api'
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from "@/hooks/use-auth";
const isValidUrl = (url: string) => {
  // Add https:// if no protocol is specified
  const urlToCheck = url.match(/^https?:\/\//) ? url : `https://${url}`;
  
  try {
    const parsedUrl = new URL(urlToCheck);
    // Check if the hostname contains at least one dot (e.g., "example.com")
    return parsedUrl.hostname.includes('.');
  } catch {
    return false;
  }
};

const ensureHttps = (url: string) => {
  if (!url) return url;
  return url.match(/^https?:\/\//) ? url : `https://${url}`;
};

type FormData = {
  companyName: string
  domainName: string
  aboutPageLink: string
  urlsToProcess: string[]
}

export default function SubmitForm() {
  const [step, setStep] = useState(1)
  const { toast } = useToast()
  const { register, handleSubmit, watch, control, formState: { errors } } = useForm<FormData>({
    defaultValues: {
      companyName: '',
      domainName: '',
      aboutPageLink: '',
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
  
      // About page validation
      if (!data.aboutPageLink) {
        errors.aboutPageLink = { message: 'About page link is required' };
      } else if (!isValidUrl(data.aboutPageLink)) {
        errors.aboutPageLink = { message: 'Please enter a valid URL' };
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

  const [reportsCount, setReportsCount] = useState(0);
  const { isAuthenticated, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    const fetchReportsCount = async () => {
      try {
        const response = await fetch('/api/v1/detective/reports/', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        
        if (!response.ok) {
          logout()
          throw new Error('Failed to fetch reports');
        }
        
        const data = await response.json();
        setReportsCount(Array.isArray(data) ? data.length : 0);
      } catch (error) {
        console.error('Error fetching reports count:', error);
      }
    };

    fetchReportsCount();
  }, []);

  useEffect(() => {
    if (!isAuthenticated) {
      console.log("User is not authenticated, redirecting to login page");
      router.push("/login");
    }
  }, [isAuthenticated, router]);

  const onSubmit = async (data: FormData) => {
    // Ensure all URLs have https://
    const formattedData = {
      ...data,
      domainName: ensureHttps(data.domainName),
      aboutPageLink: ensureHttps(data.aboutPageLink),
      urlsToProcess: data.urlsToProcess.map(url => url ? ensureHttps(url) : url).filter(Boolean)
    };

    try {
      const response = await fetch('/api/v1/detective/trigger_detective/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          company_name: formattedData.companyName,
          company_domain: formattedData.domainName,
          company_about: formattedData.aboutPageLink,
          process_urls: formattedData.urlsToProcess.length > 0 ? 
            formattedData.urlsToProcess : 
            []
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to trigger analysis');
      }

      const responseData = await response.json();
      toast({
        title: "Analysis request submitted",
        description: `Report UUID: ${responseData.report_uuid}`,
      });
      
      // Redirect to reports page after successful submission
      router.push('/reports');
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "An error occurred",
        variant: "destructive",
      });
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
    <div>
      {reportsCount >= 3 ? (
        <Card className="w-full max-w-2xl mx-auto bg-card/30 backdrop-blur-sm border border-border">
          <CardContent className="pt-6">
            <div className="text-center py-8">
              <h2 className="text-xl font-semibold mb-4">Report Limit Reached</h2>
              <p className="text-muted-foreground mb-4">
                During beta, each user can generate up to 3 reports. Please contact us for more information or to request additional reports.
              </p>
              <Button asChild>
                <Link href="/reports">View Your Reports</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card className="w-full max-w-2xl mx-auto bg-card/30 backdrop-blur-sm border border-border">
          <CardHeader className="border-b border-border">
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <CardTitle className="text-foreground">New Investigation</CardTitle>
                {renderTooltip("Start a new greenwashing analysis by providing company details")}
              </div>
              <div className="text-sm text-muted-foreground bg-muted/50 p-3 rounded-lg">
                Beta Limitations:
                <ul className="list-disc list-inside mt-1 ml-2">
                  <li>Maximum 3 reports per user</li>
                  <li>Up to 3000 pages analyzed per report</li>
                  <li>Contact us for additional capacity</li>
                </ul>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-6">
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
                          className="bg-card/50 border-border text-foreground placeholder:text-muted-foreground"
                          placeholder="e.g., EcoTech Solutions Inc."
                        />
                      )}
                    />
                    {errors.companyName && <p className="text-sm text-destructive mt-1">{errors.companyName.message}</p>}
                  </div>
                  <div>
                    <label htmlFor="domainName" className="block text-sm font-medium text-foreground mb-1 flex items-center">
                      Domain Name
                      {renderTooltip("Enter the main website domain of the company (e.g., example.com)")}
                    </label>
                    <Controller
                      name="domainName"
                      control={control}
                      rules={{ required: "Domain name is required" }}
                      render={({ field }) => (
                        <Input
                          {...field}
                          id="domainName"
                          className="bg-card/50 border-border text-foreground placeholder:text-muted-foreground"
                          placeholder="e.g., example.com"
                        />
                      )}
                    />
                    {errors.domainName && <p className="text-sm text-destructive mt-1">{errors.domainName.message}</p>}
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-4">
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
                          className="bg-card/50 border-border text-foreground placeholder:text-muted-foreground"
                          placeholder="e.g., https://www.ecotechsolutions.com/about-us"
                        />
                      )}
                    />
                    {errors.aboutPageLink && <p className="text-sm text-destructive mt-1">{errors.aboutPageLink.message}</p>}
                  </div>

                  <div>
                    <label htmlFor="urlsToProcess" className="block text-sm font-medium text-foreground mb-1 flex items-center">
                      Specific URLs to Analyze (Optional)
                      {renderTooltip("Leave empty to analyze the entire domain, or enter specific URLs to limit the analysis scope")}
                    </label>
                    <div className="text-sm text-muted-foreground mb-3 bg-muted/50 p-2 rounded-lg">
                      If no URLs are provided, the detective will analyze the entire domain.
                    </div>
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
                                  className={`flex-1 rounded-md border px-3 py-2 bg-card/50 text-foreground placeholder:text-muted-foreground ${
                                    url && !isValidUrl(url) ? 'border-destructive' : 'border-border'
                                  }`}
                                  placeholder="e.g., https://www.example.com/sustainability"
                                  value={url}
                                  onChange={(e) => {
                                    const newUrls = [...field.value];
                                    // Add https:// if no protocol is specified
                                    const newUrl = e.target.value.match(/^https?:\/\//) ? 
                                      e.target.value : 
                                      e.target.value ? `https://${e.target.value}` : '';
                                    newUrls[index] = newUrl;
                                    field.onChange(newUrls);
                                  }}
                                />
                                <button
                                  type="button"
                                  onClick={() => {
                                    const newUrls = field.value.filter((_, i) => i !== index);
                                    field.onChange(newUrls);
                                  }}
                                  className="p-2 text-destructive hover:text-destructive/80"
                                >
                                  <TrashIcon className="h-5 w-5" />
                                </button>
                              </div>
                              {url && !isValidUrl(url) && (
                                <p className="text-sm text-destructive">Please enter a valid URL</p>
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
          <CardFooter className="flex justify-between border-t border-border mt-6 pt-auto p-4">
            {step > 1 && (
              <Button 
                onClick={prevStep} 
                variant="outline"
                className="border-border hover:bg-accent hover:text-accent-foreground"
              >
                Previous
              </Button>
            )}
            {step < 2 ? (
              <>
                <Link href="/reports">
                  <Button 
                    variant="outline"
                    className="border-border hover:bg-accent hover:text-accent-foreground"
                  >
                    Reports
                  </Button>
                </Link>
                <Button 
                  onClick={nextStep}
                  className="bg-primary text-primary-foreground hover:bg-primary/90 ml-auto"
                >
                  Next
                </Button>
              </>
            ) : (
              <Button 
                onClick={handleSubmit(onSubmit)}
                className="bg-primary text-primary-foreground hover:bg-primary/90 ml-auto"
              >
                Submit for Analysis
              </Button>
            )}
          </CardFooter>
        </Card>
      )}
    </div>
  )
}

