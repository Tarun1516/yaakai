"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"
import { account, databases, DATABASE_ID, USERS_COLLECTION_ID } from "./appwrite"
import { ID } from "appwrite"
import LogoSpinner from "@/components/LogoSpinner"

interface User {
  $id: string
  email: string
  name: string
  phoneNumber?: string
}

interface AuthContextType {
  user: User | null
  error: string | null
  signIn: (email: string, password: string) => Promise<void>
  signUp: (email: string, password: string, name: string, phoneNumber?: string) => Promise<void>
  logout: () => Promise<void>
  clearError: () => void
}

// Export AuthContext so it can be imported directly
export const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [isInitialized, setIsInitialized] = useState(false)

  useEffect(() => {
    const initAuth = async () => {
      try {
        await checkUser()
      } catch (error) {
        console.error("Auth initialization error:", error)
      } finally {
        setIsInitialized(true)
      }
    }

    initAuth()
  }, [])

  const checkUser = async () => {
    try {
      const session = await account.get()
      if (session) {
        // Get additional user data from database
        try {
          const userData = await databases.getDocument(DATABASE_ID, USERS_COLLECTION_ID, session.$id)

          setUser({
            $id: session.$id,
            email: session.email,
            name: session.name || userData.name,
            phoneNumber: userData.phoneNumber,
          })
        } catch (dbError) {
          // If we can't get user data from database, still set basic user info
          console.error("Error fetching user data:", dbError)
          setUser({
            $id: session.$id,
            email: session.email,
            name: session.name,
          })
        }
      } else {
        setUser(null)
      }
    } catch (error: any) {
      console.error("Session check error:", error)

      // Check if it's a 401 Unauthorized error (normal when not logged in)
      if (error.code === 401) {
        setUser(null)
      } else {
        // For network errors, don't disrupt the user experience
        if (error.message === "Failed to fetch") {
          console.warn("Network error during auth check - continuing as guest")
        }
        setUser(null)
      }
    }
  }

  const clearError = () => setError(null)

  const signIn = async (email: string, password: string) => {
    try {
      clearError()
      await account.createEmailSession(email, password)
      await checkUser()
    } catch (error: any) {
      if (error.message === "Failed to fetch") {
        setError("Network error. Please check your internet connection and try again.")
      } else {
        setError(error.message || "Failed to sign in")
      }
      throw error
    }
  }

  const signUp = async (email: string, password: string, name: string, phoneNumber = "") => {
    try {
      clearError()
      const response = await account.create(ID.unique(), email, password, name)
      await databases.createDocument(DATABASE_ID, USERS_COLLECTION_ID, response.$id, {
        name,
        email,
        phoneNumber,
      })
      await signIn(email, password)
    } catch (error: any) {
      if (error.message === "Failed to fetch") {
        setError("Network error. Please check your internet connection and try again.")
      } else {
        setError(error.message || "Failed to sign up")
      }
      throw error
    }
  }

  const logout = async () => {
    try {
      clearError()
      await account.deleteSession("current")
      setUser(null)
    } catch (error: any) {
      if (error.message === "Failed to fetch") {
        // If we can't reach the server, just log out locally
        setUser(null)
      } else {
        setError(error.message || "Failed to log out")
        throw error
      }
    }
  }

  // Don't render children until auth is initialized
  if (!isInitialized) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <LogoSpinner size="large" />
      </div>
    )
  }

  return (
    <AuthContext.Provider value={{ user, error, signIn, signUp, logout, clearError }}>{children}</AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

