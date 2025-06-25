"use client"

import type React from "react"
import { useState, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Upload, FileText, Briefcase, Loader2 } from "lucide-react"

interface UploadSectionProps {
  onResumeUpload: (file: File) => void
  onJobDescriptionSubmit: (description: string) => void
  resumeFile: File | null
  isUploading: boolean
}

export function UploadSection({ onResumeUpload, onJobDescriptionSubmit, resumeFile, isUploading }: UploadSectionProps) {
  const [jobDescription, setJobDescription] = useState("")
  const [dragActive, setDragActive] = useState(false)

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }, [])

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      e.stopPropagation()
      setDragActive(false)

      if (e.dataTransfer.files && e.dataTransfer.files[0]) {
        const file = e.dataTransfer.files[0]
        if (file.type === "application/pdf" || file.name.endsWith(".pdf")) {
          onResumeUpload(file)
        } else {
          alert("Please upload a PDF file only")
        }
      }
    },
    [onResumeUpload],
  )

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onResumeUpload(e.target.files[0])
    }
  }

  const handleSubmit = () => {
    if (jobDescription.trim()) {
      onJobDescriptionSubmit(jobDescription)
    }
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Resume Upload */}
      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <FileText className="w-5 h-5 mr-2 text-orange-400" />
            Upload Your Resume
          </CardTitle>
        </CardHeader>
        <CardContent>
          {!resumeFile ? (
            <div
              className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                dragActive ? "border-orange-400 bg-orange-400/10" : "border-slate-600 hover:border-slate-500"
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              {isUploading ? (
                <Loader2 className="w-12 h-12 text-orange-400 mx-auto mb-4 animate-spin" />
              ) : (
                <Upload className="w-12 h-12 text-slate-400 mx-auto mb-4" />
              )}
              <p className="text-slate-300 mb-2">
                {isUploading ? "Uploading your resume..." : "Drag and drop your resume here"}
              </p>
              {!isUploading && (
                <>
                  <p className="text-slate-500 text-sm mb-4">or</p>
                  <label htmlFor="resume-upload">
                    <Button className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white">
                      Choose File
                    </Button>
                    <input id="resume-upload" type="file" accept=".pdf" onChange={handleFileInput} className="hidden" />
                  </label>
                  <p className="text-slate-500 text-xs mt-2">PDF files only (Max 10MB)</p>
                </>
              )}
            </div>
          ) : (
            <div className="flex items-center justify-between p-4 bg-slate-700/50 rounded-lg">
              <div className="flex items-center">
                <FileText className="w-5 h-5 text-green-400 mr-3" />
                <div>
                  <span className="text-white block">{resumeFile.name}</span>
                  <span className="text-slate-400 text-sm">{(resumeFile.size / 1024 / 1024).toFixed(2)} MB</span>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => window.location.reload()}
                className="text-slate-400 hover:text-white"
              >
                Change
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Job Description */}
      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <Briefcase className="w-5 h-5 mr-2 text-orange-400" />
            Target Job Description
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea
            placeholder="Paste the job description you're applying for. Our AI will analyze it to create a perfectly matched resume template..."
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            className="min-h-[200px] bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400 resize-none"
          />
          <div className="flex justify-between items-center">
            <span className="text-slate-400 text-sm">{jobDescription.length} characters</span>
            <Button
              onClick={handleSubmit}
              disabled={!resumeFile || !jobDescription.trim() || isUploading}
              className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isUploading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Processing...
                </>
              ) : (
                "Analyze & Generate Templates"
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
