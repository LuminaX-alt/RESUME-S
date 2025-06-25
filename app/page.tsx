"use client"

import { useState, useEffect } from "react"
import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { FeaturesSection } from "@/components/features-section"
import { TemplatesSection } from "@/components/templates-section"
import { PricingSection } from "@/components/pricing-section"
import { AboutSection } from "@/components/about-section"
import { ExamplesModal } from "@/components/examples-modal"
import { UploadSection } from "@/components/upload-section"
import { ProcessingSection } from "@/components/processing-section"
import { TemplateSelector } from "@/components/template-selector"
import { PreviewSection } from "@/components/preview-section"
import { Footer } from "@/components/footer"
import { useResumeProcessor } from "@/hooks/use-resume-processor"

export default function Home() {
  const [currentStep, setCurrentStep] = useState(0)
  const [showExamples, setShowExamples] = useState(false)
  const {
    resumeFile,
    jobDescription,
    selectedTemplate,
    processedResume,
    templates,
    isProcessing,
    processingStep,
    error,
    uploadResume,
    analyzeJob,
    selectTemplate,
    resetProcess,
  } = useResumeProcessor()

  const steps = ["Upload Resume", "Job Description", "AI Processing", "Template Selection", "Preview & Download"]

  const handleResumeUpload = async (file: File) => {
    const success = await uploadResume(file)
    if (success) {
      setCurrentStep(1)
    }
  }

  const handleJobDescriptionSubmit = async (description: string) => {
    const success = await analyzeJob(description)
    if (success) {
      setCurrentStep(2)
    }
  }

  const handleTemplateSelect = (template: string) => {
    selectTemplate(template)
    setCurrentStep(4)
  }

  // Auto-advance when processing is complete
  useEffect(() => {
    if (!isProcessing && templates.length > 0 && currentStep === 2) {
      setCurrentStep(3)
    }
  }, [isProcessing, templates.length, currentStep])

  const handleStartOver = () => {
    resetProcess()
    setCurrentStep(0)
  }

  const handleGetStarted = () => {
    setCurrentStep(1)
    // Smooth scroll to upload section
    setTimeout(() => {
      const uploadSection = document.getElementById("upload-section")
      if (uploadSection) {
        uploadSection.scrollIntoView({ behavior: "smooth" })
      }
    }, 100)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <Header />

      {currentStep === 0 && (
        <>
          <HeroSection onGetStarted={handleGetStarted} onViewExamples={() => setShowExamples(true)} />
          <FeaturesSection />
          <TemplatesSection />
          <PricingSection />
          <AboutSection />
        </>
      )}

      <main className="container mx-auto px-4 py-8">
        {/* Progress Bar */}
        {currentStep > 0 && (
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4 overflow-x-auto">
              {steps.map((step, index) => (
                <div key={step} className={`flex items-center ${index < steps.length - 1 ? "flex-1" : ""} min-w-0`}>
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium flex-shrink-0 ${
                      index <= currentStep
                        ? "bg-gradient-to-r from-orange-500 to-red-500 text-white"
                        : "bg-slate-700 text-slate-400"
                    }`}
                  >
                    {index + 1}
                  </div>
                  <span className={`ml-2 text-sm truncate ${index <= currentStep ? "text-white" : "text-slate-400"}`}>
                    {step}
                  </span>
                  {index < steps.length - 1 && (
                    <div
                      className={`flex-1 h-0.5 mx-4 min-w-[20px] ${
                        index < currentStep ? "bg-gradient-to-r from-orange-500 to-red-500" : "bg-slate-700"
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Error Display */}
        {error && (
          <div className="mb-8 p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
            <p className="text-red-400">{error}</p>
          </div>
        )}

        {/* Step Content */}
        {currentStep === 1 && (
          <div id="upload-section">
            <UploadSection
              onResumeUpload={handleResumeUpload}
              onJobDescriptionSubmit={handleJobDescriptionSubmit}
              resumeFile={resumeFile}
              isUploading={isProcessing}
            />
          </div>
        )}

        {currentStep === 2 && (
          <ProcessingSection isProcessing={isProcessing} currentStep={processingStep} onStartOver={handleStartOver} />
        )}

        {currentStep === 3 && (
          <TemplateSelector
            onTemplateSelect={handleTemplateSelect}
            templates={templates}
            jobDescription={jobDescription}
          />
        )}

        {currentStep === 4 && (
          <PreviewSection
            resumeData={processedResume}
            selectedTemplate={selectedTemplate}
            onStartOver={handleStartOver}
          />
        )}
      </main>

      {currentStep === 0 && <Footer />}

      <ExamplesModal isOpen={showExamples} onClose={() => setShowExamples(false)} />
    </div>
  )
}
