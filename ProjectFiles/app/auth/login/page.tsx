"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { Eye, EyeOff, Home } from "lucide-react"
import Link from "next/link"

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [activeTab, setActiveTab] = useState("renter")

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <Link href="/" className="flex items-center justify-center space-x-2 mb-6">
            <Home className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold">HouseHunt</span>
          </Link>
          <h2 className="text-3xl font-bold text-gray-900">Welcome back</h2>
          <p className="mt-2 text-sm text-gray-600">Sign in to your account to continue</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Sign In</CardTitle>
            <CardDescription>Choose your account type and enter your credentials</CardDescription>
          </CardHeader>

          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="renter">Renter</TabsTrigger>
                <TabsTrigger value="owner">Owner</TabsTrigger>
                <TabsTrigger value="admin">Admin</TabsTrigger>
              </TabsList>

              <TabsContent value="renter" className="space-y-4 mt-6">
                <LoginForm userType="renter" />
              </TabsContent>

              <TabsContent value="owner" className="space-y-4 mt-6">
                <div className="mb-4 p-3 bg-emerald-50 border border-emerald-200 rounded-md">
                  <p className="text-sm text-emerald-800">
                    <strong>Demo Owner Account:</strong>
                    <br />
                    Email: john.smith@email.com
                    <br />
                    Password: owner123
                  </p>
                </div>
                <LoginForm userType="owner" />
              </TabsContent>

              <TabsContent value="admin" className="space-y-4 mt-6">
                <LoginForm userType="admin" />
              </TabsContent>
            </Tabs>
          </CardContent>

          <CardFooter className="flex flex-col space-y-4">
            <Separator />
            <p className="text-sm text-center text-gray-600">
              Don't have an account?{" "}
              <Link href="/auth/register" className="font-medium text-primary hover:underline">
                Sign up here
              </Link>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

function LoginForm({ userType }: { userType: string }) {
  const [showPassword, setShowPassword] = useState(false)

  const handleSubmit = (e: React.FormEvent, userType: string) => {
    e.preventDefault()

    // Simulate login success
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
      <div className="space-y-2">
        <Label htmlFor={`email-${userType}`}>Email</Label>
        <Input
          id={`email-${userType}`}
          type="email"
          placeholder="Enter your email"
          defaultValue={userType === "owner" ? "john.smith@email.com" : ""}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor={`password-${userType}`}>Password</Label>
        <div className="relative">
          <Input
            id={`password-${userType}`}
            type={showPassword ? "text" : "password"}
            placeholder="Enter your password"
            defaultValue={userType === "owner" ? "owner123" : ""}
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

      <div className="flex items-center justify-between">
        <Link href="/auth/forgot-password" className="text-sm text-primary hover:underline">
          Forgot password?
        </Link>
      </div>

      <Button type="submit" className="w-full">
        Sign In as {userType.charAt(0).toUpperCase() + userType.slice(1)}
      </Button>
    </form>
  )
}
