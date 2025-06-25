"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Brain, Palette, Target, Zap, Shield, Download } from "lucide-react"

export function FeaturesSection() {
  const features = [
    {
      icon: Brain,
      title: "AI-Powered Analysis",
      description:
        "Our advanced AI analyzes your resume and job descriptions to create perfect matches with intelligent keyword optimization.",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: Palette,
      title: "Beautiful Templates",
      description: "Choose from professionally designed templates that are both ATS-friendly and visually stunning.",
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: Target,
      title: "Job-Specific Matching",
      description:
        "Get personalized resume versions tailored to specific job descriptions with match scores and recommendations.",
      color: "from-green-500 to-teal-500",
    },
    {
      icon: Zap,
      title: "Real-Time Processing",
      description: "Watch your resume transform in real-time with live previews and instant feedback on improvements.",
      color: "from-yellow-500 to-orange-500",
    },
    {
      icon: Shield,
      title: "ATS Optimized",
      description:
        "All templates are optimized for Applicant Tracking Systems to ensure your resume gets seen by recruiters.",
      color: "from-red-500 to-pink-500",
    },
    {
      icon: Download,
      title: "Multiple Formats",
      description: "Download your enhanced resume in PDF, DOCX, or PNG formats, ready for any application process.",
      color: "from-indigo-500 to-purple-500",
    },
  ]

  return (
    <section id="features" className="py-20 bg-slate-900/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Powerful Features for
            <span className="bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent"> Success</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Everything you need to create stunning, job-winning resumes with the power of artificial intelligence
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <Card
                key={index}
                className="bg-slate-800/50 border-slate-700 hover:border-slate-600 transition-all hover:scale-105"
              >
                <CardHeader>
                  <div
                    className={`w-12 h-12 rounded-lg bg-gradient-to-r ${feature.color} flex items-center justify-center mb-4`}
                  >
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="text-white">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-400">{feature.description}</p>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
