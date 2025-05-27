import { NextResponse } from "next/server"

export async function POST(request) {
  try {
    const body = await request.json()
    const { inputs, userId } = body

    // Simulate calculation processing
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Mock calculation results
    const results = {
      total: 8.5,
      transport: 4.2,
      energy: 2.8,
      diet: 1.5,
      timestamp: new Date().toISOString(),
      userId,
    }

    // In a real app, save to database here
    console.log("Saving carbon calculation:", { inputs, results })

    return NextResponse.json(results)
  } catch (error) {
    return NextResponse.json({ error: "Failed to calculate carbon footprint" }, { status: 500 })
  }
}

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get("userId")

    if (!userId) {
      return NextResponse.json({ error: "User ID is required" }, { status: 400 })
    }

    // Mock historical data
    const history = [
      { date: "2024-06-01", emissions: 8.5, transport: 4.2, energy: 2.8, diet: 1.5 },
      { date: "2024-05-31", emissions: 9.2, transport: 4.8, energy: 2.9, diet: 1.5 },
      { date: "2024-05-30", emissions: 7.8, transport: 3.5, energy: 2.8, diet: 1.5 },
      { date: "2024-05-29", emissions: 8.1, transport: 4.0, energy: 2.6, diet: 1.5 },
      { date: "2024-05-28", emissions: 9.5, transport: 5.2, energy: 2.8, diet: 1.5 },
    ]

    return NextResponse.json(history)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch carbon history" }, { status: 500 })
  }
}
