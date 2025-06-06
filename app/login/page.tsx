"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useAuth } from "@/hooks/use-auth";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const searchParams = useSearchParams();
  const { login, isAuthenticated } = useAuth();
  const router = useRouter();
  const { toast } = useToast();
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  useEffect(() => {
    if (searchParams.get("verified") === "true") {
      toast({
        title: "Email Verified!",
        description:
          "Your email has been successfully verified. You can now login.",
      });
    } else if (searchParams.get("verified") === "false") {
      toast({
        variant: "destructive",
        title: "Email Verification Failed",
        description:
          "The email verification link is invalid or has expired. Please try again.",
      });
    }
  }, [searchParams, toast]);

  useEffect(() => {
    if (isAuthenticated) {
      const returnUrl = searchParams.get('returnUrl') || '/reports';
      router.push(returnUrl);
    }
    setIsCheckingAuth(false);
  }, [isAuthenticated, router, searchParams]);

  const validateForm = () => {
    if (!formData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      toast({
        variant: 'destructive',
        title: 'Invalid Email',
        description: 'Please enter a valid email address',
      });
      return false;
    }
    if (!formData.password || formData.password.length < 8) {
      toast({
        variant: 'destructive',
        title: 'Invalid Password',
        description: 'Password must be at least 8 characters',
      });
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    
    if (!validateForm()) return;
    
    setLoading(true);
    try {
      await login(formData.email, formData.password);
      toast({
        title: 'Login Successful!',
        description: 'You have been logged in successfully.',
      });
      router.push('/reports');
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Login failed";
      setError(errorMessage);
      toast({
        variant: "destructive",
        title: "Login Error",
        description: errorMessage,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  return (
    <>
      {isCheckingAuth ? (
        <div className="flex justify-center items-center h-screen">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
        </div>
      ) : (
        <div className="space-y-4 px-4">
          <Card className="w-full max-w-[400px] mx-auto">
            <CardHeader>
              <CardTitle className="text-xl">Login</CardTitle>
              <CardDescription className="text-sm">Enter your credentials to access your account</CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-4" onSubmit={handleSubmit}>
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
                <Button type="submit" className="w-full text-sm" disabled={loading}>
                  {loading ? 'Logging in...' : 'Login'}
                </Button>
              </form>
            </CardContent>
            <CardFooter className="flex flex-col space-y-2 px-4">
              <div className="text-sm text-center">
                Don't have an account? <Link href="/signup" className="text-blue-500 hover:underline">Sign up</Link>
              </div>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div>
                      <Link 
                        href="#" 
                        className="text-sm text-blue-500 hover:underline pointer-events-none opacity-50"
                        onClick={(e) => e.preventDefault()}
                      >
                        Reset Password
                      </Link>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent className="text-sm">
                    <p>Password reset will be available after beta.<br />Please contact support for assistance.</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </CardFooter>
          </Card>
        </div>
      )}
    </>
  );
}
