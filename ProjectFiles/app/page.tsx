import { Hero } from "@/components/hero"
import { FeaturedProperties } from "@/components/featured-properties"
import { SearchSection } from "@/components/search-section"
import { Footer } from "@/components/footer"

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Hero />
      <SearchSection />
      <FeaturedProperties />
      <Footer />
    </div>
  )
}
