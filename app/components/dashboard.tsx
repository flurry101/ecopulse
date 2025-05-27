"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { TrendingDown, TrendingUp, Target, Calendar, Flame, Award, Leaf } from "lucide-react"
import { User } from '../../types';

export default function Dashboard({ user }: { user: User }) {
  const [weeklyData, setWeeklyData] = useState([
    { day: "Mon", emissions: 12.5, target: 10 },
    { day: "Tue", emissions: 8.2, target: 10 },
    { day: "Wed", emissions: 9.8, target: 10 },
    { day: "Thu", emissions: 7.5, target: 10 },
    { day: "Fri", emissions: 11.2, target: 10 },
    { day: "Sat", emissions: 6.8, target: 10 },
    { day: "Sun", emissions: 8.5, target: 10 },
  ])

  const currentEmissions = 8.5
  const targetEmissions = 10
  const weeklyAverage = weeklyData.reduce((sum, day) => sum + day.emissions, 0) / 7
  const improvement = ((targetEmissions - currentEmissions) / targetEmissions) * 100

  return (
    <div className="space-y-6">
      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Today's Emissions</CardTitle>
            <Leaf className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{currentEmissions} kg</div>
            <p className="text-xs text-muted-foreground">
              {improvement > 0 ? (
                <span className="text-green-600 flex items-center">
                  <TrendingDown className="h-3 w-3 mr-1" />
                  {improvement.toFixed(1)}% below target
                </span>
              ) : (
                <span className="text-red-600 flex items-center">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  {Math.abs(improvement).toFixed(1)}% above target
                </span>
              )}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Weekly Average</CardTitle>
            <Calendar className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{weeklyAverage.toFixed(1)} kg</div>
            <p className="text-xs text-muted-foreground">Last 7 days</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Current Streak</CardTitle>
            <Flame className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">{user?.streak} days</div>
            <p className="text-xs text-muted-foreground">Below target emissions</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Level Progress</CardTitle>
            <Award className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">Level {user?.level}</div>
            <Progress value={65} className="mt-2" />
            <p className="text-xs text-muted-foreground mt-1">65% to next level</p>
          </CardContent>
        </Card>
      </div>

      {/* Weekly Progress Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Weekly Emissions Trend</CardTitle>
          <CardDescription>Your daily carbon footprint vs target</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {weeklyData.map((day, index) => (
              <div key={day.day} className="flex items-center space-x-4">
                <div className="w-12 text-sm font-medium">{day.day}</div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm text-gray-600">{day.emissions} kg CO₂</span>
                    <span className="text-xs text-gray-500">Target: {day.target} kg</span>
                  </div>
                  <div className="relative">
                    <Progress value={(day.emissions / day.target) * 100} className="h-2" />
                    {day.emissions <= day.target && (
                      <Badge
                        variant="secondary"
                        className="absolute -top-1 -right-1 text-xs bg-green-100 text-green-700"
                      >
                        ✓
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Achievements */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Award className="h-5 w-5 text-yellow-600" />
              <span>Recent Achievements</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center space-x-3 p-3 bg-yellow-50 rounded-lg">
              <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">🏆</div>
              <div>
                <p className="font-medium text-yellow-800">Eco Warrior</p>
                <p className="text-sm text-yellow-600">7 days below target emissions</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">🌱</div>
              <div>
                <p className="font-medium text-green-800">Green Commuter</p>
                <p className="text-sm text-green-600">Used public transport 5 times this week</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">⚡</div>
              <div>
                <p className="font-medium text-blue-800">Energy Saver</p>
                <p className="text-sm text-blue-600">Reduced home energy by 15%</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Target className="h-5 w-5 text-green-600" />
              <span>Active Goals</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Reduce weekly emissions by 20%</span>
                <span className="text-sm text-green-600">75%</span>
              </div>
              <Progress value={75} className="h-2" />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Use public transport 10 times</span>
                <span className="text-sm text-blue-600">60%</span>
              </div>
              <Progress value={60} className="h-2" />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Maintain 30-day streak</span>
                <span className="text-sm text-orange-600">40%</span>
              </div>
              <Progress value={40} className="h-2" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Common activities to log your emissions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <button className="p-4 border-2 border-dashed border-gray-200 rounded-lg hover:border-green-300 hover:bg-green-50 transition-colors">
              <div className="text-center">
                <div className="text-2xl mb-2">🚗</div>
                <p className="text-sm font-medium">Log Car Trip</p>
              </div>
            </button>
            <button className="p-4 border-2 border-dashed border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors">
              <div className="text-center">
                <div className="text-2xl mb-2">🚌</div>
                <p className="text-sm font-medium">Public Transport</p>
              </div>
            </button>
            <button className="p-4 border-2 border-dashed border-gray-200 rounded-lg hover:border-yellow-300 hover:bg-yellow-50 transition-colors">
              <div className="text-center">
                <div className="text-2xl mb-2">⚡</div>
                <p className="text-sm font-medium">Energy Usage</p>
              </div>
            </button>
            <button className="p-4 border-2 border-dashed border-gray-200 rounded-lg hover:border-purple-300 hover:bg-purple-50 transition-colors">
              <div className="text-center">
                <div className="text-2xl mb-2">🍽️</div>
                <p className="text-sm font-medium">Meal Impact</p>
              </div>
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
