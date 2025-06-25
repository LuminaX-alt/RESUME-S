"use client"

import { useEffect, useState } from "react"
import { useAuth } from "@/lib/auth"
import { useRouter } from "next/navigation"
import { Header } from "@/components/header"
import { DashboardStats } from "@/components/dashboard/dashboard-stats"
import { RecentResumes } from "@/components/dashboard/recent-resumes"
import { QuickActions } from "@/components/dashboard/quick-actions"
import { ActivityFeed } from "@/components/dashboard/activity-feed"
import { Loader2 } from "lucide-react"

export default function DashboardPage() {
  const { user, loading } = useAuth()
  const router = useRouter()
  const [dashboardData, setDashboardData] = useState(null)
  const [isLoadingData, setIsLoadingData] = useState(true)

  useEffect(() => {
    if (!loading && !user) {
      router.push("/")
      return
    }

    if (user) {
      // Fetch dashboard data
      fetchDashboardData()
    }
  }, [user, loading, router])

  const fetchDashboardData = async () => {
    try {
      // Fetch all data in parallel for better performance
      const [statsResponse, resumesResponse, activitiesResponse] = await Promise.all([
        fetch("/api/dashboard/stats"),
        fetch("/api/dashboard/resumes"),
        fetch("/api/dashboard/activities"),
      ])

      const [statsData, resumesData, activitiesData] = await Promise.all([
        statsResponse.json(),
        resumesResponse.json(),
        activitiesResponse.json(),
      ])

      setDashboardData({
        stats: statsData.stats || {
          totalResumes: 5,
          activeApplications: 3,
          interviewsScheduled: 2,
          successRate: 85,
        },
        recentResumes: resumesData.resumes || [
          {
            id: 1,
            title: "Software Engineer Resume",
            company: "Tech Corp",
            status: "active",
            matchScore: 95,
            createdAt: "2024-01-15",
            template: "Modern Tech",
          },
          {
            id: 2,
            title: "Senior Developer Resume",
            company: "StartupXYZ",
            status: "pending",
            matchScore: 88,
            createdAt: "2024-01-14",
            template: "Creative Pro",
          },
        ],
        activities: activitiesData.activities || [
          {
            id: 1,
            type: "resume_created",
            title: "New resume created",
            description: "Software Engineer resume for Tech Corp",
            timestamp: "2 hours ago",
          },
          {
            id: 2,
            type: "application_sent",
            title: "Application submitted",
            description: "Applied to Senior Developer position",
            timestamp: "1 day ago",
          },
        ],
      })
    } catch (error) {
      console.error("Failed to fetch dashboard data:", error)
      // Use fallback data immediately
      setDashboardData({
        stats: {
          totalResumes: 5,
          activeApplications: 3,
          interviewsScheduled: 2,
          successRate: 85,
        },
        recentResumes: [
          {
            id: 1,
            title: "Software Engineer Resume",
            company: "Tech Corp",
            status: "active",
            matchScore: 95,
            createdAt: "2024-01-15",
            template: "Modern Tech",
          },
        ],
        activities: [
          {
            id: 1,
            type: "resume_created",
            title: "New resume created",
            description: "Software Engineer resume created",
            timestamp: "2 hours ago",
          },
        ],
      })
    } finally {
      setIsLoadingData(false)
    }
  }

  if (loading || !user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-orange-400" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <Header />

      <main className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
            Welcome back, {user.user_metadata?.full_name || "User"}!
          </h1>
          <p className="text-slate-400 text-lg">Here's what's happening with your job applications</p>
        </div>

        {isLoadingData ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-orange-400" />
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              <DashboardStats stats={dashboardData?.stats} />
              <RecentResumes resumes={dashboardData?.recentResumes} />
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              <QuickActions />
              <ActivityFeed activities={dashboardData?.activities} />
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
