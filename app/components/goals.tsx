"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Target, Plus, TrendingDown, CheckCircle, Clock } from "lucide-react"
import { User, Goal } from '../../types';

export default function Goals({ user }: { user: User }) {
  const [showNewGoal, setShowNewGoal] = useState(false)
  const [newGoal, setNewGoal] = useState({
    title: "",
    target: "",
    timeframe: "",
    category: "",
  })

  const activeGoals = [
    {
      id: 1,
      title: "Reduce weekly emissions by 20%",
      description: "Lower your average weekly carbon footprint from 60kg to 48kg CO₂",
      target: 48,
      current: 52,
      startValue: 60,
      category: "Overall",
      timeframe: "4 weeks",
      progress: 67,
      daysLeft: 12,
      status: "on-track",
    },
    {
      id: 2,
      title: "Use public transport 15 times this month",
      description: "Replace car trips with public transportation",
      target: 15,
      current: 9,
      startValue: 0,
      category: "Transportation",
      timeframe: "1 month",
      progress: 60,
      daysLeft: 8,
      status: "on-track",
    },
    {
      id: 3,
      title: "Achieve 30-day emission logging streak",
      description: "Log your daily emissions for 30 consecutive days",
      target: 30,
      current: 12,
      startValue: 0,
      category: "Consistency",
      timeframe: "30 days",
      progress: 40,
      daysLeft: 18,
      status: "behind",
    },
  ]

  const completedGoals = [
    {
      id: 4,
      title: "Reduce home energy by 15%",
      description: "Lower monthly electricity consumption",
      target: 255,
      achieved: 240,
      category: "Energy",
      completedDate: "2024-05-15",
      reward: "Energy Saver Badge",
    },
    {
      id: 5,
      title: "Try plant-based meals for 7 days",
      description: "Experiment with vegetarian diet for a week",
      target: 7,
      achieved: 7,
      category: "Diet",
      completedDate: "2024-04-20",
      reward: "Plant Pioneer Badge",
    },
  ]

  const handleCreateGoal = () => {
    if (newGoal.title && newGoal.target && newGoal.timeframe && newGoal.category) {
      // In a real app, this would save to the backend
      console.log("Creating new goal:", newGoal)
      setNewGoal({ title: "", target: "", timeframe: "", category: "" })
      setShowNewGoal(false)
    }
  }

  const getStatusColor = (status: Goal['status']) => {
    switch (status) {
      case "on-track":
        return "text-green-600 bg-green-50"
      case "behind":
        return "text-yellow-600 bg-yellow-50"
      case "at-risk":
        return "text-red-600 bg-red-50"
      default:
        return "text-gray-600 bg-gray-50"
    }
  }

  const getStatusIcon = (status: Goal['status']) => {
    switch (status) {
      case "on-track":
        return "🎯"
      case "behind":
        return "⚠️"
      case "at-risk":
        return "🚨"
      default:
        return "📊"
    }
  }

  return (
    <div className="space-y-6">
      {/* Goals Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Goals</CardTitle>
            <Target className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{activeGoals.length}</div>
            <p className="text-xs text-muted-foreground">
              {activeGoals.filter((g) => g.status === "on-track").length} on track
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed Goals</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{completedGoals.length}</div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Progress</CardTitle>
            <TrendingDown className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">
              {Math.round(activeGoals.reduce((sum, goal) => sum + goal.progress, 0) / activeGoals.length)}%
            </div>
            <p className="text-xs text-muted-foreground">Across all goals</p>
          </CardContent>
        </Card>
      </div>

      {/* Active Goals */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center space-x-2">
                <Target className="h-5 w-5 text-blue-600" />
                <span>Active Goals</span>
              </CardTitle>
              <CardDescription>Your current sustainability targets</CardDescription>
            </div>
            <Button onClick={() => setShowNewGoal(true)} size="sm">
              <Plus className="h-4 w-4 mr-2" />
              New Goal
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {activeGoals.map((goal) => (
            <div key={goal.id} className="border rounded-lg p-4 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="text-2xl">{getStatusIcon(goal.status)}</div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{goal.title}</h3>
                    <p className="text-sm text-gray-600">{goal.description}</p>
                  </div>
                </div>
                <div className="text-right">
                  <Badge className={getStatusColor(goal.status)}>{goal.status.replace("-", " ")}</Badge>
                  <p className="text-xs text-gray-500 mt-1 flex items-center">
                    <Clock className="h-3 w-3 mr-1" />
                    {goal.daysLeft} days left
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span>
                    Progress: {goal.current} / {goal.target}
                  </span>
                  <span className="font-medium">{goal.progress}%</span>
                </div>
                <Progress value={goal.progress} className="h-2" />
              </div>

              <div className="flex items-center justify-between text-xs text-gray-500">
                <span>
                  {goal.category} • {goal.timeframe}
                </span>
                <span>Started from {goal.startValue}</span>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* New Goal Form */}
      {showNewGoal && (
        <Card>
          <CardHeader>
            <CardTitle>Create New Goal</CardTitle>
            <CardDescription>Set a new sustainability target</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="goalTitle">Goal Title</Label>
                <Input
                  id="goalTitle"
                  placeholder="e.g., Reduce car usage by 30%"
                  value={newGoal.title}
                  onChange={(e) => setNewGoal({ ...newGoal, title: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="goalTarget">Target Value</Label>
                <Input
                  id="goalTarget"
                  type="number"
                  placeholder="e.g., 50"
                  value={newGoal.target}
                  onChange={(e) => setNewGoal({ ...newGoal, target: e.target.value })}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="goalCategory">Category</Label>
                <Select value={newGoal.category} onValueChange={(value) => setNewGoal({ ...newGoal, category: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="overall">Overall Emissions</SelectItem>
                    <SelectItem value="transportation">Transportation</SelectItem>
                    <SelectItem value="energy">Home Energy</SelectItem>
                    <SelectItem value="diet">Diet & Food</SelectItem>
                    <SelectItem value="consistency">Consistency</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="goalTimeframe">Timeframe</Label>
                <Select
                  value={newGoal.timeframe}
                  onValueChange={(value) => setNewGoal({ ...newGoal, timeframe: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select timeframe" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1-week">1 Week</SelectItem>
                    <SelectItem value="2-weeks">2 Weeks</SelectItem>
                    <SelectItem value="1-month">1 Month</SelectItem>
                    <SelectItem value="3-months">3 Months</SelectItem>
                    <SelectItem value="6-months">6 Months</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Button onClick={handleCreateGoal} className="bg-green-600 hover:bg-green-700">
                Create Goal
              </Button>
              <Button variant="outline" onClick={() => setShowNewGoal(false)}>
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Completed Goals */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <CheckCircle className="h-5 w-5 text-green-600" />
            <span>Completed Goals</span>
          </CardTitle>
          <CardDescription>Your sustainability achievements</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {completedGoals.map((goal) => (
            <div key={goal.id} className="border rounded-lg p-4 bg-green-50 border-green-200">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-3">
                  <div className="text-2xl">✅</div>
                  <div>
                    <h3 className="font-semibold text-green-900">{goal.title}</h3>
                    <p className="text-sm text-green-700">{goal.description}</p>
                  </div>
                </div>
                <Badge className="bg-green-100 text-green-800">Completed</Badge>
              </div>

              <div className="flex items-center justify-between text-sm text-green-700">
                <span>
                  Achieved: {goal.achieved} / {goal.target}
                </span>
                <span>Completed {new Date(goal.completedDate).toLocaleDateString()}</span>
              </div>

              <div className="mt-2 p-2 bg-green-100 rounded text-sm text-green-800">🏆 Reward: {goal.reward}</div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Goal Suggestions */}
      <Card>
        <CardHeader>
          <CardTitle>Suggested Goals</CardTitle>
          <CardDescription>Based on your current emissions and patterns</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              {
                title: "Walk or bike for short trips",
                description: "Replace car trips under 2km with walking or cycling",
                category: "Transportation",
                difficulty: "Easy",
                impact: "Medium",
              },
              {
                title: "Implement energy-saving habits",
                description: "Turn off lights and unplug devices when not in use",
                category: "Energy",
                difficulty: "Easy",
                impact: "Low",
              },
              {
                title: "Try one plant-based meal per day",
                description: "Gradually reduce meat consumption",
                category: "Diet",
                difficulty: "Medium",
                impact: "High",
              },
              {
                title: "Use a smart thermostat",
                description: "Optimize heating and cooling efficiency",
                category: "Energy",
                difficulty: "Medium",
                impact: "High",
              },
            ].map((suggestion, index) => (
              <div
                key={index}
                className="border border-dashed border-gray-300 rounded-lg p-4 hover:border-green-300 hover:bg-green-50 transition-colors cursor-pointer"
              >
                <h4 className="font-semibold text-gray-900 mb-2">{suggestion.title}</h4>
                <p className="text-sm text-gray-600 mb-3">{suggestion.description}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Badge variant="outline" className="text-xs">
                      {suggestion.category}
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      {suggestion.difficulty}
                    </Badge>
                  </div>
                  <Badge
                    className={`text-xs ${
                      suggestion.impact === "High"
                        ? "bg-red-100 text-red-800"
                        : suggestion.impact === "Medium"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-green-100 text-green-800"
                    }`}
                  >
                    {suggestion.impact} Impact
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
