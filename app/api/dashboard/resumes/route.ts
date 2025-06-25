import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  try {
    // Mock data for immediate functionality
    const resumes = [
      {
        id: 1,
        title: "Software Engineer Resume",
        company: "Tech Corp",
        status: "active",
        matchScore: 95,
        createdAt: new Date().toLocaleDateString(),
        template: "Modern Tech",
      },
      {
        id: 2,
        title: "Senior Developer Resume",
        company: "StartupXYZ",
        status: "pending",
        matchScore: 88,
        createdAt: new Date(Date.now() - 86400000).toLocaleDateString(),
        template: "Creative Pro",
      },
      {
        id: 3,
        title: "Full Stack Resume",
        company: "Innovation Labs",
        status: "completed",
        matchScore: 92,
        createdAt: new Date(Date.now() - 172800000).toLocaleDateString(),
        template: "Executive Elite",
      },
    ]

    return NextResponse.json({ resumes })
  } catch (error) {
    console.error("Dashboard resumes error:", error)
    return NextResponse.json({ resumes: [] })
  }
}
