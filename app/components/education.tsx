"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { BookOpen, Play, CheckCircle, Clock, Lightbulb, Globe, ExternalLink, Video } from "lucide-react"
import { EducationContent } from '../../types'
import { VideoModal } from "@/components/video-modal"
import EnvironmentalQuiz from "./environmental-quiz"

export default function Education() {
  const [selectedVideo, setSelectedVideo] = useState<{
    title: string
    description: string
    emoji: string
    videoId: string
  } | null>(null)

  const learningModules = [
    {
      id: 1,
      title: "Understanding Carbon Footprints",
      description: "Learn the basics of carbon emissions and how they impact our planet",
      duration: "10 min",
      difficulty: "Beginner" as const,
      completed: false,
      progress: 0,
      topics: ["Carbon Cycle", "Greenhouse Gases", "Personal Impact"],
      icon: "🌍",
      category: "Science" as const,
      videoId: "_k__WPp_5R4",
      hasVideo: true
    },
    {
      id: 2,
      title: "Transportation & Emissions",
      description: "Explore how different modes of transport affect your carbon footprint",
      duration: "15 min",
      difficulty: "Beginner" as const,
      completed: false,
      progress: 0,
      topics: ["Car Emissions", "Public Transport", "Active Travel"],
      icon: "🚗",
      category: "Transport" as const,
      videoId: "TkXEU5ng8rE",
      hasVideo: true
    },
    {
      id: 3,
      title: "Home Energy Efficiency",
      description: "Discover ways to reduce energy consumption at home",
      duration: "12 min",
      difficulty: "Intermediate" as const,
      completed: false,
      progress: 0,
      topics: ["Insulation", "Smart Appliances", "Renewable Energy"],
      icon: "🏠",
      category: "Energy" as const,
      videoId: "RVpNVoiCVvc",
      hasVideo: true
    },
    {
      id: 4,
      title: "Sustainable Diet Choices",
      description: "Learn how food choices impact the environment",
      duration: "18 min",
      difficulty: "Intermediate" as const,
      completed: false,
      progress: 0,
      topics: ["Plant-based Eating", "Local Food", "Food Waste"],
      icon: "🥗",
      category: "Diet" as const,
      videoId: "Ldm0bbr9WGI",
      hasVideo: true
    },
    {
      id: 5,
      title: "Climate Science Fundamentals",
      description: "Deep dive into climate change science and solutions",
      duration: "25 min",
      difficulty: "Advanced" as const,
      completed: false,
      progress: 0,
      topics: ["Climate Models", "Tipping Points", "Mitigation Strategies"],
      icon: "🔬",
      category: "Science" as const,
      videoId: "B3hpN8Odu1A",
      hasVideo: true
    }
  ]

  const quickTips = [
    {
      title: "LED Light Bulbs",
      description: "LED bulbs use 75% less energy and last 25 times longer than incandescent bulbs",
      impact: "Save 1-2 kg CO₂ per month",
      category: "Energy" as const,
      icon: "💡",
    },
    {
      title: "Cold Water Washing",
      description: "Washing clothes in cold water can reduce energy use by up to 90%",
      impact: "Save 0.5 kg CO₂ per load",
      category: "Energy" as const,
      icon: "🧺",
    },
    {
      title: "Meal Planning",
      description: "Planning meals reduces food waste by up to 40%",
      impact: "Save 2-3 kg CO₂ per week",
      category: "Diet" as const,
      icon: "📝",
    },
    {
      title: "Carpooling",
      description: "Sharing rides can cut your transport emissions in half",
      impact: "Save 3-5 kg CO₂ per trip",
      category: "Transport" as const,
      icon: "👥",
    },
    {
      title: "Unplug Devices",
      description: "Electronics consume energy even when turned off if they're plugged in",
      impact: "Save 1-2 kg CO₂ per month",
      category: "Energy" as const,
      icon: "🔌",
    },
    {
      title: "Recycle Properly",
      description: "Recycling aluminum and paper saves energy and reduces emissions",
      impact: "Save 1–3 kg CO₂ per week",
      category: "Waste" as const,
      icon: "♻️",
    },  
    {
      title: "Buy Local Produce",
      description: "Locally sourced food reduces emissions from transportation and refrigeration",
      impact: "Save 1–2 kg CO₂ per week",
      category: "Diet" as const,
      icon: "🍎",
    },
    {
      title: "Use Public Transit",
      description: "Switching from driving to public transport can cut emissions significantly",
      impact: "Save 4–6 kg CO₂ per trip",
      category: "Transport" as const,
      icon: "🚌",
    }
  ]

  const articles = [
    {
      title: "The Science Behind Carbon Offsetting",
      excerpt: "Understanding how carbon offset programs work and their effectiveness in fighting climate change...",
      readTime: "8 min read",
      category: "Science" as const,
      url: "https://science.howstuffworks.com/environmental/green-science/carbon-offset.htm",
      featured: true,
    },
    {
      title: "Electric Vehicles: A Complete Guide",
      excerpt: "Everything you need to know about making the switch to electric transportation...",
      readTime: "12 min read",
      category: "Transport" as const,
      url: "https://www.power-sonic.com/blog/types-of-electric-vehicles/",
      featured: false,
    },
    {
      title: "Building a Sustainable Home",
      excerpt: "Practical steps to make your home more energy-efficient and environmentally friendly...",
      readTime: "15 min read",
      category: "Energy" as const,
      url: "https://medium.com/@designwithlead/how-to-plan-for-a-sustainable-home-tips-from-the-experts-d306fdd344e3",
      featured: false,
    },
    {
      title: "The Future of Renewable Energy",
      excerpt: "Exploring emerging technologies in solar, wind, and other renewable energy sources...",
      readTime: "10 min read",
      category: "Technology" as const,
      url: "https://earth.org/the-growth-of-renewable-energy-what-does-the-future-hold/",
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
      case "Technology":
        return "bg-indigo-100 text-indigo-800"
      case "Science":
        return "bg-purple-100 text-purple-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getRandomTips = (tips: any[], count: number) => {
    const shuffled = [...tips].sort(() => 0.5 - Math.random())
    return shuffled.slice(0, count)
  }

  return (
    <div className="space-y-6">
      {/* Quiz Section */}
      <EnvironmentalQuiz />

      {/* Learning Modules Section */}
      <Card>
        <CardHeader>
          <CardTitle>Learning Modules</CardTitle>
          <CardDescription>Learn the language of the planet and speak it with action 🌏✊</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {learningModules.map((module) => (
            <div key={module.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div className="text-3xl">{module.icon}</div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-gray-900">{module.title}</h3>
                      {module.completed && <CheckCircle className="h-4 w-4 text-green-600" />}
                      <Badge className={getCategoryColor(module.category)}>
                        {module.category}
                      </Badge>
                      {module.hasVideo && (
                        <Badge variant="outline" className="gap-1">
                          <Video className="h-3 w-3" />
                          Video
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 mt-1">{module.description}</p>
                  </div>
                </div>
                <div className="text-right">
                  <Badge className={getDifficultyColor(module.difficulty)}>{module.difficulty}</Badge>
                  {/*<p className="text-xs text-gray-500 mt-1 flex items-center justify-end">
                    <Clock className="h-3 w-3 mr-1" />
                    {module.duration}
                  </p>*/} 
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
                <div className="flex gap-2">
                  {module.hasVideo && (
                    <Button
                      size="sm"
                      variant="outline"
                      className="bg-blue-600 hover:bg-blue-700 text-white hover:text-white"
                      onClick={() => setSelectedVideo({
                        title: module.title,
                        description: module.description,
                        emoji: module.icon,
                        videoId: module.videoId
                      })}
                    >
                      <Video className="h-4 w-4 mr-2" />
                      Watch Video
                    </Button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Quick Tips and Featured Articles sections */}
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
            {getRandomTips(quickTips, 4).map((tip, index) => (
              <div key={index} className="p-4 border rounded-lg bg-gradient-to-r from-yellow-50 to-orange-50">
                <div className="flex items-start space-x-3">
                  <div className="text-2xl">{tip.icon}</div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-gray-900">{tip.title}</h4>
                      <Badge className={getCategoryColor(tip.category as "Science" | "Transport" | "Energy" | "Diet" | "Technology")}>{tip.category}</Badge>
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

      {/* Video Modal */}
      {selectedVideo && (
        <VideoModal
          isOpen={!!selectedVideo}
          onClose={() => setSelectedVideo(null)}
          title={selectedVideo.title}
          description={selectedVideo.description}
          emoji={selectedVideo.emoji}
          videoId={selectedVideo.videoId}
        />
      )}
    </div>
  )
}
