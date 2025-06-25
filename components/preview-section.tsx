"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Download, Share2, Edit, Eye, FileText, Loader2, RotateCcw, ExternalLink } from "lucide-react"

interface ResumeData {
  personalInfo: {
    name: string
    email: string
    phone: string
    location: string
    title: string
    summary: string
  }
  skills: string[]
  experience: Array<{
    company: string
    position: string
    duration: string
    achievements: string[]
  }>
  education: Array<{
    institution: string
    degree: string
    year: string
  }>
  matchScore: number
  keywords: string[]
}

interface PreviewSectionProps {
  resumeData: ResumeData | null
  selectedTemplate: string
  onStartOver: () => void
}

export function PreviewSection({ resumeData, selectedTemplate, onStartOver }: PreviewSectionProps) {
  const [isDownloading, setIsDownloading] = useState(false)
  const [downloadFormat, setDownloadFormat] = useState("")

  const handleDownload = async (format: string) => {
    setIsDownloading(true)
    setDownloadFormat(format)

    try {
      const response = await fetch("/api/generate-resume", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          resumeData,
          templateId: selectedTemplate,
          format,
        }),
      })

      if (response.ok) {
        const data = await response.json()
        // In a real app, you would handle the actual file download
        setTimeout(() => {
          alert(`Resume downloaded successfully in ${format.toUpperCase()} format!`)
          setIsDownloading(false)
          setDownloadFormat("")
        }, 1000)
      }
    } catch (error) {
      console.error("Download error:", error)
      setIsDownloading(false)
      setDownloadFormat("")
    }
  }

  if (!resumeData) {
    return (
      <div className="max-w-2xl mx-auto text-center">
        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="p-8">
            <p className="text-slate-400">No resume data available</p>
            <Button onClick={onStartOver} className="mt-4">
              Start Over
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-white mb-4">Your Enhanced Resume</h2>
        <p className="text-slate-400 max-w-2xl mx-auto">
          Your resume has been transformed with AI-powered enhancements tailored to your target job.
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Preview Panel */}
        <div className="lg:col-span-2">
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <div className="flex items-center justify-between flex-wrap gap-4">
                <CardTitle className="text-white flex items-center">
                  <Eye className="w-5 h-5 mr-2 text-orange-400" />
                  Live Preview
                </CardTitle>
                <div className="flex items-center space-x-2 flex-wrap gap-2">
                  <Badge className="bg-green-500/20 text-green-400 border-green-500/30">ATS Optimized</Badge>
                  <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">
                    {resumeData.matchScore}% Match
                  </Badge>
                  <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30">
                    {resumeData.keywords.length} Keywords
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {/* Resume Preview */}
              <div className="bg-white rounded-lg p-4 md:p-8 text-black min-h-[800px] overflow-auto">
                {/* Header */}
                <div className="border-b-2 border-orange-500 pb-6 mb-6">
                  <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">{resumeData.personalInfo.name}</h1>
                  <h2 className="text-lg md:text-xl text-orange-600 mb-4">{resumeData.personalInfo.title}</h2>
                  <div className="flex flex-wrap gap-2 md:gap-4 text-sm text-gray-600">
                    <span className="break-all">{resumeData.personalInfo.email}</span>
                    <span>{resumeData.personalInfo.phone}</span>
                    <span>{resumeData.personalInfo.location}</span>
                  </div>
                </div>

                {/* Summary */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3 border-l-4 border-orange-500 pl-3">
                    Professional Summary
                  </h3>
                  <p className="text-gray-700 leading-relaxed">{resumeData.personalInfo.summary}</p>
                </div>

                {/* Skills */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3 border-l-4 border-orange-500 pl-3">
                    Technical Skills
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {resumeData.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-sm font-medium"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Experience */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3 border-l-4 border-orange-500 pl-3">
                    Professional Experience
                  </h3>
                  <div className="space-y-6">
                    {resumeData.experience.map((exp, index) => (
                      <div key={index}>
                        <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-2 gap-2">
                          <div>
                            <h4 className="font-semibold text-gray-900">{exp.position}</h4>
                            <p className="text-orange-600 font-medium">{exp.company}</p>
                          </div>
                          <span className="text-sm text-gray-600 bg-gray-100 px-2 py-1 rounded self-start">
                            {exp.duration}
                          </span>
                        </div>
                        <ul className="list-disc list-inside space-y-1 text-gray-700 ml-4">
                          {exp.achievements.map((achievement, i) => (
                            <li key={i} className="text-sm">
                              {achievement}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Education */}
                {resumeData.education.length > 0 && (
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3 border-l-4 border-orange-500 pl-3">
                      Education
                    </h3>
                    <div className="space-y-3">
                      {resumeData.education.map((edu, index) => (
                        <div key={index} className="flex flex-col md:flex-row md:justify-between md:items-start">
                          <div>
                            <h4 className="font-semibold text-gray-900">{edu.degree}</h4>
                            <p className="text-gray-600">{edu.institution}</p>
                          </div>
                          <span className="text-sm text-gray-600 bg-gray-100 px-2 py-1 rounded self-start mt-1 md:mt-0">
                            {edu.year}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Actions Panel */}
        <div className="space-y-6">
          {/* Download Options */}
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Download className="w-5 h-5 mr-2 text-orange-400" />
                Download Resume
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button
                onClick={() => handleDownload("pdf")}
                disabled={isDownloading}
                className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white"
              >
                {isDownloading && downloadFormat === "pdf" ? (
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                ) : (
                  <FileText className="w-4 h-4 mr-2" />
                )}
                {isDownloading && downloadFormat === "pdf" ? "Generating..." : "Download PDF"}
              </Button>
              <Button
                onClick={() => handleDownload("docx")}
                disabled={isDownloading}
                variant="outline"
                className="w-full border-slate-600 text-slate-300 hover:bg-slate-700"
              >
                {isDownloading && downloadFormat === "docx" ? (
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                ) : (
                  <FileText className="w-4 h-4 mr-2" />
                )}
                {isDownloading && downloadFormat === "docx" ? "Generating..." : "Download DOCX"}
              </Button>
              <Button
                onClick={() => handleDownload("png")}
                disabled={isDownloading}
                variant="outline"
                className="w-full border-slate-600 text-slate-300 hover:bg-slate-700"
              >
                {isDownloading && downloadFormat === "png" ? (
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                ) : (
                  <FileText className="w-4 h-4 mr-2" />
                )}
                {isDownloading && downloadFormat === "png" ? "Generating..." : "Download PNG"}
              </Button>
            </CardContent>
          </Card>

          {/* Enhancement Stats */}
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">Enhancement Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-slate-300">Job Match Score</span>
                <Badge className="bg-green-500/20 text-green-400 border-green-500/30">{resumeData.matchScore}%</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-300">ATS Compatibility</span>
                <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">Excellent</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-300">Keywords Added</span>
                <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30">
                  {resumeData.keywords.length}
                </Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-300">Design Score</span>
                <Badge className="bg-orange-500/20 text-orange-400 border-orange-500/30">A+</Badge>
              </div>
            </CardContent>
          </Card>

          {/* Keywords */}
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">Matched Keywords</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {resumeData.keywords.slice(0, 8).map((keyword) => (
                  <Badge key={keyword} className="bg-slate-700 text-slate-300 text-xs">
                    {keyword}
                  </Badge>
                ))}
                {resumeData.keywords.length > 8 && (
                  <Badge className="bg-slate-600 text-slate-400 text-xs">+{resumeData.keywords.length - 8} more</Badge>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Additional Actions */}
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">More Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button variant="outline" className="w-full border-slate-600 text-slate-300 hover:bg-slate-700">
                <Edit className="w-4 h-4 mr-2" />
                Edit Resume
              </Button>
              <Button variant="outline" className="w-full border-slate-600 text-slate-300 hover:bg-slate-700">
                <Share2 className="w-4 h-4 mr-2" />
                Share Link
              </Button>
              <Button variant="outline" className="w-full border-slate-600 text-slate-300 hover:bg-slate-700">
                <ExternalLink className="w-4 h-4 mr-2" />
                Try Another Template
              </Button>
              <Button
                onClick={onStartOver}
                variant="outline"
                className="w-full border-slate-600 text-slate-300 hover:bg-slate-700"
              >
                <RotateCcw className="w-4 h-4 mr-2" />
                Start Over
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
