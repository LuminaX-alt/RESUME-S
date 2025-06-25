"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Palette, Star, Zap, Crown, CheckCircle } from "lucide-react"

interface Template {
  id: string
  name: string
  description: string
  matchScore: number
  features: string[]
  color: string
  recommended: boolean
}

interface TemplateSelectorProps {
  onTemplateSelect: (template: string) => void
  templates: Template[]
  jobDescription: string
}

export function TemplateSelector({ onTemplateSelect, templates, jobDescription }: TemplateSelectorProps) {
  const [selectedTemplate, setSelectedTemplate] = useState("")
  const [hoveredTemplate, setHoveredTemplate] = useState("")

  const handleSelect = (templateId: string) => {
    setSelectedTemplate(templateId)
    onTemplateSelect(templateId)
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-white mb-4">Choose Your Perfect Template</h2>
        <p className="text-slate-400 max-w-2xl mx-auto">
          Based on your resume and job description analysis, we've selected the best templates for your target role.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {templates.map((template) => (
          <Card
            key={template.id}
            className={`bg-slate-800/50 border-slate-700 hover:border-slate-600 transition-all cursor-pointer transform hover:scale-105 ${
              selectedTemplate === template.id ? "ring-2 ring-orange-500 scale-105" : ""
            } ${hoveredTemplate === template.id ? "shadow-2xl" : ""}`}
            onClick={() => handleSelect(template.id)}
            onMouseEnter={() => setHoveredTemplate(template.id)}
            onMouseLeave={() => setHoveredTemplate("")}
          >
            <CardHeader className="relative">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-white flex items-center mb-2">
                    {template.recommended && <Crown className="w-5 h-5 text-yellow-400 mr-2" />}
                    {template.name}
                    {selectedTemplate === template.id && <CheckCircle className="w-5 h-5 text-green-400 ml-2" />}
                  </CardTitle>
                  <p className="text-slate-400 text-sm">{template.description}</p>
                </div>
                <div className="text-right ml-4">
                  <div className="flex items-center mb-1">
                    <Star className="w-4 h-4 text-yellow-400 mr-1" />
                    <span className="text-white font-medium">{template.matchScore}%</span>
                  </div>
                  <span className="text-xs text-slate-500">Match Score</span>
                </div>
              </div>

              {template.recommended && (
                <Badge className="absolute top-4 right-4 bg-gradient-to-r from-yellow-500 to-orange-500 text-white">
                  <Zap className="w-3 h-3 mr-1" />
                  Recommended
                </Badge>
              )}
            </CardHeader>

            <CardContent>
              {/* Template Preview */}
              <div
                className={`h-40 rounded-lg bg-gradient-to-br ${template.color} mb-4 flex items-center justify-center relative overflow-hidden transition-all duration-300 ${
                  hoveredTemplate === template.id ? "scale-105" : ""
                }`}
              >
                <Palette className="w-12 h-12 text-white/80" />
                {/* Animated overlay on hover */}
                {hoveredTemplate === template.id && <div className="absolute inset-0 bg-white/10 animate-pulse"></div>}
              </div>

              {/* Features */}
              <div className="space-y-2 mb-4">
                <h4 className="text-sm font-medium text-slate-300">Key Features:</h4>
                <div className="flex flex-wrap gap-2">
                  {template.features.map((feature) => (
                    <Badge key={feature} variant="secondary" className="bg-slate-700 text-slate-300 text-xs">
                      {feature}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Match indicators */}
              <div className="mb-4">
                <div className="flex justify-between text-xs text-slate-400 mb-1">
                  <span>Job Match</span>
                  <span>{template.matchScore}%</span>
                </div>
                <div className="w-full bg-slate-700 rounded-full h-2">
                  <div
                    className={`bg-gradient-to-r from-green-500 to-blue-500 h-2 rounded-full transition-all duration-1000 ${
                      hoveredTemplate === template.id ? "animate-pulse" : ""
                    }`}
                    style={{ width: `${template.matchScore}%` }}
                  ></div>
                </div>
              </div>

              <Button
                className={`w-full transition-all duration-300 ${
                  selectedTemplate === template.id
                    ? "bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600"
                    : "bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600"
                } text-white`}
                onClick={() => handleSelect(template.id)}
              >
                {selectedTemplate === template.id ? (
                  <>
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Selected
                  </>
                ) : (
                  "Select Template"
                )}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {selectedTemplate && (
        <div className="mt-8 text-center">
          <div className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-green-500/10 to-blue-500/10 border border-green-500/20">
            <CheckCircle className="w-5 h-5 text-green-400 mr-2" />
            <span className="text-green-300 font-medium">Template selected! Generating your resume...</span>
          </div>
        </div>
      )}
    </div>
  )
}
