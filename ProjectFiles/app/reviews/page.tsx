import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, Quote, ThumbsUp, MessageCircle, Filter } from "lucide-react"
import Image from "next/image"

const reviews = [
  {
    id: 1,
    name: "Sarah Johnson",
    avatar: "/placeholder.svg?height=60&width=60",
    rating: 5,
    date: "2 weeks ago",
    property: "Modern Downtown Apartment",
    location: "New York, NY",
    review:
      "Amazing experience! The apartment was exactly as described and the owner was incredibly responsive. The location is perfect for commuting and the amenities are top-notch. Highly recommend!",
    helpful: 24,
    verified: true,
    tags: ["Clean", "Great Location", "Responsive Owner"],
  },
  {
    id: 2,
    name: "Michael Chen",
    avatar: "/placeholder.svg?height=60&width=60",
    rating: 5,
    date: "1 month ago",
    property: "Cozy Studio in Queens",
    location: "Queens, NY",
    review:
      "Perfect for a young professional like me. The studio is well-designed and makes great use of space. The neighborhood is quiet and safe. The rental process was smooth and hassle-free.",
    helpful: 18,
    verified: true,
    tags: ["Good Value", "Safe Area", "Well-designed"],
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    avatar: "/placeholder.svg?height=60&width=60",
    rating: 4,
    date: "3 weeks ago",
    property: "Family House in Sacramento",
    location: "Sacramento, CA",
    review:
      "Great house for our family! Spacious rooms and a nice backyard for the kids. The only minor issue was the kitchen could use some updates, but overall we're very happy with our choice.",
    helpful: 15,
    verified: true,
    tags: ["Family Friendly", "Spacious", "Good for Kids"],
  },
  {
    id: 4,
    name: "David Park",
    avatar: "/placeholder.svg?height=60&width=60",
    rating: 5,
    date: "1 week ago",
    property: "Shared Room in Austin",
    location: "Austin, TX",
    review:
      "As a student, this was exactly what I needed. Affordable, close to campus, and my roommates are great. The owner was very understanding and helpful throughout the process.",
    helpful: 12,
    verified: true,
    tags: ["Student Friendly", "Affordable", "Near Campus"],
  },
  {
    id: 5,
    name: "Lisa Thompson",
    avatar: "/placeholder.svg?height=60&width=60",
    rating: 5,
    date: "2 months ago",
    property: "Luxury Apartment in Tampa",
    location: "Tampa, FL",
    review:
      "Absolutely love this place! The apartment has all modern amenities and the building facilities are excellent. The management is professional and maintenance requests are handled quickly.",
    helpful: 31,
    verified: true,
    tags: ["Luxury", "Modern", "Great Management"],
  },
  {
    id: 6,
    name: "James Wilson",
    avatar: "/placeholder.svg?height=60&width=60",
    rating: 4,
    date: "3 months ago",
    property: "House in Columbus",
    location: "Columbus, OH",
    review:
      "Solid rental experience. The house is in good condition and the neighborhood is quiet. Parking is convenient and the price is fair for the area. Would recommend to others.",
    helpful: 9,
    verified: true,
    tags: ["Good Condition", "Quiet", "Fair Price"],
  },
]

const stats = [
  { label: "Total Reviews", value: "12,847", icon: MessageCircle },
  { label: "Average Rating", value: "4.8", icon: Star },
  { label: "Verified Reviews", value: "98%", icon: ThumbsUp },
  { label: "Response Rate", value: "24hrs", icon: MessageCircle },
]

export default function ReviewsPage() {
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star key={i} className={`h-4 w-4 ${i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`} />
    ))
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-12 animate-slide-in-up">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">What Our Community Says</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Real reviews from real renters who found their perfect home through HouseHunt
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
        {stats.map((stat, index) => (
          <Card
            key={index}
            className="text-center hover-lift card-hover animate-bounce-in"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <CardContent className="pt-6">
              <stat.icon className="h-8 w-8 text-primary mx-auto mb-2" />
              <div className="text-3xl font-bold text-primary mb-1">{stat.value}</div>
              <div className="text-sm text-gray-600">{stat.label}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-8 animate-slide-in-up" style={{ animationDelay: "0.2s" }}>
        <Button
          variant="outline"
          className="hover:bg-pink-50 hover:border-pink-300 transition-all duration-300 bg-transparent"
        >
          <Filter className="h-4 w-4 mr-2" />
          All Reviews
        </Button>
        <Button
          variant="outline"
          className="hover:bg-pink-50 hover:border-pink-300 transition-all duration-300 bg-transparent"
        >
          5 Stars
        </Button>
        <Button
          variant="outline"
          className="hover:bg-pink-50 hover:border-pink-300 transition-all duration-300 bg-transparent"
        >
          4 Stars
        </Button>
        <Button
          variant="outline"
          className="hover:bg-pink-50 hover:border-pink-300 transition-all duration-300 bg-transparent"
        >
          Verified Only
        </Button>
        <Button
          variant="outline"
          className="hover:bg-pink-50 hover:border-pink-300 transition-all duration-300 bg-transparent"
        >
          Recent
        </Button>
      </div>

      {/* Reviews Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {reviews.map((review, index) => (
          <Card
            key={review.id}
            className="hover-lift card-hover animate-slide-in-up"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-4">
                  <Image
                    src={review.avatar || "/placeholder.svg"}
                    alt={review.name}
                    width={60}
                    height={60}
                    className="rounded-full ring-2 ring-pink-200 hover-rotate"
                  />
                  <div>
                    <div className="flex items-center space-x-2">
                      <h3 className="font-semibold">{review.name}</h3>
                      {review.verified && (
                        <Badge variant="secondary" className="bg-green-100 text-green-800 text-xs">
                          Verified
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center space-x-1 mt-1">{renderStars(review.rating)}</div>
                    <p className="text-sm text-gray-500 mt-1">{review.date}</p>
                  </div>
                </div>
                <Quote className="h-6 w-6 text-pink-300" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <h4 className="font-medium text-primary">{review.property}</h4>
                <p className="text-sm text-gray-600">{review.location}</p>
              </div>

              <p className="text-gray-700 mb-4 leading-relaxed">{review.review}</p>

              <div className="flex flex-wrap gap-2 mb-4">
                {review.tags.map((tag, tagIndex) => (
                  <Badge
                    key={tagIndex}
                    variant="outline"
                    className="text-xs hover:bg-pink-50 transition-colors duration-200"
                  >
                    {tag}
                  </Badge>
                ))}
              </div>

              <div className="flex items-center justify-between text-sm text-gray-500">
                <div className="flex items-center space-x-1 hover:text-pink-600 cursor-pointer transition-colors duration-200">
                  <ThumbsUp className="h-4 w-4" />
                  <span>{review.helpful} found this helpful</span>
                </div>
                <Button variant="ghost" size="sm" className="text-pink-600 hover:bg-pink-50">
                  Reply
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Load More */}
      <div className="text-center mt-12">
        <Button
          size="lg"
          variant="outline"
          className="hover:bg-pink-50 hover:border-pink-300 transform hover:scale-105 transition-all duration-300 bg-transparent"
        >
          Load More Reviews
        </Button>
      </div>

      {/* CTA Section */}
      <div className="mt-16 text-center bg-gradient-to-r from-pink-50 to-purple-50 rounded-2xl p-8 animate-slide-in-up">
        <h2 className="text-3xl font-bold mb-4 gradient-text">Share Your Experience</h2>
        <p className="text-lg text-gray-600 mb-6">
          Help others find their perfect home by sharing your rental experience
        </p>
        <Button
          size="lg"
          className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 transform hover:scale-105 transition-all duration-300"
        >
          Write a Review
        </Button>
      </div>
    </div>
  )
}
