import Link from "next/link"
import { Home, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center space-x-2">
              <Home className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold">HouseHunt</span>
            </Link>
            <p className="text-gray-300 max-w-md">
              Your trusted platform for finding affordable rental properties across the United States. We connect
              renters with property owners to make housing accessible for everyone.
            </p>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4" />
                <span className="text-sm">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4" />
                <span className="text-sm">hello@househunt.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4" />
                <span className="text-sm">123 Main Street, New York, NY 10001</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/properties" className="text-gray-300 hover:text-white transition-colors">
                  Browse Properties
                </Link>
              </li>
              <li>
                <Link href="/auth/register" className="text-gray-300 hover:text-white transition-colors">
                  List Your Property
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-300 hover:text-white transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-300 hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-gray-300 hover:text-white transition-colors">
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* For Renters */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">For Renters</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/dashboard/renter" className="text-gray-300 hover:text-white transition-colors">
                  Renter Dashboard
                </Link>
              </li>
              <li>
                <Link href="/help/renter-guide" className="text-gray-300 hover:text-white transition-colors">
                  Renter Guide
                </Link>
              </li>
              <li>
                <Link href="/help/application-tips" className="text-gray-300 hover:text-white transition-colors">
                  Application Tips
                </Link>
              </li>
              <li>
                <Link href="/help/tenant-rights" className="text-gray-300 hover:text-white transition-colors">
                  Tenant Rights
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-gray-300 hover:text-white transition-colors">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* For Owners */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">For Owners</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/dashboard/owner" className="text-gray-300 hover:text-white transition-colors">
                  Owner Dashboard
                </Link>
              </li>
              <li>
                <Link href="/help/owner-guide" className="text-gray-300 hover:text-white transition-colors">
                  Owner Guide
                </Link>
              </li>
              <li>
                <Link href="/help/listing-tips" className="text-gray-300 hover:text-white transition-colors">
                  Listing Tips
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="text-gray-300 hover:text-white transition-colors">
                  Pricing Plans
                </Link>
              </li>
              <li>
                <Link href="/resources" className="text-gray-300 hover:text-white transition-colors">
                  Resources
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Social Media & Bottom Section */}
        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex space-x-6">
              <Link href="https://facebook.com" className="text-gray-400 hover:text-white transition-colors">
                <Facebook className="h-5 w-5" />
              </Link>
              <Link href="https://twitter.com" className="text-gray-400 hover:text-white transition-colors">
                <Twitter className="h-5 w-5" />
              </Link>
              <Link href="https://instagram.com" className="text-gray-400 hover:text-white transition-colors">
                <Instagram className="h-5 w-5" />
              </Link>
              <Link href="https://linkedin.com" className="text-gray-400 hover:text-white transition-colors">
                <Linkedin className="h-5 w-5" />
              </Link>
            </div>

            <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6">
              <p className="text-gray-400 text-sm">© {new Date().getFullYear()} HouseHunt. All rights reserved.</p>
              <div className="flex space-x-6">
                <Link href="/privacy" className="text-gray-400 hover:text-white text-sm transition-colors">
                  Privacy Policy
                </Link>
                <Link href="/terms" className="text-gray-400 hover:text-white text-sm transition-colors">
                  Terms of Service
                </Link>
                <Link href="/cookies" className="text-gray-400 hover:text-white text-sm transition-colors">
                  Cookie Policy
                </Link>
                <Link href="/accessibility" className="text-gray-400 hover:text-white text-sm transition-colors">
                  Accessibility
                </Link>
              </div>
            </div>
          </div>

          {/* Newsletter Signup */}
          <div className="mt-8 pt-8 border-t border-gray-800">
            <div className="max-w-md mx-auto text-center">
              <h4 className="text-lg font-semibold mb-2">Stay Updated</h4>
              <p className="text-gray-400 text-sm mb-4">
                Get the latest property listings and rental tips delivered to your inbox
              </p>
              <div className="flex space-x-2">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <button className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
