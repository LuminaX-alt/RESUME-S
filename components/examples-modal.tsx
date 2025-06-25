"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Download, Eye, Star } from "lucide-react"

interface ExamplesModalProps {
  isOpen: boolean
  onClose: () => void
}

export function ExamplesModal({ isOpen, onClose }: ExamplesModalProps) {
  const examples = [
    {
      id: 1,
      title: "Software Engineer Resume",
      template: "Modern Tech",
      industry: "Technology",
      experience: "5+ Years",
      matchScore: 95,
      color: "from-blue-500 to-cyan-500",
      features: ["ATS Optimized", "Skills Focused", "Project Highlights"],
    },
    {
      id: 2,
      title: "Marketing Manager Resume",
      template: "Creative Professional",
      industry: "Marketing",
      experience: "3-5 Years",
      matchScore: 92,
      color: "from-purple-500 to-pink-500",
      features: ["Visual Impact", "Campaign Results", "Brand Focus"],
    },
    {
      id: 3,
      title: "Executive Director Resume",
      template: "Executive Elite",
      industry: "Leadership",
      experience: "10+ Years",
      matchScore: 98,
      color: "from-slate-600 to-slate-800",
      features: ["Leadership Focus", "Strategic Vision", "Board Ready"],
    },
    {
      id: 4,
      title: "Product Designer Resume",
      template: "Creative Professional",
      industry: "Design",
      experience: "2-4 Years",
      matchScore: 89,
      color: "from-green-500 to-teal-500",
      features: ["Portfolio Showcase", "Design Process", "User Impact"],
    },
    {
      id: 5,
      title: "Data Scientist Resume",
      template: "Modern Tech",
      industry: "Data Science",
      experience: "4-6 Years",
      matchScore: 94,
      color: "from-orange-500 to-red-500",
      features: ["Technical Skills", "Model Results", "Research Focus"],
    },
    {
      id: 6,
      title: "Sales Director Resume",
      template: "Executive Elite",
      industry: "Sales",
      experience: "8+ Years",
      matchScore: 91,
      color: "from-yellow-500 to-orange-500",
      features: ["Revenue Growth", "Team Leadership", "Client Relations"],
    },
  ]

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto bg-slate-800 border-slate-700">
        <DialogHeader>
          <DialogTitle className="text-white text-2xl text-center">Resume Examples</DialogTitle>
          <p className="text-slate-400 text-center">
            See how our AI transforms resumes across different industries and experience levels
          </p>
        </DialogHeader>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {examples.map((example) => (
            <Card key={example.id} className="bg-slate-700/50 border-slate-600 hover:border-slate-500 transition-all">
              <CardContent className="p-6">
                {/* Preview */}
                <div
                  className={`h-40 rounded-lg bg-gradient-to-br ${example.color} mb-4 flex items-center justify-center relative overflow-hidden`}
                >
                  <div className="absolute inset-0 bg-black/20"></div>
                  <div className="relative z-10 text-center">
                    <div className="w-12 h-12 bg-white/20 rounded-lg mx-auto mb-2 flex items-center justify-center">
                      <Eye className="w-6 h-6 text-white" />
                    </div>
                    <p className="text-white text-sm font-medium">Preview Available</p>
                  </div>
                </div>

                {/* Info */}
                <div className="space-y-3">
                  <div>
                    <h3 className="text-white font-semibold">{example.title}</h3>
                    <p className="text-slate-400 text-sm">{example.template}</p>
                  </div>

                  <div className="flex justify-between text-sm">
                    <span className="text-slate-400">{example.industry}</span>
                    <span className="text-slate-400">{example.experience}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Star className="w-4 h-4 text-yellow-400 mr-1" />
                      <span className="text-white font-medium">{example.matchScore}%</span>
                      <span className="text-slate-400 text-sm ml-1">Match</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1">
                    {example.features.map((feature) => (
                      <Badge key={feature} variant="secondary" className="bg-slate-600 text-slate-300 text-xs">
                        {feature}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex gap-2 pt-2">
                    <Button
                      size="sm"
                      variant="outline"
                      className="flex-1 border-slate-600 text-slate-300 hover:bg-slate-600"
                    >
                      <Eye className="w-3 h-3 mr-1" />
                      Preview
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="flex-1 border-slate-600 text-slate-300 hover:bg-slate-600"
                    >
                      <Download className="w-3 h-3 mr-1" />
                      Download
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-8 pt-6 border-t border-slate-700">
          <p className="text-slate-400 mb-4">Ready to create your own stunning resume?</p>
          <Button
            size="lg"
            className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white"
            onClick={onClose}
          >
            Start Creating Now
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
