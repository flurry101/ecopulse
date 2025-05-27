"use client"

import { createContext, useContext, useState, useEffect } from "react"

const AuthContext = createContext()

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  // Auth0 configuration
  const auth0Config = {
    domain: process.env.NEXT_PUBLIC_AUTH0_DOMAIN,
    clientId: process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID,
    redirectUri: typeof window !== "undefined" ? window.location.origin : "",
  }

  useEffect(() => {
    // Check if Auth0 is configured
    if (auth0Config.domain && auth0Config.clientId) {
      // Initialize Auth0 (when implemented)
      initializeAuth0()
    } else {
      // Fallback to demo mode
      initializeDemoMode()
    }
  }, [])

  const initializeAuth0 = async () => {
    try {
      // This would be replaced with actual Auth0 implementation
      console.log("Auth0 configuration detected, but using demo mode for now")
      initializeDemoMode()
    } catch (error) {
      console.error("Auth0 initialization failed:", error)
      initializeDemoMode()
    }
  }

  const initializeDemoMode = () => {
    // Demo user for development
    const demoUser = {
      id: "demo-user-123",
      name: "Demo User",
      email: "demo@ecotrack.app",
      picture: null,
      totalEmissions: 8.5,
      streak: 12,
      level: 3,
      badges: ["first-calculation", "week-streak", "eco-warrior"],
      joinDate: "2024-01-15",
    }

    setTimeout(() => {
      setUser(demoUser)
      setIsAuthenticated(true)
      setIsLoading(false)
    }, 1000)
  }

  const login = async () => {
    if (auth0Config.domain && auth0Config.clientId) {
      // Redirect to Auth0 login
      const loginUrl =
        `https://${auth0Config.domain}/authorize?` +
        `response_type=code&` +
        `client_id=${auth0Config.clientId}&` +
        `redirect_uri=${encodeURIComponent(auth0Config.redirectUri)}&` +
        `scope=openid profile email`

      window.location.href = loginUrl
    } else {
      // Demo login
      setIsLoading(true)
      setTimeout(() => {
        const demoUser = {
          id: "demo-user-123",
          name: "Demo User",
          email: "demo@ecotrack.app",
          picture: null,
          totalEmissions: 8.5,
          streak: 12,
          level: 3,
          badges: ["first-calculation", "week-streak", "eco-warrior"],
          joinDate: "2024-01-15",
        }
        setUser(demoUser)
        setIsAuthenticated(true)
        setIsLoading(false)
      }, 1500)
    }
  }

  const logout = async () => {
    if (auth0Config.domain) {
      // Auth0 logout
      window.location.href =
        `https://${auth0Config.domain}/v2/logout?` +
        `client_id=${auth0Config.clientId}&` +
        `returnTo=${encodeURIComponent(auth0Config.redirectUri)}`
    } else {
      // Demo logout
      setUser(null)
      setIsAuthenticated(false)
    }
  }

  const value = {
    user,
    isLoading,
    isAuthenticated,
    login,
    logout,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
