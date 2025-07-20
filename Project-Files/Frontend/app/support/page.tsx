import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Headphones, MessageCircle, Phone, Mail, Clock, Search, HelpCircle, Book, Video } from "lucide-react"

const faqItems = [
  {
    question: "How do I schedule a property viewing?",
    answer:
      "You can schedule viewings directly through the property listing page by clicking 'Schedule Viewing' or contacting the property owner using the provided contact information.",
  },
  {
    question: "What documents do I need to apply for a rental?",
    answer:
      "Typically you'll need government-issued ID, proof of income, employment verification, and references. Specific requirements may vary by property owner.",
  },
  {
    question: "How does the application process work?",
    answer:
      "Submit your application through our platform, provide required documents, and the property owner will review and respond within 24-48 hours.",
  },
  {
    question: "Is there a fee to use HouseHunt?",
    answer:
      "HouseHunt is completely free for renters. Property owners pay a small commission only when they successfully rent their property.",
  },
  {
    question: "How do I report a problem with a listing?",
    answer:
      "Use the 'Report' button on any listing page or contact our support team directly. We investigate all reports promptly.",
  },
]

const supportOptions = [
  {
    icon: MessageCircle,
    title: "Live Chat",
    description: "Get instant help from our support team",
    availability: "24/7",
    action: "Start Chat",
  },
  {
    icon: Phone,
    title: "Phone Support",
    description: "Speak directly with a support specialist",
    availability: "Mon-Fri 9AM-6PM",
    action: "Call Now",
  },
  {
    icon: Mail,
    title: "Email Support",
    description: "Send us a detailed message",
    availability: "Response within 24hrs",
    action: "Send Email",
  },
  {
    icon: Video,
    title: "Video Call",
    description: "Schedule a screen-sharing session",
    availability: "By appointment",
    action: "Schedule",
  },
]

export default function SupportPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-12 animate-slide-in-up">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">How Can We Help?</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Our support team is here to help you every step of the way
        </p>
      </div>

      {/* Search Bar */}
      <div className="max-w-2xl mx-auto mb-12 animate-slide-in-up" style={{ animationDelay: "0.1s" }}>
        <div className="relative">
          <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
          <Input
            placeholder="Search for help articles, FAQs, or guides..."
            className="pl-10 h-12 border-amber-200 focus:border-amber-400 focus:ring-amber-400 transition-all duration-300"
          />
        </div>
      </div>

      {/* Support Options */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {supportOptions.map((option, index) => (
          <Card
            key={index}
            className="text-center hover-lift card-hover animate-bounce-in"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <CardContent className="pt-6">
              <option.icon className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="font-semibold mb-2">{option.title}</h3>
              <p className="text-sm text-gray-600 mb-3">{option.description}</p>
              <p className="text-xs text-gray-500 mb-4">{option.availability}</p>
              <Button
                size="sm"
                className="bg-gradient-to-r from-amber-600 to-yellow-700 hover:from-amber-700 hover:to-yellow-800 transform hover:scale-105 transition-all duration-300"
              >
                {option.action}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Contact Form */}
        <div className="lg:col-span-2">
          <Card className="hover-lift animate-slide-in-up" style={{ animationDelay: "0.2s" }}>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Headphones className="h-5 w-5 text-primary" />
                <span>Contact Support</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      placeholder="Your full name"
                      className="border-amber-200 focus:border-amber-400 focus:ring-amber-400"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="your@email.com"
                      className="border-amber-200 focus:border-amber-400 focus:ring-amber-400"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select>
                    <SelectTrigger className="border-amber-200 focus:border-amber-400 focus:ring-amber-400">
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="general">General Inquiry</SelectItem>
                      <SelectItem value="technical">Technical Issue</SelectItem>
                      <SelectItem value="billing">Billing Question</SelectItem>
                      <SelectItem value="property">Property Issue</SelectItem>
                      <SelectItem value="account">Account Help</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Input
                    id="subject"
                    placeholder="Brief description of your issue"
                    className="border-amber-200 focus:border-amber-400 focus:ring-amber-400"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    placeholder="Please describe your issue in detail..."
                    rows={6}
                    className="border-amber-200 focus:border-amber-400 focus:ring-amber-400"
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-amber-600 to-yellow-700 hover:from-amber-700 hover:to-yellow-800 transform hover:scale-105 transition-all duration-300"
                >
                  Send Message
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* FAQ and Quick Links */}
        <div className="space-y-6">
          {/* FAQ */}
          <Card className="hover-lift animate-slide-in-up" style={{ animationDelay: "0.3s" }}>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <HelpCircle className="h-5 w-5 text-primary" />
                <span>Frequently Asked Questions</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {faqItems.map((item, index) => (
                <div key={index} className="border-b border-gray-100 pb-4 last:border-b-0">
                  <h4 className="font-medium text-primary mb-2">{item.question}</h4>
                  <p className="text-sm text-gray-600">{item.answer}</p>
                </div>
              ))}
              <Button
                variant="outline"
                className="w-full hover:bg-amber-50 hover:border-amber-300 transition-all duration-300 bg-transparent"
              >
                View All FAQs
              </Button>
            </CardContent>
          </Card>

          {/* Quick Links */}
          <Card className="hover-lift animate-slide-in-up" style={{ animationDelay: "0.4s" }}>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Book className="h-5 w-5 text-primary" />
                <span>Help Resources</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button
                variant="outline"
                className="w-full justify-start hover:bg-amber-50 transition-all duration-300 bg-transparent"
              >
                <Book className="h-4 w-4 mr-2" />
                User Guide
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start hover:bg-amber-50 transition-all duration-300 bg-transparent"
              >
                <Video className="h-4 w-4 mr-2" />
                Video Tutorials
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start hover:bg-amber-50 transition-all duration-300 bg-transparent"
              >
                <MessageCircle className="h-4 w-4 mr-2" />
                Community Forum
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start hover:bg-amber-50 transition-all duration-300 bg-transparent"
              >
                <HelpCircle className="h-4 w-4 mr-2" />
                Troubleshooting
              </Button>
            </CardContent>
          </Card>

          {/* Contact Info */}
          <Card className="hover-lift animate-slide-in-up" style={{ animationDelay: "0.5s" }}>
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-primary" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-primary" />
                <span>support@househunt.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4 text-primary" />
                <span>Mon-Fri: 9AM-6PM EST</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
