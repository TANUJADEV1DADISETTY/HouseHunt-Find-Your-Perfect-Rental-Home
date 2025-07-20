"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { Checkbox } from "@/components/ui/checkbox"
import { Eye, EyeOff, Home } from "lucide-react"
import Link from "next/link"

export default function RegisterPage() {
  const [activeTab, setActiveTab] = useState("renter")

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <Link href="/" className="flex items-center justify-center space-x-2 mb-6">
            <Home className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold">HouseHunt</span>
          </Link>
          <h2 className="text-3xl font-bold text-gray-900">Create your account</h2>
          <p className="mt-2 text-sm text-gray-600">Join HouseHunt and start your rental journey</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Sign Up</CardTitle>
            <CardDescription>Choose your account type and create your profile</CardDescription>
          </CardHeader>

          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="renter">Renter</TabsTrigger>
                <TabsTrigger value="owner">Owner</TabsTrigger>
                <TabsTrigger value="admin">Admin</TabsTrigger>
              </TabsList>

              <TabsContent value="renter" className="space-y-4 mt-6">
                <RegisterForm userType="renter" />
              </TabsContent>

              <TabsContent value="owner" className="space-y-4 mt-6">
                <RegisterForm userType="owner" />
              </TabsContent>

              <TabsContent value="admin" className="space-y-4 mt-6">
                <RegisterForm userType="admin" />
              </TabsContent>
            </Tabs>
          </CardContent>

          <CardFooter className="flex flex-col space-y-4">
            <Separator />
            <p className="text-sm text-center text-gray-600">
              Already have an account?{" "}
              <Link href="/auth/login" className="font-medium text-primary hover:underline">
                Sign in here
              </Link>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

function RegisterForm({ userType }: { userType: string }) {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const handleSubmit = (e: React.FormEvent, userType: string) => {
    e.preventDefault()

    // Simulate registration success
    localStorage.setItem("isLoggedIn", "true")
    localStorage.setItem("userRole", userType)

    // Redirect to appropriate dashboard
    const dashboardRoutes = {
      renter: "/dashboard/renter",
      owner: "/dashboard/owner",
      admin: "/dashboard/admin",
    }

    window.location.href = dashboardRoutes[userType as keyof typeof dashboardRoutes] || "/"
  }

  return (
    <form className="space-y-4" onSubmit={(e) => handleSubmit(e, userType)}>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor={`firstName-${userType}`}>First Name</Label>
          <Input id={`firstName-${userType}`} placeholder="John" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor={`lastName-${userType}`}>Last Name</Label>
          <Input id={`lastName-${userType}`} placeholder="Doe" required />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor={`email-${userType}`}>Email</Label>
        <Input id={`email-${userType}`} type="email" placeholder="john@example.com" required />
      </div>

      <div className="space-y-2">
        <Label htmlFor={`phone-${userType}`}>Phone Number</Label>
        <Input id={`phone-${userType}`} type="tel" placeholder="+1 (555) 123-4567" required />
      </div>

      <div className="space-y-2">
        <Label htmlFor={`password-${userType}`}>Password</Label>
        <div className="relative">
          <Input
            id={`password-${userType}`}
            type={showPassword ? "text" : "password"}
            placeholder="Create a strong password"
            required
          />
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </Button>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor={`confirmPassword-${userType}`}>Confirm Password</Label>
        <div className="relative">
          <Input
            id={`confirmPassword-${userType}`}
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Confirm your password"
            required
          />
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          >
            {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </Button>
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <Checkbox id={`terms-${userType}`} required />
        <Label htmlFor={`terms-${userType}`} className="text-sm">
          I agree to the{" "}
          <Link href="/terms" className="text-primary hover:underline">
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link href="/privacy" className="text-primary hover:underline">
            Privacy Policy
          </Link>
        </Label>
      </div>

      <Button type="submit" className="w-full">
        Create {userType.charAt(0).toUpperCase() + userType.slice(1)} Account
      </Button>
    </form>
  )
}
