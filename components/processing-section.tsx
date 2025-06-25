"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Brain, Palette, Target, CheckCircle, RotateCcw } from "lucide-react"
import { useEffect, useState } from "react"

interface ProcessingSectionProps {
  isProcessing: boolean
  currentStep: number
  onStartOver: () => void
}

export function ProcessingSection({ isProcessing, currentStep, onStartOver }: ProcessingSectionProps) {
  const [animationStep, setAnimationStep] = useState(0)

  const steps = [
    {
      icon: Brain,
      title: "Analyzing Resume",
      description: "Extracting skills, experience, and key information",
      color: "text-blue-400",
    },
    {
      icon: Target,
      title: "Matching Job Requirements",
      description: "Identifying key requirements and matching skills",
      color: "text-green-400",
    },
    {
      icon: Palette,
      title: "Generating Templates",
      description: "Creating personalized design templates",
      color: "text-purple-400",
    },
  ]

  useEffect(() => {
    if (isProcessing) {
      const interval = setInterval(() => {
        setAnimationStep((prev) => (prev + 1) % 3)
      }, 800)
      return () => clearInterval(interval)
    }
  }, [isProcessing])

  return (
    <div className="max-w-2xl mx-auto">
      <Card className="bg-slate-800/50 border-slate-700">
        <CardContent className="p-8">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Brain className="w-8 h-8 text-white animate-pulse" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">AI Processing Your Resume</h2>
            <p className="text-slate-400">Our AI is analyzing your resume and creating personalized templates</p>
          </div>

          <div className="space-y-6 mb-8">
            {steps.map((step, index) => {
              const Icon = step.icon
              const isActive = index === currentStep && isProcessing
              const isCompleted = index < currentStep || !isProcessing

              return (
                <div
                  key={step.title}
                  className={`flex items-center p-4 rounded-lg transition-all duration-500 ${
                    isActive ? "bg-slate-700/50 border border-slate-600 scale-105" : "bg-slate-800/30"
                  }`}
                >
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center mr-4 transition-all duration-300 ${
                      isCompleted
                        ? "bg-green-500 scale-110"
                        : isActive
                          ? "bg-gradient-to-r from-orange-500 to-red-500 scale-110"
                          : "bg-slate-700"
                    }`}
                  >
                    {isCompleted ? (
                      <CheckCircle className="w-5 h-5 text-white" />
                    ) : (
                      <Icon className={`w-5 h-5 ${isActive ? "text-white animate-pulse" : "text-slate-400"}`} />
                    )}
                  </div>
                  <div className="flex-1">
                    <h3 className={`font-medium transition-colors ${isActive ? "text-white" : "text-slate-300"}`}>
                      {step.title}
                    </h3>
                    <p className={`text-sm transition-colors ${isActive ? "text-slate-300" : "text-slate-500"}`}>
                      {step.description}
                    </p>
                  </div>
                  {isActive && (
                    <div className="flex space-x-1">
                      {[0, 1, 2].map((i) => (
                        <div
                          key={i}
                          className={`w-2 h-2 rounded-full animate-bounce ${
                            i === 0 ? "bg-orange-400" : i === 1 ? "bg-red-400" : "bg-yellow-400"
                          }`}
                          style={{ animationDelay: `${i * 0.1}s` }}
                        ></div>
                      ))}
                    </div>
                  )}
                </div>
              )
            })}
          </div>

          {!isProcessing && (
            <div className="text-center">
              <Button
                onClick={onStartOver}
                variant="outline"
                className="border-slate-600 text-slate-300 hover:bg-slate-700"
              >
                <RotateCcw className="w-4 h-4 mr-2" />
                Start Over
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
