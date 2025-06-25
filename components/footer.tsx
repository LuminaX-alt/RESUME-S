"use client"

import Image from "next/image"
import { Github, Linkedin, Mail } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-slate-900 border-t border-slate-800 mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <Image src="/logo.png" alt="LuminaX-alt" width={150} height={50} className="h-10 w-auto mb-4" />
            <p className="text-slate-400 max-w-md mb-6">
              Transform your resume into a work of art with AI-powered design and job-specific optimization. Stand out
              from the crowd and land your dream job.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://www.linkedin.com/in/dev-sharma-7a263a2a0"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-white transition-colors hover:scale-110 transform duration-200"
                aria-label="LinkedIn Profile"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="https://github.com/LuminaX-alt"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-white transition-colors hover:scale-110 transform duration-200"
                aria-label="GitHub Repository"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="mailto:12devsharma10c@gmail.com"
                className="text-slate-400 hover:text-white transition-colors hover:scale-110 transform duration-200"
                aria-label="Email Contact"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Product */}
          <div>
            <h3 className="text-white font-semibold mb-4">Product</h3>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => document.getElementById("features")?.scrollIntoView({ behavior: "smooth" })}
                  className="text-slate-400 hover:text-white transition-colors text-left"
                >
                  Features
                </button>
              </li>
              <li>
                <button
                  onClick={() => document.getElementById("templates")?.scrollIntoView({ behavior: "smooth" })}
                  className="text-slate-400 hover:text-white transition-colors text-left"
                >
                  Templates
                </button>
              </li>
              <li>
                <button
                  onClick={() => document.getElementById("pricing")?.scrollIntoView({ behavior: "smooth" })}
                  className="text-slate-400 hover:text-white transition-colors text-left"
                >
                  Pricing
                </button>
              </li>
              <li>
                <a
                  href="https://github.com/LuminaX-alt"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  API
                </a>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-white font-semibold mb-4">Support</h3>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })}
                  className="text-slate-400 hover:text-white transition-colors text-left"
                >
                  Help Center
                </button>
              </li>
              <li>
                <a
                  href="mailto:12devsharma10c@gmail.com?subject=LuminaX-alt Support Request"
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#" className="text-slate-400 hover:text-white transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-slate-400 hover:text-white transition-colors">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-slate-400 mb-4 md:mb-0">
              {"© 2024 LuminaX-alt. All rights reserved. Built with ❤️ for job seekers worldwide."}
            </p>
            <div className="flex items-center space-x-4">
              <span className="text-slate-500 text-sm">Connect with us:</span>
              <a
                href="mailto:12devsharma10c@gmail.com?subject=Hello from LuminaX-alt visitor"
                className="inline-flex items-center px-3 py-1 rounded-full bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors text-sm"
              >
                <Mail className="w-3 h-3 mr-1" />
                Email
              </a>
              <a
                href="https://www.linkedin.com/in/dev-sharma-7a263a2a0"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-3 py-1 rounded-full bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors text-sm"
              >
                <Linkedin className="w-3 h-3 mr-1" />
                LinkedIn
              </a>
              <a
                href="https://github.com/LuminaX-alt"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-3 py-1 rounded-full bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors text-sm"
              >
                <Github className="w-3 h-3 mr-1" />
                GitHub
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
