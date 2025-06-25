"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Palette, Crown } from "lucide-react"

export function TemplatesSection() {
  const templates = [
    {
      id: "modern-tech",
      name: "Modern Tech",
      description: "Clean, minimalist design perfect for tech roles",
      color: "from-blue-500 to-cyan-500",
      popular: true,
      features: ["ATS-Friendly", "Skills Highlight", "Project Showcase"],
    },
    {
      id: "creative-pro",
      name: "Creative Professional",
      description: "Bold design for creative and design positions",
      color: "from-purple-500 to-pink-500",
      popular: false,
      features: ["Portfolio Section", "Visual Elements", "Color Accents"],
    },
    {
      id: "executive-elite",
      name: "Executive Elite",
      description: "Sophisticated layout for senior positions",
      color: "from-slate-600 to-slate-800",
      popular: false,
      features: ["Leadership Focus", "Achievement Metrics", "Professional"],
    },
    {
      id: "startup-dynamic",
      name: "Startup Dynamic",
      description: "Energetic design for startup environments",
      color: "from-orange-500 to-red-500",
      popular: true,
      features: ["Growth Metrics", "Adaptability", "Innovation Focus"],
    },
  ]

  return (
    <section id="templates" className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Professional
            <span className="bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">
              {" "}
              Templates
            </span>
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Choose from our collection of professionally designed templates, each optimized for different industries and
            roles
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {templates.map((template) => (
            <Card
              key={template.id}
              className="bg-slate-800/50 border-slate-700 hover:border-slate-600 transition-all hover:scale-105"
            >
              <CardHeader className="relative">
                {template.popular && (
                  <Badge className="absolute top-4 right-4 bg-gradient-to-r from-yellow-500 to-orange-500 text-white">
                    <Crown className="w-3 h-3 mr-1" />
                    Popular
                  </Badge>
                )}
                <CardTitle className="text-white flex items-center mb-2">{template.name}</CardTitle>
                <p className="text-slate-400 text-sm">{template.description}</p>
              </CardHeader>

              <CardContent>
                {/* Template Preview */}
                <div
                  className={`h-32 rounded-lg bg-gradient-to-br ${template.color} mb-4 flex items-center justify-center relative overflow-hidden`}
                >
                  <Palette className="w-8 h-8 text-white/80" />
                </div>

                {/* Features */}
                <div className="space-y-2 mb-4">
                  <div className="flex flex-wrap gap-1">
                    {template.features.map((feature) => (
                      <Badge key={feature} variant="secondary" className="bg-slate-700 text-slate-300 text-xs">
                        {feature}
                      </Badge>
                    ))}
                  </div>
                </div>

                <Button className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white">
                  Preview Template
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button size="lg" variant="outline" className="border-slate-600 text-slate-300 hover:bg-slate-800">
            View All Templates
          </Button>
        </div>
      </div>
    </section>
  )
}
