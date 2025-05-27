import { NextResponse } from "next/server"

// Mock database - in a real app, this would be a database
const users = [
  { id: 1, name: "John Doe", email: "john@example.com", status: "active" },
  { id: 2, name: "Jane Smith", email: "jane@example.com", status: "active" },
  { id: 3, name: "Bob Johnson", email: "bob@example.com", status: "inactive" },
  { id: 4, name: "Alice Brown", email: "alice@example.com", status: "active" },
  { id: 5, name: "Charlie Wilson", email: "charlie@example.com", status: "active" },
]

export async function GET() {
  try {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500))

    return NextResponse.json(users)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch users" }, { status: 500 })
  }
}

export async function POST(request) {
  try {
    const body = await request.json()
    const { name, email } = body

    if (!name || !email) {
      return NextResponse.json({ error: "Name and email are required" }, { status: 400 })
    }

    const newUser = {
      id: users.length + 1,
      name,
      email,
      status: "active",
    }

    users.push(newUser)

    return NextResponse.json(newUser, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "Failed to create user" }, { status: 500 })
  }
}

export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get("id")

    if (!id) {
      return NextResponse.json({ error: "User ID is required" }, { status: 400 })
    }

    const userIndex = users.findIndex((user) => user.id === Number.parseInt(id))

    if (userIndex === -1) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    users.splice(userIndex, 1)

    return NextResponse.json({ message: "User deleted successfully" })
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete user" }, { status: 500 })
  }
}
