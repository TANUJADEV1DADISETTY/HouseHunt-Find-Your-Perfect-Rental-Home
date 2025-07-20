"use client"

import { useState, useEffect, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { MapPin, Bed, Bath, Square, Heart, Filter, Grid, List, Share2 } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { useToast } from "@/hooks/use-toast"

const properties = [
  // Studio Properties
  {
    id: 1,
    title: "Cozy Studio in Queens",
    location: "Queens, New York",
    price: 1400,
    bedrooms: 1,
    bathrooms: 1,
    area: 450,
    image: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=400&h=300&fit=crop",
    type: "Studio",
    description: "Affordable studio apartment with basic amenities in a quiet neighborhood.",
  },
  {
    id: 6,
    title: "Studio in Fresno",
    location: "Fresno, California",
    price: 900,
    bedrooms: 1,
    bathrooms: 1,
    area: 400,
    image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400&h=300&fit=crop",
    type: "Studio",
    description: "Basic studio apartment in central Fresno.",
  },
  {
    id: 11,
    title: "Studio in Houston",
    location: "Houston, Texas",
    price: 800,
    bedrooms: 1,
    bathrooms: 1,
    area: 400,
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400&h=300&fit=crop",
    type: "Studio",
    description: "Compact studio near downtown Houston.",
  },
  {
    id: 16,
    title: "Studio in Tampa",
    location: "Tampa, Florida",
    price: 1100,
    bedrooms: 1,
    bathrooms: 1,
    area: 450,
    image: "https://images.unsplash.com/photo-1449844908441-8829872d2607?w=400&h=300&fit=crop",
    type: "Studio",
    description: "Studio apartment near Tampa Bay.",
  },

  // Room Properties
  {
    id: 2,
    title: "Shared Room in Brooklyn",
    location: "Brooklyn, New York",
    price: 800,
    bedrooms: 1,
    bathrooms: 1,
    area: 200,
    image: "https://images.unsplash.com/photo-1605146769289-440113cc3d00?w=400&h=300&fit=crop",
    type: "Room",
    description: "Budget-friendly shared room in a friendly household.",
  },
  {
    id: 8,
    title: "Room in Shared House",
    location: "San Jose, California",
    price: 1100,
    bedrooms: 1,
    bathrooms: 1,
    area: 300,
    image: "https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=400&h=300&fit=crop",
    type: "Room",
    description: "Private room in shared house with working professionals.",
  },
  {
    id: 14,
    title: "Room in Austin",
    location: "Austin, Texas",
    price: 700,
    bedrooms: 1,
    bathrooms: 1,
    area: 250,
    image: "https://images.unsplash.com/photo-1613977257363-707ba9348227?w=400&h=300&fit=crop",
    type: "Room",
    description: "Shared room near UT campus.",
  },
  {
    id: 18,
    title: "Room in Orlando",
    location: "Orlando, Florida",
    price: 600,
    bedrooms: 1,
    bathrooms: 1,
    area: 200,
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=400&h=300&fit=crop",
    type: "Room",
    description: "Budget room near theme parks.",
  },

  // Apartment Properties
  {
    id: 3,
    title: "1BR Apartment in Bronx",
    location: "Bronx, New York",
    price: 1200,
    bedrooms: 1,
    bathrooms: 1,
    area: 600,
    image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400&h=300&fit=crop",
    type: "Apartment",
    description: "Simple one-bedroom apartment with essential amenities.",
  },
  {
    id: 4,
    title: "2BR Family Apartment",
    location: "Staten Island, New York",
    price: 1800,
    bedrooms: 2,
    bathrooms: 1,
    area: 800,
    image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400&h=300&fit=crop",
    type: "Apartment",
    description: "Spacious family apartment with good public transport connections.",
  },
  {
    id: 7,
    title: "2BR Apartment in Sacramento",
    location: "Sacramento, California",
    price: 1600,
    bedrooms: 2,
    bathrooms: 1,
    area: 750,
    image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&h=300&fit=crop",
    type: "Apartment",
    description: "Comfortable apartment near downtown Sacramento.",
  },
  {
    id: 10,
    title: "1BR in Bakersfield",
    location: "Bakersfield, California",
    price: 1000,
    bedrooms: 1,
    bathrooms: 1,
    area: 550,
    image: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=400&h=300&fit=crop",
    type: "Apartment",
    description: "Affordable one-bedroom with air conditioning.",
  },

  // House Properties
  {
    id: 5,
    title: "Small House in Queens",
    location: "Queens, New York",
    price: 2200,
    bedrooms: 3,
    bathrooms: 2,
    area: 1100,
    image: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=400&h=300&fit=crop",
    type: "House",
    description: "Modest family house with small backyard.",
  },
  {
    id: 9,
    title: "3BR House in Stockton",
    location: "Stockton, California",
    price: 2000,
    bedrooms: 3,
    bathrooms: 2,
    area: 1200,
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400&h=300&fit=crop",
    type: "House",
    description: "Family house with garage and small garden.",
  },
  {
    id: 12,
    title: "2BR Apartment in Dallas",
    location: "Dallas, Texas",
    price: 1300,
    bedrooms: 2,
    bathrooms: 1,
    area: 700,
    image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&h=300&fit=crop",
    type: "Apartment",
    description: "Well-maintained apartment with pool access.",
  },
  {
    id: 13,
    title: "3BR House in San Antonio",
    location: "San Antonio, Texas",
    price: 1500,
    bedrooms: 3,
    bathrooms: 2,
    area: 1000,
    image: "https://images.unsplash.com/photo-1449844908441-8829872d2607?w=400&h=300&fit=crop",
    type: "House",
    description: "Single-story house with covered patio.",
  },
  {
    id: 15,
    title: "1BR in Fort Worth",
    location: "Fort Worth, Texas",
    price: 950,
    bedrooms: 1,
    bathrooms: 1,
    area: 500,
    image: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=400&h=300&fit=crop",
    type: "Apartment",
    description: "Simple apartment with basic amenities.",
  },
  {
    id: 17,
    title: "2BR in Jacksonville",
    location: "Jacksonville, Florida",
    price: 1200,
    bedrooms: 2,
    bathrooms: 1,
    area: 650,
    image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400&h=300&fit=crop",
    type: "Apartment",
    description: "Apartment with balcony and parking space.",
  },
  {
    id: 19,
    title: "3BR House in Tallahassee",
    location: "Tallahassee, Florida",
    price: 1600,
    bedrooms: 3,
    bathrooms: 2,
    area: 950,
    image: "https://images.unsplash.com/photo-1449844908441-8829872d2607?w=400&h=300&fit=crop",
    type: "House",
    description: "House near Florida State University.",
  },
  {
    id: 20,
    title: "1BR in Gainesville",
    location: "Gainesville, Florida",
    price: 800,
    bedrooms: 1,
    bathrooms: 1,
    area: 500,
    image: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=400&h=300&fit=crop",
    type: "Apartment",
    description: "Student-friendly apartment near UF.",
  },
  {
    id: 26,
    title: "Studio in Columbus",
    location: "Columbus, Ohio",
    price: 800,
    bedrooms: 1,
    bathrooms: 1,
    area: 350,
    image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=400&h=300&fit=crop",
    type: "Studio",
    description: "Compact studio with modern amenities.",
  },
]

export default function PropertiesPage() {
  const searchParams = useSearchParams()
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [priceRange, setPriceRange] = useState([400, 3000])
  const [showFilters, setShowFilters] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [propertyType, setPropertyType] = useState("all")
  const [bedrooms, setBedrooms] = useState("any")
  const [favorites, setFavorites] = useState<number[]>([])
  const { toast } = useToast()

  // Initialize filters from URL params only once
  useEffect(() => {
    const locationParam = searchParams.get("location")
    const typeParam = searchParams.get("type")
    const bedroomsParam = searchParams.get("bedrooms")
    const minPriceParam = searchParams.get("minPrice")
    const maxPriceParam = searchParams.get("maxPrice")

    if (locationParam) setSearchTerm(locationParam)
    if (typeParam) setPropertyType(typeParam)
    if (bedroomsParam) setBedrooms(bedroomsParam)
    if (minPriceParam && maxPriceParam) {
      setPriceRange([Number.parseInt(minPriceParam), Number.parseInt(maxPriceParam)])
    }

    // Load favorites from localStorage
    const savedFavorites = localStorage.getItem("favorites")
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites))
    }
  }, [])

  // Use useMemo to compute filtered properties
  const filteredProperties = useMemo(() => {
    let filtered = [...properties]

    // Apply search term filter
    if (searchTerm) {
      filtered = filtered.filter(
        (p) =>
          p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          p.location.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    // Apply property type filter
    if (propertyType && propertyType !== "all") {
      filtered = filtered.filter((p) => p.type.toLowerCase() === propertyType.toLowerCase())
    }

    // Apply bedrooms filter
    if (bedrooms && bedrooms !== "any") {
      filtered = filtered.filter((p) => p.bedrooms.toString() === bedrooms)
    }

    // Apply price range filter
    filtered = filtered.filter((p) => p.price >= priceRange[0] && p.price <= priceRange[1])

    return filtered
  }, [searchTerm, propertyType, bedrooms, priceRange])

  const toggleFavorite = (propertyId: number) => {
    const newFavorites = favorites.includes(propertyId)
      ? favorites.filter((id) => id !== propertyId)
      : [...favorites, propertyId]

    setFavorites(newFavorites)
    localStorage.setItem("favorites", JSON.stringify(newFavorites))

    toast({
      title: favorites.includes(propertyId) ? "Removed from favorites" : "Added to favorites",
      description: favorites.includes(propertyId)
        ? "Property removed from your favorites list"
        : "Property saved to your favorites list",
    })
  }

  const shareProperty = (property: (typeof properties)[0]) => {
    if (navigator.share) {
      navigator.share({
        title: property.title,
        text: `Check out this property: ${property.title} in ${property.location}`,
        url: `${window.location.origin}/properties/${property.id}`,
      })
    } else {
      navigator.clipboard.writeText(`${window.location.origin}/properties/${property.id}`)
      toast({
        title: "Link copied!",
        description: "Property link has been copied to your clipboard",
      })
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Filters Sidebar */}
        <div className={`lg:w-80 ${showFilters ? "block" : "hidden lg:block"}`}>
          <Card className="sticky top-4">
            <CardHeader>
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Filters</h3>
                <Button variant="ghost" size="sm" className="lg:hidden" onClick={() => setShowFilters(false)}>
                  ×
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Location */}
              <div className="space-y-2">
                <Label>Location</Label>
                <Input
                  placeholder="Enter city or area"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              {/* Property Type */}
              <div className="space-y-2">
                <Label>Property Type</Label>
                <Select value={propertyType} onValueChange={setPropertyType}>
                  <SelectTrigger>
                    <SelectValue placeholder="All types" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="apartment">Apartment</SelectItem>
                    <SelectItem value="house">House</SelectItem>
                    <SelectItem value="room">Room</SelectItem>
                    <SelectItem value="studio">Studio</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Bedrooms */}
              <div className="space-y-2">
                <Label>Bedrooms</Label>
                <Select value={bedrooms} onValueChange={setBedrooms}>
                  <SelectTrigger>
                    <SelectValue placeholder="Any" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="any">Any</SelectItem>
                    <SelectItem value="1">1 Bedroom</SelectItem>
                    <SelectItem value="2">2 Bedrooms</SelectItem>
                    <SelectItem value="3">3 Bedrooms</SelectItem>
                    <SelectItem value="4">4+ Bedrooms</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Price Range */}
              <div className="space-y-4">
                <Label>
                  Price Range: ${priceRange[0]} - ${priceRange[1]}
                </Label>
                <Slider
                  value={priceRange}
                  onValueChange={setPriceRange}
                  max={3000}
                  min={400}
                  step={50}
                  className="w-full"
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <div>
              <h1 className="text-2xl font-bold">Properties for Rent</h1>
              <p className="text-gray-600">{filteredProperties.length} properties found</p>
            </div>

            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm" className="lg:hidden" onClick={() => setShowFilters(true)}>
                <Filter className="h-4 w-4 mr-2" />
                Filters
              </Button>

              <div className="flex items-center border rounded-lg">
                <Button
                  variant={viewMode === "grid" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                >
                  <Grid className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Properties Grid/List */}
          <div className={viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6" : "space-y-6"}>
            {filteredProperties.map((property) => (
              <PropertyCard
                key={property.id}
                property={property}
                viewMode={viewMode}
                isFavorite={favorites.includes(property.id)}
                onToggleFavorite={() => toggleFavorite(property.id)}
                onShare={() => shareProperty(property)}
              />
            ))}
          </div>

          {filteredProperties.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No properties found matching your criteria.</p>
              <p className="text-gray-400">Try adjusting your filters to see more results.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function PropertyCard({
  property,
  viewMode,
  isFavorite,
  onToggleFavorite,
  onShare,
}: {
  property: (typeof properties)[0]
  viewMode: "grid" | "list"
  isFavorite: boolean
  onToggleFavorite: () => void
  onShare: () => void
}) {
  if (viewMode === "list") {
    return (
      <Card className="overflow-hidden">
        <div className="flex flex-col md:flex-row">
          <div className="md:w-80 relative">
            <Image
              src={property.image || "/placeholder.svg"}
              alt={property.title}
              width={400}
              height={300}
              className="w-full h-48 md:h-full object-cover"
            />
            <div className="absolute top-4 left-4">
              <Badge variant="secondary">{property.type}</Badge>
            </div>
            <div className="absolute top-4 right-4 flex gap-2">
              <Button size="icon" variant="ghost" className="bg-white/80 hover:bg-white" onClick={onShare}>
                <Share2 className="h-4 w-4" />
              </Button>
              <Button size="icon" variant="ghost" className="bg-white/80 hover:bg-white" onClick={onToggleFavorite}>
                <Heart className={`h-4 w-4 ${isFavorite ? "fill-red-500 text-red-500" : ""}`} />
              </Button>
            </div>
          </div>

          <div className="flex-1 p-6">
            <div className="flex flex-col h-full">
              <div className="flex-1">
                <h3 className="text-xl font-semibold mb-2">{property.title}</h3>
                <div className="flex items-center text-gray-600 mb-2">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span>{property.location}</span>
                </div>
                <p className="text-gray-600 mb-4">{property.description}</p>

                <div className="flex items-center gap-6 text-sm text-gray-600 mb-4">
                  <div className="flex items-center">
                    <Bed className="h-4 w-4 mr-1" />
                    <span>{property.bedrooms} bed</span>
                  </div>
                  <div className="flex items-center">
                    <Bath className="h-4 w-4 mr-1" />
                    <span>{property.bathrooms} bath</span>
                  </div>
                  <div className="flex items-center">
                    <Square className="h-4 w-4 mr-1" />
                    <span>{property.area} sq ft</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="text-2xl font-bold text-primary">
                  ${property.price}
                  <span className="text-sm font-normal text-gray-600">/month</span>
                </div>
                <Button asChild>
                  <Link href={`/properties/${property.id}`}>View Details</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Card>
    )
  }

  return (
    <Card className="group hover:shadow-lg transition-shadow">
      <CardHeader className="p-0">
        <div className="relative overflow-hidden rounded-t-lg">
          <Image
            src={property.image || "/placeholder.svg"}
            alt={property.title}
            width={400}
            height={300}
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute top-4 left-4">
            <Badge variant="secondary">{property.type}</Badge>
          </div>
          <div className="absolute top-4 right-4 flex gap-2">
            <Button size="icon" variant="ghost" className="bg-white/80 hover:bg-white" onClick={onShare}>
              <Share2 className="h-4 w-4" />
            </Button>
            <Button size="icon" variant="ghost" className="bg-white/80 hover:bg-white" onClick={onToggleFavorite}>
              <Heart className={`h-4 w-4 ${isFavorite ? "fill-red-500 text-red-500" : ""}`} />
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-4">
        <div className="space-y-2">
          <h3 className="font-semibold text-lg line-clamp-1">{property.title}</h3>
          <div className="flex items-center text-gray-600">
            <MapPin className="h-4 w-4 mr-1" />
            <span className="text-sm">{property.location}</span>
          </div>
          <p className="text-sm text-gray-600 line-clamp-2">{property.description}</p>
          <div className="flex items-center justify-between text-sm text-gray-600">
            <div className="flex items-center gap-4">
              <div className="flex items-center">
                <Bed className="h-4 w-4 mr-1" />
                <span>{property.bedrooms}</span>
              </div>
              <div className="flex items-center">
                <Bath className="h-4 w-4 mr-1" />
                <span>{property.bathrooms}</span>
              </div>
              <div className="flex items-center">
                <Square className="h-4 w-4 mr-1" />
                <span>{property.area} sq ft</span>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold text-primary">
              ${property.price}
              <span className="text-sm font-normal text-gray-600">/month</span>
            </div>
          </div>
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0">
        <Button asChild className="w-full">
          <Link href={`/properties/${property.id}`}>View Details</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
