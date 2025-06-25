"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { FileText, Eye, Download, MoreHorizontal } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface Resume {
  id: number
  title: string
  company: string
  status: string
  matchScore: number
  createdAt: string
  template: string
}

interface RecentResumesProps {
  resumes: Resume[] | null
}

export function RecentResumes({ resumes }: RecentResumesProps) {
  if (!resumes) return null

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-500/20 text-green-400 border-green-500/30"
      case "pending":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
      case "completed":
        return "bg-blue-500/20 text-blue-400 border-blue-500/30"
      default:
        return "bg-slate-500/20 text-slate-400 border-slate-500/30"
    }
  }

  return (
    <Card className="bg-slate-800/50 border-slate-700">
      <CardHeader>
        <CardTitle className="text-white flex items-center">
          <FileText className="w-5 h-5 mr-2 text-orange-400" />
          Recent Resumes
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {resumes.map((resume) => (
            <div
              key={resume.id}
              className="flex items-center justify-between p-4 bg-slate-700/30 rounded-lg border border-slate-600/50 hover:border-slate-500/50 transition-colors"
            >
              <div className="flex items-center space-x-4 flex-1">
                <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
                  <FileText className="w-5 h-5 text-white" />
                </div>

                <div className="flex-1 min-w-0">
                  <h3 className="text-white font-medium truncate">{resume.title}</h3>
                  <div className="flex items-center space-x-2 mt-1">
                    <span className="text-slate-400 text-sm">{resume.company}</span>
                    <span className="text-slate-500">•</span>
                    <span className="text-slate-400 text-sm">{resume.template}</span>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <Badge className={getStatusColor(resume.status)}>{resume.status}</Badge>

                  <div className="text-right">
                    <div className="text-white font-medium">{resume.matchScore}%</div>
                    <div className="text-slate-400 text-xs">Match</div>
                  </div>
                </div>
              </div>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="h-8 w-8 p-0 text-slate-400 hover:text-white">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="bg-slate-800 border-slate-700">
                  <DropdownMenuItem className="text-slate-300 hover:text-white hover:bg-slate-700">
                    <Eye className="mr-2 h-4 w-4" />
                    View Resume
                  </DropdownMenuItem>
                  <DropdownMenuItem className="text-slate-300 hover:text-white hover:bg-slate-700">
                    <Download className="mr-2 h-4 w-4" />
                    Download
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ))}
        </div>

        <Button variant="outline" className="w-full mt-4 border-slate-600 text-slate-300 hover:bg-slate-700">
          View All Resumes
        </Button>
      </CardContent>
    </Card>
  )
}
