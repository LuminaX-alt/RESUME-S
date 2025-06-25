"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Menu, X, User, LogOut } from "lucide-react"
import { useState } from "react"
import { useAuth } from "@/lib/auth"
import { AuthModal } from "@/components/auth/auth-modal"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { useRouter } from "next/navigation"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)
  const { user, signOut, loading } = useAuth()
  const router = useRouter()

  const handleSignOut = async () => {
    await signOut()
    router.push("/")
  }

  const getUserInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2)
  }

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
    setIsMenuOpen(false)
  }

  return (
    <>
      <header className="bg-slate-900/95 backdrop-blur-sm border-b border-slate-800 sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center space-x-3 cursor-pointer" onClick={() => router.push("/")}>
              <Image src="/logo.png" alt="LuminaX-alt" width={120} height={40} className="h-8 w-auto" />
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <button
                onClick={() => scrollToSection("features")}
                className="text-slate-300 hover:text-white transition-colors"
              >
                Features
              </button>
              <button
                onClick={() => scrollToSection("templates")}
                className="text-slate-300 hover:text-white transition-colors"
              >
                Templates
              </button>
              <button
                onClick={() => scrollToSection("pricing")}
                className="text-slate-300 hover:text-white transition-colors"
              >
                Pricing
              </button>
              <button
                onClick={() => scrollToSection("about")}
                className="text-slate-300 hover:text-white transition-colors"
              >
                About
              </button>
            </nav>

            {/* Desktop CTA */}
            <div className="hidden md:flex items-center space-x-4">
              {loading ? (
                <div className="w-8 h-8 bg-slate-700 rounded-full animate-pulse" />
              ) : user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className="bg-gradient-to-r from-orange-500 to-red-500 text-white text-sm">
                          {getUserInitials(user.user_metadata?.full_name || user.email || "U")}
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56 bg-slate-800 border-slate-700" align="end" forceMount>
                    <div className="flex items-center justify-start gap-2 p-2">
                      <div className="flex flex-col space-y-1 leading-none">
                        <p className="font-medium text-white">{user.user_metadata?.full_name || "User"}</p>
                        <p className="w-[200px] truncate text-sm text-slate-400">{user.email}</p>
                      </div>
                    </div>
                    <DropdownMenuSeparator className="bg-slate-700" />
                    <DropdownMenuItem
                      className="text-slate-300 hover:text-white hover:bg-slate-700 cursor-pointer"
                      onClick={() => router.push("/dashboard")}
                    >
                      <User className="mr-2 h-4 w-4" />
                      Dashboard
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="text-slate-300 hover:text-white hover:bg-slate-700 cursor-pointer"
                      onClick={handleSignOut}
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      Sign Out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <>
                  <Button
                    variant="ghost"
                    className="text-slate-300 hover:text-white"
                    onClick={() => setIsAuthModalOpen(true)}
                  >
                    Sign In
                  </Button>
                  <Button
                    className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white"
                    onClick={() => setIsAuthModalOpen(true)}
                  >
                    Get Started
                  </Button>
                </>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button className="md:hidden text-slate-300 hover:text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden py-4 border-t border-slate-800">
              <nav className="flex flex-col space-y-4">
                <button
                  onClick={() => scrollToSection("features")}
                  className="text-slate-300 hover:text-white transition-colors text-left"
                >
                  Features
                </button>
                <button
                  onClick={() => scrollToSection("templates")}
                  className="text-slate-300 hover:text-white transition-colors text-left"
                >
                  Templates
                </button>
                <button
                  onClick={() => scrollToSection("pricing")}
                  className="text-slate-300 hover:text-white transition-colors text-left"
                >
                  Pricing
                </button>
                <button
                  onClick={() => scrollToSection("about")}
                  className="text-slate-300 hover:text-white transition-colors text-left"
                >
                  About
                </button>
                <div className="flex flex-col space-y-2 pt-4">
                  {user ? (
                    <>
                      <Button
                        variant="ghost"
                        className="text-slate-300 hover:text-white justify-start"
                        onClick={() => router.push("/dashboard")}
                      >
                        <User className="mr-2 h-4 w-4" />
                        Dashboard
                      </Button>
                      <Button
                        variant="ghost"
                        className="text-slate-300 hover:text-white justify-start"
                        onClick={handleSignOut}
                      >
                        <LogOut className="mr-2 h-4 w-4" />
                        Sign Out
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button
                        variant="ghost"
                        className="text-slate-300 hover:text-white justify-start"
                        onClick={() => setIsAuthModalOpen(true)}
                      >
                        Sign In
                      </Button>
                      <Button
                        className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white justify-start"
                        onClick={() => setIsAuthModalOpen(true)}
                      >
                        Get Started
                      </Button>
                    </>
                  )}
                </div>
              </nav>
            </div>
          )}
        </div>
      </header>

      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
    </>
  )
}
