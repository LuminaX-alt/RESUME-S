import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  try {
    const activities = [
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
      {
        id: 3,
        type: "interview_scheduled",
        title: "Interview scheduled",
        description: "Technical interview with Innovation Labs",
        timestamp: "2 days ago",
      },
      {
        id: 4,
        type: "resume_created",
        title: "Resume updated",
        description: "Updated Full Stack Developer resume",
        timestamp: "3 days ago",
      },
    ]

    return NextResponse.json({ activities })
  } catch (error) {
    console.error("Dashboard activities error:", error)
    return NextResponse.json({ activities: [] })
  }
}
