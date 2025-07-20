import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Heart, Eye, MapPin, Clock, CheckCircle, XCircle, AlertCircle } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

const mockBookings = [
  {
    id: 1,
    property: {
      title: "Modern Downtown Apartment",
      location: "Downtown, New York",
      image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=120&h=80&fit=crop",
    },
    status: "Pending",
    appliedDate: "2024-01-15",
    moveInDate: "2024-02-01",
    rent: 2500,
  },
  {
    id: 2,
    property: {
      title: "Cozy Family House",
      location: "Suburbs, California",
      image: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=120&h=80&fit=crop",
    },
    status: "Approved",
    appliedDate: "2024-01-10",
    moveInDate: "2024-01-25",
    rent: 3200,
  },
  {
    id: 3,
    property: {
      title: "Luxury Studio Loft",
      location: "SoHo, New York",
      image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=120&h=80&fit=crop",
    },
    status: "Rejected",
    appliedDate: "2024-01-08",
    moveInDate: "2024-01-20",
    rent: 1800,
  },
]

const mockFavorites = [
  {
    id: 4,
    title: "Spacious Garden Villa",
    location: "Beverly Hills, California",
    price: 4500,
    bedrooms: 4,
    bathrooms: 3,
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=150&h=100&fit=crop",
    savedDate: "2024-01-12",
  },
  {
    id: 5,
    title: "Urban Apartment",
    location: "Brooklyn, New York",
    price: 2200,
    bedrooms: 2,
    bathrooms: 1,
    image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=150&h=100&fit=crop",
    savedDate: "2024-01-10",
  },
]

export default function RenterDashboard() {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Pending":
        return <Clock className="h-4 w-4" />
      case "Approved":
        return <CheckCircle className="h-4 w-4" />
      case "Rejected":
        return <XCircle className="h-4 w-4" />
      default:
        return <AlertCircle className="h-4 w-4" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Pending":
        return "bg-yellow-100 text-yellow-800"
      case "Approved":
        return "bg-green-100 text-green-800"
      case "Rejected":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const stats = [
    {
      title: "Active Applications",
      value: mockBookings.filter((b) => b.status === "Pending").length,
      icon: Clock,
      color: "text-yellow-600",
    },
    {
      title: "Approved Applications",
      value: mockBookings.filter((b) => b.status === "Approved").length,
      icon: CheckCircle,
      color: "text-green-600",
    },
    {
      title: "Saved Properties",
      value: mockFavorites.length,
      icon: Heart,
      color: "text-red-600",
    },
    {
      title: "Properties Viewed",
      value: "24",
      icon: Eye,
      color: "text-blue-600",
    },
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold">Renter Dashboard</h1>
          <p className="text-gray-600">Track your rental applications and saved properties</p>
        </div>

        <Button asChild>
          <Link href="/properties">Browse Properties</Link>
        </Button>
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
        {/* Applications */}
        <Card>
          <CardHeader>
            <CardTitle>My Applications</CardTitle>
            <CardDescription>Track the status of your rental applications</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockBookings.map((booking) => (
                <div key={booking.id} className="flex items-center gap-4 p-4 border rounded-lg">
                  <Image
                    src={booking.property.image || "/placeholder.svg"}
                    alt={booking.property.title}
                    width={80}
                    height={60}
                    className="rounded object-cover"
                  />

                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium truncate">{booking.property.title}</h3>
                    <div className="flex items-center text-sm text-gray-600 mt-1">
                      <MapPin className="h-3 w-3 mr-1" />
                      {booking.property.location}
                    </div>
                    <div className="flex items-center gap-4 mt-2 text-sm">
                      <span>Applied: {booking.appliedDate}</span>
                      <span>Move-in: {booking.moveInDate}</span>
                    </div>
                  </div>

                  <div className="text-right">
                    <div
                      className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(booking.status)}`}
                    >
                      {getStatusIcon(booking.status)}
                      {booking.status}
                    </div>
                    <div className="text-sm font-medium mt-1">${booking.rent}/mo</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Saved Properties */}
        <Card>
          <CardHeader>
            <CardTitle>Saved Properties</CardTitle>
            <CardDescription>Properties you've saved for later</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockFavorites.map((property) => (
                <div key={property.id} className="flex items-center gap-4 p-4 border rounded-lg">
                  <Image
                    src={property.image || "/placeholder.svg"}
                    alt={property.title}
                    width={80}
                    height={60}
                    className="rounded object-cover"
                  />

                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium truncate">{property.title}</h3>
                    <div className="flex items-center text-sm text-gray-600 mt-1">
                      <MapPin className="h-3 w-3 mr-1" />
                      {property.location}
                    </div>
                    <div className="text-sm text-gray-600 mt-1">
                      {property.bedrooms} bed • {property.bathrooms} bath
                    </div>
                    <div className="text-xs text-gray-500 mt-1">Saved on {property.savedDate}</div>
                  </div>

                  <div className="text-right">
                    <div className="text-lg font-bold">${property.price}</div>
                    <div className="text-sm text-gray-600">/month</div>
                    <Button size="sm" className="mt-2" asChild>
                      <Link href={`/properties/${property.id}`}>View</Link>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>Your recent interactions and updates</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
              <Eye className="h-5 w-5 text-blue-600" />
              <div>
                <p className="font-medium">Viewed Modern Downtown Apartment</p>
                <p className="text-sm text-gray-600">2 hours ago</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <div>
                <p className="font-medium">Application approved for Cozy Family House</p>
                <p className="text-sm text-gray-600">1 day ago</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 bg-red-50 rounded-lg">
              <Heart className="h-5 w-5 text-red-600" />
              <div>
                <p className="font-medium">Saved Spacious Garden Villa to favorites</p>
                <p className="text-sm text-gray-600">3 days ago</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
