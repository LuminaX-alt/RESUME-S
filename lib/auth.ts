"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"

interface User {
  id: string
  email: string
  user_metadata?: {
    full_name?: string
  }
}

interface Session {
  user: User
}

interface AuthContextType {
  user: User | null
  session: Session | null
  loading: boolean
  signIn: (email: string, password: string) => Promise<{ error: any }>
  signUp: (email: string, password: string, fullName: string) => Promise<{ error: any }>
  signOut: () => Promise<void>
  resetPassword: (email: string) => Promise<{ error: any }>
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  session: null,
  loading: true,
  signIn: async () => ({ error: null }),
  signUp: async () => ({ error: null }),
  signOut: async () => {},
  resetPassword: async () => ({ error: null }),
})

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider")
  }
  return context
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check for existing session in localStorage
    const savedUser = localStorage.getItem("luminax-user")
    if (savedUser) {
      const userData = JSON.parse(savedUser)
      setUser(userData)
      setSession({ user: userData })
    }
    setLoading(false)
  }, [])

  const signIn = async (email: string, password: string) => {
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Mock successful login
      const userData = {
        id: "1",
        email,
        user_metadata: {
          full_name: email.split("@")[0],
        },
      }

      setUser(userData)
      setSession({ user: userData })
      localStorage.setItem("luminax-user", JSON.stringify(userData))

      return { error: null }
    } catch (error) {
      return { error: { message: "Login failed" } }
    }
  }

  const signUp = async (email: string, password: string, fullName: string) => {
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Mock successful signup
      const userData = {
        id: Date.now().toString(),
        email,
        user_metadata: {
          full_name: fullName,
        },
      }

      setUser(userData)
      setSession({ user: userData })
      localStorage.setItem("luminax-user", JSON.stringify(userData))

      return { error: null }
    } catch (error) {
      return { error: { message: "Signup failed" } }
    }
  }

  const signOut = async () => {
    setUser(null)
    setSession(null)
    localStorage.removeItem("luminax-user")
  }

  const resetPassword = async (email: string) => {
    // Simulate password reset
    await new Promise((resolve) => setTimeout(resolve, 1000))
    return { error: null }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        loading,
        signIn,
        signUp,
        signOut,
        resetPassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
