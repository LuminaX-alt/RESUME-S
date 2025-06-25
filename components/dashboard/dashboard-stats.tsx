"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, Users, Calendar, Target } from "lucide-react"

interface Stats {
  totalResumes: number
  activeApplications: number
  interviewsScheduled: number
  successRate: number
}

interface DashboardStatsProps {
  stats: Stats | null
}

export function DashboardStats({ stats }: DashboardStatsProps) {
  if (!stats) return null

  const statCards = [
    {
      title: "Total Resumes",
      value: stats.totalResumes,
      icon: Users,
      color: "from-blue-500 to-cyan-500",
      change: "+12%",
    },
    {
      title: "Active Applications",
      value: stats.activeApplications,
      icon: Target,
      color: "from-green-500 to-teal-500",
      change: "+8%",
    },
    {
      title: "Interviews Scheduled",
      value: stats.interviewsScheduled,
      icon: Calendar,
      color: "from-purple-500 to-pink-500",
      change: "+3",
    },
    {
      title: "Success Rate",
      value: `${stats.successRate}%`,
      icon: TrendingUp,
      color: "from-orange-500 to-red-500",
      change: "+5%",
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {statCards.map((stat, index) => {
        const Icon = stat.icon
        return (
          <Card key={index} className="bg-slate-800/50 border-slate-700">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-300">{stat.title}</CardTitle>
              <div className={`w-8 h-8 rounded-lg bg-gradient-to-r ${stat.color} flex items-center justify-center`}>
                <Icon className="w-4 h-4 text-white" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{stat.value}</div>
              <p className="text-xs text-green-400 mt-1">
                <span className="font-medium">{stat.change}</span> from last month
              </p>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
