"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, Sparkles, Zap, Target } from "lucide-react"

interface HeroSectionProps {
  onGetStarted: () => void
  onViewExamples: () => void
}

export function HeroSection({ onGetStarted, onViewExamples }: HeroSectionProps) {
  return (
    <section className="relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-20 h-20 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg opacity-20 rotate-12 animate-pulse"></div>
        <div className="absolute top-40 right-20 w-16 h-16 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-lg opacity-20 -rotate-12 animate-pulse delay-1000"></div>
        <div className="absolute bottom-40 left-20 w-12 h-12 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-lg opacity-20 rotate-45 animate-pulse delay-2000"></div>
        <div className="absolute bottom-20 right-10 w-24 h-24 bg-gradient-to-r from-red-500 to-pink-500 rounded-lg opacity-20 -rotate-6 animate-pulse delay-3000"></div>
      </div>

      <div className="container mx-auto px-4 py-20 relative">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-orange-500/10 to-red-500/10 border border-orange-500/20 mb-8">
            <Sparkles className="w-4 h-4 text-orange-400 mr-2" />
            <span className="text-orange-300 text-sm font-medium">AI-Powered Resume Enhancement</span>
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
            Transform Your
            <span className="bg-gradient-to-r from-orange-400 via-red-400 to-pink-400 bg-clip-text text-transparent">
              {" "}
              Resume{" "}
            </span>
            Into Art
          </h1>

          {/* Subheading */}
          <p className="text-lg md:text-xl lg:text-2xl text-slate-300 mb-8 max-w-3xl mx-auto leading-relaxed">
            {
              "Turn raw resumes into beautiful, job-specific templates using AI and professional design assets. Stand out from the crowd with custom visual resumes."
            }
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button
              size="lg"
              className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white px-8 py-4 text-lg"
              onClick={onGetStarted}
            >
              Start Enhancing
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-slate-600 text-slate-300 hover:bg-slate-800 px-8 py-4 text-lg"
              onClick={onViewExamples}
            >
              View Examples
            </Button>
          </div>

          {/* Feature Pills */}
          <div className="flex flex-wrap justify-center gap-4">
            <div className="flex items-center px-4 py-2 rounded-full bg-slate-800/50 border border-slate-700">
              <Zap className="w-4 h-4 text-yellow-400 mr-2" />
              <span className="text-slate-300 text-sm">Real-time Processing</span>
            </div>
            <div className="flex items-center px-4 py-2 rounded-full bg-slate-800/50 border border-slate-700">
              <Target className="w-4 h-4 text-green-400 mr-2" />
              <span className="text-slate-300 text-sm">Job-Specific Matching</span>
            </div>
            <div className="flex items-center px-4 py-2 rounded-full bg-slate-800/50 border border-slate-700">
              <Sparkles className="w-4 h-4 text-purple-400 mr-2" />
              <span className="text-slate-300 text-sm">AI-Powered Design</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
