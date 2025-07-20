"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import {
  MapPin,
  Bed,
  Bath,
  Square,
  Heart,
  Share2,
  Wifi,
  Car,
  Utensils,
  Tv,
  Wind,
  Shield,
  ChevronLeft,
  ChevronRight,
  Phone,
  Mail,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useToast } from "@/hooks/use-toast"

// Mock property data
const property = {
  id: 1,
  title: "Cozy Studio in Queens",
  location: "Queens, New York",
  price: 1400,
  bedrooms: 1,
  bathrooms: 1,
  area: 450,
  type: "Studio",
  description: `This affordable studio apartment offers comfort and convenience in Queens.
  
  Features include:
  • Open-plan living area with large windows
  • Compact kitchen with essential appliances
  • Full bathroom with shower
  • Good closet space for storage
  • Quiet neighborhood location
  • Close to public transportation
  • Laundry facilities in building
  
  Perfect for students or young professionals looking for an affordable place in NYC.`,
  images: [
    "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1560185893-a55cbc8c57e8?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=600&fit=crop",
  ],
  amenities: [
    { icon: Wifi, name: "WiFi Included" },
    { icon: Car, name: "Street Parking" },
    { icon: Utensils, name: "Kitchen Access" },
    { icon: Tv, name: "Cable Ready" },
    { icon: Wind, name: "Air Conditioning" },
    { icon: Shield, name: "Secure Building" },
  ],
  owner: {
    name: "John Smith",
    phone: "+1 (555) 987-6543",
    email: "john.smith@email.com",
    avatar: "/placeholder-user.jpg",
    verified: true,
  },
}

export default function PropertyDetailPage() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [inquiryForm, setInquiryForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  })
  const { toast } = useToast()

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev === property.images.length - 1 ? 0 : prev + 1))
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? property.images.length - 1 : prev - 1))
  }

  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Save inquiry to localStorage for owner to see
    const inquiry = {
      id: Date.now(),
      propertyId: property.id,
      propertyTitle: property.title,
      renterName: inquiryForm.name,
      renterEmail: inquiryForm.email,
      renterPhone: inquiryForm.phone,
      message: inquiryForm.message,
      date: new Date().toISOString(),
      status: "new",
    }

    const existingInquiries = JSON.parse(localStorage.getItem("propertyInquiries") || "[]")
    existingInquiries.push(inquiry)
    localStorage.setItem("propertyInquiries", JSON.stringify(existingInquiries))

    toast({
      title: "Inquiry sent!",
      description: "Your message has been sent to the property owner.",
    })

    // Reset form
    setInquiryForm({
      name: "",
      email: "",
      phone: "",
      message: "",
    })
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Back Button */}
      <div className="mb-6">
        <Button variant="ghost" asChild>
          <Link href="/properties">
            <ChevronLeft className="h-4 w-4 mr-2" />
            Back to Properties
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Image Gallery */}
          <div className="relative">
            <div className="relative aspect-[4/3] overflow-hidden rounded-lg">
              <Image
                src={property.images[currentImageIndex] || "/placeholder.svg"}
                alt={`${property.title} - Image ${currentImageIndex + 1}`}
                fill
                className="object-cover"
              />

              {/* Navigation Buttons */}
              <Button
                variant="ghost"
                size="icon"
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white"
                onClick={prevImage}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white"
                onClick={nextImage}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>

              {/* Image Counter */}
              <div className="absolute bottom-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
                {currentImageIndex + 1} / {property.images.length}
              </div>
            </div>

            {/* Thumbnail Strip */}
            <div className="flex gap-2 mt-4 overflow-x-auto">
              {property.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`relative flex-shrink-0 w-20 h-16 rounded-lg overflow-hidden border-2 ${
                    index === currentImageIndex ? "border-primary" : "border-transparent"
                  }`}
                >
                  <Image
                    src={image || "/placeholder.svg"}
                    alt={`Thumbnail ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Property Info */}
          <div className="space-y-4">
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="secondary">{property.type}</Badge>
                </div>
                <h1 className="text-3xl font-bold mb-2">{property.title}</h1>
                <div className="flex items-center text-gray-600 mb-4">
                  <MapPin className="h-5 w-5 mr-2" />
                  <span className="text-lg">{property.location}</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Button variant="outline" size="icon">
                  <Share2 className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon">
                  <Heart className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Property Stats */}
            <div className="flex items-center gap-8 text-lg">
              <div className="flex items-center">
                <Bed className="h-5 w-5 mr-2" />
                <span>{property.bedrooms} Bedroom</span>
              </div>
              <div className="flex items-center">
                <Bath className="h-5 w-5 mr-2" />
                <span>{property.bathrooms} Bathroom</span>
              </div>
              <div className="flex items-center">
                <Square className="h-5 w-5 mr-2" />
                <span>{property.area} sq ft</span>
              </div>
            </div>

            <div className="text-4xl font-bold text-primary">
              ${property.price}
              <span className="text-lg font-normal text-gray-600">/month</span>
            </div>
          </div>

          <Separator />

          {/* Description */}
          <div>
            <h2 className="text-2xl font-bold mb-4">Description</h2>
            <div className="prose max-w-none">
              {property.description.split("\n").map((paragraph, index) => (
                <p key={index} className="mb-4 text-gray-700 leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>

          <Separator />

          {/* Amenities */}
          <div>
            <h2 className="text-2xl font-bold mb-4">Amenities</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {property.amenities.map((amenity, index) => (
                <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <amenity.icon className="h-5 w-5 text-primary" />
                  <span>{amenity.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Contact Owner */}
          <Card>
            <CardHeader>
              <CardTitle>Contact Owner</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
                  <span className="font-semibold">{property.owner.name.charAt(0)}</span>
                </div>
                <div>
                  <div className="font-semibold">{property.owner.name}</div>
                  {property.owner.verified && (
                    <Badge variant="secondary" className="text-xs">
                      Verified Owner
                    </Badge>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  <Phone className="h-4 w-4 mr-2" />
                  {property.owner.phone}
                </Button>
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  <Mail className="h-4 w-4 mr-2" />
                  {property.owner.email}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Inquiry Form */}
          <Card>
            <CardHeader>
              <CardTitle>Send Inquiry</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleInquirySubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    value={inquiryForm.name}
                    onChange={(e) => setInquiryForm((prev) => ({ ...prev, name: e.target.value }))}
                    placeholder="Your full name"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={inquiryForm.email}
                    onChange={(e) => setInquiryForm((prev) => ({ ...prev, email: e.target.value }))}
                    placeholder="your@email.com"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={inquiryForm.phone}
                    onChange={(e) => setInquiryForm((prev) => ({ ...prev, phone: e.target.value }))}
                    placeholder="+1 (555) 123-4567"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    value={inquiryForm.message}
                    onChange={(e) => setInquiryForm((prev) => ({ ...prev, message: e.target.value }))}
                    placeholder="I'm interested in this property..."
                    rows={4}
                    required
                  />
                </div>

                <Button type="submit" className="w-full">
                  Send Inquiry
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-3">
                <Button className="w-full" size="lg">
                  Schedule Viewing
                </Button>
                <Button variant="outline" className="w-full bg-transparent">
                  Save to Favorites
                </Button>
                <Button variant="outline" className="w-full bg-transparent">
                  Share Property
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
