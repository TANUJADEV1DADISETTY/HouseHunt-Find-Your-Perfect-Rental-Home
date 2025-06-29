import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, Bed, Bath, Square, Heart } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

const featuredProperties = [
  {
    id: 1,
    title: "Cozy Studio in Queens",
    location: "Queens, New York",
    price: 1400,
    bedrooms: 1,
    bathrooms: 1,
    area: 450,
    image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400&h=300&fit=crop",
    type: "Studio",
    featured: true,
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
    featured: true,
  },
  {
    id: 17,
    title: "2BR in Jacksonville",
    location: "Jacksonville, Florida",
    price: 1200,
    bedrooms: 2,
    bathrooms: 1,
    area: 650,
    image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&h=300&fit=crop",
    type: "Apartment",
    featured: true,
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
    featured: true,
  },
]

export function FeaturedProperties() {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Properties</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover affordable rental properties across the United States
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {featuredProperties.map((property) => (
            <Card key={property.id} className="group hover:shadow-lg transition-shadow">
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
                  <Button size="icon" variant="ghost" className="absolute top-4 right-4 bg-white/80 hover:bg-white">
                    <Heart className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>

              <CardContent className="p-4">
                <div className="space-y-2">
                  <h3 className="font-semibold text-lg line-clamp-1">{property.title}</h3>
                  <div className="flex items-center text-gray-600">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span className="text-sm">{property.location}</span>
                  </div>
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
          ))}
        </div>

        <div className="text-center mt-12">
          <Button size="lg" variant="outline" asChild>
            <Link href="/properties">View All Properties</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
