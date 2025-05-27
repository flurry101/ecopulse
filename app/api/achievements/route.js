import { NextResponse } from "next/server"

// Mock achievements database
const userAchievements = [
  {
    userId: "user123",
    badgeId: "first-calculation",
    earnedDate: "2024-01-15T00:00:00Z",
    progress: 100,
  },
  {
    userId: "user123",
    badgeId: "week-streak",
    earnedDate: "2024-01-22T00:00:00Z",
    progress: 100,
  },
  {
    userId: "user123",
    badgeId: "eco-warrior",
    earnedDate: "2024-02-15T00:00:00Z",
    progress: 100,
  },
]

const availableBadges = [
  {
    id: "first-calculation",
    name: "First Steps",
    description: "Completed your first carbon footprint calculation",
    icon: "🌱",
    category: "Getting Started",
    rarity: "common",
    requirement: "Complete 1 calculation",
  },
  {
    id: "week-streak",
    name: "Week Warrior",
    description: "Logged emissions for 7 consecutive days",
    icon: "🔥",
    category: "Consistency",
    rarity: "common",
    requirement: "7 day streak",
  },
  {
    id: "eco-warrior",
    name: "Eco Warrior",
    description: "Reduced emissions by 20% in a month",
    icon: "🏆",
    category: "Achievement",
    rarity: "rare",
    requirement: "20% reduction",
  },
  {
    id: "month-streak",
    name: "Monthly Master",
    description: "Log emissions for 30 consecutive days",
    icon: "📅",
    category: "Consistency",
    rarity: "rare",
    requirement: "30 day streak",
  },
  {
    id: "carbon-neutral",
    name: "Carbon Neutral",
    description: "Achieve net-zero emissions for a week",
    icon: "🌍",
    category: "Achievement",
    rarity: "legendary",
    requirement: "Net-zero for 7 days",
  },
]

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get("userId")

    if (!userId) {
      return NextResponse.json({ error: "User ID is required" }, { status: 400 })
    }

    const userBadges = userAchievements.filter((achievement) => achievement.userId === userId)

    const earnedBadges = userBadges
      .filter((ub) => ub.progress === 100)
      .map((ub) => {
        const badge = availableBadges.find((b) => b.id === ub.badgeId)
        return { ...badge, earnedDate: ub.earnedDate }
      })

    const inProgressBadges = availableBadges
      .filter((badge) => !userBadges.some((ub) => ub.badgeId === badge.id && ub.progress === 100))
      .map((badge) => {
        const userBadge = userBadges.find((ub) => ub.badgeId === badge.id)
        return { ...badge, progress: userBadge?.progress || 0 }
      })

    return NextResponse.json({
      earnedBadges,
      availableBadges: inProgressBadges,
      totalEarned: earnedBadges.length,
      totalAvailable: availableBadges.length,
    })
  } catch (error) {
    console.error("Error fetching achievements:", error)
    return NextResponse.json({ error: "Failed to fetch achievements" }, { status: 500 })
  }
}

export async function POST(request) {
  try {
    const body = await request.json()
    const { userId, badgeId, progress = 100 } = body

    if (!userId || !badgeId) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Check if badge exists
    const badge = availableBadges.find((b) => b.id === badgeId)
    if (!badge) {
      return NextResponse.json({ error: "Badge not found" }, { status: 404 })
    }

    // Check if user already has this achievement
    const existingIndex = userAchievements.findIndex((ua) => ua.userId === userId && ua.badgeId === badgeId)

    if (existingIndex !== -1) {
      // Update progress
      userAchievements[existingIndex].progress = progress
      if (progress === 100 && !userAchievements[existingIndex].earnedDate) {
        userAchievements[existingIndex].earnedDate = new Date().toISOString()
      }
    } else {
      // Create new achievement
      userAchievements.push({
        userId,
        badgeId,
        progress,
        earnedDate: progress === 100 ? new Date().toISOString() : null,
      })
    }

    return NextResponse.json({
      message: progress === 100 ? "Badge earned!" : "Progress updated",
      badge,
      progress,
    })
  } catch (error) {
    console.error("Error updating achievement:", error)
    return NextResponse.json({ error: "Failed to update achievement" }, { status: 500 })
  }
}
