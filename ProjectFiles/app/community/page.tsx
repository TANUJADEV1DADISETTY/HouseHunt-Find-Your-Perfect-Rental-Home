import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Users, MessageSquare, Calendar, MapPin, Heart, Share2, Plus, TrendingUp } from "lucide-react"

const communityPosts = [
  {
    id: 1,
    author: "Sarah M.",
    avatar: "/placeholder.svg?height=40&width=40",
    time: "2 hours ago",
    location: "New York, NY",
    title: "Tips for First-Time Renters in NYC",
    content:
      "Just moved to NYC and learned so much during my apartment hunt! Here are my top 5 tips for fellow first-timers...",
    likes: 24,
    comments: 8,
    tags: ["Tips", "NYC", "First-Time"],
    trending: true,
  },
  {
    id: 2,
    author: "Mike Chen",
    avatar: "/placeholder.svg?height=40&width=40",
    time: "5 hours ago",
    location: "San Francisco, CA",
    title: "Roommate Wanted - Tech Professional",
    content:
      "Looking for a clean, responsible roommate to share a beautiful 2BR apartment in SOMA. Great for tech workers!",
    likes: 12,
    comments: 15,
    tags: ["Roommate", "Tech", "SOMA"],
    trending: false,
  },
  {
    id: 3,
    author: "Emily R.",
    avatar: "/placeholder.svg?height=40&width=40",
    time: "1 day ago",
    location: "Austin, TX",
    title: "Best Neighborhoods for Students",
    content:
      "After living in Austin for 3 years, here's my guide to the best student-friendly neighborhoods near UT...",
    likes: 45,
    comments: 22,
    tags: ["Students", "Austin", "Neighborhoods"],
    trending: true,
  },
  {
    id: 4,
    author: "David L.",
    avatar: "/placeholder.svg?height=40&width=40",
    time: "2 days ago",
    location: "Chicago, IL",
    title: "Winter Rental Preparation Checklist",
    content:
      "Chicago winters are no joke! Here's everything you need to know about preparing your rental for the cold season...",
    likes: 31,
    comments: 12,
    tags: ["Winter", "Chicago", "Preparation"],
    trending: false,
  },
]

const upcomingEvents = [
  {
    id: 1,
    title: "Virtual Rental Fair",
    date: "March 15, 2024",
    time: "2:00 PM EST",
    attendees: 234,
    type: "Virtual",
  },
  {
    id: 2,
    title: "First-Time Renter Workshop",
    date: "March 20, 2024",
    time: "6:00 PM EST",
    attendees: 89,
    type: "Workshop",
  },
  {
    id: 3,
    title: "NYC Meetup - Coffee & Connections",
    date: "March 25, 2024",
    time: "10:00 AM EST",
    attendees: 45,
    type: "Meetup",
  },
]

const communityStats = [
  { label: "Active Members", value: "15,247", icon: Users },
  { label: "Posts This Week", value: "342", icon: MessageSquare },
  { label: "Events Hosted", value: "128", icon: Calendar },
  { label: "Cities Connected", value: "50+", icon: MapPin },
]

export default function CommunityPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-12 animate-slide-in-up">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">HouseHunt Community</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Connect with fellow renters, share experiences, and get advice from our vibrant community
        </p>
      </div>

      {/* Community Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
        {communityStats.map((stat, index) => (
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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Feed */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between animate-slide-in-up">
            <h2 className="text-2xl font-bold">Community Feed</h2>
            <Button className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 transform hover:scale-105 transition-all duration-300">
              <Plus className="h-4 w-4 mr-2" />
              New Post
            </Button>
          </div>

          {communityPosts.map((post, index) => (
            <Card
              key={post.id}
              className="hover-lift card-hover animate-slide-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <Avatar className="ring-2 ring-pink-200 hover-rotate">
                      <AvatarImage src={post.avatar || "/placeholder.svg"} />
                      <AvatarFallback className="bg-gradient-to-br from-pink-400 to-purple-500 text-white">
                        {post.author.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="flex items-center space-x-2">
                        <h3 className="font-semibold">{post.author}</h3>
                        {post.trending && (
                          <Badge className="bg-gradient-to-r from-pink-500 to-purple-600 text-white text-xs">
                            <TrendingUp className="h-3 w-3 mr-1" />
                            Trending
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center space-x-2 text-sm text-gray-500">
                        <span>{post.time}</span>
                        <span>•</span>
                        <div className="flex items-center space-x-1">
                          <MapPin className="h-3 w-3" />
                          <span>{post.location}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <h4 className="font-semibold text-lg mb-2 text-primary">{post.title}</h4>
                <p className="text-gray-700 mb-4 leading-relaxed">{post.content}</p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {post.tags.map((tag, tagIndex) => (
                    <Badge
                      key={tagIndex}
                      variant="outline"
                      className="text-xs hover:bg-pink-50 transition-colors duration-200"
                    >
                      #{tag}
                    </Badge>
                  ))}
                </div>

                <div className="flex items-center justify-between text-sm text-gray-500">
                  <div className="flex items-center space-x-4">
                    <button className="flex items-center space-x-1 hover:text-pink-600 transition-colors duration-200">
                      <Heart className="h-4 w-4" />
                      <span>{post.likes}</span>
                    </button>
                    <button className="flex items-center space-x-1 hover:text-pink-600 transition-colors duration-200">
                      <MessageSquare className="h-4 w-4" />
                      <span>{post.comments}</span>
                    </button>
                    <button className="flex items-center space-x-1 hover:text-pink-600 transition-colors duration-200">
                      <Share2 className="h-4 w-4" />
                      <span>Share</span>
                    </button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Upcoming Events */}
          <Card className="hover-lift animate-slide-in-up" style={{ animationDelay: "0.3s" }}>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Calendar className="h-5 w-5 text-primary" />
                <span>Upcoming Events</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {upcomingEvents.map((event) => (
                <div key={event.id} className="p-3 border rounded-lg hover:bg-pink-50 transition-colors duration-200">
                  <h4 className="font-medium text-primary">{event.title}</h4>
                  <p className="text-sm text-gray-600">
                    {event.date} at {event.time}
                  </p>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-xs text-gray-500">{event.attendees} attending</span>
                    <Badge variant="outline" className="text-xs">
                      {event.type}
                    </Badge>
                  </div>
                </div>
              ))}
              <Button
                variant="outline"
                className="w-full hover:bg-pink-50 hover:border-pink-300 transition-all duration-300 bg-transparent"
              >
                View All Events
              </Button>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="hover-lift animate-slide-in-up" style={{ animationDelay: "0.4s" }}>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button
                variant="outline"
                className="w-full justify-start hover:bg-pink-50 transition-all duration-300 bg-transparent"
              >
                <Users className="h-4 w-4 mr-2" />
                Find Roommates
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start hover:bg-pink-50 transition-all duration-300 bg-transparent"
              >
                <MessageSquare className="h-4 w-4 mr-2" />
                Ask a Question
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start hover:bg-pink-50 transition-all duration-300 bg-transparent"
              >
                <Calendar className="h-4 w-4 mr-2" />
                Join an Event
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start hover:bg-pink-50 transition-all duration-300 bg-transparent"
              >
                <Share2 className="h-4 w-4 mr-2" />
                Share Experience
              </Button>
            </CardContent>
          </Card>

          {/* Community Guidelines */}
          <Card className="hover-lift animate-slide-in-up" style={{ animationDelay: "0.5s" }}>
            <CardHeader>
              <CardTitle>Community Guidelines</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-gray-600 space-y-2">
              <p>• Be respectful and kind to all members</p>
              <p>• Share accurate and helpful information</p>
              <p>• No spam or promotional content</p>
              <p>• Protect personal information</p>
              <p>• Report inappropriate behavior</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
