import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Home, Users, Shield, Award, Heart, Target } from "lucide-react"
import Link from "next/link"

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">About HouseHunt</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          We're on a mission to make quality housing accessible and affordable for everyone. HouseHunt connects renters
          with property owners across the United States, creating a transparent and trustworthy rental marketplace.
        </p>
      </div>

      {/* Mission & Vision */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-6 w-6 text-primary" />
              Our Mission
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">
              To democratize the rental housing market by providing a platform where everyone can find affordable,
              quality housing regardless of their background or budget. We believe everyone deserves a safe and
              comfortable place to call home.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Heart className="h-6 w-6 text-primary" />
              Our Vision
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">
              To become the most trusted rental platform in America, where property owners and renters can connect with
              confidence, transparency, and mutual respect. We envision a future where finding a home is simple, fair,
              and stress-free.
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Why Choose Us */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold text-center mb-12">Why Choose HouseHunt?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="text-center">
            <CardContent className="pt-6">
              <Home className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Affordable Options</h3>
              <p className="text-sm text-gray-600">
                We focus on budget-friendly properties to help you find a home within your means.
              </p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardContent className="pt-6">
              <Users className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Verified Owners</h3>
              <p className="text-sm text-gray-600">
                All property owners are verified to ensure safe and legitimate rental transactions.
              </p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardContent className="pt-6">
              <Shield className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Secure Platform</h3>
              <p className="text-sm text-gray-600">
                Your personal information and communications are protected with industry-standard security.
              </p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardContent className="pt-6">
              <Award className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="font-semibold mb-2">24/7 Support</h3>
              <p className="text-sm text-gray-600">
                Our dedicated support team is here to help you throughout your rental journey.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Statistics */}
      <div className="bg-emerald-50 rounded-lg p-8 mb-16">
        <h2 className="text-3xl font-bold text-center mb-8">Our Impact</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
          <div>
            <div className="text-3xl font-bold text-primary mb-2">10,000+</div>
            <div className="text-gray-600">Happy Renters</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-primary mb-2">5,000+</div>
            <div className="text-gray-600">Property Owners</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-primary mb-2">50+</div>
            <div className="text-gray-600">Cities Covered</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-primary mb-2">98%</div>
            <div className="text-gray-600">Satisfaction Rate</div>
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold text-center mb-12">Our Story</h2>
        <div className="max-w-4xl mx-auto">
          <p className="text-lg text-gray-600 mb-6">
            HouseHunt was founded in 2020 by a team of housing advocates who experienced firsthand the challenges of
            finding affordable rental housing. After struggling with expensive broker fees, hidden costs, and limited
            options, we decided to create a platform that puts renters first.
          </p>
          <p className="text-lg text-gray-600 mb-6">
            Starting with just a handful of properties in New York, we've grown to serve thousands of renters and
            property owners across the United States. Our platform has facilitated over 15,000 successful rental
            matches, helping families and individuals find homes they can afford.
          </p>
          <p className="text-lg text-gray-600">
            Today, we continue to expand our reach while staying true to our core mission: making housing accessible for
            everyone. We're not just a rental platform – we're a community dedicated to solving America's housing
            affordability crisis, one rental at a time.
          </p>
        </div>
      </div>

      {/* CTA Section */}
      <div className="text-center bg-gray-50 rounded-lg p-8">
        <h2 className="text-3xl font-bold mb-4">Ready to Find Your Home?</h2>
        <p className="text-lg text-gray-600 mb-6">
          Join thousands of renters who have found their perfect home through HouseHunt
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" asChild>
            <Link href="/properties">Browse Properties</Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <Link href="/auth/register">List Your Property</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
