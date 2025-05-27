import { NextResponse } from "next/server"

// Mock user database
const users = [
  {
    id: "user123",
    name: "Alex Green",
    email: "alex@example.com",
    totalEmissions: 8.5,
    streak: 12,
    level: 3,
    badges: ["first-calculation", "week-streak", "eco-warrior"],
    joinDate: "2024-01-15",
    settings: {
      notifications: true,
      publicProfile: false,
      units: "metric",
    },
    stats: {
      calculationCount: 45,
      averageEmissions: 8.5,
      bestDay: 4.2,
      totalReduction: 25,
    },
  },
]

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get("userId")

    if (!userId) {
      return NextResponse.json({ error: "User ID is required" }, { status: 400 })
    }

    const user = users.find((u) => u.id === userId)

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    return NextResponse.json(user)
  } catch (error) {
    console.error("Error fetching user profile:", error)
    return NextResponse.json({ error: "Failed to fetch user profile" }, { status: 500 })
  }
}

export async function PUT(request) {
  try {
    const body = await request.json()
    const { userId, updates } = body

    if (!userId) {
      return NextResponse.json({ error: "User ID is required" }, { status: 400 })
    }

    const userIndex = users.findIndex((u) => u.id === userId)

    if (userIndex === -1) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    // Update user profile
    users[userIndex] = { ...users[userIndex], ...updates, updatedAt: new Date().toISOString() }

    return NextResponse.json({
      user: users[userIndex],
      message: "Profile updated successfully",
    })
  } catch (error) {
    console.error("Error updating user profile:", error)
    return NextResponse.json({ error: "Failed to update profile" }, { status: 500 })
  }
}
