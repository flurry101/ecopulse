"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { BarChart3, TrendingDown, Calendar, Target, Users, Award } from "lucide-react"
import { User } from '../../types';

export default function Analytics({ user }: { user: User }) {
  const monthlyData = [
    { month: "Jan", emissions: 285, target: 300, improvement: 5 },
    { month: "Feb", emissions: 270, target: 300, improvement: 10 },
    { month: "Mar", emissions: 255, target: 300, improvement: 15 },
    { month: "Apr", emissions: 240, target: 300, improvement: 20 },
    { month: "May", emissions: 225, target: 300, improvement: 25 },
    { month: "Jun", emissions: 210, target: 300, improvement: 30 },
  ]

  const categoryBreakdown = [
    { category: "Transportation", current: 45, previous: 55, change: -18 },
    { category: "Home Energy", current: 30, previous: 35, change: -14 },
    { category: "Diet & Food", current: 25, previous: 28, change: -11 },
  ]

  const globalComparison = {
    userAverage: 8.5,
    countryAverage: 12.3,
    globalAverage: 15.8,
    targetAverage: 6.0,
  }

  return (
    <div className="space-y-6">
      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monthly Average</CardTitle>
            <BarChart3 className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">8.5 kg</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600 flex items-center">
                <TrendingDown className="h-3 w-3 mr-1" />
                15% decrease from last month
              </span>
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Best Day</CardTitle>
            <Award className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">4.2 kg</div>
            <p className="text-xs text-muted-foreground">June 15th - Great job!</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Days Below Target</CardTitle>
            <Target className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">18/30</div>
            <p className="text-xs text-muted-foreground">60% success rate this month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Rank</CardTitle>
            <Users className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">#127</div>
            <p className="text-xs text-muted-foreground">Top 15% in your region</p>
          </CardContent>
        </Card>
      </div>

      {/* Monthly Trend */}
      <Card>
        <CardHeader>
          <CardTitle>6-Month Emissions Trend</CardTitle>
          <CardDescription>Your progress over time vs monthly targets</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {monthlyData.map((month) => (
              <div key={month.month} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">{month.month}</span>
                  <div className="flex items-center space-x-4">
                    <span className="text-sm text-gray-600">{month.emissions} kg CO₂</span>
                    <Badge variant={month.emissions <= month.target ? "default" : "destructive"}>
                      {month.improvement}% improvement
                    </Badge>
                  </div>
                </div>
                <div className="relative">
                  <Progress value={(month.emissions / month.target) * 100} className="h-3" />
                  <div className="absolute top-0 right-0 w-1 h-3 bg-red-300 rounded-r"></div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Category Breakdown */}
        <Card>
          <CardHeader>
            <CardTitle>Category Performance</CardTitle>
            <CardDescription>Month-over-month changes by category</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {categoryBreakdown.map((category) => (
              <div key={category.category} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">{category.category}</span>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-600">{category.current}%</span>
                    <Badge variant={category.change < 0 ? "default" : "destructive"}>
                      {category.change > 0 ? "+" : ""}
                      {category.change}%
                    </Badge>
                  </div>
                </div>
                <Progress value={category.current} className="h-2" />
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Global Comparison */}
        <Card>
          <CardHeader>
            <CardTitle>How You Compare</CardTitle>
            <CardDescription>Your emissions vs global averages</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">You</span>
                <span className="text-sm font-bold text-green-600">{globalComparison.userAverage} kg/day</span>
              </div>
              <Progress value={(globalComparison.userAverage / globalComparison.globalAverage) * 100} className="h-2" />

              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Country Average</span>
                <span className="text-sm text-gray-600">{globalComparison.countryAverage} kg/day</span>
              </div>
              <Progress
                value={(globalComparison.countryAverage / globalComparison.globalAverage) * 100}
                className="h-2"
              />

              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Global Average</span>
                <span className="text-sm text-gray-600">{globalComparison.globalAverage} kg/day</span>
              </div>
              <Progress value={100} className="h-2" />

              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Paris Agreement Target</span>
                <span className="text-sm font-bold text-blue-600">{globalComparison.targetAverage} kg/day</span>
              </div>
              <Progress
                value={(globalComparison.targetAverage / globalComparison.globalAverage) * 100}
                className="h-2"
              />
            </div>

            <div className="mt-4 p-3 bg-green-50 rounded-lg">
              <p className="text-sm text-green-800">
                🎉 You're emitting <strong>31% less</strong> than the country average and <strong>46% less</strong> than
                the global average!
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Insights */}
      <Card>
        <CardHeader>
          <CardTitle>Key Insights</CardTitle>
          <CardDescription>AI-powered analysis of your carbon footprint patterns</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-4 border rounded-lg bg-blue-50">
              <div className="flex items-center space-x-2 mb-2">
                <TrendingDown className="h-5 w-5 text-blue-600" />
                <h4 className="font-semibold text-blue-800">Positive Trend</h4>
              </div>
              <p className="text-sm text-blue-700">
                Your emissions have decreased by 30% over the last 6 months. Keep up the great work!
              </p>
            </div>

            <div className="p-4 border rounded-lg bg-yellow-50">
              <div className="flex items-center space-x-2 mb-2">
                <Calendar className="h-5 w-5 text-yellow-600" />
                <h4 className="font-semibold text-yellow-800">Weekend Pattern</h4>
              </div>
              <p className="text-sm text-yellow-700">
                Your weekend emissions are 25% lower than weekdays. Consider applying weekend habits to weekdays.
              </p>
            </div>

            <div className="p-4 border rounded-lg bg-green-50">
              <div className="flex items-center space-x-2 mb-2">
                <Award className="h-5 w-5 text-green-600" />
                <h4 className="font-semibold text-green-800">Top Performer</h4>
              </div>
              <p className="text-sm text-green-700">
                Transportation improvements contributed most to your emission reductions this month.
              </p>
            </div>

            <div className="p-4 border rounded-lg bg-purple-50">
              <div className="flex items-center space-x-2 mb-2">
                <Target className="h-5 w-5 text-purple-600" />
                <h4 className="font-semibold text-purple-800">Goal Progress</h4>
              </div>
              <p className="text-sm text-purple-700">
                You're 75% of the way to your annual reduction goal. Stay focused on energy efficiency.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
