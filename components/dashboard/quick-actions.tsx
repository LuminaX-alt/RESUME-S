"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus, Upload, Palette, Settings } from "lucide-react"
import { useRouter } from "next/navigation"

export function QuickActions() {
  const router = useRouter()

  const actions = [
    {
      title: "Create New Resume",
      description: "Start with AI-powered resume builder",
      icon: Plus,
      color: "from-orange-500 to-red-500",
      onClick: () => router.push("/"),
    },
    {
      title: "Upload Resume",
      description: "Enhance existing resume",
      icon: Upload,
      color: "from-blue-500 to-cyan-500",
      onClick: () => router.push("/"),
    },
    {
      title: "Browse Templates",
      description: "Explore design options",
      icon: Palette,
      color: "from-purple-500 to-pink-500",
      onClick: () => router.push("/templates"),
    },
    {
      title: "Account Settings",
      description: "Manage your profile",
      icon: Settings,
      color: "from-green-500 to-teal-500",
      onClick: () => router.push("/settings"),
    },
  ]

  return (
    <Card className="bg-slate-800/50 border-slate-700">
      <CardHeader>
        <CardTitle className="text-white">Quick Actions</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {actions.map((action, index) => {
          const Icon = action.icon
          return (
            <Button
              key={index}
              variant="ghost"
              className="w-full justify-start h-auto p-4 hover:bg-slate-700/50"
              onClick={action.onClick}
            >
              <div
                className={`w-10 h-10 rounded-lg bg-gradient-to-r ${action.color} flex items-center justify-center mr-3`}
              >
                <Icon className="w-5 h-5 text-white" />
              </div>
              <div className="text-left">
                <div className="text-white font-medium">{action.title}</div>
                <div className="text-slate-400 text-sm">{action.description}</div>
              </div>
            </Button>
          )
        })}
      </CardContent>
    </Card>
  )
}
