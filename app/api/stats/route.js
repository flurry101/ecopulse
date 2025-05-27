import { NextResponse } from "next/server"

export async function GET() {
  try {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 300))

    // Mock statistics data
    const stats = {
      totalUsers: 1234,
      totalOrders: 856,
      revenue: 45231,
      growth: 12.5,
    }

    return NextResponse.json(stats)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch statistics" }, { status: 500 })
  }
}
