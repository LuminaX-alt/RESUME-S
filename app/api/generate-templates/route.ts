import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { resumeData, jobDescription, matchData } = await request.json()

    // Generate templates based on job analysis
    const templates = [
      {
        id: "modern-tech",
        name: "Modern Tech",
        description: "Clean, minimalist design perfect for tech roles",
        matchScore: Math.max(90, matchData.matchScore - 5),
        features: ["ATS-Friendly", "Skills Highlight", "Project Showcase"],
        color: "from-blue-500 to-cyan-500",
        recommended: true,
      },
      {
        id: "creative-pro",
        name: "Creative Professional",
        description: "Bold design for creative and design positions",
        matchScore: Math.max(75, matchData.matchScore - 15),
        features: ["Portfolio Section", "Visual Elements", "Color Accents"],
        color: "from-purple-500 to-pink-500",
        recommended: false,
      },
      {
        id: "executive-elite",
        name: "Executive Elite",
        description: "Sophisticated layout for senior positions",
        matchScore: Math.max(80, matchData.matchScore - 10),
        features: ["Leadership Focus", "Achievement Metrics", "Professional"],
        color: "from-slate-600 to-slate-800",
        recommended: false,
      },
      {
        id: "startup-dynamic",
        name: "Startup Dynamic",
        description: "Energetic design for startup environments",
        matchScore: Math.max(70, matchData.matchScore - 20),
        features: ["Growth Metrics", "Adaptability", "Innovation Focus"],
        color: "from-orange-500 to-red-500",
        recommended: false,
      },
    ]

    // Sort by match score and mark the highest as recommended
    templates.sort((a, b) => b.matchScore - a.matchScore)
    templates.forEach((template, index) => {
      template.recommended = index === 0
    })

    return NextResponse.json({
      success: true,
      templates,
    })
  } catch (error) {
    console.error("Template generation error:", error)
    return NextResponse.json({ error: "Failed to generate templates" }, { status: 500 })
  }
}
