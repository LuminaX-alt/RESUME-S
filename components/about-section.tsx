"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Users, Award, Zap, Heart, Github, Linkedin, Mail } from "lucide-react"

export function AboutSection() {
  const stats = [
    {
      icon: Users,
      number: "50K+",
      label: "Happy Users",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: Award,
      number: "95%",
      label: "Success Rate",
      color: "from-green-500 to-teal-500",
    },
    {
      icon: Zap,
      number: "2M+",
      label: "Resumes Enhanced",
      color: "from-yellow-500 to-orange-500",
    },
    {
      icon: Heart,
      number: "4.9/5",
      label: "User Rating",
      color: "from-red-500 to-pink-500",
    },
  ]

  return (
    <section id="about" className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            About
            <span className="bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">
              {" "}
              LuminaX-alt
            </span>
          </h2>
          <p className="text-slate-400 text-lg max-w-3xl mx-auto">
            We're on a mission to help job seekers land their dream jobs by transforming ordinary resumes into
            extraordinary visual experiences that capture attention and showcase talent.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h3 className="text-2xl font-bold text-white mb-6">Our Story</h3>
            <div className="space-y-4 text-slate-300">
              <p>
                Founded in 2024, LuminaX-alt was born from the frustration of seeing talented individuals overlooked
                because their resumes didn't stand out in a sea of applications.
              </p>
              <p>
                We combined cutting-edge AI technology with professional design expertise to create a platform that
                doesn't just format resumes—it transforms them into compelling narratives that recruiters can't ignore.
              </p>
              <p>
                Today, we're proud to have helped thousands of job seekers across the globe land their dream positions
                with resumes that truly represent their potential.
              </p>
            </div>

            {/* Contact Section */}
            <div className="mt-8 p-6 bg-slate-800/30 rounded-lg">
              <h4 className="text-white font-semibold mb-4">Get in Touch</h4>
              <div className="flex flex-wrap gap-3">
                <a
                  href="mailto:12devsharma10c@gmail.com?subject=LuminaX-alt Inquiry"
                  className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-lg hover:from-blue-600 hover:to-cyan-600 transition-all transform hover:scale-105"
                >
                  <Mail className="w-4 h-4 mr-2" />
                  Email Us
                </a>
                <a
                  href="https://www.linkedin.com/in/dev-sharma-7a263a2a0"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all transform hover:scale-105"
                >
                  <Linkedin className="w-4 h-4 mr-2" />
                  LinkedIn
                </a>
                <a
                  href="https://github.com/LuminaX-alt"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-gray-700 to-gray-800 text-white rounded-lg hover:from-gray-800 hover:to-gray-900 transition-all transform hover:scale-105"
                >
                  <Github className="w-4 h-4 mr-2" />
                  GitHub
                </a>
              </div>
              <p className="text-slate-400 text-sm mt-3">{"Have questions or feedback? We'd love to hear from you!"}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            {stats.map((stat, index) => {
              const Icon = stat.icon
              return (
                <Card key={index} className="bg-slate-800/50 border-slate-700 text-center">
                  <CardContent className="p-6">
                    <div
                      className={`w-12 h-12 rounded-lg bg-gradient-to-r ${stat.color} flex items-center justify-center mx-auto mb-4`}
                    >
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="text-2xl font-bold text-white mb-1">{stat.number}</div>
                    <div className="text-slate-400 text-sm">{stat.label}</div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>

        <div className="bg-slate-800/30 rounded-2xl p-8 md:p-12">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-white mb-4">Our Mission</h3>
            <p className="text-slate-300 text-lg max-w-2xl mx-auto">
              {
                "To democratize access to professional resume design and empower every job seeker with the tools they need to showcase their unique value proposition."
              }
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <h4 className="text-white font-semibold mb-2">Innovation</h4>
              <p className="text-slate-400 text-sm">
                {"Constantly pushing the boundaries of what's possible with AI and design technology."}
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h4 className="text-white font-semibold mb-2">Community</h4>
              <p className="text-slate-400 text-sm">
                Building a supportive community where job seekers can learn, grow, and succeed together.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-white" />
              </div>
              <h4 className="text-white font-semibold mb-2">Excellence</h4>
              <p className="text-slate-400 text-sm">
                Delivering the highest quality results that exceed expectations and drive real outcomes.
              </p>
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center mt-12 pt-8 border-t border-slate-700">
            <h4 className="text-white font-semibold mb-4">Ready to Transform Your Career?</h4>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button
                size="lg"
                className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white"
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              >
                Start Creating Now
              </Button>
              <span className="text-slate-400">or</span>
              <a
                href="mailto:12devsharma10c@gmail.com?subject=LuminaX-alt Demo Request"
                className="text-orange-400 hover:text-orange-300 transition-colors"
              >
                Request a Demo
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
