import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Award, Trophy, Star, Medal, Crown, Zap } from "lucide-react"

const awards = [
  {
    year: "2024",
    title: "Best Rental Platform",
    organization: "PropTech Awards",
    description: "Recognized for innovation in rental property technology and user experience",
    icon: Trophy,
    color: "text-yellow-500",
    category: "Technology",
  },
  {
    year: "2024",
    title: "Customer Choice Award",
    organization: "RentalTech Magazine",
    description: "Voted #1 by renters for ease of use and customer satisfaction",
    icon: Star,
    color: "text-blue-500",
    category: "Customer Service",
  },
  {
    year: "2023",
    title: "Startup of the Year",
    organization: "TechCrunch Disrupt",
    description: "Outstanding achievement in disrupting the traditional rental market",
    icon: Zap,
    color: "text-purple-500",
    category: "Innovation",
  },
  {
    year: "2023",
    title: "Excellence in Housing",
    organization: "National Housing Association",
    description: "Making quality housing more accessible and affordable for everyone",
    icon: Medal,
    color: "text-green-500",
    category: "Social Impact",
  },
  {
    year: "2023",
    title: "Best User Experience",
    organization: "UX Design Awards",
    description: "Outstanding design and user interface in the real estate category",
    icon: Crown,
    color: "text-pink-500",
    category: "Design",
  },
  {
    year: "2022",
    title: "Rising Star Award",
    organization: "Real Estate Innovation Summit",
    description: "Fastest growing rental platform with highest user satisfaction",
    icon: Award,
    color: "text-orange-500",
    category: "Growth",
  },
]

const achievements = [
  { metric: "15,000+", label: "Happy Renters", icon: Star },
  { metric: "5,000+", label: "Property Owners", icon: Trophy },
  { metric: "98%", label: "Satisfaction Rate", icon: Medal },
  { metric: "50+", label: "Cities Served", icon: Award },
]

const recognitions = [
  "Featured in TechCrunch as 'Game-Changing PropTech Startup'",
  "Listed in Forbes '30 Under 30' for Real Estate Innovation",
  "Winner of Google for Startups Accelerator Program",
  "Certified B Corporation for Social and Environmental Performance",
  "ISO 27001 Certified for Information Security Management",
]

export default function AwardsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-12 animate-slide-in-up">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">Awards & Recognition</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          We're honored to be recognized for our commitment to making housing accessible and our innovation in rental
          technology
        </p>
      </div>

      {/* Achievements Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
        {achievements.map((achievement, index) => (
          <Card
            key={index}
            className="text-center hover-lift card-hover animate-bounce-in"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <CardContent className="pt-6">
              <achievement.icon className="h-12 w-12 text-primary mx-auto mb-4 animate-pulse" />
              <div className="text-3xl font-bold text-primary mb-2">{achievement.metric}</div>
              <div className="text-sm text-gray-600">{achievement.label}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Awards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
        {awards.map((award, index) => (
          <Card
            key={index}
            className="hover-lift card-hover animate-slide-in-up"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                  <div className="p-3 bg-gradient-to-br from-amber-100 to-yellow-100 rounded-full">
                    <award.icon className={`h-8 w-8 ${award.color}`} />
                  </div>
                  <div>
                    <Badge variant="outline" className="mb-2 text-xs">
                      {award.category}
                    </Badge>
                    <h3 className="font-bold text-lg text-primary">{award.title}</h3>
                  </div>
                </div>
                <Badge className="bg-gradient-to-r from-amber-600 to-yellow-700 text-white">{award.year}</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <p className="font-medium text-gray-800 mb-3">{award.organization}</p>
              <p className="text-gray-600 text-sm leading-relaxed">{award.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recognition Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="hover-lift animate-slide-in-up" style={{ animationDelay: "0.3s" }}>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Award className="h-5 w-5 text-primary" />
              <span>Media Recognition</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recognitions.map((recognition, index) => (
                <div
                  key={index}
                  className="flex items-start space-x-3 p-3 bg-gradient-to-r from-amber-50 to-yellow-50 rounded-lg hover:from-amber-100 hover:to-yellow-100 transition-all duration-300"
                >
                  <Star className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-gray-700">{recognition}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="hover-lift animate-slide-in-up" style={{ animationDelay: "0.4s" }}>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Trophy className="h-5 w-5 text-primary" />
              <span>Our Mission</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p className="text-gray-700 leading-relaxed">
                These awards represent more than recognition – they validate our mission to make quality housing
                accessible to everyone, regardless of budget or background.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Every award motivates us to continue innovating and improving the rental experience for both renters and
                property owners.
              </p>
              <div className="bg-gradient-to-r from-amber-100 to-yellow-100 p-4 rounded-lg">
                <h4 className="font-semibold text-primary mb-2">Looking Forward</h4>
                <p className="text-sm text-gray-700">
                  We're committed to maintaining our high standards while expanding our reach to help even more people
                  find their perfect home.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Call to Action */}
      <div className="mt-16 text-center bg-gradient-to-r from-amber-50 to-yellow-50 rounded-2xl p-8 animate-slide-in-up">
        <Trophy className="h-16 w-16 text-primary mx-auto mb-4 animate-float" />
        <h2 className="text-3xl font-bold mb-4 gradient-text">Join Our Award-Winning Platform</h2>
        <p className="text-lg text-gray-600 mb-6 max-w-2xl mx-auto">
          Experience the difference that award-winning service makes in your rental journey
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            size="lg"
            className="bg-gradient-to-r from-amber-600 to-yellow-700 hover:from-amber-700 hover:to-yellow-800 transform hover:scale-105 transition-all duration-300"
          >
            Start Your Search
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="hover:bg-amber-50 hover:border-amber-300 transform hover:scale-105 transition-all duration-300 bg-transparent"
          >
            List Your Property
          </Button>
        </div>
      </div>
    </div>
  )
}
