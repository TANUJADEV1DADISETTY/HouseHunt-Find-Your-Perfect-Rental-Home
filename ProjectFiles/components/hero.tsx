import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, MapPin, Sparkles, Heart } from "lucide-react"
import Link from "next/link"

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-pink-500 via-rose-500 to-purple-600 text-white animate-gradient">
      {/* Floating elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 animate-float">
          <Heart className="h-8 w-8 text-pink-200 opacity-60" />
        </div>
        <div className="absolute top-40 right-20 animate-float" style={{ animationDelay: "1s" }}>
          <Sparkles className="h-6 w-6 text-purple-200 opacity-60" />
        </div>
        <div className="absolute bottom-32 left-1/4 animate-float" style={{ animationDelay: "2s" }}>
          <div className="w-4 h-4 bg-pink-300 rounded-full opacity-40"></div>
        </div>
        <div className="absolute top-1/3 right-1/3 animate-float" style={{ animationDelay: "0.5s" }}>
          <div className="w-6 h-6 bg-purple-300 rounded-full opacity-30"></div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-20 md:py-32 relative z-10">
        <div className="max-w-4xl mx-auto text-left">
          <div className="animate-slide-in-up">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Find Your Perfect
              <span className="block gradient-text">Dream Home</span>
            </h1>
            <p
              className="text-xl md:text-2xl mb-8 text-pink-100 animate-slide-in-up"
              style={{ animationDelay: "0.2s" }}
            >
              Discover thousands of beautiful rental properties from trusted owners
            </p>
          </div>

          {/* Quick Search */}
          <div
            className="glass-effect rounded-2xl p-6 md:p-8 shadow-2xl max-w-2xl animate-bounce-in hover-glow"
            style={{ animationDelay: "0.4s" }}
          >
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <MapPin className="absolute left-3 top-3 h-5 w-5 text-pink-400" />
                <Input
                  placeholder="Enter location..."
                  className="pl-10 h-12 text-gray-900 border-pink-200 focus:border-pink-400 focus:ring-pink-400 transition-all duration-300"
                />
              </div>
              <Button
                size="lg"
                className="h-12 px-8 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 transform hover:scale-105 transition-all duration-300 animate-pulse-glow"
                asChild
              >
                <Link href="/properties">
                  <Search className="mr-2 h-5 w-5" />
                  Search Properties
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-16 fill-white">
          <path
            d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
            opacity=".25"
          ></path>
          <path
            d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z"
            opacity=".5"
          ></path>
          <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"></path>
        </svg>
      </div>
    </section>
  )
}
