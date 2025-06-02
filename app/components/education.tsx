"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { BookOpen, Play, CheckCircle, Clock, Lightbulb, Globe, ExternalLink, ChevronRight } from "lucide-react"
import { EducationContent } from '../../types';

export default function Education() {
  const learningModules = [
    {
      id: 1,
      title: "Understanding Carbon Footprints",
      description: "Learn the basics of carbon emissions and how they impact our planet",
      duration: "10 min",
      difficulty: "Beginner",
      completed: true,
      progress: 100,
      topics: ["Carbon Cycle", "Greenhouse Gases", "Personal Impact"],
      icon: "🌍",
    },
    {
      id: 2,
      title: "Transportation & Emissions",
      description: "Explore how different modes of transport affect your carbon footprint",
      duration: "15 min",
      difficulty: "Beginner",
      completed: true,
      progress: 100,
      topics: ["Car Emissions", "Public Transport", "Active Travel"],
      icon: "🚗",
    },
    {
      id: 3,
      title: "Home Energy Efficiency",
      description: "Discover ways to reduce energy consumption at home",
      duration: "12 min",
      difficulty: "Intermediate",
      completed: false,
      progress: 60,
      topics: ["Insulation", "Smart Appliances", "Renewable Energy"],
      icon: "🏠",
    },
    {
      id: 4,
      title: "Sustainable Diet Choices",
      description: "Learn how food choices impact the environment",
      duration: "18 min",
      difficulty: "Intermediate",
      completed: false,
      progress: 0,
      topics: ["Plant-based Eating", "Local Food", "Food Waste"],
      icon: "🥗",
    },
    {
      id: 5,
      title: "Climate Science Fundamentals",
      description: "Deep dive into climate change science and solutions",
      duration: "25 min",
      difficulty: "Advanced",
      completed: false,
      progress: 0,
      topics: ["Climate Models", "Tipping Points", "Mitigation Strategies"],
      icon: "🔬",
    },
  ]

  const quickTips = [
    {
      title: "LED Light Bulbs",
      description: "LED bulbs use 75% less energy and last 25 times longer than incandescent bulbs",
      impact: "Save 1-2 kg CO₂ per month",
      category: "Energy",
      icon: "💡",
    },
    {
      title: "Cold Water Washing",
      description: "Washing clothes in cold water can reduce energy use by up to 90%",
      impact: "Save 0.5 kg CO₂ per load",
      category: "Energy",
      icon: "🧺",
    },
    {
      title: "Meal Planning",
      description: "Planning meals reduces food waste by up to 40%",
      impact: "Save 2-3 kg CO₂ per week",
      category: "Diet",
      icon: "📝",
    },
    {
      title: "Carpooling",
      description: "Sharing rides can cut your transport emissions in half",
      impact: "Save 3-5 kg CO₂ per trip",
      category: "Transport",
      icon: "👥",
    },
  ]

  const articles = [
    {
      title: "The Science Behind Carbon Offsetting",
      excerpt: "Understanding how carbon offset programs work and their effectiveness in fighting climate change...",
      readTime: "8 min read",
      category: "Science",
      url: "https://science.howstuffworks.com/environmental/green-science/carbon-offset.htm",
      featured: true,
    },
    {
      title: "Electric Vehicles: A Complete Guide",
      excerpt: "Everything you need to know about making the switch to electric transportation...",
      readTime: "12 min read",
      category: "Transportation",
      featured: false,
    },
    {
      title: "Building a Sustainable Home",
      excerpt: "Practical steps to make your home more energy-efficient and environmentally friendly...",
      readTime: "15 min read",
      category: "Energy",
      featured: false,
    },
    {
      title: "The Future of Renewable Energy",
      excerpt: "Exploring emerging technologies in solar, wind, and other renewable energy sources...",
      readTime: "10 min read",
      category: "Technology",
      featured: true,
    },
  ]

  const getDifficultyColor = (difficulty: EducationContent['difficulty']) => {
    switch (difficulty) {
      case "Beginner":
        return "bg-green-100 text-green-800"
      case "Intermediate":
        return "bg-yellow-100 text-yellow-800"
      case "Advanced":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getCategoryColor = (category: EducationContent['category']) => {
    switch (category) {
      case "Energy":
        return "bg-yellow-100 text-yellow-800"
      case "Transport":
        return "bg-blue-100 text-blue-800"
      case "Diet":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="space-y-6">
      {/* Learning Progress */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <BookOpen className="h-5 w-5 text-blue-600" />
            <span>Learning Progress</span>
          </CardTitle>
          <CardDescription>Your sustainability education journey</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">2/5</div>
              <p className="text-sm text-gray-600">Modules Completed</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">32%</div>
              <p className="text-sm text-gray-600">Overall Progress</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">25 min</div>
              <p className="text-sm text-gray-600">Time Invested</p>
            </div>
          </div>
          <Progress value={32} className="h-3" />
        </CardContent>
      </Card>

      {/* Learning Modules */}
      <Card>
        <CardHeader>
          <CardTitle>Learning Modules</CardTitle>
          <CardDescription>Interactive courses to deepen your environmental knowledge</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {learningModules.map((module) => (
            <div key={module.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div className="text-3xl">{module.icon}</div>
                  <div>
                    <h3 className="font-semibold text-gray-900 flex items-center space-x-2">
                      <span>{module.title}</span>
                      {module.completed && <CheckCircle className="h-4 w-4 text-green-600" />}
                    </h3>
                    <p className="text-sm text-gray-600">{module.description}</p>
                  </div>
                </div>
                <div className="text-right">
                  <Badge className={getDifficultyColor(module.difficulty)}>{module.difficulty}</Badge>
                  <p className="text-xs text-gray-500 mt-1 flex items-center">
                    <Clock className="h-3 w-3 mr-1" />
                    {module.duration}
                  </p>
                </div>
              </div>

              {!module.completed && module.progress > 0 && (
                <div className="mb-3">
                  <div className="flex items-center justify-between text-sm mb-1">
                    <span>Progress</span>
                    <span>{module.progress}%</span>
                  </div>
                  <Progress value={module.progress} className="h-2" />
                </div>
              )}

              <div className="flex items-center justify-between">
                <div className="flex flex-wrap gap-1">
                  {module.topics.map((topic, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {topic}
                    </Badge>
                  ))}
                </div>
                <Button
                  size="sm"
                  variant={module.completed ? "outline" : "default"}
                  className={module.completed ? "" : "bg-blue-600 hover:bg-blue-700"}
                >
                  {module.completed ? (
                    <>
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Review
                    </>
                  ) : module.progress > 0 ? (
                    <>
                      <Play className="h-4 w-4 mr-2" />
                      Continue
                    </>
                  ) : (
                    <>
                      <Play className="h-4 w-4 mr-2" />
                      Start
                    </>
                  )}
                </Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Quick Tips */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Lightbulb className="h-5 w-5 text-yellow-600" />
              <span>Quick Tips</span>
            </CardTitle>
            <CardDescription>Simple actions with immediate impact</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {quickTips.map((tip, index) => (
              <div key={index} className="p-4 border rounded-lg bg-gradient-to-r from-yellow-50 to-orange-50">
                <div className="flex items-start space-x-3">
                  <div className="text-2xl">{tip.icon}</div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-gray-900">{tip.title}</h4>
                      <Badge className={getCategoryColor(tip.category)}>{tip.category}</Badge>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{tip.description}</p>
                    <p className="text-sm font-medium text-green-600">💚 {tip.impact}</p>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Featured Articles */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Globe className="h-5 w-5 text-green-600" />
              <span>Featured Articles</span>
            </CardTitle>
            <CardDescription>Latest insights on sustainability and climate action</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {articles.map((article, index) => (
              <div
                key={index}
                className={`relative p-4 border rounded-lg hover:shadow-md transition-shadow cursor-pointer ${
                  article.featured ? "border-green-200 bg-green-50" : "hover:bg-gray-50"
                }`}
              >
              {/* External link icon in top-right corner */}
              {article.url && (
                <button
                  onClick={() => window.open(article.url, "_blank", "noopener,noreferrer")}
                  className="absolute top-2 right-2 text-teal-600 hover:text-blue-600"
                  aria-label="Open article in new tab"
                >
                  <ExternalLink className="w-4 h-4" />
                </button>
              )}
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-semibold text-gray-900">{article.title}</h4>
                {article.featured && <Badge className="bg-green-100 text-green-800">Featured</Badge>}
              </div>
              <p className="text-sm text-gray-600 mb-3">{article.excerpt}</p>
              <div className="flex items-center justify-between">
                <Badge variant="outline" className="text-xs">
                  {article.category}
                </Badge>
                <span className="text-xs text-gray-500">{article.readTime}</span>
              </div>
            </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Climate Action Challenge */}
      <Card>
        <CardHeader>
          <CardTitle>🌟 Weekly Climate Action Challenge</CardTitle>
          <CardDescription>Join thousands of users in this week's sustainability challenge</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="bg-gradient-to-r from-green-500 to-blue-500 text-white p-6 rounded-lg">
            <h3 className="text-xl font-bold mb-2">Plastic-Free Week Challenge</h3>
            <p className="mb-4 opacity-90">
              Reduce single-use plastic consumption for 7 days. Track your progress and share tips with the community!
            </p>
            <button onClick={() => window.open("https://www.plasticfreejuly.org/", "_blank", "noopener,noreferrer")} 
            className="flex items-center text-white font-semibold hover:underline mb-4">
              <ExternalLink className="w-4 h-4 mr-2" />
              Learn More
            </button>
            <div className="flex items-center justify-between">
              <div className="text-sm opacity-80">
                <p>🏆 2,847 participants</p>
                <p>⏰ 3 days remaining</p>
              </div>
              <Button variant="secondary" className="bg-white text-green-600 hover:bg-gray-100">
                Join Challenge
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
