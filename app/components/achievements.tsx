"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Trophy, Award, Star, Target, Flame, Users } from "lucide-react"
import { User, Achievement } from '../../types';

export default function Achievements({ user }: { user: User }) {
  const earnedBadges = [
    {
      id: "first-calculation",
      name: "First Steps",
      description: "Completed your first carbon footprint calculation",
      icon: "🌱",
      category: "Getting Started",
      earnedDate: "2024-01-15",
      rarity: "common",
    },
    {
      id: "week-streak",
      name: "Week Warrior",
      description: "Logged emissions for 7 consecutive days",
      icon: "🔥",
      category: "Consistency",
      earnedDate: "2024-01-22",
      rarity: "common",
    },
    {
      id: "eco-warrior",
      name: "Eco Warrior",
      description: "Reduced emissions by 20% in a month",
      icon: "🏆",
      category: "Achievement",
      earnedDate: "2024-02-15",
      rarity: "rare",
    },
    {
      id: "green-commuter",
      name: "Green Commuter",
      description: "Used public transport 20 times in a month",
      icon: "🚌",
      category: "Transportation",
      earnedDate: "2024-03-01",
      rarity: "uncommon",
    },
    {
      id: "energy-saver",
      name: "Energy Saver",
      description: "Reduced home energy consumption by 15%",
      icon: "⚡",
      category: "Energy",
      earnedDate: "2024-03-15",
      rarity: "uncommon",
    },
    {
      id: "plant-based",
      name: "Plant Pioneer",
      description: "Chose plant-based meals for 10 consecutive days",
      icon: "🥗",
      category: "Diet",
      earnedDate: "2024-04-01",
      rarity: "rare",
    },
  ]

  const availableBadges = [
    {
      id: "month-streak",
      name: "Monthly Master",
      description: "Log emissions for 30 consecutive days",
      icon: "📅",
      category: "Consistency",
      progress: 75,
      requirement: "25/30 days completed",
      rarity: "rare",
    },
    {
      id: "carbon-neutral",
      name: "Carbon Neutral",
      description: "Achieve net-zero emissions for a week",
      icon: "🌍",
      category: "Achievement",
      progress: 40,
      requirement: "Offset 60% more emissions",
      rarity: "legendary",
    },
    {
      id: "influencer",
      name: "Eco Influencer",
      description: "Invite 5 friends to join EcoPulse",
      icon: "👥",
      category: "Community",
      progress: 20,
      requirement: "1/5 friends invited",
      rarity: "uncommon",
    },
    {
      id: "perfectionist",
      name: "Perfectionist",
      description: "Stay below target emissions for 14 consecutive days",
      icon: "🎯",
      category: "Achievement",
      progress: 85,
      requirement: "12/14 days completed",
      rarity: "epic",
    },
  ]

  const getRarityColor = (rarity: Achievement['rarity']) => {
    switch (rarity) {
      case "common":
        return "bg-gray-100 text-gray-800"
      case "uncommon":
        return "bg-green-100 text-green-800"
      case "rare":
        return "bg-blue-100 text-blue-800"
      case "epic":
        return "bg-purple-100 text-purple-800"
      case "legendary":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getRarityBorder = (rarity: Achievement['rarity']) => {
    switch (rarity) {
      case "common":
        return "border-gray-200"
      case "uncommon":
        return "border-green-200"
      case "rare":
        return "border-blue-200"
      case "epic":
        return "border-purple-200"
      case "legendary":
        return "border-yellow-200"
      default:
        return "border-gray-200"
    }
  }

  return (
    <div className="space-y-6">
      {/* Achievement Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Badges Earned</CardTitle>
            <Trophy className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{earnedBadges.length}</div>
            <p className="text-xs text-muted-foreground">{availableBadges.length} more to unlock</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Current Level</CardTitle>
            <Star className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">Level {user?.level}</div>
            <Progress value={65} className="mt-2" />
            <p className="text-xs text-muted-foreground mt-1">65% to Level {user?.level + 1}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Streak Record</CardTitle>
            <Flame className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">28 days</div>
            <p className="text-xs text-muted-foreground">Personal best streak</p>
          </CardContent>
        </Card>
      </div>

      {/* Earned Badges */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Award className="h-5 w-5 text-yellow-600" />
            <span>Earned Badges</span>
          </CardTitle>
          <CardDescription>Your achievements and milestones</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {earnedBadges.map((badge) => (
              <div
                key={badge.id}
                className={`p-4 border-2 rounded-lg ${getRarityBorder(badge.rarity)} bg-white hover:shadow-md transition-shadow`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="text-3xl">{badge.icon}</div>
                  <Badge className={getRarityColor(badge.rarity)}>{badge.rarity}</Badge>
                </div>
                <h3 className="font-semibold text-gray-900 mb-1">{badge.name}</h3>
                <p className="text-sm text-gray-600 mb-2">{badge.description}</p>
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>{badge.category}</span>
                  <span>Earned {new Date(badge.earnedDate).toLocaleDateString()}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Available Badges */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Target className="h-5 w-5 text-blue-600" />
            <span>Available Badges</span>
          </CardTitle>
          <CardDescription>Badges you can earn next</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {availableBadges.map((badge) => (
              <div
                key={badge.id}
                className={`p-4 border-2 border-dashed ${getRarityBorder(badge.rarity)} rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="text-3xl opacity-60">{badge.icon}</div>
                  <Badge variant="outline" className={getRarityColor(badge.rarity)}>
                    {badge.rarity}
                  </Badge>
                </div>
                <h3 className="font-semibold text-gray-900 mb-1">{badge.name}</h3>
                <p className="text-sm text-gray-600 mb-3">{badge.description}</p>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-500">{badge.requirement}</span>
                    <span className="font-medium">{badge.progress}%</span>
                  </div>
                  <Progress value={badge.progress} className="h-2" />
                </div>
                <div className="mt-2 text-xs text-gray-500">{badge.category}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Leaderboard */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Users className="h-5 w-5 text-green-600" />
            <span>Community Leaderboard</span>
          </CardTitle>
          <CardDescription>See how you rank among other eco-warriors</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              { rank: 1, name: "EcoMaster2024", badges: 24, level: 8, isUser: false },
              { rank: 2, name: "GreenGuru", badges: 22, level: 7, isUser: false },
              { rank: 3, name: "CarbonCrusher", badges: 20, level: 7, isUser: false },
              { rank: 127, name: "You (Alex Green)", badges: earnedBadges.length, level: user?.level, isUser: true },
            ].map((player) => (
              <div
                key={player.rank}
                className={`flex items-center justify-between p-3 rounded-lg ${
                  player.isUser ? "bg-green-50 border border-green-200" : "bg-gray-50"
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                      player.rank <= 3
                        ? "bg-yellow-100 text-yellow-800"
                        : player.isUser
                          ? "bg-green-100 text-green-800"
                          : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {player.rank <= 3 ? ["🥇", "🥈", "🥉"][player.rank - 1] : `#${player.rank}`}
                  </div>
                  <div>
                    <p className={`font-medium ${player.isUser ? "text-green-900" : "text-gray-900"}`}>{player.name}</p>
                    <p className="text-xs text-gray-500">Level {player.level}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-900">{player.badges} badges</p>
                  <p className="text-xs text-gray-500">earned</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
