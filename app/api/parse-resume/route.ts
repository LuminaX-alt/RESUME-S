import { type NextRequest, NextResponse } from "next/server"
import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"

export async function POST(request: NextRequest) {
  try {
    const { resumeFile, jobDescription } = await request.json()

    // Simulate PDF parsing - In production, you'd use a PDF parser like pdf-parse
    const mockResumeText = `
      John Doe
      Senior Software Engineer
      john.doe@email.com | +1 (555) 123-4567 | San Francisco, CA
      
      PROFESSIONAL SUMMARY
      Experienced software engineer with 8+ years of expertise in full-stack development, 
      cloud architecture, and team leadership. Proven track record of building scalable 
      applications and leading high-performing teams.
      
      TECHNICAL SKILLS
      Programming Languages: JavaScript, TypeScript, Python, Java
      Frontend: React, Vue.js, Angular, HTML5, CSS3
      Backend: Node.js, Express, Django, Spring Boot
      Databases: PostgreSQL, MongoDB, Redis
      Cloud: AWS, Docker, Kubernetes
      Tools: Git, Jenkins, JIRA
      
      PROFESSIONAL EXPERIENCE
      
      Tech Corp - Senior Software Engineer (2021 - Present)
      • Led development of microservices architecture serving 1M+ users
      • Reduced deployment time by 60% through CI/CD optimization
      • Mentored 5 junior developers and improved team productivity by 40%
      • Implemented real-time features using WebSocket technology
      
      StartupXYZ - Full Stack Developer (2019 - 2021)
      • Built scalable web applications using React and Node.js
      • Implemented real-time features increasing user engagement by 35%
      • Collaborated with design team to improve UX/UI
      • Optimized database queries reducing response time by 50%
      
      EDUCATION
      Bachelor of Science in Computer Science
      University of California, Berkeley - 2019
    `

    // Use AI to parse and structure the resume
    const { text } = await generateText({
      model: openai("gpt-4o"),
      system: `You are a resume parser. Extract structured information from the resume text and return it as JSON with the following structure:
      {
        "personalInfo": {
          "name": "string",
          "email": "string", 
          "phone": "string",
          "location": "string",
          "title": "string",
          "summary": "string"
        },
        "skills": ["array of skills"],
        "experience": [
          {
            "company": "string",
            "position": "string", 
            "duration": "string",
            "achievements": ["array of achievements"]
          }
        ],
        "education": [
          {
            "institution": "string",
            "degree": "string",
            "year": "string"
          }
        ]
      }`,
      prompt: `Parse this resume text and extract structured information:\n\n${mockResumeText}`,
    })

    let resumeData
    try {
      resumeData = JSON.parse(text)
    } catch {
      // Fallback if AI doesn't return valid JSON
      resumeData = {
        personalInfo: {
          name: "John Doe",
          email: "john.doe@email.com",
          phone: "+1 (555) 123-4567",
          location: "San Francisco, CA",
          title: "Senior Software Engineer",
          summary:
            "Experienced software engineer with 8+ years of expertise in full-stack development, cloud architecture, and team leadership.",
        },
        skills: ["JavaScript", "TypeScript", "React", "Node.js", "Python", "AWS", "Docker", "PostgreSQL"],
        experience: [
          {
            company: "Tech Corp",
            position: "Senior Software Engineer",
            duration: "2021 - Present",
            achievements: [
              "Led development of microservices architecture serving 1M+ users",
              "Reduced deployment time by 60% through CI/CD optimization",
              "Mentored 5 junior developers and improved team productivity by 40%",
            ],
          },
          {
            company: "StartupXYZ",
            position: "Full Stack Developer",
            duration: "2019 - 2021",
            achievements: [
              "Built scalable web applications using React and Node.js",
              "Implemented real-time features increasing user engagement by 35%",
              "Collaborated with design team to improve UX/UI",
            ],
          },
        ],
        education: [
          {
            institution: "University of California, Berkeley",
            degree: "Bachelor of Science in Computer Science",
            year: "2019",
          },
        ],
      }
    }

    return NextResponse.json({
      success: true,
      resumeData,
    })
  } catch (error) {
    console.error("Parse error:", error)
    return NextResponse.json({ error: "Failed to parse resume" }, { status: 500 })
  }
}
