"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText, Send, Calendar, CheckCircle } from "lucide-react"

interface Activity {
  id: number
  type: string
  title: string
  description: string
  timestamp: string
}

interface ActivityFeedProps {
  activities: Activity[] | null
}

export function ActivityFeed({ activities }: ActivityFeedProps) {
  if (!activities) return null

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "resume_created":
        return FileText
      case "application_sent":
        return Send
      case "interview_scheduled":
        return Calendar
      case "application_completed":
        return CheckCircle
      default:
        return FileText
    }
  }

  const getActivityColor = (type: string) => {
    switch (type) {
      case "resume_created":
        return "text-blue-400 bg-blue-500/10"
      case "application_sent":
        return "text-green-400 bg-green-500/10"
      case "interview_scheduled":
        return "text-purple-400 bg-purple-500/10"
      case "application_completed":
        return "text-orange-400 bg-orange-500/10"
      default:
        return "text-slate-400 bg-slate-500/10"
    }
  }

  return (
    <Card className="bg-slate-800/50 border-slate-700">
      <CardHeader>
        <CardTitle className="text-white">Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => {
            const Icon = getActivityIcon(activity.type)
            const colorClass = getActivityColor(activity.type)

            return (
              <div key={activity.id} className="flex items-start space-x-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${colorClass}`}>
                  <Icon className="w-4 h-4" />
                </div>

                <div className="flex-1 min-w-0">
                  <p className="text-white font-medium">{activity.title}</p>
                  <p className="text-slate-400 text-sm">{activity.description}</p>
                  <p className="text-slate-500 text-xs mt-1">{activity.timestamp}</p>
                </div>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
