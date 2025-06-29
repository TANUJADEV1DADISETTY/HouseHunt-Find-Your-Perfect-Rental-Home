"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Plus, Edit, Trash2, Eye, Home, DollarSign, MapPin, Upload, Mail, Phone, MessageSquare } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

const mockProperties = [
  {
    id: 1,
    title: "Cozy Studio in Queens",
    location: "Queens, New York",
    price: 1400,
    bedrooms: 1,
    bathrooms: 1,
    status: "Available",
    views: 156,
    inquiries: 12,
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=150&h=100&fit=crop",
  },
]

interface Inquiry {
  id: number
  propertyId: number
  propertyTitle: string
  renterName: string
  renterEmail: string
  renterPhone: string
  message: string
  date: string
  status: string
}

export default function OwnerDashboard() {
  const [showAddProperty, setShowAddProperty] = useState(false)
  const [inquiries, setInquiries] = useState<Inquiry[]>([])
  const [newProperty, setNewProperty] = useState({
    title: "",
    location: "",
    price: "",
    bedrooms: "",
    bathrooms: "",
    area: "",
    type: "",
    description: "",
  })

  useEffect(() => {
    // Load inquiries from localStorage
    const savedInquiries = JSON.parse(localStorage.getItem("propertyInquiries") || "[]")
    setInquiries(savedInquiries)
  }, [])

  const handleAddProperty = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Adding property:", newProperty)
    setShowAddProperty(false)
    // Reset form
    setNewProperty({
      title: "",
      location: "",
      price: "",
      bedrooms: "",
      bathrooms: "",
      area: "",
      type: "",
      description: "",
    })
  }

  const markInquiryAsRead = (inquiryId: number) => {
    const updatedInquiries = inquiries.map((inquiry) =>
      inquiry.id === inquiryId ? { ...inquiry, status: "read" } : inquiry,
    )
    setInquiries(updatedInquiries)
    localStorage.setItem("propertyInquiries", JSON.stringify(updatedInquiries))
  }

  const stats = [
    {
      title: "Total Properties",
      value: mockProperties.length,
      icon: Home,
      color: "text-emerald-600",
    },
    {
      title: "Monthly Revenue",
      value: "$1,400",
      icon: DollarSign,
      color: "text-green-600",
    },
    {
      title: "Total Views",
      value: "156",
      icon: Eye,
      color: "text-blue-600",
    },
    {
      title: "New Inquiries",
      value: inquiries.filter((i) => i.status === "new").length,
      icon: MessageSquare,
      color: "text-orange-600",
    },
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold">Owner Dashboard</h1>
          <p className="text-gray-600">Manage your rental properties and inquiries</p>
          <div className="mt-2 p-2 bg-amber-50 border border-amber-200 rounded-md">
            <p className="text-sm text-amber-800">
              <strong>Demo Credentials:</strong> Use email: john.smith@email.com, password: owner123 to test the inquiry
              system
            </p>
          </div>
        </div>

        <Dialog open={showAddProperty} onOpenChange={setShowAddProperty}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add New Property
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Add New Property</DialogTitle>
              <DialogDescription>Fill in the details to list your property for rent</DialogDescription>
            </DialogHeader>

            <form onSubmit={handleAddProperty} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Property Title</Label>
                  <Input
                    id="title"
                    value={newProperty.title}
                    onChange={(e) => setNewProperty((prev) => ({ ...prev, title: e.target.value }))}
                    placeholder="Cozy Studio in Queens"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    value={newProperty.location}
                    onChange={(e) => setNewProperty((prev) => ({ ...prev, location: e.target.value }))}
                    placeholder="Queens, New York"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="price">Monthly Rent ($)</Label>
                  <Input
                    id="price"
                    type="number"
                    value={newProperty.price}
                    onChange={(e) => setNewProperty((prev) => ({ ...prev, price: e.target.value }))}
                    placeholder="1400"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bedrooms">Bedrooms</Label>
                  <Select
                    value={newProperty.bedrooms}
                    onValueChange={(value) => setNewProperty((prev) => ({ ...prev, bedrooms: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1 Bedroom</SelectItem>
                      <SelectItem value="2">2 Bedrooms</SelectItem>
                      <SelectItem value="3">3 Bedrooms</SelectItem>
                      <SelectItem value="4">4+ Bedrooms</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bathrooms">Bathrooms</Label>
                  <Select
                    value={newProperty.bathrooms}
                    onValueChange={(value) => setNewProperty((prev) => ({ ...prev, bathrooms: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1 Bathroom</SelectItem>
                      <SelectItem value="2">2 Bathrooms</SelectItem>
                      <SelectItem value="3">3 Bathrooms</SelectItem>
                      <SelectItem value="4">4+ Bathrooms</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="area">Area (sq ft)</Label>
                  <Input
                    id="area"
                    type="number"
                    value={newProperty.area}
                    onChange={(e) => setNewProperty((prev) => ({ ...prev, area: e.target.value }))}
                    placeholder="450"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="type">Property Type</Label>
                  <Select
                    value={newProperty.type}
                    onValueChange={(value) => setNewProperty((prev) => ({ ...prev, type: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="apartment">Apartment</SelectItem>
                      <SelectItem value="house">House</SelectItem>
                      <SelectItem value="room">Room</SelectItem>
                      <SelectItem value="studio">Studio</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={newProperty.description}
                  onChange={(e) => setNewProperty((prev) => ({ ...prev, description: e.target.value }))}
                  placeholder="Describe your property..."
                  rows={4}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label>Property Images</Label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <Upload className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                  <p className="text-sm text-gray-600">Click to upload images or drag and drop</p>
                  <p className="text-xs text-gray-500">PNG, JPG up to 10MB each</p>
                </div>
              </div>

              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setShowAddProperty(false)}>
                  Cancel
                </Button>
                <Button type="submit">Add Property</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                </div>
                <stat.icon className={`h-8 w-8 ${stat.color}`} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Properties Table */}
        <Card>
          <CardHeader>
            <CardTitle>Your Properties</CardTitle>
            <CardDescription>Manage and monitor your rental properties</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Property</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockProperties.map((property) => (
                  <TableRow key={property.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Image
                          src={property.image || "/placeholder.svg"}
                          alt={property.title}
                          width={60}
                          height={40}
                          className="rounded object-cover"
                        />
                        <div>
                          <div className="font-medium">{property.title}</div>
                          <div className="text-sm text-gray-600 flex items-center">
                            <MapPin className="h-3 w-3 mr-1" />
                            {property.location}
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="font-medium">${property.price}/mo</TableCell>
                    <TableCell>
                      <Badge variant={property.status === "Available" ? "default" : "secondary"}>
                        {property.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="icon" asChild>
                          <Link href={`/properties/${property.id}`}>
                            <Eye className="h-4 w-4" />
                          </Link>
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Inquiries */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Inquiries</CardTitle>
            <CardDescription>Messages from potential renters</CardDescription>
          </CardHeader>
          <CardContent>
            {inquiries.length === 0 ? (
              <div className="text-center py-8">
                <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">No inquiries yet</p>
                <p className="text-sm text-gray-400">Inquiries from renters will appear here</p>
              </div>
            ) : (
              <div className="space-y-4">
                {inquiries.map((inquiry) => (
                  <div
                    key={inquiry.id}
                    className={`p-4 border rounded-lg ${
                      inquiry.status === "new" ? "bg-emerald-50 border-emerald-200" : "bg-gray-50"
                    }`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h4 className="font-medium">{inquiry.renterName}</h4>
                        <p className="text-sm text-gray-600">{inquiry.propertyTitle}</p>
                      </div>
                      {inquiry.status === "new" && (
                        <Badge variant="default" className="bg-emerald-600">
                          New
                        </Badge>
                      )}
                    </div>

                    <p className="text-sm text-gray-700 mb-3">{inquiry.message}</p>

                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1">
                          <Mail className="h-3 w-3" />
                          {inquiry.renterEmail}
                        </div>
                        {inquiry.renterPhone && (
                          <div className="flex items-center gap-1">
                            <Phone className="h-3 w-3" />
                            {inquiry.renterPhone}
                          </div>
                        )}
                      </div>
                      <span>{new Date(inquiry.date).toLocaleDateString()}</span>
                    </div>

                    {inquiry.status === "new" && (
                      <Button
                        size="sm"
                        variant="outline"
                        className="mt-3 bg-transparent"
                        onClick={() => markInquiryAsRead(inquiry.id)}
                      >
                        Mark as Read
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
