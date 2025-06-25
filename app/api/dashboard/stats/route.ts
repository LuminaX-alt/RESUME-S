import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  try {
    // Return mock data for now - replace with real Supabase calls when configured
    const stats = {
      totalResumes: Math.floor(Math.random() * 20) + 5,
      activeApplications: Math.floor(Math.random() * 10) + 3,
      interviewsScheduled: Math.floor(Math.random() * 5) + 1,
      successRate: Math.floor(Math.random() * 20) + 75,
    }

    return NextResponse.json({ stats })
  } catch (error) {
    console.error("Dashboard stats error:", error)

    // Fallback data
    return NextResponse.json({
      stats: {
        totalResumes: 8,
        activeApplications: 5,
        interviewsScheduled: 2,
        successRate: 85,
      },
    })
  }
}
