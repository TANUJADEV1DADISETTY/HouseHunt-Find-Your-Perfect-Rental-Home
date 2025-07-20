"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, Home, Search, User, Settings, LogOut, Info, Star, Users, Headphones, Award } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userRole, setUserRole] = useState<"renter" | "owner" | "admin">("renter")

  const handleLogin = (role: "renter" | "owner" | "admin") => {
    setIsLoggedIn(true)
    setUserRole(role)
    localStorage.setItem("isLoggedIn", "true")
    localStorage.setItem("userRole", role)
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
    localStorage.removeItem("isLoggedIn")
    localStorage.removeItem("userRole")
  }

  useEffect(() => {
    const savedLoginState = localStorage.getItem("isLoggedIn")
    const savedUserRole = localStorage.getItem("userRole") as "renter" | "owner" | "admin"

    if (savedLoginState === "true" && savedUserRole) {
      setIsLoggedIn(true)
      setUserRole(savedUserRole)
    }
  }, [])

  const navItems = [
    { href: "/", label: "Home", icon: Home },
    { href: "/properties", label: "Properties", icon: Search },
    { href: "/about", label: "About", icon: Info },
    { href: "/reviews", label: "Reviews", icon: Star },
    { href: "/community", label: "Community", icon: Users },
    { href: "/support", label: "Support", icon: Headphones },
    { href: "/awards", label: "Awards", icon: Award },
  ]

  const getDashboardLink = () => {
    switch (userRole) {
      case "owner":
        return "/dashboard/owner"
      case "admin":
        return "/dashboard/admin"
      default:
        return "/dashboard/renter"
    }
  }

  return (
    <nav className="border-b bg-white/80 backdrop-blur-md supports-[backdrop-filter]:bg-white/60 sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center space-x-8">
            <Link
              href="/"
              className="flex items-center space-x-2 hover-glow rounded-lg p-2 transition-all duration-300"
            >
              <Home className="h-6 w-6 text-primary animate-pulse" />
              <span className="text-xl font-bold gradient-text">HouseHunt</span>
            </Link>

            {/* Desktop Navigation - Left Aligned */}
            <div className="hidden lg:flex items-center space-x-1">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex items-center space-x-2 px-3 py-2 text-sm font-medium transition-all duration-300 hover:text-primary hover:bg-pink-50 rounded-lg hover-lift"
                >
                  <item.icon className="h-4 w-4 transition-transform duration-300 hover:scale-110" />
                  <span>{item.label}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Auth Section */}
          <div className="flex items-center space-x-4">
            {isLoggedIn ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full hover-glow">
                    <Avatar className="h-8 w-8 ring-2 ring-pink-200 transition-all duration-300 hover:ring-pink-400">
                      <AvatarImage src="/placeholder-user.jpg" alt="User" />
                      <AvatarFallback className="bg-gradient-to-br from-pink-500 to-rose-600 text-white">
                        U
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56 glass-effect" align="end" forceMount>
                  <DropdownMenuItem asChild>
                    <Link href={getDashboardLink()} className="hover:bg-pink-50 transition-colors duration-200">
                      <User className="mr-2 h-4 w-4" />
                      <span>Dashboard</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="hover:bg-pink-50 transition-colors duration-200">
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout} className="hover:bg-pink-50 transition-colors duration-200">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="hidden md:flex items-center space-x-2">
                <Button
                  variant="ghost"
                  className="hover:bg-pink-50 hover:text-pink-700 transition-all duration-300"
                  asChild
                >
                  <Link href="/auth/login">Login</Link>
                </Button>
                <Button
                  className="bg-gradient-to-r from-pink-500 to-rose-600 hover:from-pink-600 hover:to-rose-700 transform hover:scale-105 transition-all duration-300"
                  asChild
                >
                  <Link href="/auth/register">Sign Up</Link>
                </Button>
              </div>
            )}

            {/* Mobile Menu */}
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="lg:hidden hover:bg-pink-50 transition-colors duration-300"
                >
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px] glass-effect">
                <nav className="flex flex-col space-y-4 mt-8">
                  {navItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="flex items-center space-x-3 text-lg font-medium p-3 rounded-lg hover:bg-pink-50 hover:text-pink-700 transition-all duration-300 hover-lift"
                    >
                      <item.icon className="h-5 w-5" />
                      <span>{item.label}</span>
                    </Link>
                  ))}
                  {!isLoggedIn && (
                    <div className="flex flex-col space-y-2 pt-4">
                      <Button variant="ghost" className="justify-start hover:bg-pink-50" asChild>
                        <Link href="/auth/login">Login</Link>
                      </Button>
                      <Button className="justify-start bg-gradient-to-r from-pink-500 to-rose-600" asChild>
                        <Link href="/auth/register">Sign Up</Link>
                      </Button>
                    </div>
                  )}
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  )
}
