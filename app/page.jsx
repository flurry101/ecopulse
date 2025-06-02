"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Leaf, Trophy, Target, TrendingDown, Award, BookOpen, BarChart3 } from "lucide-react"
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
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate authentication check
    setTimeout(() => {
      const mockUser = {
        id: "user123",
        name: "Alex Green",
        email: "alex@example.com",
        totalEmissions: 8.5,
        streak: 12,
        level: 3,
        badges: ["first-calculation", "week-streak", "eco-warrior"],
        joinDate: "2024-01-15",
      }
      setUser(mockUser)
      setIsAuthenticated(true)
      setLoading(false)
    }, 1000)
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
        streak: 12,
        level: 3,
        badges: ["first-calculation", "week-streak", "eco-warrior"],
        joinDate: "2024-01-15",
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
                  Get Started
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
                <TabsList className="grid w-full grid-cols-3 sm:grid-cols-6 bg-white p-1 rounded-lg shadow-sm gap-1">
                  <TabsTrigger
                    value="calculator"
                    className="flex items-center justify-center space-x-1 sm:space-x-2 text-xs sm:text-sm"
                  >
                    <Leaf className="h-3 w-3 sm:h-4 sm:w-4" />
                    <span className="hidden sm:inline">Calculate</span>
                    <span className="sm:hidden">Calculate</span>
                  </TabsTrigger>
                  <TabsTrigger
                    value="dashboard"
                    className="flex items-center justify-center space-x-1 sm:space-x-2 text-xs sm:text-sm"
                  >
                    <BarChart3 className="h-3 w-3 sm:h-4 sm:w-4" />
                    <span className="hidden sm:inline">Dashboard</span>
                    <span className="sm:hidden">Home</span>
                  </TabsTrigger>
                  <TabsTrigger
                    value="analytics"
                    className="flex items-center justify-center space-x-1 sm:space-x-2 text-xs sm:text-sm"
                  >
                    <TrendingDown className="h-3 w-3 sm:h-4 sm:w-4" />
                    <span className="hidden sm:inline">Analytics</span>
                    <span className="sm:hidden">Stats</span>
                  </TabsTrigger>
                  <TabsTrigger
                    value="goals"
                    className="flex items-center justify-center space-x-1 sm:space-x-2 text-xs sm:text-sm"
                  >
                    <Target className="h-3 w-3 sm:h-4 sm:w-4" />
                    <span className="hidden sm:inline">Goals</span>
                    <span className="sm:hidden">Goals</span>
                  </TabsTrigger>
                  <TabsTrigger
                    value="achievements"
                    className="flex items-center justify-center space-x-1 sm:space-x-2 text-xs sm:text-sm"
                  >
                    <Trophy className="h-3 w-3 sm:h-4 sm:w-4" />
                    <span className="hidden sm:inline">Badges</span>
                    <span className="sm:hidden">Awards</span>
                  </TabsTrigger>
                  <TabsTrigger
                    value="education"
                    className="flex items-center justify-center space-x-1 sm:space-x-2 text-xs sm:text-sm"
                  >
                    <BookOpen className="h-3 w-3 sm:h-4 sm:w-4" />
                    <span className="hidden sm:inline">Learn</span>
                    <span className="sm:hidden">Learn</span>
                  </TabsTrigger>
                </TabsList>

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
