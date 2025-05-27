import { NextResponse } from "next/server"

// Mock database - in production, use a real database
const calculations = []
const users = []

export async function POST(request) {
  try {
    const body = await request.json()
    const { userId, inputs, results, timestamp } = body

    if (!userId || !results) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Create calculation record
    const calculation = {
      id: Date.now().toString(),
      userId,
      inputs,
      results,
      timestamp,
      createdAt: new Date().toISOString(),
    }

    // Save calculation
    calculations.push(calculation)

    // Update user stats
    await updateUserStats(userId, results)

    // Generate recommendations
    const recommendations = await generateRecommendations(userId, results, inputs)

    return NextResponse.json({
      calculation,
      recommendations,
      message: "Calculation saved successfully",
    })
  } catch (error) {
    console.error("Error saving calculation:", error)
    return NextResponse.json({ error: "Failed to save calculation" }, { status: 500 })
  }
}

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get("userId")
    const limit = Number.parseInt(searchParams.get("limit") || "10")

    if (!userId) {
      return NextResponse.json({ error: "User ID is required" }, { status: 400 })
    }

    // Get user's calculations
    const userCalculations = calculations
      .filter((calc) => calc.userId === userId)
      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
      .slice(0, limit)

    return NextResponse.json(userCalculations)
  } catch (error) {
    console.error("Error fetching calculations:", error)
    return NextResponse.json({ error: "Failed to fetch calculations" }, { status: 500 })
  }
}

async function updateUserStats(userId, results) {
  // Update user's total emissions, streak, etc.
  const userIndex = users.findIndex((u) => u.id === userId)

  if (userIndex === -1) {
    // Create new user stats
    users.push({
      id: userId,
      totalEmissions: results.total,
      calculationCount: 1,
      lastCalculation: new Date().toISOString(),
      streak: 1,
      level: 1,
      badges: ["first-calculation"],
    })
  } else {
    // Update existing user
    const user = users[userIndex]
    user.totalEmissions = results.total
    user.calculationCount += 1
    user.lastCalculation = new Date().toISOString()

    // Update streak logic
    const lastCalc = new Date(user.lastCalculation)
    const now = new Date()
    const daysDiff = Math.floor((now.getTime() - lastCalc.getTime()) / (1000 * 60 * 60 * 24))

    if (daysDiff === 1) {
      user.streak += 1
    } else if (daysDiff > 1) {
      user.streak = 1
    }

    // Level up logic
    if (user.calculationCount >= 10 && user.level < 2) {
      user.level = 2
      user.badges.push("level-2")
    }

    users[userIndex] = user
  }
}

async function generateRecommendations(userId, results, inputs) {
  const recommendations = []

  // Transportation recommendations
  if (results.transport > 5) {
    recommendations.push({
      id: "transport-1",
      category: "Transportation",
      title: "Switch to Public Transport",
      description: "Using public transport 3 days a week could reduce your transport emissions by 40%",
      impact: "high",
      savings: "2-4 kg CO₂ per day",
      difficulty: "Easy",
      priority: 1,
    })
  }

  // Energy recommendations
  if (results.energy > 4) {
    recommendations.push({
      id: "energy-1",
      category: "Energy",
      title: "Upgrade to LED Lighting",
      description: "LED bulbs use 75% less energy and last 25 times longer",
      impact: "medium",
      savings: "1-2 kg CO₂ per day",
      difficulty: "Easy",
      priority: 2,
    })
  }

  // Diet recommendations
  if (results.diet > 5) {
    recommendations.push({
      id: "diet-1",
      category: "Diet",
      title: "Try Meatless Mondays",
      description: "Reducing meat consumption one day per week can significantly lower your food carbon footprint",
      impact: "medium",
      savings: "1-3 kg CO₂ per day",
      difficulty: "Medium",
      priority: 3,
    })
  }

  // Renewable energy recommendation
  if (Number.parseFloat(inputs.renewableEnergy || "0") < 20) {
    recommendations.push({
      id: "energy-2",
      category: "Energy",
      title: "Consider Solar Panels",
      description: "Solar panels can reduce your home energy emissions by up to 80%",
      impact: "high",
      savings: "3-6 kg CO₂ per day",
      difficulty: "Hard",
      priority: 4,
    })
  }

  return recommendations.sort((a, b) => a.priority - b.priority)
}
