"use client"

import { useState, useCallback } from "react"

interface ProcessedResume {
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

interface Template {
  id: string
  name: string
  description: string
  matchScore: number
  features: string[]
  color: string
  recommended: boolean
}

export function useResumeProcessor() {
  const [resumeFile, setResumeFile] = useState<File | null>(null)
  const [jobDescription, setJobDescription] = useState("")
  const [selectedTemplate, setSelectedTemplate] = useState("")
  const [processedResume, setProcessedResume] = useState<ProcessedResume | null>(null)
  const [templates, setTemplates] = useState<Template[]>([])
  const [isProcessing, setIsProcessing] = useState(false)
  const [processingStep, setProcessingStep] = useState(0)
  const [error, setError] = useState("")

  const uploadResume = useCallback(async (file: File): Promise<boolean> => {
    try {
      setError("")
      setIsProcessing(true)

      const formData = new FormData()
      formData.append("resume", file)

      const response = await fetch("/api/upload-resume", {
        method: "POST",
        body: formData,
      })

      if (!response.ok) {
        throw new Error("Failed to upload resume")
      }

      const data = await response.json()
      setResumeFile(file)
      setIsProcessing(false)
      return true
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to upload resume")
      setIsProcessing(false)
      return false
    }
  }, [])

  const analyzeJob = useCallback(
    async (description: string): Promise<boolean> => {
      try {
        setError("")
        setIsProcessing(true)
        setProcessingStep(0)
        setJobDescription(description)

        // Step 1: Parse Resume
        setProcessingStep(1)
        const parseResponse = await fetch("/api/parse-resume", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            resumeFile: resumeFile?.name,
            jobDescription: description,
          }),
        })

        if (!parseResponse.ok) {
          throw new Error("Failed to parse resume")
        }

        const parseData = await parseResponse.json()

        // Step 2: Analyze Job Match
        setProcessingStep(2)
        const matchResponse = await fetch("/api/analyze-match", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            resumeData: parseData.resumeData,
            jobDescription: description,
          }),
        })

        if (!matchResponse.ok) {
          throw new Error("Failed to analyze job match")
        }

        const matchData = await matchResponse.json()

        // Step 3: Generate Templates
        setProcessingStep(3)
        const templatesResponse = await fetch("/api/generate-templates", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            resumeData: parseData.resumeData,
            jobDescription: description,
            matchData: matchData,
          }),
        })

        if (!templatesResponse.ok) {
          throw new Error("Failed to generate templates")
        }

        const templatesData = await templatesResponse.json()

        setProcessedResume({
          ...parseData.resumeData,
          matchScore: matchData.matchScore,
          keywords: matchData.keywords,
        })
        setTemplates(templatesData.templates)
        setIsProcessing(false)
        return true
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to analyze job")
        setIsProcessing(false)
        return false
      }
    },
    [resumeFile],
  )

  const selectTemplate = useCallback((templateId: string) => {
    setSelectedTemplate(templateId)
  }, [])

  const resetProcess = useCallback(() => {
    setResumeFile(null)
    setJobDescription("")
    setSelectedTemplate("")
    setProcessedResume(null)
    setTemplates([])
    setIsProcessing(false)
    setProcessingStep(0)
    setError("")
  }, [])

  return {
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
  }
}
