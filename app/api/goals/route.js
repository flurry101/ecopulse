import { NextResponse } from "next/server"

// Mock goals database
const goals = [
  {
    id: "goal1",
    userId: "user123",
    title: "Reduce weekly emissions by 20%",
    description: "Lower your average weekly carbon footprint from 60kg to 48kg CO₂",
    category: "Overall",
    target: 48,
    current: 52,
    startValue: 60,
    timeframe: "4 weeks",
    status: "active",
    progress: 67,
    createdAt: "2024-05-01T00:00:00Z",
    targetDate: "2024-06-01T00:00:00Z",
  },
  {
    id: "goal2",
    userId: "user123",
    title: "Use public transport 15 times this month",
    description: "Replace car trips with public transportation",
    category: "Transportation",
    target: 15,
    current: 9,
    startValue: 0,
    timeframe: "1 month",
    status: "active",
    progress: 60,
    createdAt: "2024-05-15T00:00:00Z",
    targetDate: "2024-06-15T00:00:00Z",
  },
]

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get("userId")
    const status = searchParams.get("status") || "active"

    if (!userId) {
      return NextResponse.json({ error: "User ID is required" }, { status: 400 })
    }

    const userGoals = goals.filter((goal) => goal.userId === userId && goal.status === status)

    return NextResponse.json(userGoals)
  } catch (error) {
    console.error("Error fetching goals:", error)
    return NextResponse.json({ error: "Failed to fetch goals" }, { status: 500 })
  }
}

export async function POST(request) {
  try {
    const body = await request.json()
    const { userId, title, description, category, target, timeframe } = body

    if (!userId || !title || !target || !category) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const newGoal = {
      id: `goal_${Date.now()}`,
      userId,
      title,
      description,
      category,
      target: Number.parseFloat(target),
      current: 0,
      startValue: 0,
      timeframe,
      status: "active",
      progress: 0,
      createdAt: new Date().toISOString(),
      targetDate: calculateTargetDate(timeframe),
    }

    goals.push(newGoal)

    return NextResponse.json({
      goal: newGoal,
      message: "Goal created successfully",
    })
  } catch (error) {
    console.error("Error creating goal:", error)
    return NextResponse.json({ error: "Failed to create goal" }, { status: 500 })
  }
}

export async function PUT(request) {
  try {
    const body = await request.json()
    const { goalId, updates } = body

    if (!goalId) {
      return NextResponse.json({ error: "Goal ID is required" }, { status: 400 })
    }

    const goalIndex = goals.findIndex((g) => g.id === goalId)

    if (goalIndex === -1) {
      return NextResponse.json({ error: "Goal not found" }, { status: 404 })
    }

    // Update goal
    goals[goalIndex] = { ...goals[goalIndex], ...updates, updatedAt: new Date().toISOString() }

    // Recalculate progress if current value changed
    if (updates.current !== undefined) {
      const goal = goals[goalIndex]
      goal.progress = Math.min(100, Math.max(0, (goal.current / goal.target) * 100))
    }

    return NextResponse.json({
      goal: goals[goalIndex],
      message: "Goal updated successfully",
    })
  } catch (error) {
    console.error("Error updating goal:", error)
    return NextResponse.json({ error: "Failed to update goal" }, { status: 500 })
  }
}

function calculateTargetDate(timeframe) {
  const now = new Date()
  const timeframeMap = {
    "1-week": 7,
    "2-weeks": 14,
    "1-month": 30,
    "3-months": 90,
    "6-months": 180,
  }

  const days = timeframeMap[timeframe] || 30
  const targetDate = new Date(now.getTime() + days * 24 * 60 * 60 * 1000)
  return targetDate.toISOString()
}
