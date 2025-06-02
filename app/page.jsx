"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Badge } from "@/components/ui/badge"
import { Leaf, Trophy, Target, TrendingDown, Award, BookOpen, BarChart3, Menu } from "lucide-react"
import CarbonCalculator from "./components/carbon-calculator"
import Dashboard from "./components/dashboard"
import Analytics from "./components/analytics"
import Achievements from "./components/achievements"
import Education from "./components/education"
import Goals from "./components/goals"
import AuthProvider from "./components/auth-provider"

export default function CarbonTracker() {
  const [user, setUser] = useState(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [activeTab, setActiveTab] = useState("calculator")
  const [loading, setLoading] = useState(false)

    // Remove or modify the initial useEffect
  // Only load user data after login
  useEffect(() => {
    // Remove automatic authentication
  }, [])

  const handleLogin = () => {
    setLoading(true)
    // Simulate login process
    setTimeout(() => {
      const mockUser = {
        id: "user123",
        name: "Alex Green",
        email: "alex@example.com",
        totalEmissions: 8.5,
        streak: 1,
        level: 1,
        badges: ["first-calculation", "week-streak", "eco-warrior"],
        joinDate: "2025-01-15",
      }
      setUser(mockUser)
      setIsAuthenticated(true)
      setLoading(false)
    }, 1500)
  }

  const handleLogout = () => {
    setUser(null)
    setIsAuthenticated(false)
    setActiveTab("calculator")
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading EcoPulse...</p>
        </div>
      </div>
    )
  }

  return (
    <AuthProvider>
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
        {!isAuthenticated ? (
          <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-4">
            <Card className="w-full max-w-md">
              <CardHeader className="text-center">
                <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <Leaf className="h-8 w-8 text-green-600" />
                </div>
                <CardTitle className="text-2xl font-bold text-gray-900">Welcome to EcoPulse</CardTitle>
                <CardDescription className="text-gray-600">
                  Your personal carbon footprint tracker and sustainability companion
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div className="p-3 bg-green-50 rounded-lg">
                    <BarChart3 className="h-6 w-6 text-green-600 mx-auto mb-1" />
                    <p className="text-sm font-medium">Track Emissions</p>
                  </div>
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <Trophy className="h-6 w-6 text-blue-600 mx-auto mb-1" />
                    <p className="text-sm font-medium">Earn Badges</p>
                  </div>
                  <div className="p-3 bg-purple-50 rounded-lg">
                    <Target className="h-6 w-6 text-purple-600 mx-auto mb-1" />
                    <p className="text-sm font-medium">Set Goals</p>
                  </div>
                  <div className="p-3 bg-orange-50 rounded-lg">
                    <BookOpen className="h-6 w-6 text-orange-600 mx-auto mb-1" />
                    <p className="text-sm font-medium">Learn & Improve</p>
                  </div>
                </div>
                <Button onClick={handleLogin} className="w-full bg-green-600 hover:bg-green-700">
                  Start Your Journey 
                </Button>
              </CardContent>
            </Card>
          </div>
        ) : (
          <>
            {/* Header */}
            <header className="bg-white shadow-sm border-b sticky top-0 z-50">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center py-3 sm:py-4">
                  <div className="flex items-center space-x-2 sm:space-x-3">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-green-100 rounded-full flex items-center justify-center">
                      <Leaf className="h-4 w-4 sm:h-6 sm:w-6 text-green-600" />
                    </div>
                    <div>
                      <h1 className="text-lg sm:text-xl font-bold text-gray-900">EcoPulse</h1>
                      <p className="text-xs sm:text-sm text-gray-500 hidden sm:block">Carbon Footprint Tracker</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 sm:space-x-4">
                    <div className="hidden md:flex items-center space-x-2 bg-green-50 px-3 py-1 rounded-full">
                      <Award className="h-4 w-4 text-green-600" />
                      <span className="text-sm font-medium text-green-700">Level {user?.level}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-6 h-6 sm:w-8 sm:h-8 bg-green-600 rounded-full flex items-center justify-center">
                        <span className="text-white text-xs sm:text-sm font-medium">{user?.name.charAt(0)}</span>
                      </div>
                      <div className="hidden sm:block">
                        <p className="text-sm font-medium text-gray-900">{user?.name}</p>
                        <p className="text-xs text-gray-500">{user?.streak} day streak</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" onClick={handleLogout} className="text-xs sm:text-sm">
                      Sign Out
                    </Button>
                  </div>
                </div>
              </div>
            </header>

            {/* Navigation Tabs */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
                <div className="flex items-center justify-between mb-4">
                  <TabsList className="flex-1 grid w-full grid-cols-2 bg-white p-1 rounded-lg shadow-sm gap-1">
                    <TabsTrigger
                      value="calculator"
                      className="flex items-center justify-center space-x-2 text-sm py-3"
                    >
                      <Leaf className="h-4 w-4" />
                      <span>Calculate Carbon Impact⚡</span>
                    </TabsTrigger>
                    <TabsTrigger
                      value="education"
                      className="flex items-center justify-center space-x-2 text-sm py-3"
                    >
                      <BookOpen className="h-4 w-4" />
                      <span>Learn 💡</span>
                    </TabsTrigger>
                  </TabsList>
                  
                  <Sheet>
                    <SheetTrigger asChild>
                      <Button variant="outline" size="icon" className="ml-4">
                        <Menu className="h-5 w-5" />
                      </Button>
                    </SheetTrigger>
                    <SheetContent side="right" className="w-[380px] sm:w-[540px]">
                      <SheetHeader className="mb-4">
                        <SheetTitle>🚀 Coming Soon!</SheetTitle>
                        <SheetDescription>A sneak peek at what we're cooking!</SheetDescription>
                      </SheetHeader>
                      <div className="space-y-4">
                        <Button 
                          variant="ghost" 
                          className="w-full justify-start p-4 h-auto group"
                          onClick={() => setActiveTab('dashboard')}
                        >
                          <div className="flex items-center space-x-4 w-full">
                            <div className="bg-gray-100 p-2 rounded-full">
                              <BarChart3 className="h-5 w-5 text-gray-600" />
                            </div>
                            <div className="flex-1 text-left">
                              <div className="flex items-center gap-2">
                                <h3 className="font-medium">Personal Dashboard</h3>
                                <Badge variant="outline" className="group-hover:bg-gray-100">Coming Soon</Badge>
                              </div>
                              <p className="text-sm text-gray-600 mt-1">View your environmental impact stats</p>
                            </div>
                          </div>
                        </Button>

                        <Button 
                          variant="ghost" 
                          className="w-full justify-start p-4 h-auto group"
                          onClick={() => setActiveTab('analytics')}
                        >
                          <div className="flex items-center space-x-4 w-full">
                            <div className="bg-gray-100 p-2 rounded-full">
                              <TrendingDown className="h-5 w-5 text-gray-600" />
                            </div>
                            <div className="flex-1 text-left">
                              <div className="flex items-center gap-2">
                                <h3 className="font-medium">Analytics</h3>
                                <Badge variant="outline" className="group-hover:bg-gray-100">Coming Soon</Badge>
                              </div>
                              <p className="text-sm text-gray-600 mt-1">Analyze your progress over time</p>
                            </div>
                          </div>
                        </Button>

                        <Button 
                          variant="ghost" 
                          className="w-full justify-start p-4 h-auto group"
                          onClick={() => setActiveTab('goals')}
                        >
                          <div className="flex items-center space-x-4 w-full">
                            <div className="bg-gray-100 p-2 rounded-full">
                              <Target className="h-5 w-5 text-gray-600" />
                            </div>
                            <div className="flex-1 text-left">
                              <div className="flex items-center gap-2">
                                <h3 className="font-medium">Goals</h3>
                                <Badge variant="outline" className="group-hover:bg-gray-100">Coming Soon</Badge>
                              </div>
                              <p className="text-sm text-gray-600 mt-1">Set and track sustainability targets</p>
                            </div>
                          </div>
                        </Button>

                        <Button 
                          variant="ghost" 
                          className="w-full justify-start p-4 h-auto group"
                          onClick={() => setActiveTab('achievements')}
                        >
                          <div className="flex items-center space-x-4 w-full">
                            <div className="bg-gray-100 p-2 rounded-full">
                              <Trophy className="h-5 w-5 text-gray-600" />
                            </div>
                            <div className="flex-1 text-left">
                              <div className="flex items-center gap-2">
                                <h3 className="font-medium">Achievements</h3>
                                <Badge variant="outline" className="group-hover:bg-gray-100">Coming Soon</Badge>
                              </div>
                              <p className="text-sm text-gray-600 mt-1">View your earned badges and rewards</p>
                            </div>
                          </div>
                        </Button>

                        <div className="mt-8 pt-4 border-t">
                          <div className="text-center space-y-2">
                            <p className="text-sm text-gray-600">Get ready for these exciting features!</p>
                            <p className="text-xs text-gray-500">We're working hard to bring you more ways to track and improve your environmental impact.</p>
                          </div>
                        </div>
                      </div>
                    </SheetContent>
                  </Sheet>
                </div>

                <TabsContent value="dashboard">
                  <Dashboard user={user} />
                </TabsContent>

                <TabsContent value="calculator">
                  <CarbonCalculator user={user} />
                </TabsContent>

                <TabsContent value="analytics">
                  <Analytics user={user} />
                </TabsContent>

                <TabsContent value="goals">
                  <Goals user={user} />
                </TabsContent>

                <TabsContent value="achievements">
                  <Achievements user={user} />
                </TabsContent>

                <TabsContent value="education">
                  <Education />
                </TabsContent>
              </Tabs>
            </div>
          </>
        )}
      </div>
    </AuthProvider>
  )
}
